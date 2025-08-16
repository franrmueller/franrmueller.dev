import type { Metadata } from "next";
import Link from "next/link";
import { Home } from "lucide-react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "franrmueller.dev",
    template: "%s · franrmueller.dev",
  },
  description: "Writing and a public reading log by Fran R. Müller.",
  metadataBase: new URL("https://franrmueller.dev"),
};

function Nav() {
  const links = [
    { href: "/writing", label: "Writing" },
    { href: "/reading", label: "Reading" },
  ];

  return (
    <header className="border-b border-neutral-gray/20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <nav className="flex items-center justify-between py-6" aria-label="Primary">
          <Link
            href="/"
            className="flex items-center text-neutral-dark hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent rounded"
          >
            <Home size={20} strokeWidth={2} aria-label="Home" />
          </Link>

          <ul className="flex items-center gap-5 text-sm">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-neutral-dark/80 hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent rounded"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-16 border-t border-neutral-gray/20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-8 text-sm text-neutral-gray">
        © {new Date().getFullYear()} Fran R. Müller
      </div>
    </footer>
  );
}

// 👇 THIS must be the default export, and it must return JSX
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-neutral-light text-neutral-dark antialiased">
        <Nav />
        <main className="mx-auto max-w-2xl px-4 sm:px-6 py-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}