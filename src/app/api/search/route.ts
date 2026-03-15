import { NextRequest, NextResponse } from "next/server";
import { getAllPosts } from "@/lib/content";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.toLowerCase() || "";

  if (!q) {
    return NextResponse.json({ results: [] });
  }

  const posts = getAllPosts();
  const terms = q.split(/\s+/).filter(Boolean);

  const results = posts
    .map((post) => {
      const searchableText = [
        post.frontmatter.title,
        post.frontmatter.description,
        post.frontmatter.errorMessage || "",
        post.frontmatter.tags.join(" "),
        post.frontmatter.category,
        post.content,
      ]
        .join(" ")
        .toLowerCase();

      const matchCount = terms.reduce(
        (count, term) => count + (searchableText.includes(term) ? 1 : 0),
        0
      );

      return { post, matchCount };
    })
    .filter(({ matchCount }) => matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount)
    .slice(0, 20)
    .map(({ post }) => ({
      slug: post.slug,
      type: post.type,
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      category: post.frontmatter.category,
      tags: post.frontmatter.tags,
      errorMessage: post.frontmatter.errorMessage,
      date: post.frontmatter.date,
      url: post.url,
    }));

  return NextResponse.json({ results });
}
