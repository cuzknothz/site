import { EnterSecret } from '@/components/Enter';
import LayoutEffect from '@/components/LayoutEffect';
import { Menu } from '@/components/Menu/Menu';
import { NextEvent } from '@/components/NextEvent';
import { appFont } from '@/lib/font';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import clsx from 'clsx';
import { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'cuzknothz',
  description: 'cuzknothz',
  icons: {
    icon: '/favicon/home.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#fff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

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
          {children}
          <SpeedInsights />
          <Analytics />
          <EnterSecret />
        </LayoutEffect>
      </html>
    </>
  );
}
