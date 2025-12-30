'use server';

import qs from 'query-string';

const BASE_URL = process.env.COINGECKO_BASE_URL;
const API_KEY = process.env.COINGECKO_API_KEY;

if (!BASE_URL) throw new Error('Could not get base URL');
if (!API_KEY) throw new Error('Could not get API key');

/**
 * Fetches JSON data from the configured CoinGecko API endpoint and returns it as the specified type.
 *
 * @param endpoint - Path appended to the configured base URL (e.g., `/coins/markets`)
 * @param params - Optional query parameters; null and empty-string values are omitted from the request
 * @param revalidate - Cache revalidation time in seconds for the request
 * @returns The parsed JSON response typed as `T`
 */
export async function fetcher<T>(
  endpoint: string,
  params?: QueryParams,
  revalidate = 60,
): Promise<T> {
  const url = qs.stringifyUrl(
    {
      url: `${BASE_URL}${endpoint}`,
      query: params,
    },
    { skipEmptyString: true, skipNull: true },
  );

  const response = await fetch(url, {
    headers: {
      'x-ch-pro-api-key': API_KEY,
      'Content-Type': 'application/json',
    } as Record<string, string>,
    next: { revalidate },
  });

  if (!response.ok) {
    const errorBody: CoinGeckoErrorBody = await response.json().catch(() => ({}));

    throw new Error(`Error ${response.status}: ${errorBody.error || response.statusText}`);
  }

  return response.json();
}