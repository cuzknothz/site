import type { Metadata, Viewport } from 'next';
import { LayoutNext } from './LayoutNext';

export const metadata: Metadata = {
  icons: { icon: '/favicon/app/spotify.svg' },
};
export const viewport: Viewport = {
  themeColor: '#000',
};

export default function SpotifyAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutNext>{children}</LayoutNext>;
}
