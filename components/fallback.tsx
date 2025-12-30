import React from "react";
import { DataTable } from "@/components/data-table";

/**
 * Render a skeleton UI for the coin overview section shown while data is loading.
 *
 * @returns A JSX element containing header avatar and text placeholders, a period button skeleton, and a chart skeleton styled with pulsing loading classes.
 */
export function CoinOverviewFallback() {
  return (
    <div id="coin-overview-fallback">
      <div className="header">
        <div className="header-image bg-dark-400 animate-pulse rounded-full" />

        <div className="info">
          <div className="header-line-sm bg-dark-400 animate-pulse rounded" />
          <div className="header-line-lg bg-dark-400 animate-pulse rounded" />
        </div>
      </div>

      <div className="flex gap-2 items-center mt-4">
        <div className="period-button-skeleton bg-dark-400 animate-pulse rounded" />
      </div>

      <div className="chart mt-4">
        <div className="chart-skeleton bg-dark-400 animate-pulse rounded" />
      </div>
    </div>
  );
}

const skeletonData: TrendingCoin[] = Array.from({ length: 4 }).map((_, i) => ({
  item: {
    id: `skeleton-${i}`,
    name: "",
    symbol: "",
    market_cap_rank: 0,
    thumb: "",
    large: "",
    data: {
      price: 0,
      price_change_percentage_24h: {
        usd: 0,
      },
    },
  },
}));

const skeletonColumns: DataTableColumn<TrendingCoin>[] = [
  {
    header: "Name",
    cellClassName: "name-cell",
    cell: () => (
      <div className="name-link">
        <div className="name-image bg-dark-400 animate-pulse rounded-full" />
        <div className="name-line bg-dark-400 animate-pulse rounded" />
      </div>
    ),
  },
  {
    header: "24h Change",
    cellClassName: "change-cell",
    cell: () => (
      <div className="price-change">
        <div className="change-icon bg-dark-400 animate-pulse rounded-full" />
        <div className="change-line bg-dark-400 animate-pulse rounded" />
      </div>
    ),
  },
  {
    header: "Price",
    cellClassName: "price-cell",
    cell: () => (
      <div className="price-line bg-dark-400 animate-pulse rounded" />
    ),
  },
];

/**
 * Render a skeleton placeholder for the trending coins section.
 *
 * Displays a "Trending Coins" heading and a DataTable filled with placeholder rows and columns to indicate loading state.
 *
 * @returns The JSX element containing the trending coins skeleton table
 */
export function TrendingCoinsFallback() {
  return (
    <div id="trending-coins-fallback">
      <h4>Trending Coins</h4>
      <div className="trending-coins-table">
        <DataTable
          data={skeletonData}
          columns={skeletonColumns}
          rowKey={(r, i) => r.item.id ?? i}
        />
      </div>
    </div>
  );
}