import { CoinOverview } from "@/components/home/coin-overview";
import { TrendingCoins } from "@/components/home/trending-coins";
import { Suspense } from "react";
import {
  CoinOverviewFallback,
  TrendingCoinsFallback,
} from "@/components/fallback";
import { Categories } from "@/components/home/categories";

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
