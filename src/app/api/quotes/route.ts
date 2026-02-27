import { NextResponse } from "next/server";
import { fetchQuotes } from "@/lib/quotes";

export async function GET() {
  try {
    const data = await fetchQuotes();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "no-store"
      }
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
