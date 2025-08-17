import Link from "next/link";

type WritingLink = {
  id: string;
  title: string;
  href: string;
  date?: string;      // e.g. "August 17, 2021"
  blurb?: string;     // short one-liner
};

type BookLink = {
  id: string;
  title: string;
  author: string;
  href?: string;
  meta?: string;      // year or note
  rating?: number;    // 0–4 stars
};

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-6 sm:px-8">
      <IntroHeader />
      <IntroColumns />
    </main>
  );
}

/** ordep-style top section (wave, handle link, big sentence, paragraph) */
function IntroHeader() {
  return (
    <section className="pt-16 sm:pt-20">
      <p className="text-2xl sm:text-3xl tracking-tight text-foreground/90">
        <span className="mr-2">👋</span>
        I&apos;m{" "}
        <Link href="/about" className="underline decoration-2 underline-offset-4 hover:opacity-80">
          @yourhandle
        </Link>.
      </p>

      <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight tracking-tight text-indigo-900 dark:text-indigo-200">
        I like distributed systems, databases,
        <br className="hidden sm:block" />
        and programming languages.
      </h1>

      <p className="mt-6 max-w-3xl text-lg leading-8 text-foreground/80">
        This website is where I share my{" "}
        <Link href="/writing" className="underline underline-offset-4">articles</Link>,{" "}
        <Link href="/thoughts" className="underline underline-offset-4">thoughts</Link>, and current{" "}
        <Link href="/reading" className="underline underline-offset-4">readings</Link>. I&apos;m reviving
        my online presence. Although I stopped{" "}
        <Link href="/writing" className="underline underline-offset-4">writing</Link> and giving{" "}
        <Link href="/talks" className="underline underline-offset-4">talks</Link> in 2021, I plan to write
        as often as possible from now on.
      </p>
    </section>
  );
}

/** Three-column lists like ordep.dev */
function IntroColumns() {
  const longPosts: WritingLink[] = [
    {
      id: "p0",
      title: "My favorite papers",
      href: "/writing/favorite-papers",
      date: "August 17, 2021",
      blurb: "A curated list of great computer science papers I keep re-reading.",
    },
    {
      id: "p1",
      title: "Tales from running Kafka Streams in Production",
      href: "/writing/kafka-streams-in-prod",
      date: "October 30, 2019",
      blurb: "Incidents we had at scale on Kubernetes and what we learned.",
    },
    {
      id: "p2",
      title: "Diving into Merkle Trees",
      href: "/writing/merkle-trees",
      date: "February 20, 2019",
      blurb: "What Merkle Trees are and why they’re useful for large sets.",
    },
  ];

  const shortPosts: WritingLink[] = [
    {
      id: "s0",
      title: "On the Edge of Competence",
      href: "/writing/edge-of-competence",
      date: "July 28, 2025",
      blurb: "Keep your circle of competence sharp without overconfidence.",
    },
    {
      id: "s1",
      title: "Writing Code Was Never The Bottleneck",
      href: "/writing/writing-was-not-the-bottleneck",
      date: "June 30, 2025",
      blurb: "LLMs help with code; judgment and review still matter.",
    },
    {
      id: "s2",
      title: "Writing More Often",
      href: "/writing/writing-more-often",
      date: "June 26, 2025",
      blurb: "Habits to publish more without lowering standards.",
    },
  ];

  const books: BookLink[] = [
    { id: "b0", title: "Brevíssima História de Portugal", author: "A.H. de Oliveira Marques", meta: "2018", rating: 3 },
    { id: "b1", title: "Guerra e Paz – Volume I", author: "Leo Tolstoy, 1867", rating: 4 },
    { id: "b2", title: "Who Rules the World?", author: "Noam Chomsky, 2014", rating: 4 },
  ];

  return (
    <section className="mt-16 sm:mt-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
        {/* Column 1 – longer articles */}
        <div>
          <p className="text-sm text-muted-foreground leading-6">
            Once in a while, I write longer articles that might be worth sharing
            on Hacker News. Mostly about distributed systems, and engineering
            challenges.
          </p>
          <ul className="mt-5 space-y-4">
            {longPosts.map((p) => (
              <li key={p.id}>
                <EntryLink href={p.href} title={p.title} />
                <EntryMeta date={p.date} blurb={p.blurb} />
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2 – shorter posts */}
        <div>
          <p className="text-sm text-muted-foreground leading-6">
            You’ll find mostly shorter posts that capture specific insights or
            experiences. Each one focuses on a single idea worth sharing.
          </p>
          <ul className="mt-5 space-y-4">
            {shortPosts.map((p) => (
              <li key={p.id}>
                <EntryLink href={p.href} title={p.title} />
                <EntryMeta date={p.date} blurb={p.blurb} />
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 – reading / books */}
        <div>
          <p className="text-sm text-muted-foreground leading-6">
            In the meantime, I make time to read some{" "}
            <Link href="/reading" className="underline">
              books
            </Link>
            . Some tech, some not, mostly non-fiction. No fancy reviews, just
            honest takes.
          </p>
          <ul className="mt-5 space-y-4">
            {books.map((b) => (
              <li key={b.id}>
                <EntryLink href={b.href ?? "/reading"} title={b.title} />
                <div className="mt-1 text-xs text-muted-foreground">
                  {b.author}{b.meta ? `, ${b.meta}` : ""}
                </div>
                {typeof b.rating === "number" && (
                  <div className="mt-1 text-sm" aria-label={`${b.rating} out of 4 stars`}>
                    {"★".repeat(b.rating)}
                    {"☆".repeat(Math.max(0, 4 - b.rating))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function EntryLink({ href, title }: { href: string; title: string }) {
  return (
    <Link href={href} className="text-[15px] leading-6 underline hover:opacity-90">
      {title}
    </Link>
  );
}

function EntryMeta({ date, blurb }: { date?: string; blurb?: string }) {
  return (
    <>
      {date && (
        <span className="ml-2 align-middle text-[11px] text-muted-foreground">
          {date}
        </span>
      )}
      {blurb && (
        <p className="mt-1 text-sm text-muted-foreground leading-6">
          {blurb}
        </p>
      )}
    </>
  );
}