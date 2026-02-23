/**
 * POST /api/businesses/apply — Submit a business certification application.
 * Phase 1: auto-approve on submission (per decision D6).
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

const VALID_CATEGORIES = new Set(['restaurant', 'cafe', 'retail', 'service']);
const ZIP_PATTERN = /^\d{5}$/;
const URL_PATTERN = /^https?:\/\/.+/;

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  let body: Record<string, unknown>;
  try {
    body = await request.json() as Record<string, unknown>;
  } catch {
    return errorResponse('Invalid JSON body', 'INVALID_JSON', 400);
  }

  const errors: Record<string, string> = {};

  const name = typeof body.name === 'string' ? sanitizeString(body.name) : '';
  const address = typeof body.address === 'string' ? sanitizeString(body.address) : '';
  const city = typeof body.city === 'string' ? sanitizeString(body.city) : '';
  const state = typeof body.state === 'string' ? sanitizeString(body.state).toUpperCase() : '';
  const zipCode = typeof body.zipCode === 'string' ? sanitizeString(body.zipCode) : '';
  const category = typeof body.category === 'string' ? sanitizeString(body.category).toLowerCase() : '';
  const website = typeof body.website === 'string' ? sanitizeString(body.website) : '';
  const contactEmail = typeof body.contactEmail === 'string' ? sanitizeString(body.contactEmail) : '';
  const contactName = typeof body.contactName === 'string' ? sanitizeString(body.contactName) : '';
  const livingWageCertified = body.livingWageCertified;
  const ethicalPosCertified = body.ethicalPosCertified;

  if (!validateRequired(name) || !validateLength(name, 200)) {
    errors.name = 'Business name is required (1-200 characters)';
  }
  if (!validateRequired(address) || !validateLength(address, 300)) {
    errors.address = 'Address is required (1-300 characters)';
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
  if (!VALID_CATEGORIES.has(category)) {
    errors.category = 'Category must be one of: restaurant, cafe, retail, service';
  }
  if (website && !URL_PATTERN.test(website)) {
    errors.website = 'Website must be a valid URL (https://...)';
  }
  if (!validateRequired(contactEmail) || !validateEmail(contactEmail)) {
    errors.contactEmail = 'Valid contact email is required';
  }
  if (!validateRequired(contactName) || !validateLength(contactName, 100)) {
    errors.contactName = 'Contact name is required (1-100 characters)';
  }
  if (livingWageCertified !== true) {
    errors.livingWageCertified = 'Living wage certification is required';
  }
  if (ethicalPosCertified !== true) {
    errors.ethicalPosCertified = 'Ethical POS certification is required';
  }

  if (Object.keys(errors).length > 0) {
    return errorResponse('Validation failed', 'VALIDATION_ERROR', 400, errors);
  }

  // Rate limiting
  const clientIP = request.headers.get('CF-Connecting-IP') || '0.0.0.0';
  const ipHash = await hashIP(clientIP);
  const rlConfig = RATE_LIMIT_CONFIGS['businesses.apply'];
  const rlResult = await checkRateLimit(env.RATE_LIMITS, ipHash, 'businesses.apply', rlConfig);

  if (!rlResult.allowed) {
    return rateLimitResponse(rlResult.resetAt - Math.floor(Date.now() / 1000));
  }

  // Duplicate check: same name + city + state (case insensitive)
  const existing = await env.DB.prepare(
    'SELECT id FROM businesses WHERE LOWER(name) = LOWER(?) AND LOWER(city) = LOWER(?) AND LOWER(state) = LOWER(?)'
  ).bind(name, city, state).first();

  if (existing) {
    return errorResponse(
      'A business with this name already exists in this location',
      'DUPLICATE_BUSINESS',
      409
    );
  }

  // Insert with auto-certification (Phase 1)
  const certifiedAt = new Date().toISOString();
  const result = await env.DB.prepare(
    `INSERT INTO businesses (name, address, city, state, zip_code, category, website, contact_email, contact_name, living_wage_certified, ethical_pos_certified, certification_status, certified_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 1, 'certified', ?)`
  ).bind(
    name, address, city, state, zipCode, category,
    website || null,
    contactEmail, contactName,
    certifiedAt
  ).run();

  const rlHeaders = rateLimitHeaders(rlConfig, rlResult);
  const insertedId = result.meta.last_row_id;

  return jsonResponse(
    {
      id: insertedId,
      name,
      certificationStatus: 'certified',
      certifiedAt,
    },
    201,
    rlHeaders
  );
};
