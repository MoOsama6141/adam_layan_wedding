import { useMemo } from 'react';

const MAX_LENGTH = 40;
const ALLOWED = /^[\p{L}\p{M}\p{N}\s.''’-]+$/u;

function sanitizeGuestName(raw: string | null): string | null {
  if (!raw) return null;

  let decoded = raw;
  try {
    decoded = decodeURIComponent(raw.replace(/\+/g, ' '));
  } catch {
    decoded = raw;
  }

  const trimmed = decoded.trim().slice(0, MAX_LENGTH);
  if (!trimmed || !ALLOWED.test(trimmed)) return null;

  return trimmed;
}

/**
 * Reads and sanitizes `?guest=` from the URL.
 * Kept separate from presentation components.
 */
export function useGuestName(search = typeof window !== 'undefined' ? window.location.search : ''): string | null {
  return useMemo(() => {
    const params = new URLSearchParams(search);
    return sanitizeGuestName(params.get('guest'));
  }, [search]);
}

export function buildGuestUrl(guestName: string | null, baseUrl?: string): string {
  const url = new URL(baseUrl ?? (typeof window !== 'undefined' ? window.location.href : 'https://example.com'));
  if (guestName) {
    url.searchParams.set('guest', guestName);
  } else {
    url.searchParams.delete('guest');
  }
  url.hash = '';
  return url.toString();
}

export { sanitizeGuestName };
