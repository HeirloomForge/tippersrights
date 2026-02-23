/**
 * Env type interface for Cloudflare Pages Functions.
 * Bindings are declared in wrangler.jsonc and injected at runtime.
 * Secrets (Stripe, Printful) are set via `wrangler secret put`.
 */
export interface Env {
  DB: D1Database;
  RATE_LIMITS: KVNamespace;
  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
  PRINTFUL_API_TOKEN: string;
}
