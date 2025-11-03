// /app/api/spotify/search/route.ts
import { fetchSpotify } from '@/lib/spotify';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || '';
  const market = searchParams.get('market') || 'VN';
  const type = searchParams.get('type') || 'track, artist, album, playlist';
  const limit = Number(searchParams.get('limit') || 10);

  if (!q.trim()) {
    return NextResponse.json({ items: [] });
  }

  try {
    const data = await fetchSpotify('/search', { q, market, type, limit });
    return NextResponse.json(data);
  } catch (err: any) {
    console.error('SEARCH error:', err.message);
    return NextResponse.json(
      { error: 'SEARCH_FAILED', detail: err.message },
      { status: 500 },
    );
  }
}
