import type { Metadata } from "next";
import { getAllPosts, getAllTags } from "@/lib/content";
import { PostListPage } from "@/components/post/PostListPage";

export const metadata: Metadata = {
  title: "Scripts",
  description:
    "Reusable automation scripts, tools, and code snippets for DevOps, cloud, and engineering tasks.",
};

export default function ScriptsPage() {
  const posts = getAllPosts("scripts");
  const tags = getAllTags();

  return (
    <PostListPage
      title="Automation Scripts"
      description="Reusable scripts, tools, and code snippets for engineering and DevOps workflows."
      posts={posts}
      tags={tags}
    />
  );
}
