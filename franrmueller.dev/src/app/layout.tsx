import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 antialiased">
        <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-neutral-950/60">
          <nav className="mx-auto max-w-2xl px-4 py-3 text-sm">
            <Link href="/" className="font-medium"></Link>
          </nav>
        </header>
        <main className="mx-auto max-w-2xl px-4 py-10">{children}</main>
        <footer className="mx-auto max-w-2xl px-4 py-12 text-sm text-neutral-500">
          © {new Date().getFullYear()} Your Name
        </footer>
      </body>
    </html>
  );
}