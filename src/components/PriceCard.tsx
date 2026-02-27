import { Quote } from "@/lib/types";
import { formatNumber } from "@/lib/format";

export function PriceCard({
  title,
  quote,
  quoteCurrency
}: {
  title: string;
  quote: Quote;
  quoteCurrency: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm text-zinc-400">{title}</div>
          <div className="mt-1 text-2xl font-semibold">
            {formatNumber(quote.price)}{" "}
            <span className="text-sm text-zinc-400">{quoteCurrency}</span>
          </div>
        </div>
        <div className="rounded-lg bg-gold-500/10 px-2 py-1 text-xs text-gold-200">
          {quote.pair}
        </div>
      </div>
      <div className="mt-3 text-xs text-zinc-500">As of: {quote.asOf}</div>
    </div>
  );
}
