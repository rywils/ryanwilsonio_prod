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
 * Path segment from a URL string without using `URL` (which normalizes away `..`).
 */
export function extractRawPathFromUrl(urlString: string): string {
  const withoutFragment = urlString.split("#", 1)[0] ?? urlString;
  const withoutQuery = withoutFragment.split("?", 1)[0] ?? withoutFragment;
  const schemeIdx = withoutQuery.indexOf("://");

  if (schemeIdx === -1) {
    return withoutQuery.startsWith("/") ? withoutQuery : `/${withoutQuery}`;
  }

  const pathStart = withoutQuery.indexOf("/", schemeIdx + 3);
  return pathStart === -1 ? "/" : withoutQuery.slice(pathStart);
}

/**
 * Strings to scan for traversal — raw URL/path first, then parsed parts.
 * `URL` and `location` normalize `..` away, so never rely on pathname alone.
 */
export function collectTraversalInspectionTargets(
  rawUrl: string,
  parsed?: Pick<URL, "pathname" | "search" | "hash" | "href">,
): string[] {
  const targets = [rawUrl, extractRawPathFromUrl(rawUrl)];

  if (parsed) {
    targets.push(parsed.pathname, parsed.search, parsed.hash, parsed.href);
    if (parsed.search || parsed.hash) {
      targets.push(`${parsed.pathname}${parsed.search}${parsed.hash}`);
    }
  }

  return targets;
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

export function hasTraversalInRequest(
  request: Request,
  parsedUrl?: URL,
): boolean {
  const url = parsedUrl ?? new URL(request.url);
  return collectTraversalInspectionTargets(request.url, url).some(
    hasPathTraversal,
  );
}

export function guardAgainstPathTraversal(): void {
  if (typeof window === "undefined") return;

  const { location } = window;
  const targets = collectTraversalInspectionTargets(location.href, {
    pathname: location.pathname,
    search: location.search,
    hash: location.hash,
    href: location.href,
  });

  if (!targets.some(hasPathTraversal)) return;

  const attemptedUrl = location.href;
  window.history.replaceState(null, "", "/");
  showTraversalPunishment(attemptedUrl);
}
