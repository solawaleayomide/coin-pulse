import { fetcher } from "@/lib/coingecko.actions";
import { DataTable } from "../data-table";
import Image from "next/image";
import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Renders a "Top Categories" section with a table of cryptocurrency categories, each showing the category name, top‑3 coin images, 24h change with a trend icon, market cap, and 24h volume.
 *
 * @returns The React element containing the heading and a DataTable populated with up to 10 categories.
 */
export async function Categories() {
  const categories = await fetcher<Category[]>("/coins/categories");

  const columns: DataTableColumn<Category>[] = [
    {
      header: "Category",
      cellClassName: "category-cell",
      cell: (category) => {
        return <p>{category.name}</p>;
      },
    },
    {
      header: "Top Gainers",
      cellClassName: " top-gainers-cell",
      cell: (category) => {
        const coins = category.top_3_coins;

        return (
          <>
            {coins.map((coin) => (
              <Image src={coin} alt={coin} key={coin} width={28} height={28} />
            ))}
          </>
        );
      },
    },
    {
      header: "24h Change",
      cellClassName: "",
      cell: (category) => {
        const item = category.market_cap_change_24h;
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
      cell: (category) => {
        return <p>${category.market_cap.toLocaleString()}</p>;
      },
    },
    {
      header: "24h Volume",
      cellClassName: "volume-cell",
      cell: (category) => {
        return <p>${category.volume_24h.toLocaleString()}</p>;
      },
    },
  ];
  return (
    <div id="categories" className="">
      <h4>Top Categories</h4>

      <DataTable
        columns={columns}
        data={categories?.slice(0, 10)}
        rowKey={(_, index) => index}
        tableClassName="mt-3"
      />
    </div>
  );
}