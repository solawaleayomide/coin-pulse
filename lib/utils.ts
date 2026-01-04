import { clsx, type ClassValue } from "clsx";
import { Time } from "lightweight-charts";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  value: number | null | undefined,
  digits?: number,
  currency?: string,
  showSymbol?: boolean
) {
  if (value === null || value === undefined || isNaN(value)) {
    return showSymbol !== false ? "$0.00" : "0.00";
  }

  if (showSymbol === undefined || showSymbol === true) {
    return value.toLocaleString(undefined, {
      style: "currency",
      currency: currency?.toUpperCase() || "USD",
      minimumFractionDigits: digits ?? 2,
      maximumFractionDigits: digits ?? 2,
    });
  }
  return value.toLocaleString(undefined, {
    minimumFractionDigits: digits ?? 2,
    maximumFractionDigits: digits ?? 2,
  });
}

export function formatPercentage(change: number | null | undefined): string {
  if (change === null || change === undefined || isNaN(change)) {
    return "0.0%";
  }
  const formattedChange = change.toFixed(1);
  return `${formattedChange}%`;
}

export function trendingClasses(value: number) {
  const isTrendingUp = value > 0;

  return {
    textClass: isTrendingUp ? "text-green-400" : "text-red-400",
    bgClass: isTrendingUp ? "bg-green-500/10" : "bg-red-500/10",
    iconClass: isTrendingUp ? "icon-up" : "icon-down",
  };
}

export function timeAgo(date: string | number | Date): string {
  const now = new Date();
  const past = new Date(date);
  const diff = now.getTime() - past.getTime(); // difference in ms

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  if (seconds < 60) return "just now";
  if (minutes < 60) return `${minutes} min`;
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""}`;
  if (days < 7) return `${days} day${days > 1 ? "s" : ""}`;
  if (weeks < 4) return `${weeks} week${weeks > 1 ? "s" : ""}`;

  // Format date as YYYY-MM-DD
  return past.toISOString().split("T")[0];
}

/**
 * Convert an array of OHLC tuples into chart-ready objects with time expressed in seconds and consecutive duplicate timestamps removed.
 *
 * @param data - Array of OHLC tuples where each tuple is [timestampMs, open, high, low, close]; `timestampMs` is milliseconds since epoch
 * @returns An array of objects `{ time: Time, open, high, low, close }` where `time` is seconds since epoch and consecutive entries with the same `time` are omitted
 */
export function convertOHLCData(data: OHLCData[]) {
  return data
    .map((d) => ({
      time: (d[0] / 1000) as Time, // Convert milliseconds to seconds
      open: d[1],
      high: d[2],
      low: d[3],
      close: d[4],
    }))
    .filter(
      (item, index, arr) => index === 0 || item.time !== arr[index - 1].time
    );
}

export const ELLIPSIS = "ellipsis" as const;
/**
 * Generate a pagination sequence of page numbers with ellipsis placeholders.
 *
 * The sequence always includes the first page and, when totalPages > 1, the last page.
 * It includes the current page and one adjacent page on each side, inserting
 * an ellipsis token where ranges are omitted.
 *
 * @param currentPage - The currently active page (1-based index; should be between 1 and `totalPages`)
 * @param totalPages - Total number of pages
 * @returns An array containing page numbers and the `ELLIPSIS` placeholder string where ranges are collapsed
 */
export function buildPageNumbers(currentPage: number, totalPages: number) {
  const pages: (number | string)[] = [];
  const sidePages = 1; // Number of pages to show on each side of current

  if (totalPages <= 1) return [1];

  // Always include first page
  pages.push(1);

  if (currentPage > sidePages + 2) {
    pages.push(ELLIPSIS);
  }

  // Calculate mid-range
  const start = Math.max(2, currentPage - sidePages);
  const end = Math.min(totalPages - 1, currentPage + sidePages);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (currentPage < totalPages - (sidePages + 1)) {
    pages.push(ELLIPSIS);
  }

  // Always include last page
  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
}