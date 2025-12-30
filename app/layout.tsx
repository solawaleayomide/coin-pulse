import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/header';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Coin Pulse',
  description: 'Crypto Screener with built-in High-Frequency Terminal & Dashboard',
};

/**
 * Provides the application's root HTML structure, applies global fonts and styles, renders the header, and hosts page content.
 *
 * @param children - The content to render inside the document body (page or route content).
 * @returns The root HTML element containing the document body with global typography, the header, and the supplied `children`.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}