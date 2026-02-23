/**
 * CORS middleware for all /api/* routes.
 * Handles OPTIONS preflight and adds CORS headers to every response.
 *
 * Allowed origins are explicit — no wildcard ever.
 */
import type { Env } from '../lib/env';

const ALLOWED_ORIGINS = new Set([
  'https://tippersbillofrights.com',
  'https://www.tippersbillofrights.com',
  // Development only — Wrangler dev server and Vite dev server
  'http://localhost:5173',
  'http://localhost:8788',
]);

const CORS_HEADERS_BASE = {
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
};

// Applied to every /api response — prevent MIME sniffing and framing attacks
const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
};

function getCorsOriginHeader(request: Request): Record<string, string> {
  const origin = request.headers.get('Origin') ?? '';
  if (ALLOWED_ORIGINS.has(origin)) {
    return { 'Access-Control-Allow-Origin': origin };
  }
  // Origin not allowed — return no CORS header (browser will block it)
  return {};
}

export const onRequest: PagesFunction<Env>[] = [
  async (context) => {
    const { request, next } = context;
    const corsOrigin = getCorsOriginHeader(request);

    // Respond to OPTIONS preflight immediately — no need to call next()
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: { ...corsOrigin, ...CORS_HEADERS_BASE, ...SECURITY_HEADERS },
      });
    }

    // Pass through to the actual handler and attach CORS + security headers to response
    const response = await next();
    const newHeaders = new Headers(response.headers);
    Object.entries({ ...corsOrigin, ...CORS_HEADERS_BASE, ...SECURITY_HEADERS }).forEach(
      ([key, value]) => newHeaders.set(key, value)
    );

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  },
];
