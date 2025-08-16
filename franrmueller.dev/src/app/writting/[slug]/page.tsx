import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';

const ROOT = path.join(process.cwd(), 'content');

export function generateStaticParams() {
  const postsDir = path.join(ROOT, 'posts');
  const articlesDir = path.join(ROOT, 'articles');
  const slugs = [postsDir, articlesDir]
    .filter(fs.existsSync)
    .flatMap(dir => fs.readdirSync(dir).filter(f => f.endsWith('.mdx')).map(f => ({ slug: f.replace(/\.mdx?$/, '') })));
  return slugs;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const file = findFile(params.slug);
  if (!file) return {};
  const raw = fs.readFileSync(file, 'utf8');
  const { data } = matter(raw);
  return { title: data.title, description: data.excerpt ?? '' };
}

function findFile(slug: string) {
  const p1 = path.join(ROOT, 'posts', `${slug}.mdx`);
  const p2 = path.join(ROOT, 'articles', `${slug}.mdx`);
  if (fs.existsSync(p1)) return p1;
  if (fs.existsSync(p2)) return p2;
  return null;
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const file = findFile(params.slug);
  if (!file) return notFound();
  // MDX is compiled by Next automatically; we can just import it at runtime
  const Mdx = require(file).default; // evaluated at build time in Node
  return (
    <article className="prose dark:prose-invert prose-neutral max-w-none">
      <Mdx />
    </article>
  );
}