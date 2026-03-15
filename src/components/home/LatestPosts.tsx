import Link from "next/link";
import type { Post } from "@/types/post";
import { PostCard } from "@/components/post/PostCard";

interface LatestPostsProps {
  posts: Post[];
}

export function LatestPosts({ posts }: LatestPostsProps) {
  if (posts.length === 0) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Latest Posts</h2>
        <div className="mt-8 rounded-xl border border-dashed border-gray-300 p-12 text-center dark:border-gray-700">
          <svg className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            No posts yet. Add your first MDX file to the <code className="rounded bg-gray-100 px-1 py-0.5 text-xs dark:bg-gray-800">content/</code> directory.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Latest Troubleshooting Posts
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Recently solved engineering problems
          </p>
        </div>
        <Link
          href="/problems"
          className="hidden items-center gap-1 text-sm font-medium text-brand-600 transition-colors hover:text-brand-700 sm:flex dark:text-brand-400 dark:hover:text-brand-300"
        >
          View all
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.slice(0, 6).map((post) => (
          <PostCard key={`${post.type}-${post.slug}`} post={post} />
        ))}
      </div>

      <div className="mt-8 text-center sm:hidden">
        <Link
          href="/problems"
          className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 dark:text-brand-400"
        >
          View all posts
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
