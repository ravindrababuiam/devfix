import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Post, PostFrontmatter, ContentType } from "@/types/post";
import { calculateReadingTime } from "./utils";

const contentDirectory = path.join(process.cwd(), "content");

function getContentPath(type: ContentType): string {
  return path.join(contentDirectory, type);
}

export function getPostSlugs(type: ContentType): string[] {
  const dir = getContentPath(type);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string, type: ContentType): Post | null {
  const filePath = path.join(getContentPath(type), `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const frontmatter = data as PostFrontmatter;

  if (frontmatter.draft) return null;

  return {
    slug,
    type,
    frontmatter,
    content,
    readingTime: calculateReadingTime(content),
    url: `/${type}/${slug}`,
  };
}

export function getAllPosts(type?: ContentType): Post[] {
  const types: ContentType[] = type
    ? [type]
    : ["problems", "scripts", "lessons", "notes"];

  const posts: Post[] = [];

  for (const t of types) {
    const slugs = getPostSlugs(t);
    for (const slug of slugs) {
      const post = getPostBySlug(slug, t);
      if (post) posts.push(post);
    }
  }

  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((post) =>
    post.frontmatter.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter(
    (post) => post.frontmatter.category.toLowerCase() === category.toLowerCase()
  );
}

export function getAllTags(): { tag: string; count: number }[] {
  const tagMap = new Map<string, number>();
  const posts = getAllPosts();

  for (const post of posts) {
    for (const tag of post.frontmatter.tags) {
      const lower = tag.toLowerCase();
      tagMap.set(lower, (tagMap.get(lower) || 0) + 1);
    }
  }

  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getRelatedPosts(currentPost: Post, limit = 3): Post[] {
  const allPosts = getAllPosts();
  const scored = allPosts
    .filter((p) => p.slug !== currentPost.slug || p.type !== currentPost.type)
    .map((post) => {
      let score = 0;
      if (post.frontmatter.category === currentPost.frontmatter.category) {
        score += 3;
      }
      for (const tag of post.frontmatter.tags) {
        if (currentPost.frontmatter.tags.includes(tag)) {
          score += 1;
        }
      }
      return { post, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((item) => item.post);
}

export function getCategoryPostCounts(): Record<string, number> {
  const posts = getAllPosts();
  const counts: Record<string, number> = {};

  for (const post of posts) {
    const cat = post.frontmatter.category.toLowerCase();
    counts[cat] = (counts[cat] || 0) + 1;
  }

  return counts;
}
