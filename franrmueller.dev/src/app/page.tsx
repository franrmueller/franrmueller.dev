// src/app/page.tsx
import Link from "next/link";

type Item = { title: string; slug: string; date?: string; excerpt?: string };

const ARTICLES: Item[] = [
  // { title: "My favorite papers", slug: "my-favorite-papers", date: "2024-10-02", excerpt: "A few I keep coming back to." },
];

const POSTS: Item[] = [
  // { title: "Writing more often", slug: "writing-more-often", date: "2025-06-26", excerpt: "Tiny habits that help." },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-2xl space-y-10">
      {/* Intro */}
      <section className="prose dark:prose-invert prose-neutral max-w-none">
        <p className="text-lg">
          Hi <a href="https://twitter.com/yourhandle" target="_blank">Lara</a>.
        </p>
        <p>You smell pretty good</p>
        <p>
          This is where I share my <Link href="/writing">articles</Link>, thoughts, and current{" "}
          <Link href="/reading">readings</Link>.
        </p>
      </section>

      {/* Articles */}
      <section>
        <h2 className="mb-3 text-sm font-semibold tracking-wide text-neutral-500">Articles</h2>
        {ARTICLES.length === 0 ? (
          <p className="text-sm text-neutral-500">Coming soon.</p>
        ) : (
          <ul className="space-y-4">
            {ARTICLES.map((a) => (
              <li key={a.slug} className="group">
                <Link
                  href={`/writing/${a.slug}`}
                  className="text-base font-medium group-hover:underline underline-offset-4"
                >
                  {a.title}
                </Link>
                {a.date && (
                  <div className="text-sm text-neutral-500">
                    {new Date(a.date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                )}
                {a.excerpt && (
                  <p className="text-sm text-neutral-700 dark:text-neutral-300">{a.excerpt}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Posts */}
      <section>
        <h2 className="mb-3 text-sm font-semibold tracking-wide text-neutral-500">Posts</h2>
        {POSTS.length === 0 ? (
          <p className="text-sm text-neutral-500">Nothing here yet.</p>
        ) : (
          <ul className="space-y-3">
            {POSTS.map((p) => (
              <li key={p.slug} className="group">
                <Link href={`/writing/${p.slug}`} className="group-hover:underline underline-offset-4">
                  {p.title}
                </Link>
                {p.date && (
                  <span className="ml-2 text-sm text-neutral-500">
                    {new Date(p.date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                )}
                {p.excerpt && (
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">{p.excerpt}</div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Reading (static for now) */}
      <section>
        <h2 className="mb-3 text-sm font-semibold tracking-wide text-neutral-500">Reading</h2>
        <ul className="list-disc pl-5 text-sm">
          <li>War and Peace — ★★★★☆</li>
          <li>Who Rules the World? — ★★★★☆</li>
        </ul>
      </section>
    </div>
  );
}