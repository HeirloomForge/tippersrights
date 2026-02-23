/**
 * POST /api/petition/sign — Submit a petition signature.
 * Creates a signer record in D1 and returns a unique certificate ID.
 */
import type { Env } from '../../lib/env';
import { jsonResponse, errorResponse, rateLimitResponse } from '../../lib/response';
import { sanitizeString, validateRequired, validateEmail, validateLength } from '../../lib/validation';
import { hashIP } from '../../lib/security';
import { checkRateLimit, RATE_LIMIT_CONFIGS, rateLimitHeaders } from '../../lib/rate-limit';

const VALID_STATES = new Set([
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY','DC','AS','GU','MP','PR','VI',
]);

const ZIP_PATTERN = /^\d{5}$/;

function generateCertificateId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  let id = 'TBOR-';
  for (const b of bytes) {
    id += chars[b % chars.length];
  }
  return id;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  let body: Record<string, unknown>;
  try {
    body = await request.json() as Record<string, unknown>;
  } catch {
    return errorResponse('Invalid JSON body', 'INVALID_JSON', 400);
  }

  // Validate required fields
  const errors: Record<string, string> = {};

  const firstName = typeof body.firstName === 'string' ? sanitizeString(body.firstName) : '';
  const lastName = typeof body.lastName === 'string' ? sanitizeString(body.lastName) : '';
  const email = typeof body.email === 'string' ? sanitizeString(body.email) : '';
  const city = typeof body.city === 'string' ? sanitizeString(body.city) : '';
  const state = typeof body.state === 'string' ? sanitizeString(body.state).toUpperCase() : '';
  const zipCode = typeof body.zipCode === 'string' ? sanitizeString(body.zipCode) : '';

  if (!validateRequired(firstName) || !validateLength(firstName, 100)) {
    errors.firstName = 'First name is required (1-100 characters)';
  }
  if (!validateRequired(lastName) || !validateLength(lastName, 100)) {
    errors.lastName = 'Last name is required (1-100 characters)';
  }
  if (email && !validateEmail(email)) {
    errors.email = 'Invalid email format';
  }
  if (!validateRequired(city) || !validateLength(city, 100)) {
    errors.city = 'City is required (1-100 characters)';
  }
  if (!VALID_STATES.has(state)) {
    errors.state = 'Valid 2-letter US state code is required';
  }
  if (!ZIP_PATTERN.test(zipCode)) {
    errors.zipCode = 'Valid 5-digit zip code is required';
  }

  if (Object.keys(errors).length > 0) {
    return errorResponse('Validation failed', 'VALIDATION_ERROR', 400, errors);
  }

  // Rate limiting
  const clientIP = request.headers.get('CF-Connecting-IP') || '0.0.0.0';
  const ipHash = await hashIP(clientIP);
  const rlConfig = RATE_LIMIT_CONFIGS['petition.sign'];
  const rlResult = await checkRateLimit(env.RATE_LIMITS, ipHash, 'petition.sign', rlConfig);

  if (!rlResult.allowed) {
    return rateLimitResponse(rlResult.resetAt - Math.floor(Date.now() / 1000));
  }

  // Duplicate email check (only if email provided)
  if (email) {
    const existing = await env.DB.prepare(
      'SELECT id FROM petition_signers WHERE email = ?'
    ).bind(email).first();

    if (existing) {
      return errorResponse(
        'This email has already signed the petition',
        'DUPLICATE_EMAIL',
        409
      );
    }
  }

  // Generate certificate ID and insert
  const certificateId = generateCertificateId();
  const signedAt = new Date().toISOString();

  await env.DB.prepare(
    `INSERT INTO petition_signers (first_name, last_name, email, city, state, zip_code, certificate_id, ip_hash)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    firstName,
    lastName,
    email || null,
    city,
    state,
    zipCode,
    certificateId,
    ipHash
  ).run();

  // Invalidate cached count so next GET /count reflects the new signer
  await env.RATE_LIMITS.delete('petition:count');

  // Get total count
  const countResult = await env.DB.prepare(
    'SELECT COUNT(*) as total FROM petition_signers'
  ).first<{ total: number }>();
  const totalSigners = countResult?.total ?? 0;

  const rlHeaders = rateLimitHeaders(rlConfig, rlResult);

  return jsonResponse(
    {
      certificateId,
      signerName: `${firstName} ${lastName}`,
      signedAt,
      totalSigners,
    },
    201,
    rlHeaders
  );
};
