interface StatsBarProps {
  totalPosts: number;
  totalCategories: number;
  totalTags: number;
}

export function StatsBar({ totalPosts, totalCategories, totalTags }: StatsBarProps) {
  const stats = [
    { label: "Problems Solved", value: totalPosts, icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
    { label: "Categories", value: totalCategories, icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
    { label: "Tags", value: totalTags, icon: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" },
  ];

  return (
    <section className="border-t border-gray-200 bg-gray-50/30 dark:border-gray-800 dark:bg-[#06060a]/50">
      <div className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-gray-200 px-4 py-10 sm:px-6 dark:divide-gray-800">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-2 text-center">
            <svg className="h-5 w-5 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
            </svg>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {stat.value}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
