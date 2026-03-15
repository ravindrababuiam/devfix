import Link from "next/link";
import type { Post } from "@/types/post";
import { formatDate } from "@/lib/utils";
import { TagBadge } from "@/components/ui/TagBadge";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const { frontmatter, url, readingTime } = post;

  return (
    <article className="group relative flex flex-col rounded-xl border border-gray-200 bg-white p-6 transition-all duration-200 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-100/20 dark:border-gray-800 dark:bg-[#12121a] dark:hover:border-brand-800/40 dark:hover:shadow-brand-900/10">
      <div className="mb-3 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <span className="rounded-md bg-brand-50 px-2 py-0.5 font-medium text-brand-700 dark:bg-brand-500/10 dark:text-brand-400">
          {frontmatter.category}
        </span>
        <span className="text-gray-300 dark:text-gray-600">&middot;</span>
        <time dateTime={frontmatter.date}>{formatDate(frontmatter.date)}</time>
        <span className="text-gray-300 dark:text-gray-600">&middot;</span>
        <span>{readingTime}</span>
      </div>

      <h3 className="mb-2 text-lg font-semibold leading-snug text-gray-900 transition-colors group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400">
        <Link href={url} className="after:absolute after:inset-0">
          {frontmatter.title}
        </Link>
      </h3>

      <p className="mb-4 line-clamp-2 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
        {frontmatter.description}
      </p>

      {frontmatter.errorMessage && (
        <div className="mb-4 overflow-hidden rounded-lg border border-red-100 bg-red-50/60 px-3 py-2 dark:border-red-900/30 dark:bg-red-900/10">
          <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-red-500 dark:text-red-400">
            Error
          </div>
          <code className="block truncate font-mono text-xs text-red-700 dark:text-red-300">
            {frontmatter.errorMessage}
          </code>
        </div>
      )}

      <div className="flex flex-wrap gap-1.5">
        {frontmatter.tags.slice(0, 4).map((tag) => (
          <TagBadge key={tag} tag={tag} size="sm" interactive={false} />
        ))}
      </div>
    </article>
  );
}
