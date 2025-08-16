import Link from "next/link";

const nav = [
  { href: "/writing", label: "Writing" },
  { href: "/reading", label: "Reading" },
];

export default function Nav() {
  return (
    <header style={{ padding: "24px 0" }}>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 14,
        }}
      >
        {/* Left side: homepage link (your name/logo) */}
        <Link href="/" style={{ fontWeight: 600, fontSize: 16 }}>
          Fran
        </Link>

        {/* Right side: nav items */}
        <div style={{ display: "flex", gap: 16 }}>
          {nav.map((i) => (
            <Link key={i.href} href={i.href}>
              {i.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
