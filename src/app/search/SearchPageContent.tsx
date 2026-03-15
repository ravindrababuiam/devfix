"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { TagBadge } from "@/components/ui/TagBadge";

interface SearchResult {
  slug: string;
  type: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  errorMessage?: string;
  date: string;
  url: string;
}

export function SearchPageContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery.trim())}`);
      const data = await res.json();
      setResults(data.results || []);
    } catch {
      setResults([]);
    }
    setSearched(true);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery);
    }
  }, [initialQuery, performSearch]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(query);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
        Search
      </h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        Search across all troubleshooting posts, error messages, and solutions.
      </p>

      <form onSubmit={handleSearch} className="mt-8">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <svg
              className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search error messages, problems, solutions..."
              className="h-12 w-full rounded-xl border border-gray-300 bg-white pl-11 pr-4 text-sm shadow-sm outline-none transition-colors placeholder:text-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-[#12121a] dark:focus:border-brand-400"
              autoFocus
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="h-12 rounded-xl bg-brand-600 px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700 disabled:opacity-50"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </form>

      {loading && (
        <div className="mt-12 flex justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-brand-600" />
        </div>
      )}

      {searched && !loading && (
        <div className="mt-8">
          <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
            {results.length} {results.length === 1 ? "result" : "results"} found
            {query && <> for &ldquo;{query}&rdquo;</>}
          </p>

          {results.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
              <svg className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <p className="mt-4 text-gray-500 dark:text-gray-400">
                No results found. Try different keywords or browse by category.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {["azure", "devops", "powershell", "docker", "python", "automation"].map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags/${tag}`}
                    className="rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600 transition-colors hover:border-brand-300 hover:text-brand-600 dark:border-gray-700 dark:text-gray-400 dark:hover:border-brand-500 dark:hover:text-brand-400"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {results.map((result) => (
                <Link
                  key={`${result.type}-${result.slug}`}
                  href={result.url}
                  className="block rounded-xl border border-gray-200 p-5 transition-all hover:border-gray-300 hover:shadow-md dark:border-gray-800 dark:hover:border-gray-700"
                >
                  <div className="mb-2 flex items-center gap-2 text-xs text-gray-500">
                    <span className="rounded-md bg-brand-50 px-2 py-0.5 font-medium text-brand-700 dark:bg-brand-500/10 dark:text-brand-400">
                      {result.category}
                    </span>
                    <span className="rounded-md bg-gray-100 px-2 py-0.5 font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                      {result.type}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {result.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {result.description}
                  </p>
                  {result.errorMessage && (
                    <div className="mt-2 rounded-lg border border-red-100 bg-red-50/50 px-3 py-1.5 font-mono text-xs text-red-700 dark:border-red-900/30 dark:bg-red-900/10 dark:text-red-400">
                      {result.errorMessage}
                    </div>
                  )}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {result.tags.slice(0, 5).map((tag) => (
                      <TagBadge key={tag} tag={tag} size="sm" interactive={false} />
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
