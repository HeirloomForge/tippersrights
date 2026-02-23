/**
 * Printful API client for order creation.
 * Uses raw fetch() — no SDK needed for the single endpoint we call.
 */

const PRINTFUL_API_BASE = 'https://api.printful.com';

export interface PrintfulRecipient {
  name: string;
  address1: string;
  address2?: string;
  city: string;
  state_code: string;
  country_code: string;
  zip: string;
}

export interface PrintfulItem {
  variant_id: number;
  quantity: number;
  name?: string;
}

export interface PrintfulOrderRequest {
  recipient: PrintfulRecipient;
  items: PrintfulItem[];
}

export interface PrintfulOrderResponse {
  code: number;
  result: {
    id: number;
    status: string;
  };
}

/**
 * Create an order in Printful.
 * When confirm=false (default), creates a draft order you can review in the Printful dashboard.
 * Set confirm=true for production to auto-start fulfillment.
 * Returns the Printful order ID on success, or throws on failure.
 */
export async function createPrintfulOrder(
  token: string,
  order: PrintfulOrderRequest,
  confirm = false
): Promise<number> {
  const response = await fetch(`${PRINTFUL_API_BASE}/orders?confirm=${confirm}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Printful API error (${response.status}): ${text}`);
  }

  const data = (await response.json()) as PrintfulOrderResponse;
  return data.result.id;
}
