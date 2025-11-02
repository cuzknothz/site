import { NextRequest, NextResponse } from 'next/server';
import { FingerprintJsServerApiClient } from '@fingerprintjs/fingerprintjs-pro-server-api';

const fp = new FingerprintJsServerApiClient({
  apiKey: process.env.FPJS_SERVER_API_KEY!, // server secret
});

export async function POST(req: NextRequest) {
  try {
    const { requestId } = await req.json();

    if (!requestId) {
      return NextResponse.json(
        { ok: false, error: 'Missing requestId' },
        { status: 400 },
      );
    }

    const event = await fp.getEvent(requestId);

    const smart = event.products;

    const signals = {
      vpn: smart?.vpn ?? null,
      proxy: smart?.proxy ?? null,
      tor: smart?.tor ?? null,
      incognito: smart?.incognito ?? null,
      tampering: smart?.tampering ?? null,
      bot: smart?.bot ?? null,
      ipLocation: smart?.ipLocation ?? null, // country, city, etc.
    };

    return NextResponse.json({ ok: true, signals });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || 'Server error' },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  const ip = new URL(req.url).searchParams.get('ip');
  const apiKey = process.env.IPGEO_KEY;

  const res = await fetch(
    `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${ip}`,
  );
  if (!res.ok) return new Response('{}', { status: 502 });

  const data = await res.json();
  return Response.json({
    lat: Number(data.latitude),
    lon: Number(data.longitude),
  });
}
