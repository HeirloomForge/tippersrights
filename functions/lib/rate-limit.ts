/**
 * KV-based rate limiting for Cloudflare Workers.
 *
 * Strategy: sliding fixed-window using a window ID derived from current time.
 * Key pattern: rate:{ipHash}:{endpoint}:{windowId}
 * TTL matches window duration — entries auto-expire, no cleanup required.
 *
 * KV is not atomic, so concurrent requests may slightly over-count.
 * That is acceptable for rate limiting — the protection is still effective.
 */

export interface RateLimitConfig {
  /** Maximum requests allowed in the window. */
  limit: number;
  /** Window duration in seconds. */
  windowSeconds: number;
}

export interface RateLimitResult {
  allowed: boolean;
  /** Requests remaining after this one is counted. */
  remaining: number;
  /** Unix timestamp (seconds) when the current window resets. */
  resetAt: number;
}

/**
 * Per-endpoint rate limit configurations (from TBOR-A-3).
 * Keyed by the endpoint identifier used in KV keys.
 */
export const RATE_LIMIT_CONFIGS: Record<string, RateLimitConfig> = {
  'petition.sign': { limit: 3, windowSeconds: 3600 },       // 3/hr
  'businesses.search': { limit: 30, windowSeconds: 60 },    // 30/min
  'stories.submit': { limit: 5, windowSeconds: 3600 },      // 5/hr
  'businesses.apply': { limit: 2, windowSeconds: 86400 },   // 2/day
  'shop.checkout': { limit: 10, windowSeconds: 3600 },      // 10/hr
};

/**
 * Check and increment the rate limit counter for a given IP + endpoint.
 *
 * @param kv       - The RATE_LIMITS KV namespace binding
 * @param ipHash   - SHA-256 hex hash of the client IP (never store raw IPs)
 * @param endpoint - Endpoint identifier matching a key in RATE_LIMIT_CONFIGS
 * @param config   - Limit and window duration for this endpoint
 * @returns RateLimitResult with allowed flag, remaining count, and reset timestamp
 */
export async function checkRateLimit(
  kv: KVNamespace,
  ipHash: string,
  endpoint: string,
  config: RateLimitConfig
): Promise<RateLimitResult> {
  const windowMs = config.windowSeconds * 1000;
  const windowId = Math.floor(Date.now() / windowMs);
  const windowStartMs = windowId * windowMs;
  const resetAt = Math.floor((windowStartMs + windowMs) / 1000);

  const key = `rate:${ipHash}:${endpoint}:${windowId}`;

  // Read current count for this window
  const current = await kv.get(key);
  const count = current !== null ? parseInt(current, 10) : 0;

  if (count >= config.limit) {
    return { allowed: false, remaining: 0, resetAt };
  }

  // Increment counter and set TTL so entry auto-expires after the window ends
  const nextCount = count + 1;
  await kv.put(key, String(nextCount), { expirationTtl: config.windowSeconds });

  return {
    allowed: true,
    remaining: config.limit - nextCount,
    resetAt,
  };
}

/**
 * Build the rate-limit headers to attach to API responses.
 * Includes X-RateLimit-* on all responses; adds Retry-After on 429s.
 */
export function rateLimitHeaders(
  config: RateLimitConfig,
  result: RateLimitResult
): Record<string, string> {
  const headers: Record<string, string> = {
    'X-RateLimit-Limit': String(config.limit),
    'X-RateLimit-Remaining': String(result.remaining),
    'X-RateLimit-Reset': String(result.resetAt),
  };

  if (!result.allowed) {
    const retryAfter = result.resetAt - Math.floor(Date.now() / 1000);
    headers['Retry-After'] = String(Math.max(retryAfter, 1));
  }

  return headers;
}
