import HeroSection from "@/components/shared/HeroSection";
import KeyFeatures from "@/components/shared/KeyFeatures";
import LatestPostsSection from "@/components/shared/LatestPostsSection";
import { getAllPosts } from "@/lib/mdxUtils";

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <main>
      <HeroSection />
      <KeyFeatures />
      <LatestPostsSection posts={posts} />
    </main>
  );
}
