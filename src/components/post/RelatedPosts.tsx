import type { Post } from "@/types/post";
import { PostCard } from "./PostCard";

interface RelatedPostsProps {
  posts: Post[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16 border-t border-gray-200 pt-12 dark:border-gray-800">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        Related Posts
      </h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={`${post.type}-${post.slug}`} post={post} />
        ))}
      </div>
    </section>
  );
}
