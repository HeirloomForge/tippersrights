/**
 * POST /api/stories/submit — Submit a tipping horror story.
 * Stories are stored with status='pending' for future curation (per D7).
 */
import type { Env } from '../../lib/env';
import { jsonResponse, errorResponse, rateLimitResponse } from '../../lib/response';
import { sanitizeString, validateLength } from '../../lib/validation';
import { hashIP } from '../../lib/security';
import { checkRateLimit, RATE_LIMIT_CONFIGS, rateLimitHeaders } from '../../lib/rate-limit';

const VALID_CATEGORIES = new Set([
  'Coffee Shop',
  'Self-Service',
  'Counter Service',
  'Pre-Packaged Food',
  'Drive-Through',
  'Events & Festivals',
  'Pickup Orders',
  'Double Tipping',
  'Retail',
  'Airports',
  'Entertainment',
  'Laundry',
  'Hotels',
  'Transportation',
  'Healthcare',
  'Other',
]);

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  let body: Record<string, unknown>;
  try {
    body = await request.json() as Record<string, unknown>;
  } catch {
    return errorResponse('Invalid JSON body', 'INVALID_JSON', 400);
  }

  const errors: Record<string, string> = {};

  const authorName = typeof body.authorName === 'string' ? sanitizeString(body.authorName) : '';
  const location = typeof body.location === 'string' ? sanitizeString(body.location) : '';
  const category = typeof body.category === 'string' ? sanitizeString(body.category) : '';
  const tipRequested = typeof body.tipRequested === 'string' ? sanitizeString(body.tipRequested) : '';
  const story = typeof body.story === 'string' ? sanitizeString(body.story) : '';

  if (authorName && !validateLength(authorName, 100)) {
    errors.authorName = 'Author name must be 100 characters or fewer';
  }
  if (location && !validateLength(location, 100)) {
    errors.location = 'Location must be 100 characters or fewer';
  }
  if (!VALID_CATEGORIES.has(category)) {
    errors.category = 'Invalid category';
  }
  if (tipRequested && !validateLength(tipRequested, 200)) {
    errors.tipRequested = 'Tip requested must be 200 characters or fewer';
  }
  if (!validateLength(story, 5000, 20)) {
    errors.story = 'Story must be between 20 and 5,000 characters';
  }

  if (Object.keys(errors).length > 0) {
    return errorResponse('Validation failed', 'VALIDATION_ERROR', 400, errors);
  }

  // Rate limiting
  const clientIP = request.headers.get('CF-Connecting-IP') || '0.0.0.0';
  const ipHash = await hashIP(clientIP);
  const rlConfig = RATE_LIMIT_CONFIGS['stories.submit'];
  const rlResult = await checkRateLimit(env.RATE_LIMITS, ipHash, 'stories.submit', rlConfig);

  if (!rlResult.allowed) {
    return rateLimitResponse(rlResult.resetAt - Math.floor(Date.now() / 1000));
  }

  // Insert with status='pending'
  const result = await env.DB.prepare(
    `INSERT INTO story_submissions (author_name, location, category, tip_requested, story, ip_hash, status)
     VALUES (?, ?, ?, ?, ?, ?, 'pending')`
  ).bind(
    authorName || null,
    location || null,
    category,
    tipRequested || null,
    story,
    ipHash
  ).run();

  const rlHeaders = rateLimitHeaders(rlConfig, rlResult);

  return jsonResponse(
    {
      id: result.meta.last_row_id,
      message: 'Your story has been submitted for review.',
    },
    201,
    rlHeaders
  );
};
