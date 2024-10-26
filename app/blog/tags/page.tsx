import { getAllPosts } from '@/lib/mdxUtils';
import Link from 'next/link';
import React from 'react';

type TagWithCount = {
    tag: string;
    count: number;
};

const getTags = async () => {
    const posts = await getAllPosts();
    const tagCounts: { [key: string]: number } = {};

    posts.forEach((post) => {
        post.tags?.forEach((tag) => {
            if (tagCounts[tag]) {
                tagCounts[tag] += 1;
            } else {
                tagCounts[tag] = 1;
            }
        });
    });

    const tags: TagWithCount[] = Object.keys(tagCounts).map((tag) => ({
        tag,
        count: tagCounts[tag],
    }));

    return tags;
};

export function generateMetadata() {
    return {
        title: 'Tags - AliBlog',
        description: 'Tags from AliBlog',
    };
}

export default async function TagsPage() {
    const tags = await getTags();

    return (
        <section className="p-4 container mx-auto max-w-screen-lg">
            <h1 className="text-3xl font-semibold mb-8">Tags</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {tags.map((tag) => (
                    <Link href={`/blog/tags/${tag.tag}`} key={tag.tag} className="block p-4 border rounded-lg hover:shadow-md">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold">{tag.tag}</span>
                            <span className="text-gray-600">
                                {tag.count}
                                {' '}
                                post(s)
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
