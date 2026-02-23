/**
 * Security utilities for Cloudflare Workers (Web Crypto API only — no Node.js).
 */

/**
 * Hash an IP address with SHA-256.
 * Returns a lowercase hex string. Never stores raw IPs.
 */
export async function hashIP(ip: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(ip);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}
