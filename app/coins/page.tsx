import CoinsPagination from "@/components/coins-pagination";
import { DataTable } from "@/components/data-table";
import { fetcher } from "@/lib/coingecko.actions";
import { cn } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/**
 * Render the coins listing page showing a paginated table of cryptocurrency market data.
 *
 * Fetches market data for the current page and displays it in a DataTable with rank, token,
 * price, 24h change, and market cap columns, and includes pagination controls.
 *
 * @param searchParams - Query parameters object; uses `page` (optional) to determine the current page.
 * @returns A React element that renders the coins listing and pagination controls.
 */
export default async function CoinsPage({ searchParams }: NextPageProps) {
  const resolvedParams = await searchParams;
  const pageParam = resolvedParams?.page;

  const currentPage = Number(pageParam) || 1;
  const perPage = 10;

  const coinsData = await fetcher<CoinMarketData[]>("/coins/markets", {
    vs_currency: "usd",
    order: "market_cap_desc",
    per_page: perPage,
    page: currentPage,
    sparkline: false,
    price_change_percentage: "24h",
  });

  const columns: DataTableColumn<CoinMarketData>[] = [
    {
      header: "Rank",
      cellClassName: "rank-cell",
      cell: (coin) => (
        <>
          #{coin.market_cap_rank}
          <Link href={`/coins/${coin.id}`} aria-label="View coin" />
        </>
      ),
    },
    {
      header: "Token",
      cellClassName: "token-cell",
      cell: (coin) => (
        <div className="flex items-center gap-3 ">
          <Image src={coin.image} alt={coin.name} width={36} height={36} />
          <p>
            {coin.name} ({coin.symbol.toUpperCase()})
          </p>
        </div>
      ),
    },
    {
      header: " Price",
      cellClassName: "price-cell",
      cell: (coin) => <>${coin.current_price.toLocaleString()}</>,
    },
    {
      header: "24h Change",
      cellClassName: "change-cell",
      cell: (coin) => {
        const item = coin.price_change_percentage_24h || 0;
        const isTrendingUp = item > 0;

        return (
          <div
            className={cn(
              "price-change",
              isTrendingUp ? "text-green-500" : "text-red-500"
            )}
          >
            <p className="flex items-center gap-2">
              {item.toFixed(2)}%
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
      header: "Market Cap",
      cellClassName: "market-cap-cell",
      cell: (coin) => <>${coin.market_cap.toLocaleString()}</>,
    },
  ];

  const hasMorePages = coinsData.length === perPage;

  const estimattedTotalPages =
    currentPage >= 100 ? Math.ceil(currentPage / 100) * 100 + 100 : 100;

  return (
    <main id="coins-page">
      <div className="content">
        <h4>All Coins</h4>

        <DataTable
          tableClassName="coins-table"
          columns={columns}
          data={coinsData}
          rowKey={(coin) => coin.id}
        />

        <CoinsPagination
          currentPage={currentPage}
          totalPages={estimattedTotalPages}
          hasMorePages={hasMorePages}
        />
      </div>
    </main>
  );
}