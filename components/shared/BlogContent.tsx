'use client';

import { Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious } from '@/components/ui/pagination';
import { longMonthFormatDate } from '@/lib/helpers';
import { PostMeta } from '@/types/helper.types';
import { ArrowRight, Calendar } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

export interface BlogContentProps {
    posts: PostMeta[];
}

const POSTS_PER_PAGE = 10;

const BlogContent = (props: BlogContentProps) => {
    const { posts } = props;

    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
    const currentPosts = posts.slice(
        (currentPage - 1) * POSTS_PER_PAGE,
        currentPage * POSTS_PER_PAGE,
    );

    return (
        <>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
                {currentPosts?.map((post, index) => (
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
                                <time>{longMonthFormatDate(post.date)}</time>
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
            <div className="mt-8">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                            />
                        </PaginationItem>
                        {[...Array(totalPages)].map((_, index) => (
                            <PaginationItem key={index} className="cursor-pointer">
                                <PaginationLink
                                    onClick={() => setCurrentPage(index + 1)}
                                    isActive={currentPage === index + 1}
                                >
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </>
    );
};

export default BlogContent;
