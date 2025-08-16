// src/app/writing/[slug]/page.tsx
import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { useMDXComponent } from "../../lib/mdx";

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = allPosts.find(
    p => p._raw.flattenedPath.replace(/^posts\//, '') === params.slug
  );
  if (!post) notFound();

  const MDX = useMDXComponent(post.body.code);
  return (
    <article style={{ maxWidth: 720, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, fontWeight: 600 }}>{post.title}</h1>
      <time style={{ fontSize: 12, color: "#6b7280" }}>
        {new Date(post.date).toLocaleDateString("en-GB")}
      </time>
      <div style={{ marginTop: 24 }}>
        <MDX />
      </div>
    </article>
  );
}
