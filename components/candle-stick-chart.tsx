"use client";

import {
  getCandlestickConfig,
  getChartConfig,
  PERIOD_BUTTONS,
  PERIOD_CONFIG,
} from "@/constants";
import { fetcher } from "@/lib/coingecko.actions";
import { convertOHLCData } from "@/lib/utils";
import {
  CandlestickSeries,
  createChart,
  IChartApi,
  ISeriesApi,
} from "lightweight-charts";
import { useEffect, useRef, useState, useTransition } from "react";

/**
 * Render a responsive candlestick chart with period controls for a specified coin.
 *
 * The component displays an interactive candlestick series, initializes with optionally provided OHLC data,
 * and fetches updated OHLC data when the selected period changes. The chart resizes with its container and
 * exposes period selection buttons in the header; additional header content can be provided via `children`.
 *
 * @param data - Optional initial OHLC data array to populate the chart
 * @param coinId - Identifier of the coin used to fetch OHLC data when the period changes
 * @param children - Nodes rendered in the chart header (left side)
 * @param height - Chart height in pixels (defaults to 360)
 * @param initialPeriod - Initial period key for data and display (defaults to "daily")
 * @returns A React element containing the candlestick chart and its controls
 */
export function CandleStickChart({
  data,
  coinId,
  children,
  height = 360,
  initialPeriod = "daily",
}: CandlestickChartProps) {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  const [period, setPeriod] = useState<Period>(initialPeriod);
  const [ohlcData, setOhlcData] = useState<OHLCData[]>(data ?? []);
  const [isPending, startTransition] = useTransition();

  const fetchOhlcData = async (selectedPeriod: Period) => {
    try {
      const config = PERIOD_CONFIG[selectedPeriod];

      const newData = await fetcher<OHLCData[]>(`/coins/${coinId}/ohlc`, {
        vs_currency: "usd",
        days: config.days,
        // interval: config.interval,
        precision: "full",
      });

      setOhlcData(newData ?? []);
    } catch (e) {
      console.error("Failed to fetch OHLC data:", e);
    }
  };

  const handlePeriodChange = async (newPeriod: Period) => {
    if (newPeriod === period) return;

    // UPDATE PERIOD
    startTransition(async () => {
      setPeriod(newPeriod);
      await fetchOhlcData(newPeriod);
    });
  };

  useEffect(() => {
    const container = chartContainerRef.current;
    if (!container) return;

    // 1. Initialize Chart
    const showTime = ["daily", "weekly", "monthly"].includes(period);
    const chart = createChart(container, {
      ...getChartConfig(height, showTime),
      width: container.clientWidth,
    });

    // 2. Initialize Series
    const series = chart.addSeries(CandlestickSeries, getCandlestickConfig());

    // 3. Set Initial Data
    if (ohlcData && ohlcData.length > 0) {
      series.setData(convertOHLCData(ohlcData));
      chart.timeScale().fitContent();
    }

    // 4. Store references for updates
    chartRef.current = chart;
    candleSeriesRef.current = series;

    const observer = new ResizeObserver((entries) => {
      if (!entries.length) return;
      chart.applyOptions({ width: entries[0].contentRect.width });
    });

    observer.observe(container);

    // 5. Cleanup
    return () => {
      observer.disconnect();
      chart.remove();
      chartRef.current = null;
      candleSeriesRef.current = null;
    };
  }, [height, ohlcData, period]);
  return (
    <div id="candlestick-chart">
      <div id="chart-header">
        <div className="flex-1">{children}</div>

        <div className=" pb-4">
          <span className="text-sm mx-2 font-medium text-group-100/50">
            Period:
          </span>
          {PERIOD_BUTTONS.map(({ value, label }) => (
            <button
              key={value}
              className={
                period === value ? "config-button-active" : " config-button"
              }
              onClick={() => handlePeriodChange(value)}
              disabled={isPending}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div ref={chartContainerRef} className="chart" style={{ height }} />
    </div>
  );
}