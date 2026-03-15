import { algoliasearch } from "algoliasearch";

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || "";
const searchKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY || "";

export function getSearchClient() {
  if (!appId || !searchKey) return null;
  return algoliasearch(appId, searchKey);
}

export const ALGOLIA_INDEX_NAME = "devfix_posts";
