import type { Metadata } from 'next';

export const metadata: Metadata = {
  icons: { icon: '/favicon/app/3chart.svg' },
};

export default function ChartAppLayout({ children }: { children: React.ReactNode }) {
  return children as any;
}
