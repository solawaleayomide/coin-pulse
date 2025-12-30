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
 * Application root layout that applies global fonts, sets the color scheme, and renders the header with page content.
 *
 * @param children - The content to render inside the layout's body.
 * @returns The root HTML structure (<html> and <body>) with applied font CSS variables, theme class, header, and the provided children.
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