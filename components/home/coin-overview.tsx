import { fetcher } from '@/lib/coingecko.actions';
import { formatCurrency } from '@/lib/utils';
import Image from 'next/image';

/**
 * Render a compact overview card for Bitcoin using fetched coin details.
 *
 * Uses the fetched coin's image.large, name, symbol, and market_data.current_price.usd to populate the UI.
 *
 * @returns A React element that displays Bitcoin's image, "Name / SYMBOL", and the formatted current USD price.
 */
export async function CoinOverview() {
  const coin = await fetcher<CoinDetailsData>('/coins/bitcoin', {
    dex_pair_symbol: 'symbol',
  });
  return (
    <div id="coin-overview">
      <div className="header">
        <Image src={coin.image.large} alt={coin.name} width={56} height={56} />

        <div className="info">
          <p>
            {coin.name} / {coin.symbol.toUpperCase()}
          </p>
          <h1>{formatCurrency(coin.market_data.current_price.usd)}</h1>
        </div>
      </div>
    </div>
  );
}