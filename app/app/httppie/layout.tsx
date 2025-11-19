import type { Metadata } from 'next';

export const metadata: Metadata = {
  icons: { icon: '/favicon/app/httppie.svg' },
};

export default function HTTPPieAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children as any;
}
