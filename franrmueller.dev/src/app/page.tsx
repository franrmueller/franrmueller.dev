// src/app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <section className="space-y-8">
      {/* Hero */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-neutral-dark">
          Hi, I’m Fran.
        </h1>
        <p className="text-neutral-gray">
          I write about web development, AI, and the books I’m reading.
        </p>
      </div>

      {/* Latest Articles */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-neutral-dark">
          Latest Articles
        </h2>
        <ul className="list-none space-y-2">
          {/* Replace with dynamic content later */}
          <li>
            <Link
              href="/articles/sample-post"
              className="text-accent hover:underline"
            >
              Sample Post Title
            </Link>
            <span className="ml-2 text-sm text-neutral-gray">Aug 2025</span>
          </li>
          <li>
            <Link
              href="/articles/another-post"
              className="text-accent hover:underline"
            >
              Another Post
            </Link>
            <span className="ml-2 text-sm text-neutral-gray">Jul 2025</span>
          </li>
        </ul>
        <Link
          href="/articles"
          className="text-sm font-medium text-accent hover:underline"
        >
          → All articles
        </Link>
      </div>

      {/* Reading Section */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-neutral-dark">
          Currently Reading
        </h2>
        <ul className="list-none space-y-2">
          <li>
            <span className="font-medium">The Pragmatic Programmer</span>{" "}
            <span className="text-neutral-gray">– Andrew Hunt & David Thomas</span>
          </li>
          <li>
            <span className="font-medium">Deep Learning</span>{" "}
            <span className="text-neutral-gray">– Ian Goodfellow</span>
          </li>
        </ul>
        <Link
          href="/reading"
          className="text-sm font-medium text-accent hover:underline"
        >
          → Reading log
        </Link>
      </div>
    </section>
  );
}