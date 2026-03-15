# DevFix — Developer Solutions Hub

**Real engineering problems. Real solutions.**

DevFix is a production-ready engineering troubleshooting library built with Next.js. It provides a searchable knowledge base where developers can find real-world problems and their solutions, organized by category and tag.

## Tech Stack

- **Next.js 15** — App Router, React Server Components, static generation
- **TypeScript** — Full type safety
- **Tailwind CSS v4** — Utility-first styling with dark mode
- **MDX** — Content authoring with rich components via `next-mdx-remote`
- **Shiki** — Syntax highlighting for 100+ languages via `rehype-pretty-code`
- **next-sitemap** — Automatic sitemap and robots.txt generation
- **RSS Feed** — Auto-generated at `/feed.xml`

## Features

- **Dark mode** with system preference detection
- **Syntax-highlighted code blocks** with one-click copy button
- **Structured troubleshooting format** (Problem, Root Cause, Solution)
- **Table of Contents** sidebar on post pages
- **Category and tag browsing** with post counts
- **Full-text search** via API endpoint with instant results
- **Cmd+K / Ctrl+K** command palette with live search
- **Post bookmarking** (localStorage, no backend needed)
- **Newsletter subscription form** (ready to connect to any email provider)
- **SEO optimized** with OpenGraph, Twitter cards, JSON-LD structured data
- **RSS feed** generation
- **Responsive design** (mobile, tablet, desktop)
- **Sitemap and robots.txt** auto-generation
- **Custom 404 page**

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone <your-repo-url>
cd devfix
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Content Management

### Adding a New Post

Create an MDX file in the appropriate content directory:

```
content/
├── problems/    # Troubleshooting posts
├── scripts/     # Automation scripts
├── lessons/     # Engineering lessons learned
└── notes/       # Quick engineering notes
```

### Post Frontmatter

Each MDX file requires frontmatter metadata:

```yaml
---
title: "Your Post Title"
description: "Brief description for SEO and cards"
date: "2026-03-15"
category: "azure"
tags: ["azure", "powershell", "automation"]
environment: ["Azure Government Cloud", "PowerShell 7.x"]
errorMessage: "The exact error message (optional)"
difficulty: "intermediate"  # beginner | intermediate | advanced
draft: false  # Set to true to hide from listings
---
```

### Supported Categories

`azure` | `devops` | `automation` | `powershell` | `python` | `cloud` | `debugging` | `system-design` | `docker` | `kubernetes` | `terraform`

### Writing Content

Use standard Markdown with code blocks. The syntax highlighter supports language labels and line highlighting:

````markdown
```powershell title="My Script"
Connect-AzAccount -Identity -Environment AzureUSGovernment
```
````

Code blocks automatically get a copy button on hover.

## Search Setup (Algolia — Optional)

The site includes a built-in full-text search API at `/api/search`. No external services required.

For Algolia integration (optional, for larger sites):

### 1. Create a Free Algolia Account

Sign up at [algolia.com](https://www.algolia.com/) (free tier supports up to 10K records).

### 2. Configure Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your credentials:

```bash
cp .env.local.example .env.local
```

### 3. Build the Search Index

```bash
npx tsx scripts/build-search-index.ts
```

## Deployment (Vercel)

### One-Click Deploy

1. Push your code to GitHub
2. Import the repository on [vercel.com](https://vercel.com)
3. Add environment variables in the Vercel dashboard (optional)
4. Deploy

### Manual Deploy

```bash
npm install -g vercel
vercel
```

### Environment Variables for Vercel

| Variable | Required | Description |
|----------|----------|-------------|
| `SITE_URL` | No | Your production URL (default: `https://devfix.dev`) |
| `NEXT_PUBLIC_ALGOLIA_APP_ID` | No | Algolia Application ID |
| `NEXT_PUBLIC_ALGOLIA_SEARCH_KEY` | No | Algolia Search-Only API Key |
| `ALGOLIA_ADMIN_KEY` | No | Algolia Admin API Key |

## Project Structure

```
devfix/
├── content/                 # MDX content files
│   ├── problems/            # Troubleshooting posts (5 posts)
│   ├── scripts/             # Automation scripts (1 post)
│   ├── lessons/             # Engineering lessons (1 post)
│   └── notes/               # Quick notes
├── public/                  # Static assets
├── scripts/                 # Build scripts (Algolia indexer)
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── layout.tsx       # Root layout (fonts, providers)
│   │   ├── page.tsx         # Homepage
│   │   ├── problems/        # Problems listing + detail pages
│   │   ├── scripts/         # Scripts listing + detail pages
│   │   ├── lessons/         # Lessons listing + detail pages
│   │   ├── search/          # Full-text search page
│   │   ├── about/           # About page
│   │   ├── tags/[tag]/      # Tag-filtered listings
│   │   ├── feed.xml/        # RSS feed route
│   │   └── api/search/      # Search API endpoint
│   ├── components/
│   │   ├── layout/          # Header, Footer, ThemeToggle, Providers, ClientShell
│   │   ├── ui/              # CopyButton, TagBadge, BookmarkButton, CommandPalette,
│   │   │                    # TableOfContents, NewsletterForm
│   │   ├── post/            # PostCard, PostMeta, PostListPage, RelatedPosts
│   │   └── home/            # Hero, LatestPosts, Categories, StatsBar
│   ├── lib/
│   │   ├── content.ts       # MDX file reading, parsing, filtering, related posts
│   │   ├── mdx.tsx          # MDX rendering with rehype-pretty-code + copy button
│   │   ├── toc.ts           # Table of contents extraction
│   │   ├── algolia.ts       # Algolia client (optional)
│   │   └── utils.ts         # Reading time, dates, classnames
│   └── types/
│       └── post.ts          # TypeScript types and category definitions
├── next.config.ts
├── postcss.config.mjs
├── next-sitemap.config.js
└── tsconfig.json
```

## Example Content (Included)

| Post | Type | Category |
|------|------|----------|
| Azure Runbook Authentication Error | Problem | Azure |
| Docker Container Port Conflict | Problem | Docker |
| Terraform State Lock Stuck | Problem | Terraform |
| Python SSL Certificate Verify Failed | Problem | Python |
| Azure Resource Group Cleanup Script | Script | Automation |
| Always Check Cloud Environment | Lesson | Cloud |

## Scaling Suggestions

As the site grows, consider these enhancements:

### Content & Search
- **AI-assisted search**: Add OpenAI embeddings with a vector database (Pinecone/Supabase) for semantic search across error messages
- **CMS migration**: Move from file-based MDX to Sanity or Contentful when content volume exceeds 500+ posts
- **Algolia DocSearch**: Apply for Algolia's free DocSearch program for documentation sites

### Community & Engagement
- **Comments**: Add Giscus (GitHub Discussions-based) for developer-friendly commenting
- **Contributions**: Enable community contributions via GitHub pull requests to the `content/` directory
- **Newsletter**: Connect the subscription form to ConvertKit, Resend, or Buttondown

### Analytics & Performance
- **Analytics**: Add Plausible or Umami for privacy-friendly traffic analytics
- **Performance**: Implement ISR (Incremental Static Regeneration) for frequently updated content
- **OG images**: Add automatic OG image generation with `@vercel/og`

### Developer Tools
- **CLI tool**: Build a CLI that searches DevFix from the terminal
- **VS Code extension**: Create an extension that surfaces relevant DevFix posts based on error messages in the terminal
- **API**: Expose a public REST API for programmatic access to the troubleshooting library
- **GitHub Action**: Automatically create a DevFix post from a resolved GitHub issue

## License

MIT
