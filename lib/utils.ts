import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combine multiple class value inputs into a single Tailwind-compatible class string.
 *
 * Accepts class names, arrays, objects, and other `clsx`-style values and produces a normalized,
 * space-separated class string with Tailwind utility conflicts resolved.
 *
 * @param inputs - One or more class value inputs (strings, arrays, objects, etc.)
 * @returns A single string of resolved, space-separated class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Produce a localized currency string for a numeric value.
 *
 * @param value - The numeric value to format; `null`, `undefined`, or `NaN` yield `'-'`.
 * @param currency - ISO 4217 currency code to use (default: `'USD'`).
 * @param locale - BCP 47 language tag controlling locale formatting (default: `'en-US'`).
 * @param options - Additional Intl.NumberFormat options to override defaults.
 * @returns `'-'` for `null`, `undefined`, or `NaN`; otherwise the localized currency string.
 */
export function formatCurrency(
  value: number | null | undefined,
  currency: string = 'USD',
  locale: string = 'en-US',
  options: Intl.NumberFormatOptions = {},
) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return '-';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
    ...options,
  }).format(value as number);
}