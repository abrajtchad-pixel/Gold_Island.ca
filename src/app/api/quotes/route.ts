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
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
