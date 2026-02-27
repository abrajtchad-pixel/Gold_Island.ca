import { QuotesResponse } from "@/lib/types";

/**
 * metals.dev returns rates in a base/quote style. We'll fetch what we need and normalize into:
 * - XAUUSD = USD per 1 XAU
 * - XAUEUR = EUR per 1 XAU
 * - XAUXAF computed via USD/XAF (or EUR/XAF fallback)
 *
 * NOTE: Endpoints and response shapes can vary by provider plan.
 * If your key returns a slightly different shape, tell me what you see and I'll adjust.
 */

interface MetalsDevResponse {
  rates?: Record<string, number>;
  date?: string;
  timestamp?: string;
}
export async function fetchQuotesMetalsDev(): Promise<QuotesResponse> {
  const apiKey = process.env.METALS_DEV_API_KEY;
  if (!apiKey) {
    throw new Error("Missing METALS_DEV_API_KEY");
  }

  // We'll call a single endpoint if possible; otherwise multiple calls.
  // Using a generic pattern: latest?api_key=...&base=...&symbols=...
  const baseUrl = "https://api.metals.dev/v1";

  async function latest(base: string, symbols: string[]) {
    const url = new URL(`${baseUrl}/latest`);
    url.searchParams.set("api_key", apiKey!);
    url.searchParams.set("base", base);
    url.searchParams.set("symbols", symbols.join(","));

    const res = await fetch(url.toString(), { cache: "no-store" });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`metals.dev latest failed (${res.status}): ${text}`);
    }
    return res.json() as Promise<MetalsDevResponse>;
  }

  // 1) XAU -> USD, EUR
  const xau = await latest("XAU", ["USD", "EUR"]);
  // Expecting: { rates: { USD: number, EUR: number }, timestamp/date... }
  const xauUsd: number | undefined = xau?.rates?.USD;
  const xauEur: number | undefined = xau?.rates?.EUR;

  // 2) USD -> XAF and EUR -> XAF (for conversion)
  const usd = await latest("USD", ["XAF"]);
  const eur = await latest("EUR", ["XAF"]);
  const usdXaf: number | undefined = usd?.rates?.XAF; // XAF per 1 USD
  const eurXaf: number | undefined = eur?.rates?.XAF; // XAF per 1 EUR

  const asOf: string =
    xau?.date ??
    xau?.timestamp ??
    usd?.date ??
    usd?.timestamp ??
    new Date().toISOString();

  const source = "metals.dev";

  if (typeof xauUsd !== "number" || typeof xauEur !== "number") {
    throw new Error("Unexpected metals.dev response: missing XAU rates for USD/EUR");
  }

  // Compute XAU/XAF:
  // XAU/XAF (XAF per 1 XAU) = (USD per 1 XAU) * (XAF per 1 USD)
  let xauXaf: number | null = null;
  let method: "via_usd" | "via_eur" | "unavailable" = "unavailable";

  if (typeof usdXaf === "number") {
    xauXaf = xauUsd * usdXaf;
    method = "via_usd";
  } else if (typeof eurXaf === "number") {
    xauXaf = xauEur * eurXaf;
    method = "via_eur";
  }

  if (xauXaf === null) {
    // Still return USD/EUR; mark XAF unavailable
    xauXaf = NaN;
  }

  return {
    asOf: new Date(asOf).toISOString(),
    source,
    quotes: {
      XAUUSD: { pair: "XAUUSD", price: xauUsd, asOf: new Date(asOf).toISOString(), source },
      XAUEUR: { pair: "XAUEUR", price: xauEur, asOf: new Date(asOf).toISOString(), source },
      XAUXAF: { pair: "XAUXAF", price: xauXaf, asOf: new Date(asOf).toISOString(), source }
    },
    computed: { xauxaf_method: method }
  };
}
