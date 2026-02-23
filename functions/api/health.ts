/**
 * GET /api/health
 * Verifies D1 and KV connectivity. Used by monitoring and pre-deploy checks.
 */
import type { Env } from '../lib/env';

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env } = context;

  let d1Status = 'connected';
  let kvStatus = 'connected';
  const errors: string[] = [];

  // Verify D1 with a trivial query — should always succeed if binding is live
  try {
    await env.DB.prepare('SELECT 1').run();
  } catch (err) {
    d1Status = 'error';
    errors.push(`D1 connection failed: ${String(err)}`);
  }

  // Verify KV with a read — a miss is fine, a binding error is not
  try {
    await env.RATE_LIMITS.get('_health');
  } catch (err) {
    kvStatus = 'error';
    errors.push(`KV connection failed: ${String(err)}`);
  }

  const healthy = errors.length === 0;

  if (!healthy) {
    return new Response(
      JSON.stringify({
        error: 'Service unavailable',
        details: errors.join('; '),
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  return new Response(
    JSON.stringify({
      status: 'ok',
      timestamp: new Date().toISOString(),
      d1: d1Status,
      kv: kvStatus,
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};
