import { defineMiddleware } from "astro:middleware";
import { hasTraversalInRequest } from "./lib/pathTraversal";
import { extractTraversalRequestMeta, logTraversalAttempt } from "./lib/traversalAttempt";
import { buildTraversalBlockedHtml } from "./lib/traversalPunishmentRunner";

/** Mirrors Cloudflare `functions/_middleware.ts` during `astro dev`. */
export const onRequest = defineMiddleware(async (context, next) => {
  if (!hasTraversalInRequest(context.request, context.url)) {
    return next();
  }

  const meta = extractTraversalRequestMeta(context.request, undefined, {
    source: "middleware",
    attemptedUrl: context.request.url,
  });

  logTraversalAttempt(meta);

  return new Response(buildTraversalBlockedHtml(meta), {
    status: 403,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
});
