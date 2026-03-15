import type { Post } from "@/types/post";
import { PostCard } from "./PostCard";
import { TagBadge } from "@/components/ui/TagBadge";

interface PostListPageProps {
  title: string;
  description: string;
  posts: Post[];
  tags: { tag: string; count: number }[];
}

export function PostListPage({ title, description, posts, tags }: PostListPageProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">{description}</p>
      </div>

      {tags.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {tags.slice(0, 15).map(({ tag, count }) => (
            <TagBadge key={tag} tag={tag} count={count} size="md" />
          ))}
        </div>
      )}

      {posts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 p-12 text-center dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400">
            No posts yet. Add MDX files to the content directory to get started.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={`${post.type}-${post.slug}`} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
