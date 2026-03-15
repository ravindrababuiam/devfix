import Link from "next/link";
import { NewsletterForm } from "@/components/ui/NewsletterForm";

const footerLinks = {
  Content: [
    { href: "/problems", label: "Problems" },
    { href: "/scripts", label: "Scripts" },
    { href: "/lessons", label: "Lessons" },
    { href: "/search", label: "Search" },
  ],
  Categories: [
    { href: "/tags/azure", label: "Azure" },
    { href: "/tags/devops", label: "DevOps" },
    { href: "/tags/powershell", label: "PowerShell" },
    { href: "/tags/python", label: "Python" },
    { href: "/tags/docker", label: "Docker" },
    { href: "/tags/automation", label: "Automation" },
  ],
  More: [
    { href: "/about", label: "About" },
    { href: "/feed.xml", label: "RSS Feed" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50/50 dark:border-gray-800 dark:bg-[#06060a]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
                D
              </div>
              <span className="text-lg font-bold tracking-tight">
                Dev<span className="text-brand-600">Fix</span>
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              A curated knowledge base of real-world engineering problems and solutions.
              Built for engineers, by engineers.
            </p>
            <div className="mt-6">
              <NewsletterForm />
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 transition-colors hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-8 sm:flex-row dark:border-gray-800">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} DevFix. Built for engineers, by engineers.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <Link href="/feed.xml" className="transition-colors hover:text-gray-600 dark:hover:text-gray-300">
              RSS
            </Link>
            <span>&middot;</span>
            <Link href="/about" className="transition-colors hover:text-gray-600 dark:hover:text-gray-300">
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
