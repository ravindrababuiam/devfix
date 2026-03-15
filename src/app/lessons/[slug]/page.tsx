import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug, getPostSlugs, getRelatedPosts } from "@/lib/content";
import { renderMDX } from "@/lib/mdx";
import { extractTableOfContents } from "@/lib/toc";
import { PostMeta } from "@/components/post/PostMeta";
import { TableOfContents } from "@/components/ui/TableOfContents";
import { RelatedPosts } from "@/components/post/RelatedPosts";
import { BookmarkButton } from "@/components/ui/BookmarkButton";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getPostSlugs("lessons");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug, "lessons");
  if (!post) return {};

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: "article",
      publishedTime: post.frontmatter.date,
      tags: post.frontmatter.tags,
    },
  };
}

export default async function LessonPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug, "lessons");
  if (!post) notFound();

  const content = await renderMDX(post.content);
  const toc = extractTableOfContents(post.content);
  const relatedPosts = getRelatedPosts(post, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    datePublished: post.frontmatter.date,
    keywords: post.frontmatter.tags.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
          <div>
            <div className="mb-4 flex justify-end">
              <BookmarkButton postId={`lessons-${slug}`} title={post.frontmatter.title} />
            </div>
            <PostMeta post={post} />
            <div className="prose prose-gray max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-a:text-brand-600 dark:prose-a:text-brand-400">
              {content}
            </div>
            <RelatedPosts posts={relatedPosts} />
          </div>
          <TableOfContents items={toc} />
        </div>
      </article>
    </>
  );
}
