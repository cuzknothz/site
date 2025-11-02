import type { Metadata } from 'next';

export const metadata: Metadata = {
  icons: { icon: '/favicon/app/spek.svg' },
};

export default function SpekAppLayout({ children }: { children: React.ReactNode }) {
  return children as any;
}
