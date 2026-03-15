import { Feed } from "feed";
import { getAllPosts } from "@/lib/content";

const siteUrl = process.env.SITE_URL || "https://devfix.dev";

export async function GET() {
  const posts = getAllPosts();

  const feed = new Feed({
    title: "DevFix — Developer Solutions Hub",
    description:
      "Real engineering problems. Real solutions. A troubleshooting library for developers.",
    id: siteUrl,
    link: siteUrl,
    language: "en",
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `Copyright ${new Date().getFullYear()} DevFix`,
    author: {
      name: "DevFix",
      link: siteUrl,
    },
  });

  for (const post of posts.slice(0, 50)) {
    feed.addItem({
      title: post.frontmatter.title,
      id: `${siteUrl}${post.url}`,
      link: `${siteUrl}${post.url}`,
      description: post.frontmatter.description,
      date: new Date(post.frontmatter.date),
      category: post.frontmatter.tags.map((tag) => ({ name: tag })),
    });
  }

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
