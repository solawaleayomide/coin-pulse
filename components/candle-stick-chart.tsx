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
 * Renders an interactive candlestick chart with period controls and dynamic OHLC data loading.
 *
 * Displays a candlestick chart for the given `coinId`, initializes with `data` (if provided), and lets the user switch periods which triggers fetching and rendering of new OHLC data. The chart resizes with its container and fits visible content when new data is applied.
 *
 * @param data - Optional initial OHLC data to populate the chart
 * @param coinId - Coin identifier used to fetch OHLC data when the period changes
 * @param children - Elements rendered in the chart header (left side)
 * @param height - Chart height in pixels (default: 360)
 * @param initialPeriod - Starting period for the chart (default: "daily")
 * @returns The chart UI as a React element
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

        <div className="button-group pb-4">
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