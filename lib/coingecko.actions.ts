"use server";

import qs from "query-string";

const BASE_URL = process.env.COINGECKO_BASE_URL;
const API_KEY = process.env.COINGECKO_API_KEY;

if (!BASE_URL) throw new Error("Could not get base URL");
if (!API_KEY) throw new Error("Could not get API key");

export async function fetcher<T>(
  endpoint: string,
  params?: QueryParams,
  revalidate = 60
): Promise<T> {
  const url = qs.stringifyUrl(
    {
      url: `${BASE_URL}${endpoint}`,
      query: params,
    },
    { skipEmptyString: true, skipNull: true }
  );

  const response = await fetch(url, {
    headers: {
      "x-cg-demo-api-key": API_KEY!,
      "Content-Type": "application/json",
    },
    next: { revalidate },
  });

  // 1. Get the data once
  const data = await response.json().catch(() => ({}));

  // 2. If the response failed, use the data we already grabbed
  if (!response.ok) {
    throw new Error(
      `Error ${response.status}: ${data.error || response.statusText}`
    );
  }

  // 3. Return the pre-read data
  return data as T;
}
