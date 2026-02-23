# Printful API Reference

**Source**: https://developers.printful.com/docs/
**Base URL**: `https://api.printful.com/`
**Rate Limit**: 120 API calls per minute (lower for mockup generation)
**Response Format**: JSON with `{ "code": 200, "result": {...}, "paging": {...} }` envelope

---

## Authentication

### Private Tokens (for TBOR)
Non-expiring tokens created in the Printful Developer Portal. Best for single-store integrations.

```
Authorization: Bearer {private_token}
```

### OAuth 2.0 (Public Apps)
For multi-user apps. Access tokens expire in 1 hour; refresh tokens valid 90 days.

**Authorization URL:**
```
GET https://www.printful.com/oauth/authorize?client_id={clientId}&state={state}&redirect_url={redirectUrl}
```

**Token Exchange:**
```
POST https://www.printful.com/oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&client_id={clientId}&client_secret={clientSecret}&code={authCode}
```

**Response:**
```json
{
  "access_token": "smk_...",
  "expires_at": "1562157895",
  "token_type": "bearer",
  "refresh_token": "902LmW0s..."
}
```

**Token Refresh:**
```
POST https://www.printful.com/oauth/token
grant_type=refresh_token&client_id={clientId}&client_secret={clientSecret}&refresh_token={refreshToken}
```

**Get Token Scopes:**
```
GET /oauth/scopes
Authorization: Bearer {access_token}
```

### Account-Level Tokens
Require store context header:
```
X-PF-Store-Id: {store_id}
```

### Scopes

| Scope | Type | Access |
|-------|------|--------|
| `orders` | Store/Account | Read + Write Orders |
| `orders/read` | Store/Account | Read-only Orders |
| `sync_products` | Store/Account | Read + Write Sync Products |
| `sync_products/read` | Store/Account | Read-only Sync Products |
| `file_library` | Store/Account | Read + Write File Library |
| `webhooks` | Store/Account | Read + Write Webhooks |
| `webhooks/read` | Store/Account | Read-only Webhooks |
| `product_templates` | Account | Read + Write Product Templates |

---

## Localization

Use `X-PF-Language` header for translated responses:
- `es_ES`, `fr_FR`, `de_DE`, etc.

---

## Catalog API

Browse Printful's product catalog. **Unauthenticated requests allowed** (30 req/60s limit).

### List Products
```
GET /products
```
**Query Params:**
- `category_id` (string, optional): Comma-separated Category IDs

### Get Product
```
GET /products/{id}
```
Returns product details + variants array.

### Get Variant
```
GET /products/variant/{id}
```
Returns variant info + parent product. **Always use Variant IDs (not Product IDs) when creating orders.**

### Get Product Size Guide
```
GET /products/{id}/sizes
```
**Query Params:**
- `unit` (string, optional): `inches` or `cm`

**Size Table Types:** `measure_yourself`, `product_measure`, `international`

**Important Notes:**
- Always use Variant IDs when creating products or orders
- Jewelry products are NOT supported via API
- Pricing reflects standard rates, not subscription discounts

---

## Orders API

Complete order lifecycle management. Requires `orders` or `orders/read` scope.

### List Orders
```
GET /orders
```
Supports pagination via `offset` and `limit` query params.

### Create Order
```
POST /orders
```
Creates a new order. Defaults to draft status unless `confirm: true` is passed.

**Request Body Example:**
```json
{
  "recipient": {
    "name": "John Doe",
    "address1": "123 Main St",
    "city": "Los Angeles",
    "state_code": "CA",
    "country_code": "US",
    "zip": "90001"
  },
  "items": [
    {
      "variant_id": 4018,
      "quantity": 1,
      "files": [
        {
          "url": "https://example.com/design.png"
        }
      ]
    }
  ]
}
```

### Get Order
```
GET /orders/{id}
```

### Update Order
```
PUT /orders/{id}
```

### Cancel Order
```
DELETE /orders/{id}
```

### Confirm Draft
```
POST /orders/{id}/confirm
```
Confirms a draft order for fulfillment.

### Estimate Costs
```
POST /orders/estimate
```
Returns cost estimate without creating an order. Same body format as Create Order.

---

## Products API (Sync Products)

Manage synchronized products in your Printful store. Requires `sync_products` scope.

### List Sync Products
```
GET /sync/products
```
**Query Params:** `offset`, `limit`

### Create Sync Product
```
POST /sync/products
```

### Get Sync Product
```
GET /sync/products/{id}
```

### Update Sync Product
```
PUT /sync/products/{id}
```

### Delete Sync Product
```
DELETE /sync/products/{id}
```

### Variant Operations

```
GET    /sync/products/{id}/variants/{variant_id}    # Get variant
POST   /sync/products/{id}/variants                  # Create variant
PUT    /sync/products/{id}/variants/{variant_id}    # Update variant
DELETE /sync/products/{id}/variants/{variant_id}    # Delete variant
```

---

## File Library API

Upload and manage print files. Requires `file_library` scope.

### Upload File
```
POST /files
```

### Get File
```
GET /files/{id}
```

---

## Shipping Rate API

### Calculate Shipping Rates
```
POST /shipping/rates
```
Returns available shipping methods and costs for a given order configuration.

---

## Mockup Generator API

Asynchronous mockup generation. **Lower rate limit than standard endpoints.**

### Create Mockup Task
```
POST /mockups
```
Initiates async mockup generation. Returns a task ID.

### Get Mockup Task Result
```
GET /mockups/{task_id}
```
Retrieves completed mockup images.

### Get Variant Printfiles
```
GET /products/variant/{id}/printfiles
```
Print file specifications for a variant.

### Get Layout Templates
```
GET /products/variant/{id}/templates
```
Available layout templates for product customization.

---

## Webhooks API

Event-driven notifications. Requires `webhooks` scope.

### Get Webhook Config
```
GET /webhooks
```

### Set Up Webhooks
```
POST /webhooks
```

### Disable Webhooks
```
DELETE /webhooks
```

### Supported Events

| Event | Description |
|-------|-------------|
| `package_shipped` | Package has been shipped |
| `package_returned` | Package was returned |
| `order_created` | New order created |
| `order_updated` | Order details changed |
| `order_failed` | Order fulfillment failed |
| `order_canceled` | Order was canceled |
| `product_synced` | Product synced to store |
| `product_updated` | Product details updated |
| `product_deleted` | Product removed |
| `stock_updated` | Stock levels changed |
| `order_put_hold` | Order placed on hold |
| `order_put_hold_approval` | Hold requires approval |
| `order_remove_hold` | Hold removed from order |
| `order_refunded` | Order was refunded |

---

## TBOR Integration Notes

**Our stack**: Cloudflare Workers (Pages Functions) → Printful API
**Auth method**: Private token stored as Cloudflare secret
**Use case**: Print-on-demand merchandise for "The Arsenal" shop
**Payment flow**: Stripe Checkout → Cloudflare Worker → Printful Order API
**Key integration points**:
1. Product catalog sync (list available merch)
2. Order creation after Stripe payment confirmation
3. Webhook handling for shipment/status updates
4. Shipping rate calculation for checkout
