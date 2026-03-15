"use client";

import { useEffect, useState } from "react";
import type { TableOfContentsItem } from "@/types/post";
import { cn } from "@/lib/utils";

interface TableOfContentsProps {
  items: TableOfContentsItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className="hidden lg:block">
      <div className="sticky top-24">
        <h4 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
          On this page
        </h4>
        <ul className="space-y-1 border-l border-gray-200 dark:border-gray-800">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  "block border-l-2 py-1 text-sm transition-colors",
                  item.level === 2 ? "pl-4" : item.level === 3 ? "pl-6" : "pl-8",
                  activeId === item.id
                    ? "border-brand-500 font-medium text-brand-600 dark:text-brand-400"
                    : "border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                )}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
