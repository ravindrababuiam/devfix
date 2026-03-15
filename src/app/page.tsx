import { Hero } from "@/components/home/Hero";
import { LatestPosts } from "@/components/home/LatestPosts";
import { Categories } from "@/components/home/Categories";
import { StatsBar } from "@/components/home/StatsBar";
import { getAllPosts, getAllTags, getCategoryPostCounts } from "@/lib/content";
import { CATEGORIES } from "@/types/post";

export default function HomePage() {
  const posts = getAllPosts();
  const tags = getAllTags();
  const categoryCounts = getCategoryPostCounts();
  const totalCategories = Object.keys(CATEGORIES).length;

  return (
    <>
      <Hero />
      <StatsBar
        totalPosts={posts.length}
        totalCategories={totalCategories}
        totalTags={tags.length}
      />
      <LatestPosts posts={posts} />
      <Categories counts={categoryCounts} />
    </>
  );
}
