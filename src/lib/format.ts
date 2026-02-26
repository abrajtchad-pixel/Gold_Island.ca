// Cache the formatter instance so it is not recreated on every call.
const formatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });

export function formatNumber(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return formatter.format(n);
}
