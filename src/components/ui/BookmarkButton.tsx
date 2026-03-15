"use client";

import { useState, useEffect } from "react";

interface BookmarkButtonProps {
  postId: string;
  title: string;
}

function getBookmarks(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("devfix-bookmarks") || "[]");
  } catch {
    return [];
  }
}

function setBookmarks(bookmarks: string[]) {
  localStorage.setItem("devfix-bookmarks", JSON.stringify(bookmarks));
}

export function BookmarkButton({ postId, title: _title }: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsBookmarked(getBookmarks().includes(postId));
  }, [postId]);

  if (!mounted) return null;

  const toggleBookmark = () => {
    const bookmarks = getBookmarks();
    let updated: string[];

    if (bookmarks.includes(postId)) {
      updated = bookmarks.filter((id) => id !== postId);
      setIsBookmarked(false);
    } else {
      updated = [...bookmarks, postId];
      setIsBookmarked(true);
    }

    setBookmarks(updated);
  };

  return (
    <button
      onClick={toggleBookmark}
      className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
      aria-label={isBookmarked ? "Remove bookmark" : "Bookmark this post"}
      title={isBookmarked ? "Remove bookmark" : "Bookmark this post"}
    >
      <svg
        className={`h-4 w-4 ${isBookmarked ? "fill-brand-500 text-brand-500" : "text-gray-400"}`}
        viewBox="0 0 24 24"
        fill={isBookmarked ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
      {isBookmarked ? "Bookmarked" : "Bookmark"}
    </button>
  );
}
