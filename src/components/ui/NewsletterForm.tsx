"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
  };

  if (submitted) {
    return (
      <div className="rounded-lg bg-green-50 p-3 text-sm text-green-700 dark:bg-green-900/10 dark:text-green-400">
        Thanks for subscribing! You&apos;ll receive updates soon.
      </div>
    );
  }

  return (
    <div>
      <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
        Stay updated
      </h4>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        Get new troubleshooting posts in your inbox.
      </p>
      <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          className="h-9 flex-1 rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none placeholder:text-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-[#0a0a0f] dark:focus:border-brand-400"
        />
        <button
          type="submit"
          className="h-9 shrink-0 rounded-lg bg-brand-600 px-4 text-xs font-semibold text-white transition-colors hover:bg-brand-700"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}
