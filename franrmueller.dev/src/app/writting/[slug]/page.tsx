import fs from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";

const ROOT = path.join(process.cwd(), "content");

type FM = {
  title: string;
  date: string;
  excerpt?: string;
  type?: "article" | "post";
};

function findFile(slug: string) {
  const posts = path.join(ROOT, "posts", `${slug}.mdx`);
  const articles = path.join(ROOT, "articles", `${slug}.mdx`);
  if (fs.existsSync(posts)) return posts;
  if (fs.existsSync(articles)) return articles;
  return null;
}

export async function generateStaticParams() {
  const dirs = [path.join(ROOT, "posts"), path.join(ROOT, "articles")].filter(fs.existsSync);
  const slugs = dirs.flatMap((dir) =>
    fs.readdirSync(dir).filter((f) => f.endsWith(".mdx")).map((f) => ({ slug: f.replace(/\.mdx?$/, "") }))
  );
  return slugs;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const file = findFile(params.slug);
  if (!file) return {};
  const source = fs.readFileSync(file, "utf8");
  const { frontmatter } = await compileMDX<FM>({ source, options: { parseFrontmatter: true } });
  return {
    title: frontmatter?.title ?? params.slug,
    description: frontmatter?.excerpt ?? "",
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const file = findFile(params.slug);
  if (!file) return notFound();

  const source = fs.readFileSync(file, "utf8");
  const { content } = await compileMDX<FM>({
    source,
    options: { parseFrontmatter: true },
  });

  return <article className="prose dark:prose-invert prose-neutral max-w-none">{content}</article>;
}