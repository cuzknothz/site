import type { Metadata } from 'next';

export const metadata: Metadata = {
  icons: { icon: '/favicon/app/dice.svg' },
};

export default function DiceAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children as any;
}
