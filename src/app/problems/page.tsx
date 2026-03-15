import type { Metadata } from "next";
import { getAllPosts, getAllTags } from "@/lib/content";
import { PostListPage } from "@/components/post/PostListPage";

export const metadata: Metadata = {
  title: "Problems",
  description:
    "Browse real-world engineering problems and their solutions. Searchable troubleshooting library for developers.",
};

export default function ProblemsPage() {
  const posts = getAllPosts("problems");
  const tags = getAllTags();

  return (
    <PostListPage
      title="Troubleshooting Library"
      description="Real-world engineering problems and step-by-step solutions."
      posts={posts}
      tags={tags}
    />
  );
}
