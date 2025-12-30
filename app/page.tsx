import { CoinOverview } from "@/components/home/coin-overview";
import { TrendingCoins } from "@/components/home/trending-coins";
import { Suspense } from "react";
import {
  CoinOverviewFallback,
  TrendingCoinsFallback,
} from "@/components/fallback";

/**
 * Render the home page layout with Suspense-wrapped coin overview and trending sections.
 *
 * @returns The root JSX element for the home page containing:
 * - A grid section with `CoinOverview` and `TrendingCoins` components each wrapped in `Suspense` and paired with their fallbacks.
 * - A secondary section with a "Categories" header.
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