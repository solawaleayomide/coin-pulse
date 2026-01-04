import { fetcher } from "@/lib/coingecko.actions";
import { DataTable } from "../data-table";
import { TrendingDown, TrendingUp } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

const columns: DataTableColumn<TrendingCoin>[] = [
  {
    header: "Name",
    cellClassName: "name-cell",
    cell: (coin) => {
      const item = coin.item;

      return (
        <Link href={`/coins/${item.id}`}>
          <Image src={item.large} alt={item.name} width={36} height={36} />
          <p>{item.name}</p>
        </Link>
      );
    },
  },
  {
    header: "24h Change",
    cellClassName: "name-cell",
    cell: (coin) => {
      const item = coin.item;
      const isTrendingUp = item.data.price_change_percentage_24h.usd > 0;

      return (
        <div
          className={cn(
            "price-change",
            isTrendingUp ? "text-green-500" : "text-red-500"
          )}
        >
          <p className="flex items-center gap-2">
            {item.data.price_change_percentage_24h.usd.toFixed(2)}%
            {isTrendingUp ? (
              <TrendingUp width={16} height={16} />
            ) : (
              <TrendingDown width={16} height={16} />
            )}
          </p>
        </div>
      );
    },
  },
  {
    header: "Price",
    cellClassName: "price-cell",
    cell: (coin) => formatCurrency(coin.item.data.price),
  },
];

// const trendingCoins: TrendingCoin[] = [
//   {
//     item: {
//       id: "bitcoin",
//       name: "Bitcoin",
//       symbol: "BTC",
//       market_cap_rank: 1,
//       thumb: "/logo.svg",
//       large: "/logo.svg",
//       data: {
//         price: 43256.78,
//         price_change_percentage_24h: {
//           usd: -1.23,
//         },
//       },
//     },
//   },
//   {
//     item: {
//       id: "ethereum",
//       name: "Ethereum",
//       symbol: "ETH",
//       market_cap_rank: 2,
//       thumb: "/logo.svg",
//       large: "/logo.svg",
//       data: {
//         price: 3200.12,
//         price_change_percentage_24h: {
//           usd: 2.45,
//         },
//       },
//     },
//   },
// ];

export async function TrendingCoins() {
  const trendingCoins = await fetcher<{ coins: TrendingCoin[] }>(
    "/search/trending",
    undefined,
    300
  );

  return (
    <div id="trending-coins">
      <h4>Trending Coins</h4>
      <DataTable
        data={trendingCoins.coins.slice(0, 6) || []}
        columns={columns}
        rowKey={(row) => row.item.id}
        tableClassName="trending-coins-table"
        headerCellClassName="py-3!"
        bodyCellClassName="py-2!"
      />
    </div>
  );
}
