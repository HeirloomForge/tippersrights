/**
 * GET /api/petition/count — Total petition signature count.
 * KV-cached with 60s TTL to minimize D1 reads.
 */
import type { Env } from '../../lib/env';
import { jsonResponse } from '../../lib/response';

const CACHE_KEY = 'petition:count';
const CACHE_TTL = 60; // seconds

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env } = context;

  // Check KV cache first
  const cached = await env.RATE_LIMITS.get(CACHE_KEY);
  if (cached) {
    const parsed = JSON.parse(cached) as { count: number; lastUpdated: string };
    return jsonResponse(parsed);
  }

  // Cache miss — query D1
  const result = await env.DB.prepare(
    'SELECT COUNT(*) as total FROM petition_signers'
  ).first<{ total: number }>();

  const count = result?.total ?? 0;
  const lastUpdated = new Date().toISOString();
  const data = { count, lastUpdated };

  // Store in KV with TTL
  await env.RATE_LIMITS.put(CACHE_KEY, JSON.stringify(data), { expirationTtl: CACHE_TTL });

  return jsonResponse(data);
};
