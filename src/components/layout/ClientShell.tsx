"use client";

import { useState, useEffect, useCallback, type ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CommandPalette } from "@/components/ui/CommandPalette";

export function ClientShell({ children }: { children: ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setSearchOpen((prev) => !prev);
    }
    if (e.key === "Escape") {
      setSearchOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      <Header onSearchOpen={() => setSearchOpen(true)} />
      <main className="min-h-[calc(100vh-4rem)]">{children}</main>
      <Footer />
      <CommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
