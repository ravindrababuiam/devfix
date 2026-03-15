import type { Metadata } from "next";
import { getPostsByTag, getAllTags } from "@/lib/content";
import { PostListPage } from "@/components/post/PostListPage";

interface PageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map(({ tag }) => ({ tag }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `${tag} Posts`,
    description: `Browse all engineering posts tagged with "${tag}" on DevFix.`,
  };
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);
  const allTags = getAllTags();

  return (
    <PostListPage
      title={`Tagged: ${tag}`}
      description={`All posts tagged with "${tag}"`}
      posts={posts}
      tags={allTags}
    />
  );
}
