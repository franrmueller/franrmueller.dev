import Link from "next/link";
import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";

export default function HomePage() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <section>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600 }}>I’m Fran.</h1>
        <p>
          I work in SAP cloud infra, data analytics, and finance. This is where I share
          articles, notes, and what I’m reading.
        </p>
      </div>

      <div>
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>Latest writing</h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {posts.map((p) => (
            <li key={p._id} style={{ marginBottom: 12 }}>
              <time style={{ fontSize: 12, color: "#6b7280" }}>
                {new Date(p.date).toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })}
              </time>
              {" – "}
              <Link href={p.url} style={{ textDecoration: "underline" }}>
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
