export default function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 rounded-2xl border p-4 shadow-sm bg-zinc-50 dark:bg-zinc-900">
      {children}
    </div>
  );
}