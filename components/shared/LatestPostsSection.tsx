import React from "react";
import BlogContent from "./BlogContent";
import { PostMeta } from "@/types/helper.types";

type LatestPostsSectionProps = {
  posts: PostMeta[];
};

const LatestPostsSection = (props: LatestPostsSectionProps) => {
  const { posts } = props;

  return (
    <section className="p-4 mt-12 container mx-auto max-w-screen-lg">
      <h1 className="text-3xl font-semibold mb-8 text-center">Latest Posts</h1>
      <BlogContent posts={posts} />
    </section>
  );
};

export default LatestPostsSection;
