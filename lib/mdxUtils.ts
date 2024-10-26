import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { visit } from 'unist-util-visit';
import { PostMeta } from '@/types/helper.types';

export interface Heading {
    text: string;
    level: number;
    id: string;
}

const articleRootDir = path.join(process.cwd(), 'app', 'content', 'articles');

const rootDir = (folderDir: string) => {
    const postRootDir = path.join(process.cwd(), 'app', 'content', folderDir);

    return postRootDir;
};

export const getPostSlugs = (): string[] => fs.readdirSync(articleRootDir).filter((file) => file.endsWith('.mdx'));

const extractHeadings = (content: string): Heading[] => {
    const headings: Heading[] = [];

    const tree = unified().use(remarkParse).parse(content);

    visit(tree, 'heading', (node: any) => {
        if (node.depth === 2) { // Only extract H2 headings
            const text = node.children
                .filter((child: any) => child.type === 'text' || child.type === 'inlineCode')
                .map((child: any) => child.value)
                .join('');
            const id = text
                .toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-');

            headings.push({
                text,
                level: node.depth,
                id,
            });
        }
    });

    return headings;
};

export const getPostBySlug = async (slug: string, folderDir: string): Promise<{ meta: PostMeta; content: any; headings: Heading[] }> => {
    const formattedSlug = slug.replace(/\.mdx?$/, '');

    const postRootDir = rootDir(folderDir);

    const filePath = path.join(postRootDir, `${formattedSlug}.mdx`);

    if (!fs.existsSync(filePath)) {
        throw new Error(`Post not found: ${filePath}`);
    }

    const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });

    const { data, content } = matter(fileContent);

    const meta: PostMeta = {
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        slug: formattedSlug,
        description: data.description,
        keywords: data.keywords,
        author: data.author,
        image: data.image,
        thumb: data.thumb,
        categories: data.categories,
        tags: data.tags,
        toc_depth: data.toc_depth,
    };

    const headings = extractHeadings(content);

    const compiledContent = await compileMDX({
        source: content,
        options: {
            mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings, rehypeHighlight],
            },
            parseFrontmatter: false,
        },
    });

    return { meta, content: compiledContent.content, headings };
};

export const getAllPosts = async (): Promise<PostMeta[]> => {
    const slugs = getPostSlugs();
    const posts: PostMeta[] = [];

    for (const slug of slugs) {
        const { meta } = await getPostBySlug(slug, 'articles');
        posts.push(meta);
    }

    // Sort posts by date in descending order
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
