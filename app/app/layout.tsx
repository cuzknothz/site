import type { Metadata } from 'next';

export const metadata: Metadata = {
  icons: { icon: '/favicon/app.svg' },
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return children as any;
}
