import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combine multiple class value inputs into a single, conflict-resolved class string.
 *
 * @param inputs - Values accepted by `clsx` (strings, arrays, objects, etc.) to be merged into class names
 * @returns A single string of resolved class names with Tailwind class conflicts merged
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number into a localized currency string.
 *
 * @param value - The numeric value to format; returns `-` when `value` is `null`, `undefined`, or `NaN`.
 * @param currency - The ISO 4217 currency code to use (defaults to 'USD').
 * @param locale - The locale identifier for formatting (defaults to 'en-US').
 * @param options - Additional Intl.NumberFormat options to override defaults.
 * @returns The formatted currency string, or `-` when `value` is not a valid number.
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