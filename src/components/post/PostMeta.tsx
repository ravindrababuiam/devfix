import type { Post } from "@/types/post";
import { formatDate } from "@/lib/utils";
import { TagBadge } from "@/components/ui/TagBadge";

interface PostMetaProps {
  post: Post;
}

export function PostMeta({ post }: PostMetaProps) {
  const { frontmatter, readingTime } = post;

  return (
    <div className="mb-8 border-b border-gray-200 pb-8 dark:border-gray-800">
      <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <span className="rounded-md bg-brand-50 px-2.5 py-1 font-medium text-brand-700 dark:bg-brand-500/10 dark:text-brand-400">
          {frontmatter.category}
        </span>
        <span>&middot;</span>
        <time dateTime={frontmatter.date}>{formatDate(frontmatter.date)}</time>
        <span>&middot;</span>
        <span>{readingTime}</span>
        {frontmatter.difficulty && (
          <>
            <span>&middot;</span>
            <span className="capitalize">{frontmatter.difficulty}</span>
          </>
        )}
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
        {frontmatter.title}
      </h1>

      <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
        {frontmatter.description}
      </p>

      {frontmatter.environment && frontmatter.environment.length > 0 && (
        <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900/50">
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Environment
          </h4>
          <ul className="flex flex-wrap gap-2">
            {frontmatter.environment.map((env) => (
              <li
                key={env}
                className="rounded-md border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              >
                {env}
              </li>
            ))}
          </ul>
        </div>
      )}

      {frontmatter.errorMessage && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900/30 dark:bg-red-900/10">
          <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-red-600 dark:text-red-400">
            Error Message
          </h4>
          <code className="text-sm font-medium text-red-800 dark:text-red-300">
            {frontmatter.errorMessage}
          </code>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-1.5">
        {frontmatter.tags.map((tag) => (
          <TagBadge key={tag} tag={tag} />
        ))}
      </div>
    </div>
  );
}
