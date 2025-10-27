import { EnterSecret } from '@/components/Enter';
import { Header } from '@/components/Header/Header';
import LayoutEffect from '@/components/LayoutEffect';
import { Menu } from '@/components/Menu/Menu';
import { NextEvent } from '@/components/NextEvent';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Metadata, Viewport } from 'next';
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
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <LayoutEffect>
        <NextEvent />
        <Header />
        {children}
        <SpeedInsights />
        <Analytics />
        <Menu />
        <EnterSecret />
      </LayoutEffect>
    </>
  );
}
