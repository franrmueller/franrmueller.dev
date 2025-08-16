import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const ARTICLES_DIR = path.join(process.cwd(), 'content', 'articles');

export type ArticleMeta = {
  title: string;
  date?: string;
  description?: string;
  tags?: string[];
};

export type Article = {
  slug: string;
  meta: ArticleMeta;
  content: string; // raw MDX
};

export function getAllArticles(): Article[] {
  const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.mdx'));
  const articles = files.map(file => {
    const slug = file.replace(/\.mdx$/, '');
    const full = path.join(ARTICLES_DIR, file);
    const raw = fs.readFileSync(full, 'utf8');
    const { data, content } = matter(raw);
    return {
      slug,
      meta: {
        title: data.title ?? slug,
        date: data.date ?? null,
        description: data.description ?? '',
        tags: data.tags ?? [],
      },
      content,
    } as Article;
  });

  // sort newest first if dates exist
  articles.sort((a, b) => (b.meta.date ?? '').localeCompare(a.meta.date ?? ''));
  return articles;
}

export function getArticleBySlug(slug: string): Article | null {
  const full = path.join(ARTICLES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(full)) return null;
  const raw = fs.readFileSync(full, 'utf8');
  const { data, content } = matter(raw);
  return {
    slug,
    meta: {
      title: data.title ?? slug,
      date: data.date ?? null,
      description: data.description ?? '',
      tags: data.tags ?? [],
    },
    content,
  };
}
