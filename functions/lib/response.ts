/**
 * Shared JSON response helpers for all API endpoints.
 * Every helper sets Content-Type: application/json.
 */

const JSON_HEADERS = {
  'Content-Type': 'application/json',
};

/** Standard success response wrapper. */
export function jsonResponse(
  data: unknown,
  status = 200,
  extraHeaders: Record<string, string> = {}
): Response {
  const body = JSON.stringify({
    data,
    meta: { timestamp: new Date().toISOString() },
  });

  return new Response(body, {
    status,
    headers: { ...JSON_HEADERS, ...extraHeaders },
  });
}

/** Standard error response wrapper. */
export function errorResponse(
  message: string,
  code: string,
  status = 400,
  details?: unknown
): Response {
  const body = JSON.stringify({
    error: message,
    code,
    ...(details !== undefined ? { details } : {}),
  });

  return new Response(body, {
    status,
    headers: JSON_HEADERS,
  });
}

/**
 * 429 rate-limit response.
 * @param retryAfter seconds until the client may retry
 */
export function rateLimitResponse(retryAfter = 3600): Response {
  const body = JSON.stringify({
    error: 'Too many requests',
    code: 'RATE_LIMITED',
    retryAfter,
  });

  return new Response(body, {
    status: 429,
    headers: {
      ...JSON_HEADERS,
      'Retry-After': String(retryAfter),
    },
  });
}
