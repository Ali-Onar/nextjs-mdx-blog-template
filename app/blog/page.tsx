import BlogContent from '@/components/shared/BlogContent';
import { getAllPosts } from '@/lib/mdxUtils';
import React from 'react';

export function generateMetadata() {
    return {
        title: 'Blog - AliBlog',
        description: 'Blog posts from AliBlog',
        keywords: 'blog, engineering, software, development, programming',
        authors: { name: 'Ali Onar' },
        openGraph: {
            title: 'Blog - AliBlog',
            description: 'Blog posts from AliBlog',
            type: 'website',
            locale: 'en_US',
            url: `${process.env.NEXT_PUBLIC_APP_URL}/blog`,
            images: [
                {
                    url: 'https://picsum.photos/400/400',
                    width: 400,
                    height: 400,
                    alt: 'AliBlog',
                },
            ],
            siteName: 'AliBlog',
        },
        twitter: {
            card: 'summary_large_image',
            site: process.env.NEXT_PUBLIC_APP_URL,
            title: 'Blog - AliBlog',
            description: 'Blog posts from AliBlog',
            images: [
                {
                    url: 'https://picsum.photos/400/400',
                    alt: 'AliBlog',
                },
            ],
        },
    };
}

export default async function BlogPage() {
    const posts = await getAllPosts();

    return (
        <section className="p-4 mt-4 container mx-auto max-w-screen-lg">
            <h1 className="text-3xl font-semibold mb-8">AliBlog Posts</h1>
            <BlogContent posts={posts} />
        </section>
    );
}
