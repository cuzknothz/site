import { Dizzle } from '@/components/Dizzle';
import { EnterSecret } from '@/components/Enter';
import LayoutEffect from '@/components/LayoutEffect';
import { Miracle } from '@/components/Miracle';
import { Metadata, Viewport } from 'next';
import './globals.css';
import { Slashhhhhhhhhhhhhhhhhhhhhhhhh } from '@/components/Slashhhhhhhhhhhhhhhhhhhhhhhhh';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

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
        {/* <Slashhhhhhhhhhhhhhhhhhhhhhhhh /> */}
        <Dizzle />
        {children}
        <SpeedInsights />
        <Analytics />
        <Miracle />
        <EnterSecret />
      </LayoutEffect>
    </>
  );
}
