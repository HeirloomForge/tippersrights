/**
 * GET /api/businesses/:id — Single certified business detail.
 * Dynamic route: [id].ts maps to /api/businesses/:id
 */
import type { Env } from '../../lib/env';
import { jsonResponse, errorResponse } from '../../lib/response';

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env, params } = context;

  const id = parseInt(params.id as string, 10);
  if (isNaN(id) || id < 1) {
    return errorResponse('Invalid business ID', 'INVALID_ID', 400);
  }

  const row = await env.DB.prepare(
    `SELECT id, name, address, city, state, zip_code, category, website,
            living_wage_certified, ethical_pos_certified, certified_at
     FROM businesses
     WHERE id = ? AND certification_status = 'certified'`
  ).bind(id).first<{
    id: number;
    name: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    category: string;
    website: string | null;
    living_wage_certified: number;
    ethical_pos_certified: number;
    certified_at: string;
  }>();

  if (!row) {
    return errorResponse('Business not found', 'NOT_FOUND', 404);
  }

  return jsonResponse({
    id: row.id,
    name: row.name,
    address: row.address,
    city: row.city,
    state: row.state,
    zipCode: row.zip_code,
    category: row.category,
    website: row.website,
    livingWageCertified: row.living_wage_certified === 1,
    ethicalPosCertified: row.ethical_pos_certified === 1,
    certifiedAt: row.certified_at,
  });
};
