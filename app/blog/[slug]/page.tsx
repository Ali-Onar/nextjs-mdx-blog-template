import { longMonthFormatDate } from '@/lib/helpers';
import Link from 'next/link';
import React from 'react';
import { ArrowLeft, Twitter, Linkedin } from 'lucide-react';
import { getPostBySlug } from '@/lib/mdxUtils';

type Props = {
    params: {
        slug: string;
    };
};

const getPageData = async (slug: string) => {
    const { meta, content, headings } = await getPostBySlug(slug, 'articles');

    return { meta, content, headings };
};

export async function generateMetadata({ params }: Props) {
    const { meta } = await getPageData(params.slug);

    return {
        title: meta.title,
        description: meta.description,
        keywords: meta.keywords,
        authors: { name: meta.author },
        openGraph: {
            title: meta.title,
            description: meta.description,
            type: 'article',
            url: meta.slug,
            images: [
                {
                    url: meta.image,
                    width: 1200,
                    height: 630,
                    alt: meta.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: meta.title,
            description: meta.description,
            images: [meta.image],
        },
    };
}

export default async function BlogSlugPage({ params }: Props) {
    const { meta, content, headings } = await getPageData(params.slug);

    return (
        <section className="p-4 mt-4 container mx-auto max-w-screen-2xl">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                {/* Left Section: Back Button */}
                <aside className="md:col-span-2 flex flex-col">
                    <Link
                        href="/blog"
                        className="flex items-center text-gray-800 hover:text-gray-900 transition-colors duration-300 mb-4 text-lg"
                    >
                        <ArrowLeft className="mr-2" />
                        Blog
                    </Link>
                </aside>

                {/* Middle Section: Content */}
                <main className="md:col-span-7">
                    <div className="prose max-w-none dark:text-white">
                        <h1 className="text-4xl font-bold">{meta.title}</h1>
                        <p className="text-gray-600">{longMonthFormatDate(meta.date)}</p>
                        {meta.author && (
                            <p className="text-gray-600">
                                <span className="font-semibold">{meta.author}</span>
                            </p>
                        )}

                        {content}
                    </div>
                </main>

                {/* Right Section */}
                <aside className="md:col-span-3 flex flex-col gap-6">
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            {meta.tags?.map((tag, index) => (
                                <Link href={`tags/${tag}`} key={index} className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full text-sm">
                                    {tag}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* On This Page: Headings */}
                    <div>
                        <h3 className="text-xl font-semibold mb-2">On this page</h3>
                        <ul className="list-disc list-inside space-y-2">
                            {headings.map((heading, index) => (
                                <li key={index} className={`ml-${(heading.level - 2) * 4}`}>
                                    <Link href={`#${heading.id}`} className="text-zinc-600 hover:underline">
                                        {heading.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Share This Article */}
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Share this article</h3>
                        <div className="flex gap-4">
                            {/* Twitter Share */}
                            <Link
                                href={`https://twitter.com/intent/tweet?text=${meta.title}&url=${process.env.NEXT_PUBLIC_APP_URL}/blog/${meta.slug}`}
                                target="_blank"
                                className="text-gray-800 hover:text-gray-900 transition-colors duration-300"
                            >
                                <Twitter size={24} />
                            </Link>
                            {/* LinkedIn Share */}
                            <Link
                                href={`https://www.linkedin.com/shareArticle?mini=true&url=${process.env.NEXT_PUBLIC_APP_URL}/blog/${meta.slug}&title=${meta.title}`}
                                target="_blank"
                                className="text-gray-800 hover:text-gray-900 transition-colors duration-300"
                            >
                                <Linkedin size={24} />
                            </Link>
                        </div>
                    </div>

                </aside>
            </div>
        </section>
    );
}
