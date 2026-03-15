import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchPageContent } from "./SearchPageContent";

export const metadata: Metadata = {
  title: "Search",
  description: "Search across all DevFix troubleshooting posts, scripts, and lessons.",
};

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Search
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Loading search...</p>
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}
