"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className="relative overflow-hidden border-b border-gray-200 dark:border-gray-800">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-100/50 via-brand-50/20 to-transparent dark:from-brand-950/40 dark:via-brand-900/10 dark:to-transparent" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-200/80 bg-brand-50/80 px-4 py-1.5 text-sm font-medium text-brand-700 backdrop-blur-sm dark:border-brand-800/50 dark:bg-brand-900/20 dark:text-brand-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
            </span>
            Engineering Troubleshooting Library
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl dark:text-white">
            Real problems.
            <br />
            <span className="bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent dark:from-brand-400 dark:to-brand-300">
              Real solutions.
            </span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-gray-600 sm:text-xl dark:text-gray-400">
            A curated knowledge base of real-world engineering issues and how they were solved.
            Built for software engineers, DevOps, cloud, and automation professionals.
          </p>

          <form onSubmit={handleSearch} className="mt-10 flex items-center gap-3 sm:mx-auto sm:max-w-lg">
            <div className="relative flex-1">
              <svg
                className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search error messages, problems..."
                className="h-14 w-full rounded-2xl border border-gray-200 bg-white/90 pl-12 pr-4 text-sm shadow-lg shadow-gray-200/50 outline-none backdrop-blur-sm transition-all placeholder:text-gray-400 focus:border-brand-400 focus:ring-4 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-[#12121a]/90 dark:shadow-black/20 dark:focus:border-brand-500 dark:focus:ring-brand-500/10"
              />
            </div>
            <button
              type="submit"
              className="h-14 rounded-2xl bg-brand-600 px-8 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:bg-brand-700 hover:shadow-brand-600/40 focus:outline-none focus:ring-4 focus:ring-brand-500/30"
            >
              Search
            </button>
          </form>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
            <span>Popular:</span>
            {["Azure context error", "Docker port conflict", "PowerShell automation"].map((term) => (
              <button
                key={term}
                onClick={() => {
                  setQuery(term);
                  router.push(`/search?q=${encodeURIComponent(term)}`);
                }}
                className="text-gray-600 underline decoration-gray-300 underline-offset-2 transition-colors hover:text-brand-600 hover:decoration-brand-400 dark:text-gray-400 dark:decoration-gray-600 dark:hover:text-brand-400 dark:hover:decoration-brand-400"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
