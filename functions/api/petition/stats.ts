/**
 * GET /api/petition/stats — Petition signatures grouped by state.
 * KV-cached with 5-minute TTL (aggregation query is more expensive).
 */
import type { Env } from '../../lib/env';
import { jsonResponse } from '../../lib/response';

const CACHE_KEY = 'petition:stats';
const CACHE_TTL = 300; // 5 minutes

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env } = context;

  // Check KV cache
  const cached = await env.RATE_LIMITS.get(CACHE_KEY);
  if (cached) {
    return jsonResponse(JSON.parse(cached));
  }

  // Cache miss — query D1
  const rows = await env.DB.prepare(
    'SELECT state, COUNT(*) as count FROM petition_signers GROUP BY state'
  ).all<{ state: string; count: number }>();

  const byState: Record<string, number> = {};
  let total = 0;
  for (const row of rows.results) {
    byState[row.state] = row.count;
    total += row.count;
  }

  const data = { byState, total };

  // Store in KV with TTL
  await env.RATE_LIMITS.put(CACHE_KEY, JSON.stringify(data), { expirationTtl: CACHE_TTL });

  return jsonResponse(data);
};
