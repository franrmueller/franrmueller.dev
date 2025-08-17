import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reading",
  description: "Books, articles, and highlights I’m reading.",
};

export default function ReadingPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold">Reading</h1>
      <p className="mt-4 text-neutral-600">Coming soon.</p>
    </main>
  );
}