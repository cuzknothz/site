import axios from 'axios';

let cachedToken: string | null = null;
let tokenExpiresAt = 0;

export async function getSpotifyToken(): Promise<string> {
  const now = Date.now();

  if (cachedToken && now < tokenExpiresAt) return cachedToken;

  const clientId = process.env.SPOTIFY_CLIENT_ID!;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;

  try {
    const res = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
      }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      },
    );

    cachedToken = res.data.access_token as string;
    tokenExpiresAt = now + res.data.expires_in * 1000 - 5000; // trừ 5s để tránh edge-case hết hạn

    return cachedToken;
  } catch (err: any) {
    console.error(
      'Failed to get Spotify token:',
      err.response?.data || err.message,
    );
    throw new Error('SPOTIFY_TOKEN_ERROR');
  }
}

export async function fetchSpotify<T = any>(
  path: string,
  params?: Record<string, string | number | boolean | undefined>,
): Promise<T> {
  const token = await getSpotifyToken();
  const qs = params
    ? '?' +
      new URLSearchParams(
        Object.entries(params).reduce(
          (acc, [k, v]) => {
            if (v !== undefined && v !== null) acc[k] = String(v);
            return acc;
          },
          {} as Record<string, string>,
        ),
      )
    : '';
  const res = await fetch(`https://api.spotify.com/v1${path}${qs}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Spotify ${path} failed ${res.status}: ${text}`);
  }
  return res.json() as Promise<T>;
}
