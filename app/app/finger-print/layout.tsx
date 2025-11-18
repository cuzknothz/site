import type { Metadata } from 'next';

export const metadata: Metadata = {
  icons: { icon: '/favicon/app/finger-print.svg' },
};

export default function FingerPrintAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children as any;
}
