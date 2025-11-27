import type { Metadata } from 'next';
import { LayoutNext } from './LayoutNext';

export const metadata: Metadata = {
  icons: { icon: '/favicon/app/spotify.svg' },
};

export default function SpotifyAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutNext>{children}</LayoutNext>;
}
