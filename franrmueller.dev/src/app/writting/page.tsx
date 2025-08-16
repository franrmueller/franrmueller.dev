import Link from 'next/link';
import { getAllMeta } from '@/lib/content';

export default function Writing() {
  const all = getAllMeta();
  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold">Writing</h1>
      <ul className="space-y-3">
        {all.map(p => (
          <li key={p.slug}>
            <Link href={`/writing/${p.slug}`} className="hover:underline underline-offset-4">{p.title}</Link>
            <span className="ml-2 text-sm text-neutral-500">
              {new Date(p.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}