import { CoinOverview } from "@/components/home/coin-overview";
import { TrendingCoins } from "@/components/home/trending-coins";
import { Suspense } from "react";
import {
  CoinOverviewFallback,
  TrendingCoinsFallback,
} from "@/components/fallback";
import { Categories } from "@/components/home/categories";

/**
 * Render the homepage layout with Suspense-wrapped sections for coin overview, trending coins, and categories.
 *
 * The component arranges two primary cards (coin overview and trending coins) in a grid and a full-width categories
 * section below. Each section is deferred behind a React Suspense boundary that displays a corresponding fallback while
 * the content is resolving.
 *
 * @returns The root JSX element for the homepage, containing Suspense fallbacks and their primary components.
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
        <Suspense
          fallback={
            <div className="categories-fallback">Loading Categories...</div>
          }
        >
          <Categories />
        </Suspense>
      </section>
    </main>
  );
}