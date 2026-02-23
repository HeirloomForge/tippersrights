/**
 * Env type interface for Cloudflare Pages Functions.
 * Bindings are declared in wrangler.jsonc and injected at runtime.
 */
export interface Env {
  DB: D1Database;
  RATE_LIMITS: KVNamespace;
}
