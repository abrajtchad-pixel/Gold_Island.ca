"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  ColorType,
  createChart,
  IChartApi,
  ISeriesApi,
  LineData
} from "lightweight-charts";

export function LineChart({
  data,
  height = 360
}: {
  data: LineData[];
  height?: number;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Line"> | null>(null);

  const sanitized = useMemo(() => data.filter(d => typeof d.value === "number"), [data]);

  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      height,
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "#d4d4d8"
      },
      grid: {
        vertLines: { color: "rgba(63,63,70,0.5)" },
        horzLines: { color: "rgba(63,63,70,0.5)" }
      },
      rightPriceScale: { borderColor: "rgba(63,63,70,0.7)" },
      timeScale: { borderColor: "rgba(63,63,70,0.7)" }
    });

    const series = chart.addLineSeries({
      color: "#ffd11a",
      lineWidth: 2
    });

    chartRef.current = chart;
    seriesRef.current = series;

    const container = containerRef.current;
    const ro = new ResizeObserver(() => {
      chart.applyOptions({ width: container.clientWidth || 600 });
    });
    ro.observe(container);

    return () => {
      ro.disconnect();
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
    };
  }, [height]);

  useEffect(() => {
    if (!seriesRef.current) return;
    seriesRef.current.setData(sanitized);
    chartRef.current?.timeScale().fitContent();
  }, [sanitized]);

  return <div ref={containerRef} className="w-full" />;
}
