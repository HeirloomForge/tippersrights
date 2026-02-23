/**
 * GET /api/businesses/search — Search certified businesses.
 * Supports text search, location/category filters, and pagination.
 */
import type { Env } from '../../lib/env';
import { jsonResponse, errorResponse, rateLimitResponse } from '../../lib/response';
import { sanitizeString } from '../../lib/validation';
import { hashIP } from '../../lib/security';
import { checkRateLimit, RATE_LIMIT_CONFIGS, rateLimitHeaders } from '../../lib/rate-limit';

const VALID_CATEGORIES = new Set(['restaurant', 'cafe', 'retail', 'service']);

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  // Rate limiting
  const clientIP = request.headers.get('CF-Connecting-IP') || '0.0.0.0';
  const ipHash = await hashIP(clientIP);
  const rlConfig = RATE_LIMIT_CONFIGS['businesses.search'];
  const rlResult = await checkRateLimit(env.RATE_LIMITS, ipHash, 'businesses.search', rlConfig);

  if (!rlResult.allowed) {
    return rateLimitResponse(rlResult.resetAt - Math.floor(Date.now() / 1000));
  }

  const url = new URL(request.url);
  const q = url.searchParams.get('q')?.trim() || '';
  const city = url.searchParams.get('city')?.trim() || '';
  const state = url.searchParams.get('state')?.trim().toUpperCase() || '';
  const zip = url.searchParams.get('zip')?.trim() || '';
  const category = url.searchParams.get('category')?.trim().toLowerCase() || '';
  const page = Math.max(1, parseInt(url.searchParams.get('page') || '1', 10) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(url.searchParams.get('limit') || '20', 10) || 20));
  const offset = (page - 1) * limit;

  // Validate category if provided
  if (category && !VALID_CATEGORIES.has(category)) {
    return errorResponse('Invalid category', 'VALIDATION_ERROR', 400);
  }

  // Build dynamic query
  const conditions: string[] = ["certification_status = 'certified'"];
  const params: (string | number)[] = [];

  if (q) {
    const searchTerm = `%${sanitizeString(q)}%`;
    conditions.push('(LOWER(name) LIKE LOWER(?) OR LOWER(city) LIKE LOWER(?))');
    params.push(searchTerm, searchTerm);
  }

  if (city) {
    conditions.push('LOWER(city) LIKE LOWER(?)');
    params.push(`%${sanitizeString(city)}%`);
  }

  if (state) {
    conditions.push('UPPER(state) = ?');
    params.push(state);
  }

  if (zip) {
    conditions.push('zip_code = ?');
    params.push(sanitizeString(zip));
  }

  if (category) {
    conditions.push('LOWER(category) = ?');
    params.push(category);
  }

  const whereClause = conditions.join(' AND ');

  // Get total count for pagination
  const countQuery = `SELECT COUNT(*) as total FROM businesses WHERE ${whereClause}`;
  const countResult = await env.DB.prepare(countQuery).bind(...params).first<{ total: number }>();
  const total = countResult?.total ?? 0;
  const totalPages = Math.ceil(total / limit);

  // Get paginated results
  const dataQuery = `SELECT id, name, city, state, zip_code, category, website, living_wage_certified, ethical_pos_certified, certified_at
    FROM businesses WHERE ${whereClause}
    ORDER BY certified_at DESC
    LIMIT ? OFFSET ?`;

  const dataResult = await env.DB.prepare(dataQuery)
    .bind(...params, limit, offset)
    .all<{
      id: number;
      name: string;
      city: string;
      state: string;
      zip_code: string;
      category: string;
      website: string | null;
      living_wage_certified: number;
      ethical_pos_certified: number;
      certified_at: string;
    }>();

  // Map DB column names to API response field names
  const businesses = dataResult.results.map((row) => ({
    id: row.id,
    name: row.name,
    city: row.city,
    state: row.state,
    zipCode: row.zip_code,
    category: row.category,
    website: row.website,
    livingWageCertified: row.living_wage_certified === 1,
    ethicalPosCertified: row.ethical_pos_certified === 1,
    certifiedAt: row.certified_at,
  }));

  const rlHeaders = rateLimitHeaders(rlConfig, rlResult);

  return jsonResponse(
    {
      businesses,
      pagination: { page, limit, total, totalPages },
    },
    200,
    rlHeaders
  );
};
