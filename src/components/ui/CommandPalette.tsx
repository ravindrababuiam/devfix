"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface SearchResult {
  slug: string;
  type: string;
  title: string;
  description: string;
  category: string;
  url: string;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      setQuery("");
      setResults([]);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const search = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q.trim())}`);
      const data = await res.json();
      setResults((data.results || []).slice(0, 5));
    } catch {
      setResults([]);
    }
    setLoading(false);
  }, []);

  const handleChange = (value: string) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(value), 250);
  };

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  const handleResultClick = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-[#12121a]">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-3 border-b border-gray-200 px-4 dark:border-gray-800">
            <svg className="h-5 w-5 shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="Search problems, error messages, solutions..."
              className="h-14 w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
            />
            {loading && (
              <div className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-gray-300 border-t-brand-600" />
            )}
            <kbd className="shrink-0 rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-xs font-medium text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
              ESC
            </kbd>
          </div>
        </form>

        {results.length > 0 ? (
          <div className="max-h-80 overflow-y-auto border-b border-gray-200 dark:border-gray-800">
            {results.map((result) => (
              <Link
                key={`${result.type}-${result.slug}`}
                href={result.url}
                onClick={handleResultClick}
                className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      {result.title}
                    </span>
                    <span className="shrink-0 rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                      {result.type}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-gray-500 dark:text-gray-400">
                    {result.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : null}

        <div className="flex items-center justify-between px-4 py-3">
          {query.trim() && !loading && results.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No results found. Press Enter to see full search.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {["Azure", "DevOps", "PowerShell", "Docker", "Python"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    router.push(`/tags/${tag.toLowerCase()}`);
                    onClose();
                  }}
                  className="rounded-full border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-600 transition-colors hover:border-brand-300 hover:text-brand-600 dark:border-gray-700 dark:text-gray-400 dark:hover:border-brand-500 dark:hover:text-brand-400"
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <kbd className="rounded border border-gray-200 bg-gray-50 px-1 py-0.5 text-[10px] font-medium dark:border-gray-700 dark:bg-gray-800">
              &crarr;
            </kbd>
            <span>to search</span>
          </div>
        </div>
      </div>
    </div>
  );
}
