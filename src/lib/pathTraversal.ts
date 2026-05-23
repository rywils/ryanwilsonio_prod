import { showTraversalPunishment } from "./traversalPunishment";

/** Unicode and encoded dot-like characters used to bypass `..` filters */
const UNICODE_DOT = /[\u002E\uFF0E\uFE52\u2024\u00B7\u2215\u2044]/g;

const TRAVERSAL_RE =
  /(?:\.\.|%2e%2e|%252e%252e|\uFF0E\uFF0E|%EF%BC%8E%EF%BC%8E|(?:%2e|\.){2}(?:%2f|%5c|\/|\\)?)/i;

function decodeRepeated(value: string, maxPasses = 4): string {
  let decoded = value;
  for (let i = 0; i < maxPasses; i++) {
    try {
      const next = decodeURIComponent(decoded.replace(/\+/g, " "));
      if (next === decoded) break;
      decoded = next;
    } catch {
      break;
    }
  }
  return decoded;
}

function normalizePathInput(value: string): string {
  return decodeRepeated(value).replace(UNICODE_DOT, ".").toLowerCase();
}

/**
 * Detects directory traversal in a URL path, query, hash, or other string.
 */
export function hasPathTraversal(input: string): boolean {
  if (!input) return false;

  const raw = input;
  const normalized = normalizePathInput(raw);

  if (TRAVERSAL_RE.test(raw) || TRAVERSAL_RE.test(normalized)) {
    return true;
  }

  if (/(?:^|[/\\])\.\.(?:[/\\]|$)/.test(normalized)) {
    return true;
  }

  return normalized.split(/[/\\]/).some((segment) => segment === "..");
}

export function guardAgainstPathTraversal(): void {
  if (typeof window === "undefined") return;

  const targets = [
    window.location.pathname,
    window.location.search,
    window.location.hash,
    window.location.href,
  ];

  if (!targets.some(hasPathTraversal)) return;

  const attemptedUrl = window.location.href;
  window.history.replaceState(null, "", "/");
  showTraversalPunishment(attemptedUrl);
}
