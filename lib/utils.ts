import { clsx, type ClassValue } from "clsx";
import { Time } from "lightweight-charts";
import { twMerge } from "tailwind-merge";

/**
 * Combine multiple class value inputs into a single, Tailwind-aware class string.
 *
 * @param inputs - One or more class values (strings, objects, arrays, etc.) accepted by `clsx`
 * @returns A single string containing the merged CSS classes with Tailwind conflict resolution applied
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a numeric value as a localized currency string or as a plain localized number.
 *
 * If `value` is null, undefined, or NaN the function returns "$0.00" when `showSymbol` is not `false`, otherwise "0.00".
 *
 * @param value - The numeric value to format.
 * @param digits - Number of fraction digits to display (defaults to 2).
 * @param currency - ISO currency code to use when showing a symbol (defaults to "USD").
 * @param showSymbol - Whether to include a currency symbol; when `false` formats as a plain number (defaults to `true`).
 * @returns A localized string representing the formatted value with the specified number of fraction digits and optional currency symbol.
 */
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

/**
 * Formats a numeric change as a percentage string with one decimal place.
 *
 * @param change - The numeric change to format; may be a positive or negative number. `null`, `undefined`, or `NaN` are treated as zero.
 * @returns A string with one decimal place followed by `%` (for example, `1.2%`); returns `"0.0%"` for invalid inputs.
 */
export function formatPercentage(change: number | null | undefined): string {
  if (change === null || change === undefined || isNaN(change)) {
    return "0.0%";
  }
  const formattedChange = change.toFixed(1);
  return `${formattedChange}%`;
}

/**
 * Selects CSS class names that represent an upward or downward trend based on a numeric value.
 *
 * @param value - Numeric change where a value greater than 0 indicates an upward trend; zero or negative indicates not upward
 * @returns An object with `textClass`, `bgClass`, and `iconClass` strings corresponding to the chosen trend styling
 */
export function trendingClasses(value: number) {
  const isTrendingUp = value > 0;

  return {
    textClass: isTrendingUp ? "text-green-400" : "text-red-400",
    bgClass: isTrendingUp ? "bg-green-500/10" : "bg-red-500/10",
    iconClass: isTrendingUp ? "icon-up" : "icon-down",
  };
}

/**
 * Converts a timestamp into a concise, human-readable relative time string.
 *
 * Accepts a Date object, a millisecond timestamp, or an ISO/parseable date string.
 *
 * @param date - The past date/time to describe relative to now
 * @returns `just now` for <60 seconds; `<n> min` for <60 minutes; `<n> hour(s)` for <24 hours; `<n> day(s)` for <7 days; `<n> week(s)` for <4 weeks; otherwise the date as `YYYY-MM-DD`
 */
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
 * Convert an array of OHLC tuple entries into objects suitable for charting and remove consecutive entries with the same timestamp.
 *
 * @param data - Array of OHLCData tuples in the form [time, open, high, low, close]; `time` is expected to be in seconds and will be represented as `Time`.
 * @returns An array of objects each containing `time: Time`, `open`, `high`, `low`, and `close` numeric properties; consecutive entries that share the same `time` are deduplicated (only the first is kept).
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
export const buildPageNumbers = (
  currentPage: number,
  totalPages: number
): (number | typeof ELLIPSIS)[] => {
  const MAX_VISIBLE_PAGES = 5;

  const pages: (number | typeof ELLIPSIS)[] = [];

  if (totalPages <= MAX_VISIBLE_PAGES) {
    for (let i = 1; i <= totalPages; i += 1) {
      pages.push(i);
    }
    return pages;
  }

  pages.push(1);

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  if (start > 2) {
    pages.push(ELLIPSIS);
  }

  for (let i = start; i <= end; i += 1) {
    pages.push(i);
  }

  if (end < totalPages - 1) {
    pages.push(ELLIPSIS);
  }

  pages.push(totalPages);

  return pages;
};