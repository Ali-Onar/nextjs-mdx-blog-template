export type PostMeta = {
    title: string;
    date: string;
    excerpt: string;
    slug: string;
    description?: string;
    author?: string;
    image?: string;
    thumb?: string;
    categories?: string[];
    tags?: string[];
    keywords?: string[];
    toc_depth?: number;
};