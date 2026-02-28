import { PriceCard } from "@/components/PriceCard";
import { QuotesResponse } from "@/lib/types";

async function getQuotes(): Promise<QuotesResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/quotes`, {
    cache: "no-store"
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Failed to load quotes: ${text}`);
  }
  return res.json();
}

export default async function DashboardPage() {
  const data = await getQuotes();

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900/40 to-zinc-950 p-6">
        <h1 className="text-2xl font-semibold tracking-tight">Live Gold Dashboard</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Pairs: XAU/USD, XAU/EUR, XAU/XAF (computed). Source: {data.source}.
        </p>
        <p className="mt-1 text-xs text-zinc-500">
          Last updated: {data.asOf} • XAU/XAF method: {data.computed.xauxaf_method}
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <PriceCard title="Gold Spot" quote={data.quotes.XAUUSD} quoteCurrency="USD / XAU" />
        <PriceCard title="Gold Spot" quote={data.quotes.XAUEUR} quoteCurrency="EUR / XAU" />
        <PriceCard title="Gold Spot" quote={data.quotes.XAUXAF} quoteCurrency="XAF / XAU" />
      </section>

      <section className="rounded-xl border border-zinc-800 bg-zinc-900/20 p-4 text-sm text-zinc-300">
        <div className="font-medium">Next step (optional)</div>
        <div className="mt-1 text-zinc-400">
          Add historical candles (1D/1W/1M) and compute % change. Right now this MVP focuses on
          reliable live quotes + chart page scaffolding.
        </div>
      </section>
    </div>
  );
}