import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import type { PluggableList } from 'unified';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

import { getAllArticles, getArticleBySlug } from '@/lib/content';
import Callout from '@/components/Callout';

type Params = { slug: string };
type Props = { params: Promise<Params> };

export async function generateStaticParams(): Promise<Params[]> {
  const articles = getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;               // 👈 await the promised params
  const post = getArticleBySlug(slug);
  if (!post) return {};

  return {
    title: post.meta.title,
    description: post.meta.description || undefined,
    openGraph: {
      title: post.meta.title,
      description: post.meta.description || undefined,
      type: 'article',
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;               // 👈 await the promised params
  const post = getArticleBySlug(slug);
  if (!post) {
    notFound();                                // throws; no need to `return`
  }

  const remarkPlugins: PluggableList = [remarkGfm];
  const rehypePlugins: PluggableList = [
    rehypeSlug,
    [rehypeAutolinkHeadings, { behavior: 'wrap' as const }],
  ];

  return (
    <article
      className="prose prose-zinc max-w-3xl mx-auto
                 dark:prose-invert prose-headings:font-semibold
                 prose-a:underline hover:prose-a:no-underline
                 prose-img:rounded-xl"
    >
      <h1>{post.meta.title}</h1>
      {post.meta.date && (
        <p>
          <em>{post.meta.date}</em>
        </p>
      )}
      <MDXRemote
        source={post.content}
        options={{
          mdxOptions: {
            remarkPlugins,
            rehypePlugins,
          },
        }}
        components={{ Callout }}
      />
    </article>
  );
}