import { urlEconomic } from "@/utils/url";

export const runtime = "nodejs";

const TARGET = urlEconomic;

export async function GET(req: Request) {
  const inUrl = new URL(req.url);
  const search = inUrl.search;
  const upstreamUrl = `${TARGET}${search}`;

  // Copy header nhưng bỏ Accept-Encoding để upstream trả plain
  const headers = new Headers(req.headers);
  headers.delete("accept-encoding");

  const resp = await fetch(upstreamUrl, {
    method: "GET",
    headers,
  });

  // Copy lại header nhưng bỏ Content-Encoding & Content-Length
  const outHeaders = new Headers(resp.headers);
  outHeaders.delete("content-encoding");
  outHeaders.delete("content-length");

  return new Response(resp.body, {
    status: resp.status,
    headers: outHeaders,
  });
}