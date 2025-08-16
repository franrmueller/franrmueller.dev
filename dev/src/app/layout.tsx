import "./globals.css";         // already exists in your screenshot
import Nav from "../components/Nav";

export const metadata = {
  title: "Your Name",
  description: "I like distributed systems, data, and finance.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{
        margin: "0 auto",
        maxWidth: 720,
        padding: "0 24px",
        lineHeight: 1.6,
        fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial"
      }}>
        <Nav />
        <main style={{ padding: "8px 0" }}>{children}</main>
        <footer style={{ padding: "40px 0", fontSize: 14, color: "#6b7280" }}>
          © {new Date().getFullYear()} You
        </footer>
      </body>
    </html>
  );
}
