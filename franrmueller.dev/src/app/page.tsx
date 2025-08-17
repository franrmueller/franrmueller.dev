import Link from "next/link";
import Hero from "@/components/Hero";

type PostCard = {
  id: string;
  title: string;
  dek?: string;
  date: string;      // display string like "Aug 2025"
  readTime: string;  // e.g. "6 min"
  href: string;
};

type BookRow = {
  id: string;
  title: string;
  author: string;
  status: "Reading" | "Queued";
};

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <Hero />
      <WritingSection />
      <ReadingSection />
    </main>
  );
}

function WritingSection() {
  const posts: PostCard[] = [
    {
      id: "a1",
      title: "Sample Post Title",
      dek: "Short summary explaining the value in one sentence.",
      date: "Aug 2025",
      readTime: "6 min",
      href: "/writing/sample-post",
    },
    {
      id: "a2",
      title: "Another Post",
      dek: "On building pragmatic systems and when to skip frameworks.",
      date: "Jul 2025",
      readTime: "5 min",
      href: "/writing/another-post",
    },
  ];

  return (
    <section id="writing" aria-labelledby="writing-heading" className="py-10 sm:py-12">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <h2 id="writing-heading" className="text-2xl sm:text-3xl font-bold">Writing</h2>
        <Link
          href="/writing"
          className="text-sm inline-flex items-center gap-1 opacity-80 hover:opacity-100"
          aria-label="All writing"
        >
          All writing →
        </Link>
      </div>

      <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {posts.map((p) => (
          <li key={p.id}>
            <Link
              href={p.href}
              className="group block h-full rounded-2xl border border-border p-5 hover:bg-accent/40 transition"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <time>{p.date}</time>
                  <span aria-hidden>•</span>
                  <span>{p.readTime}</span>
                </div>
                <h3 className="text-lg font-semibold group-hover:underline underline-offset-4">
                  {p.title}
                </h3>
                {p.dek && <p className="text-sm text-muted-foreground line-clamp-2">{p.dek}</p>}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ReadingSection() {
  const books: BookRow[] = [
    { id: "b1", title: "The Pragmatic Programmer", author: "Andrew Hunt & David Thomas", status: "Reading" },
    { id: "b2", title: "Deep Learning", author: "Ian Goodfellow", status: "Queued" },
  ];

  return (
    <section id="reading" aria-labelledby="reading-heading" className="py-10 sm:py-12">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <h2 id="reading-heading" className="text-2xl sm:text-3xl font-bold">Reading</h2>
        <Link
          href="/reading"
          className="text-sm inline-flex items-center gap-1 opacity-80 hover:opacity-100"
          aria-label="Reading log"
        >
          Reading log →
        </Link>
      </div>

      <ul className="mt-6 space-y-3">
        {books.map((b) => (
          <li key={b.id} className="rounded-2xl border border-border p-4 flex items-center justify-between">
            <div>
              <div className="font-medium">{b.title}</div>
              <div className="text-sm text-muted-foreground">{b.author}</div>
            </div>
            <span className="text-xs rounded-full px-2 py-0.5 border opacity-80">{b.status}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}