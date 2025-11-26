import type { Metadata } from 'next';
import localFont from 'next/font/local';

export const metadata: Metadata = {
  icons: { icon: '/favicon/app/spotify.svg' },
};

const spotifyFont = localFont({
  src: [
    {
      path: './font/SpotifyMixUI-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './font/SpotifyMixUI-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    // {
    //   path: './SpotifyMixUITitleVariable.woff2',
    //   weight: '700',
    //   style: '',
    // },
  ],
});

export default function SpotifyAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={spotifyFont.className}>{children}</div>;
}
