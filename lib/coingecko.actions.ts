'use server';

import qs from 'query-string';

const BASE_URL = process.env.COINGECKO_BASE_URL;
const API_KEY = process.env.COINGECKO_API_KEY;

if (!BASE_URL) throw new Error('Could not get base URL');
if (!API_KEY) throw new Error('Could not get API key');

/**
 * Fetches JSON from the CoinGecko API at the given endpoint with optional query parameters and revalidation control.
 *
 * @param endpoint - Path appended to the configured base URL (should begin with a slash if needed)
 * @param params - Query parameters to include; empty strings and `null` values are omitted from the generated query string
 * @param revalidate - Cache revalidation time in seconds for Next.js fetch caching
 * @returns The parsed JSON response body typed as `T`
 *
 * @throws Error if the HTTP response status is not OK; the error message includes the status code and either the API error message or the response status text
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