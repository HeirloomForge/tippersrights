/**
 * Input validation and sanitization utilities.
 * All functions are pure — no side effects, no I/O.
 */

/** Strip HTML/XML tags and trim surrounding whitespace. */
export function sanitizeString(value: string): string {
  return value.replace(/<[^>]*>/g, '').trim();
}

/** Return true if value is non-empty after trimming. */
export function validateRequired(value: string): boolean {
  return value.trim().length > 0;
}

/**
 * Basic RFC-5322 email validation.
 * Rejects anything missing a local part, @, or domain with a dot.
 */
export function validateEmail(email: string): boolean {
  // Keep it simple: local@domain.tld — no consecutive dots, reasonable length
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return pattern.test(email) && email.length <= 254;
}

/**
 * Validate string length (inclusive bounds).
 * @param min minimum allowed length (default 1)
 * @param max maximum allowed length
 */
export function validateLength(
  value: string,
  max: number,
  min = 1
): boolean {
  const len = value.trim().length;
  return len >= min && len <= max;
}
