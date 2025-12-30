import { CoinOverview } from "@/components/home/coin-overview";
import { TrendingCoins } from "@/components/home/trending-coins";
import { Suspense } from "react";
import {
  CoinOverviewFallback,
  TrendingCoinsFallback,
} from "@/components/fallback";

/**
 * Render the homepage layout with live coin data and a Categories section.
 *
 * The main content includes a grid that lazily renders CoinOverview and TrendingCoins
 * inside Suspense boundaries with respective fallback components, followed by a
 * separate section labeled "Categories".
 *
 * @returns The page's root JSX element: a <main> containing the coin overview and trending coins grid with fallbacks, and a Categories section below.
 */
export default async function HomePage() {
  return (
    <main className="main-container">
      <section className="home-grid">
        <Suspense fallback={<CoinOverviewFallback />}>
          <CoinOverview />
        </Suspense>
        <Suspense fallback={<TrendingCoinsFallback />}>
          <TrendingCoins />
        </Suspense>
      </section>

      <section className="w-full mt-7 space-y-4">
        <p>Categories</p>
      </section>
    </main>
  );
}