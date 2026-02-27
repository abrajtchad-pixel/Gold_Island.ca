export default function AboutPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">About Gold Island</h1>
      <p className="text-sm text-zinc-300">
        Gold Island provides live market quotes for XAU/USD and XAU/EUR, and computes XAU/XAF using FX
        conversion. Quotes refresh every 60 seconds.
      </p>
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/20 p-4 text-sm text-zinc-300">
        <div className="font-medium">Disclaimer</div>
        <p className="mt-2 text-zinc-400">
          Data may be delayed or inaccurate. This site is for informational purposes only and does
          not constitute financial advice.
        </p>
      </div>
    </div>
  );
}
