import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react';
import { PostMeta } from '@/types/helper.types';
import { getAllPosts } from '@/lib/mdxUtils';

type Props = {
    params: {
        tag: string;
    };
};

const getPostsByTag = async (tag: string): Promise<PostMeta[]> => {
    const posts = await getAllPosts();

    return posts.filter((post) => post.tags?.includes(tag));
};

export function generateMetadata({ params }: Props) {
    const { tag } = params;

    return {
        title: `${tag} - AliBlog`,
        description: `${tag} from AliBlog`,
    };
}

export default async function TagPage({ params }: Props) {
    const { tag } = params;
    const posts = await getPostsByTag(tag);

    return (
        <section className="p-4 container mx-auto max-w-screen-lg">
            <h1 className="text-3xl font-semibold mb-8">
                <Link
                    href="/blog"
                    className="flex items-center text-gray-800 hover:text-gray-900 transition-colors duration-300 mb-4 text-lg"
                >
                    <ArrowLeft className="mr-2" />
                    Blog
                </Link>
                Posts tagged with
                {' '}
                <span className="text-zinc-600">
                    {tag}
                </span>
            </h1>
            <div className="flex justify-end mb-4" />
            {posts.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
                    {posts.map((post, index) => (
                        <div
                            key={index}
                            className="p-6 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <Link href={`/blog/${post.slug}`} className="no-underline">
                                <h2 className="text-2xl font-bold mb-4 text-gray-800">{post.title}</h2>
                            </Link>
                            {/* Tag Listesi */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {post.tags?.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            {/* Description */}
                            <p className="text-gray-600 mb-6">
                                {post.description && post.description.length > 200
                                    ? `${post.description.slice(0, 200)}...`
                                    : post.description}
                            </p>
                            {/* Date and Read More */}
                            <div className="flex justify-between items-center">
                                <div className="flex items-center text-gray-500 text-sm">
                                    <Calendar className="mr-2" />
                                    <time>{post.date}</time>
                                </div>
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="flex items-center text-gray-700 hover:text-gray-800 transition-colors duration-300"
                                >
                                    Read more
                                    {' '}
                                    <ArrowRight className="ml-1" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600">
                    No posts found with the tag
                    {' '}
                    {tag}
                    .
                </p>
            )}
        </section>
    );
}
