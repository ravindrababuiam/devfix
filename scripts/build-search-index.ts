/**
 * Algolia Search Index Builder
 *
 * Run this script to push all content to Algolia for search.
 * Requires ALGOLIA_ADMIN_KEY and NEXT_PUBLIC_ALGOLIA_APP_ID in .env.local
 *
 * Usage: npx tsx scripts/build-search-index.ts
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { algoliasearch } from "algoliasearch";

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
const adminKey = process.env.ALGOLIA_ADMIN_KEY;
const indexName = "devfix_posts";

if (!appId || !adminKey) {
  console.log("Algolia credentials not found. Skipping search index build.");
  console.log("Set NEXT_PUBLIC_ALGOLIA_APP_ID and ALGOLIA_ADMIN_KEY in .env.local");
  process.exit(0);
}

const client = algoliasearch(appId, adminKey);

const contentTypes = ["problems", "scripts", "lessons", "notes"] as const;
const contentDir = path.join(process.cwd(), "content");

interface SearchRecord {
  objectID: string;
  slug: string;
  type: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  errorMessage: string;
  date: string;
  url: string;
  content: string;
}

async function buildIndex() {
  const records: SearchRecord[] = [];

  for (const type of contentTypes) {
    const dir = path.join(contentDir, type);
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

    for (const file of files) {
      const slug = file.replace(/\.mdx$/, "");
      const filePath = path.join(dir, file);
      const raw = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(raw);

      if (data.draft) continue;

      records.push({
        objectID: `${type}-${slug}`,
        slug,
        type,
        title: data.title || "",
        description: data.description || "",
        category: data.category || "",
        tags: data.tags || [],
        errorMessage: data.errorMessage || "",
        date: data.date || "",
        url: `/${type}/${slug}`,
        content: content.slice(0, 5000),
      });
    }
  }

  if (records.length === 0) {
    console.log("No content found to index.");
    return;
  }

  console.log(`Indexing ${records.length} records to Algolia...`);
  await client.saveObjects({ indexName, objects: records as unknown as Record<string, unknown>[] });
  console.log("Search index updated successfully.");
}

buildIndex().catch(console.error);
