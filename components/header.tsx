'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * Render the site header with the logo and navigation links.
 *
 * Navigation links receive the `is-active` class when their href matches the current path.
 *
 * @returns The header element containing the logo link and navigation; navigation links include `is-active` when their href matches the current path.
 */
export function Header() {
  const pathName = usePathname();

  return (
    <header>
      <div className="main-container inner">
        <Link href="/">
          <Image src="/logo.svg" alt="CoinPulse Logo" width={132} height={40} />
        </Link>

        <nav>
          <Link
            href="/"
            className={cn('nav-link', {
              'is-active': pathName === '/',
              'is-home': true,
            })}
          >
            Home
          </Link>

          <p>Search Modal</p>

          <Link
            href="/coins"
            className={cn('nav-link', {
              'is-active': pathName === '/coins',
            })}
          >
            All Coins
          </Link>
        </nav>
      </div>
    </header>
  );
}