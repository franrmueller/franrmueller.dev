// src/app/writing/[slug]/page.tsx
import fs from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";

const ROOT = path.join(process.cwd(), "content");

type FrontMatter = {
  title: string;
  date: string;
  excerpt?: string;
  type?: "article" | "post";
};

function findFile(slug: string) {
  const p1 = path.join(ROOT, "posts", `${slug}.mdx`);
  const p2 = path.join(ROOT, "articles", `${slug}.mdx`);
  if (fs.existsSync(p1)) return p1;
  if (fs.existsSync(p2)) return p2;
  return null;
}

export async function generateStaticParams() {
  const dirs = [path.join(ROOT, "posts"), path.join(ROOT, "articles")].filter(fs.existsSync);
  return dirs.flatMap((dir) =>
    fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => ({ slug: f.replace(/\.mdx?$/, "") }))
  );
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const file = findFile(params.slug);
  if (!file) return {};
  const source = fs.readFileSync(file, "utf8");
  const { frontmatter } = await compileMDX<FrontMatter>({
    source,
    options: { parseFrontmatter: true },
  });
  return {
    title: frontmatter?.title ?? params.slug,
    description: frontmatter?.excerpt ?? "",
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const file = findFile(params.slug);
  if (!file) return notFound();

  const source = fs.readFileSync(file, "utf8");
  const { content } = await compileMDX<FrontMatter>({
    source,
    options: { parseFrontmatter: true },
  });

  return <article className="prose dark:prose-invert prose-neutral max-w-none">{content}</article>;
}
