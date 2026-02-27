import { QuotesResponse } from "@/lib/types";
import { fetchQuotesMetalsDev } from "@/lib/providers/metalsdev";

export async function fetchQuotes(): Promise<QuotesResponse> {
  const provider = (process.env.METALS_PROVIDER || "metalsdev").toLowerCase();

  switch (provider) {
    case "metalsdev":
      return fetchQuotesMetalsDev();
    default:
      throw new Error(`Unsupported provider: ${provider}`);
  }
}
