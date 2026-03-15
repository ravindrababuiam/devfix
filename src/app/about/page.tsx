import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "About DevFix — an engineering troubleshooting library built for developers, DevOps, cloud, and automation professionals.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
        About DevFix
      </h1>

      <div className="mt-8 space-y-8 text-gray-600 dark:text-gray-400">
        <section>
          <h2 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
            What is DevFix?
          </h2>
          <p className="leading-relaxed">
            DevFix is an engineering troubleshooting library — a curated knowledge base of
            real-world problems faced by software engineers and how they were solved. Every
            post follows a structured format: problem, environment, error message, root cause,
            solution, and lessons learned.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
            Why DevFix?
          </h2>
          <p className="leading-relaxed">
            As engineers, we spend hours debugging issues that someone else has already solved.
            DevFix bridges that gap by documenting real solutions to real problems — not
            theoretical explanations, but actual fixes with exact commands, code snippets, and
            context. Every post comes from a genuine engineering encounter.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
            Who is it for?
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              "Software Engineers",
              "DevOps Engineers",
              "Cloud Engineers",
              "Azure Engineers",
              "Data Engineers",
              "AI/ML Engineers",
              "Automation Engineers",
              "System Administrators",
            ].map((role) => (
              <div
                key={role}
                className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 dark:border-gray-800"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{role}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
            Content Structure
          </h2>
          <p className="mb-4 leading-relaxed">
            Every troubleshooting post follows a consistent structure so you can quickly
            find what you need:
          </p>
          <div className="space-y-2">
            {[
              { label: "Problem", desc: "Clear description of the issue" },
              { label: "Environment", desc: "Tech stack, versions, and platform details" },
              { label: "Error Message", desc: "Exact error text for searchability" },
              { label: "Root Cause", desc: "Why the problem occurred" },
              { label: "Solution", desc: "Step-by-step fix with code and commands" },
              { label: "Lessons Learned", desc: "Key takeaways to prevent recurrence" },
            ].map((item) => (
              <div key={item.label} className="flex gap-3 rounded-lg border border-gray-200 p-3 dark:border-gray-800">
                <span className="shrink-0 text-sm font-semibold text-brand-600 dark:text-brand-400">
                  {item.label}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
            Get Started
          </h2>
          <p className="leading-relaxed">
            Browse the{" "}
            <Link href="/problems" className="font-medium text-brand-600 hover:underline dark:text-brand-400">
              troubleshooting library
            </Link>
            , explore{" "}
            <Link href="/scripts" className="font-medium text-brand-600 hover:underline dark:text-brand-400">
              automation scripts
            </Link>
            , or use the{" "}
            <Link href="/search" className="font-medium text-brand-600 hover:underline dark:text-brand-400">
              search
            </Link>{" "}
            to find solutions to specific error messages.
          </p>
        </section>
      </div>
    </div>
  );
}
