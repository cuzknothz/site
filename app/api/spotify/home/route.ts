// /app/api/spotify/home/route.ts
import { fetchSpotify } from '@/lib/spotify';
import { NextResponse } from 'next/server';

const DEFAULT_ARTISTS = [
  '06HL4z0CvFAxyc27GXpf02', // Taylor Swift
  '66CXWjxzNUsdJxJ2JdwvnR', // Ariana Grande
  '1Xyo4u8uXC1ZmMpatF05PJ', // The Weeknd
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const market = searchParams.get('market') || 'VN';
  const limit = Number(searchParams.get('limit') || 12);
  const seed_genres = searchParams.get('seed_genres') || 'pop';
  const artist_ids = (searchParams.get('artist_ids') || '')
    .split(',')
    .filter(Boolean);
  const HOT_ARTISTS = artist_ids.length ? artist_ids : DEFAULT_ARTISTS;

  try {
    const getTopTracks = (ids: string[]) =>
      Promise.all(
        ids.map((id) =>
          fetchSpotify(`/artists/${id}/top-tracks`, { market }).then((d) => ({
            artistId: id,
            tracks: d.tracks,
          })),
        ),
      );

    const [newReleases, categories, topTracks] = await Promise.all([
      fetchSpotify('/browse/new-releases', { country: market, limit }),
      // fetchSpotify('/browse/featured-playlists', { country: market, limit }),
      fetchSpotify('/browse/categories', { country: market, limit }),
      // fetchSpotify('/recommendations', { seed_genres, market, limit }),
      getTopTracks(HOT_ARTISTS),
    ]);

    return NextResponse.json({
      market,
      sections: {
        newReleases: newReleases?.albums,
        categories: categories?.categories,
        hotArtistsTopTracks: topTracks,
      },
    });
  } catch (err: any) {
    console.error('HOME error:', err.message);
    return NextResponse.json(
      { error: 'HOME_FAILED', detail: err.message },
      { status: 500 },
    );
  }
}
