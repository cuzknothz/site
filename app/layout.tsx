import { EnterSecret } from '@/components/Enter';
import { Header } from '@/components/Header/Header';
import LayoutEffect from '@/components/LayoutEffect';
import { Menu } from '@/components/Menu/Menu';
import { NextEvent } from '@/components/NextEvent';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Metadata, Viewport } from 'next';
import './globals.css';
// import { Intel_One_Mono  as AppFont } from 'next/font/google';
import { Cascadia_Mono  as AppFont } from 'next/font/google';

import clsx from 'clsx';

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
