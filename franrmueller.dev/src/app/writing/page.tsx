import Link from "next/link";

// TODO: replace this with your MDX loader later
const posts = [
  { slug: "sample-post", title: "Sample Post Title", date: "2025-08-01" },
  { slug: "another-post", title: "Another Post", date: "2025-07-15" },
];

export default function WritingPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold text-neutral-dark">Writing</h1>
      <ul className="list-none space-y-4">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link href={`/writing/${p.slug}`} className="text-accent hover:underline">
              {p.title}
            </Link>
            <span className="ml-2 text-sm text-neutral-gray">
              {new Date(p.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}