import type { Metadata } from "next";
import { getAllPosts, getAllTags } from "@/lib/content";
import { PostListPage } from "@/components/post/PostListPage";

export const metadata: Metadata = {
  title: "Lessons",
  description:
    "Engineering lessons learned from production incidents, debugging sessions, and architecture decisions.",
};

export default function LessonsPage() {
  const posts = getAllPosts("lessons");
  const tags = getAllTags();

  return (
    <PostListPage
      title="Lessons Learned"
      description="Key takeaways from real engineering challenges, production incidents, and debugging sessions."
      posts={posts}
      tags={tags}
    />
  );
}
