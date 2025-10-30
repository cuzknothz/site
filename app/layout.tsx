import { EnterSecret } from '@/components/Enter';
import LayoutEffect from '@/components/LayoutEffect';
import { Menu } from '@/components/Menu/Menu';
import { NextEvent } from '@/components/NextEvent';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Metadata, Viewport } from 'next';
import { Cascadia_Mono as AppFont } from 'next/font/google';
import clsx from 'clsx';
import './globals.css';

export const metadata: Metadata = {
  title: 'illuzion',
  description: 'illuzion',
};

export const viewport: Viewport = {
  themeColor: '#fff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

const appFont = AppFont({
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html
        lang='en'
        className={clsx(
          'duration-0 dark:bg-black dark:text-white',
          appFont.className,
        )}
      >
        <LayoutEffect>
          <NextEvent />
          {/* <SpotifyWidget /> */}
          {/* <Header /> */}
          {children}
          <SpeedInsights />
          <Analytics />
          <Menu />
          <EnterSecret />
        </LayoutEffect>
      </html>
    </>
  );
}
