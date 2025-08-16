import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

type Kind = 'article' | 'post';

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  type: Kind;
};

const ROOT = path.join(process.cwd(), 'content');

function readDir(kind: Kind) {
  const dir = path.join(ROOT, kind === 'article' ? 'articles' : 'posts');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));
}

export function getAllMeta(): PostMeta[] {
  const all = (['article', 'post'] as Kind[]).flatMap(kind =>
    readDir(kind).map(file => {
      const filePath = path.join(ROOT, kind === 'article' ? 'articles' : 'posts', file);
      const raw = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(raw);
      return {
        slug: file.replace(/\.mdx?$/, ''),
        title: data.title as string,
        date: data.date as string,
        excerpt: data.excerpt as string | undefined,
        type: kind,
      } satisfies PostMeta;
    })
  );
  
  return all.sort((a, b) => +new Date(b.date) - +new Date(a.date));
}