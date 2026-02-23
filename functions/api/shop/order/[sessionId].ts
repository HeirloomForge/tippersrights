/**
 * GET /api/shop/order/:sessionId — Retrieve order status for the success page.
 * Queries D1 by stripe_session_id and returns order + items.
 */
import type { Env } from '../../../lib/env';
import { jsonResponse, errorResponse } from '../../../lib/response';

interface OrderRow {
  id: number;
  status: string;
  printful_status: string | null;
  amount_total: number;
  currency: string;
  created_at: string;
}

interface OrderItemRow {
  product_name: string;
  quantity: number;
  unit_price: number;
  size: string | null;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const sessionId = context.params.sessionId;

  if (!sessionId || typeof sessionId !== 'string') {
    return errorResponse('Session ID is required', 'MISSING_SESSION_ID', 400);
  }

  const order = await context.env.DB.prepare(
    'SELECT id, status, printful_status, amount_total, currency, created_at FROM orders WHERE stripe_session_id = ?'
  ).bind(sessionId).first<OrderRow>();

  if (!order) {
    return errorResponse('Order not found', 'ORDER_NOT_FOUND', 404);
  }

  const itemResults = await context.env.DB.prepare(
    'SELECT product_name, quantity, unit_price, size FROM order_items WHERE order_id = ?'
  ).bind(order.id).all<OrderItemRow>();

  const items = (itemResults.results || []).map((item) => ({
    name: item.product_name,
    quantity: item.quantity,
    price: item.unit_price / 100,
    size: item.size,
  }));

  return jsonResponse({
    orderId: order.id,
    status: order.status,
    printfulStatus: order.printful_status,
    items,
    total: order.amount_total / 100,
    createdAt: order.created_at,
  });
};
