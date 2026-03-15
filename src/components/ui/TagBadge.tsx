import Link from "next/link";
import { cn } from "@/lib/utils";

interface TagBadgeProps {
  tag: string;
  count?: number;
  size?: "sm" | "md";
  interactive?: boolean;
}

export function TagBadge({ tag, count, size = "sm", interactive = true }: TagBadgeProps) {
  const classes = cn(
    "inline-flex items-center gap-1 rounded-full border font-medium transition-colors",
    size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm",
    interactive
      ? "border-gray-200 text-gray-600 hover:border-brand-300 hover:text-brand-600 dark:border-gray-700 dark:text-gray-400 dark:hover:border-brand-500 dark:hover:text-brand-400"
      : "border-gray-200 text-gray-500 dark:border-gray-700 dark:text-gray-400"
  );

  if (interactive) {
    return (
      <Link href={`/tags/${tag.toLowerCase()}`} className={classes}>
        {tag}
        {count !== undefined && (
          <span className="text-gray-400 dark:text-gray-500">{count}</span>
        )}
      </Link>
    );
  }

  return (
    <span className={classes}>
      {tag}
      {count !== undefined && (
        <span className="text-gray-400 dark:text-gray-500">{count}</span>
      )}
    </span>
  );
}
