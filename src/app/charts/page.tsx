"use client";

import { useEffect, useMemo, useState } from "react";
import { LineChart } from "@/components/LineChart";
import type { Pair, QuotesResponse } from "@/lib/types";

type Point = { time: number; value: number };

const PAIRS: { pair: Pair; label: string }[] = [
  { pair: "XAUUSD", label: "XAU / USD" },
  { pair: "XAUEUR", label: "XAU / EUR" },
  { pair: "XAUXAF", label: "XAU / XAF" }
];

const PAIR_KEYS = PAIRS.map(p => p.pair);

export default function ChartsPage() {
  const [pair, setPair] = useState<Pair>("XAUUSD");
  const [points, setPoints] = useState<Record<Pair, Point[]>>({
    XAUUSD: [],
    XAUEUR: [],
    XAUXAF: []
  });
  const [status, setStatus] = useState<{ asOf?: string; source?: string; error?: string }>({});

  useEffect(() => {
    let cancelled = false;

    async function tick() {
      try {
        setStatus(s => ({ ...s, error: undefined }));
        const res = await fetch("/api/quotes", { cache: "no-store" });
        const data = (await res.json()) as QuotesResponse;

        if (!res.ok) throw new Error((data as any)?.error || "Failed to fetch");

        const now = Math.floor(Date.now() / 1000);

        if (cancelled) return;

        setStatus({ asOf: data.asOf, source: data.source });

        setPoints(prev => {
          const next = { ...prev };
          for (const p of PAIR_KEYS) {
            const v = data.quotes[p].price;
            const arr = [...next[p], { time: now, value: v }];

            // keep last ~6 hours @ 60s = 360 points
            next[p] = arr.slice(-360);
          }
          return next;
        });
      } catch (e: any) {
        if (!cancelled) setStatus({ error: e?.message || "Unknown error" });
      }
    }

    // initial load + interval
    tick();
    const id = setInterval(tick, 60_000);

    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  const chartData = useMemo(() => {
    return (points[pair] || []).map(p => ({
      time: p.time as any,
      value: p.value
    }));
  }, [pair, points]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 rounded-xl border border-zinc-800 bg-zinc-900/30 p-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold">Charts</h2>
          <div className="text-xs text-zinc-400">
            Refresh: 60s • Source: {status.source || "—"} • As of: {status.asOf || "—"}
          </div>
          {status.error ? (
            <div className="mt-2 text-xs text-red-300">Error: {status.error}</div>
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs text-zinc-400">Pair</label>
          <select
            className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm"
            value={pair}
            onChange={e => setPair(e.target.value as Pair)}
          >
            {PAIRS.map(p => (
              <option key={p.pair} value={p.pair}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/20 p-4">
        <LineChart data={chartData} />
      </div>

      <div className="text-xs text-zinc-500">
        This chart is built from live polling (free-tier friendly). If you want true historical
        candles + timeframes, we can add a server-side cache + historical endpoint (provider-dependent).
      </div>
    </div>
  );
}
