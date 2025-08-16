import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Your Name',
  description: 'Personal blog',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <body className="antialiased">
        <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-neutral-950/60">
          <nav className="mx-auto max-w-2xl px-4 py-3 flex items-center gap-4 text-sm">
            <Link href="/" className="font-medium">ordep.dev-ish</Link>
            <div className="ml-auto flex gap-4">
              <Link href="/writing" className="hover:underline underline-offset-4">Writing</Link>
              <Link href="/reading" className="hover:underline underline-offset-4">Reading</Link>
              <Link href="/about" className="hover:underline underline-offset-4">About</Link>
            </div>
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