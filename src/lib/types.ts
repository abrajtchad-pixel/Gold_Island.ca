export type Pair = "XAUUSD" | "XAUEUR" | "XAUXAF";

export type Quote = {
  pair: Pair;
  price: number; // quote currency per 1 XAU (for XAUUSD, XAUEUR, XAUXAF)
  asOf: string; // ISO time
  source: string;
};

export type QuotesResponse = {
  asOf: string;
  source: string;
  quotes: Record<Pair, Quote>;
  computed: {
    xauxaf_method: "via_usd" | "via_eur" | "unavailable";
  };
};
