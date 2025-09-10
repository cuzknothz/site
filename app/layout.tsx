import { Dizzle } from '@/components/Dizzle';
import { EnterSecret } from '@/components/Enter';
import LayoutEffect from '@/components/LayoutEffect';
import { Miracle } from '@/components/Miracle';
import { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'nbcuong',
  description: 'nbcuong',
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
    <LayoutEffect>
      <Dizzle />
      {children}
      <Miracle />
      <EnterSecret />
    </LayoutEffect>
  );
}
