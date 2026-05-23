export type TraversalAttemptSource = "middleware" | "client";

export type TraversalAttemptMeta = {
  ip: string;
  isp: string;
  origin: string;
  attemptedUrl: string;
  timestamp: string;
  source: TraversalAttemptSource;
};

type CfGeo = {
  asOrganization?: string;
};

export function extractTraversalRequestMeta(
  request: Request,
  cf: CfGeo | undefined,
  options: {
    source: TraversalAttemptSource;
    attemptedUrl?: string;
  },
): TraversalAttemptMeta {
  const url = new URL(request.url);
  const originHeader = request.headers.get("Origin");
  const referer = request.headers.get("Referer");

  const ip =
    request.headers.get("CF-Connecting-IP") ??
    request.headers.get("X-Forwarded-For")?.split(",")[0]?.trim() ??
    "Unknown";

  const isp = cf?.asOrganization?.trim() || "Unknown";

  const origin =
    originHeader?.trim() ||
    referer?.trim() ||
    url.origin ||
    "Unknown";

  return {
    ip,
    isp,
    origin,
    attemptedUrl: options.attemptedUrl?.trim() || url.href,
    timestamp: new Date().toISOString(),
    source: options.source,
  };
}

export function logTraversalAttempt(meta: TraversalAttemptMeta): void {
  console.log("[traversal_attempt]", JSON.stringify(meta));
}
