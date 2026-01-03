import { fetcher } from "@/lib/coingecko.actions";
import { CoinOverviewFallback } from "../fallback";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import { CandleStickChart } from "../candle-stick-chart";

/**
 * Render the Bitcoin overview by fetching coin details and OHLC price data, then displaying the current price and a candlestick chart.
 *
 * If data fetching fails, the component renders a fallback UI.
 *
 * @returns A JSX element containing the coin overview (coin image, name/symbol, current USD price) wrapped with a candlestick chart; the fallback UI is returned on fetch error.
 */
export async function CoinOverview() {
  let data: [CoinDetailsData, OHLCData] | null = null;

  try {
    data = await Promise.all([
      fetcher<CoinDetailsData>("/coins/bitcoin", {
        dex_pair_format: "symbol",
      }),
      fetcher<OHLCData>("/coins/bitcoin/ohlc", {
        vs_currency: "usd",
        days: "1",
        // interval: "hourly",
        precision: "full",
      }),
    ]);
  } catch (error) {
    console.error("Error fetching coin data:", error);
    return <CoinOverviewFallback />;
  }

  const [coin, coinOHLCData] = data;

  return (
    <div id="coin-overview">
      <CandleStickChart data={coinOHLCData} coinId="bitcoin">
        <div className="header pt-2">
          <Image
            src={coin.image.large}
            alt={coin.name}
            width={56}
            height={56}
          />
          <div className="info">
            <p>
              {coin.name} / {coin.symbol.toUpperCase()}
            </p>
            <h1>{formatCurrency(coin.market_data.current_price.usd)}</h1>
          </div>
        </div>
      </CandleStickChart>
    </div>
  );
}