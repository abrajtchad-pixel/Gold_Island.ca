import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gold Island",
  description: "Real-time gold market data: XAU/USD, XAU/EUR, XAU/XAF"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-950 text-zinc-100">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <header className="flex items-center justify-between gap-4">
            <div>
              <div className="text-xl font-semibold tracking-tight">Gold Island</div>
              <div className="text-sm text-zinc-400">
                Live gold price charts (refreshes every 60s)
              </div>
            </div>

            <nav className="flex items-center gap-4 text-sm">
              <a className="text-zinc-200 hover:text-white" href="/">Dashboard</a>
              <a className="text-zinc-200 hover:text-white" href="/charts">Charts</a>
              <a className="text-zinc-200 hover:text-white" href="/about">About</a>
            </nav>
          </header>

          <main className="py-6">{children}</main>

          <footer className="border-t border-zinc-800 pt-4 text-xs text-zinc-400">
            <p>
              Data is provided for informational purposes only. Not investment advice.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
