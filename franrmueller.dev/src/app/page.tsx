import Link from 'next/link';
import { getAllMeta } from '@/lib/content';

export default function Home() {
  const meta = getAllMeta();
  const articles = meta.filter(m => m.type === 'article').slice(0, 3);
  const posts = meta.filter(m => m.type === 'post').slice(0, 3);

  return (
    <div className="space-y-10">
      {/* Intro (mirrors ordep.dev’s simple opening) */}
      <section className="prose dark:prose-invert prose-neutral max-w-none">
        <p className="text-lg">I’m <a href="https://twitter.com/yourhandle" target="_blank">@yourhandle</a>.</p>
        <p>I like distributed systems, databases, and programming languages.</p>
        <p>
          This is where I share my <Link href="/writing">articles</Link>, thoughts, and current{' '}
          <Link href="/reading">readings</Link>.
        </p>
      </section>

      {/* Longer articles */}
      <section>
        <h2 className="mb-3 text-sm uppercase tracking-wide text-neutral-500">Articles</h2>
        <ul className="space-y-4">
          {articles.map(a => (
            <li key={a.slug} className="group">
              <Link href={`/writing/${a.slug}`} className="text-base font-medium group-hover:underline underline-offset-4">
                {a.title}
              </Link>
              <div className="text-sm text-neutral-500">
                {new Date(a.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              {a.excerpt && <p className="text-sm text-neutral-700 dark:text-neutral-300">{a.excerpt}</p>}
            </li>
          ))}
        </ul>
      </section>

      {/* Shorter posts */}
      <section>
        <h2 className="mb-3 text-sm uppercase tracking-wide text-neutral-500">Posts</h2>
        <ul className="space-y-3">
          {posts.map(p => (
            <li key={p.slug} className="group">
              <Link href={`/writing/${p.slug}`} className="group-hover:underline underline-offset-4">
                {p.title}
              </Link>
              <span className="ml-2 text-sm text-neutral-500">
                {new Date(p.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
              </span>
              {p.excerpt && <div className="text-sm text-neutral-600 dark:text-neutral-400">{p.excerpt}</div>}
            </li>
          ))}
        </ul>
      </section>

      {/* Reading teaser (static for now) */}
      <section>
        <h2 className="mb-3 text-sm uppercase tracking-wide text-neutral-500">Reading</h2>
        <ul className="space-y-1 text-sm">
          <li>War and Peace — ★★★★☆</li>
          <li>Who Rules the World? — ★★★★☆</li>
        </ul>
      </section>
    </div>
  );
}