import type { Metadata } from 'next';

export const metadata: Metadata = {
  icons: { icon: '/favicon/app/qr.svg' },
};

export default function QRPayAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children as any;
}
