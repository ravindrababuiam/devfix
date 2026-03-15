import Link from "next/link";
import { CATEGORIES } from "@/types/post";

interface CategoriesProps {
  counts: Record<string, number>;
}

export function Categories({ counts }: CategoriesProps) {
  const categories = Object.entries(CATEGORIES).map(([slug, info]) => ({
    slug,
    ...info,
    count: counts[slug] || 0,
  }));

  return (
    <section className="border-t border-gray-200 bg-gray-50/50 dark:border-gray-800 dark:bg-[#06060a]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Browse by Category
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Find solutions organized by technology and domain
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/tags/${cat.slug}`}
              className="group relative flex items-start gap-4 overflow-hidden rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-brand-200 hover:shadow-lg hover:shadow-brand-100/30 dark:border-gray-800 dark:bg-[#12121a] dark:hover:border-brand-800/50 dark:hover:shadow-brand-900/20"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-xl dark:bg-gray-800">
                {cat.icon}
              </span>
              <div className="min-w-0">
                <h3 className="font-semibold text-gray-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400">
                  {cat.name}
                </h3>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                  {cat.description}
                </p>
                {cat.count > 0 && (
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-brand-600 dark:text-brand-400">
                    {cat.count} {cat.count === 1 ? "post" : "posts"}
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
