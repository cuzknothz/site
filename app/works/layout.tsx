import type { Metadata } from 'next';

export const metadata: Metadata = {
  icons: { icon: '/favicon/work.svg' },
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children as any;
}
