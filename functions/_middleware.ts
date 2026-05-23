import { hasPathTraversal } from "../src/lib/pathTraversal";
import {
  extractTraversalRequestMeta,
  logTraversalAttempt,
} from "../src/lib/traversalAttempt";
import { buildTraversalBlockedHtml } from "../src/lib/traversalPunishment";

export async function onRequest(context: {
  request: Request & { cf?: { asOrganization?: string } };
  next: () => Promise<Response>;
}) {
  const url = new URL(context.request.url);
  const targets = [url.pathname, url.search, url.href];

  if (targets.some(hasPathTraversal)) {
    const meta = extractTraversalRequestMeta(context.request, context.request.cf, {
      source: "middleware",
      attemptedUrl: url.href,
    });

    logTraversalAttempt(meta);

    return new Response(buildTraversalBlockedHtml(meta), {
      status: 403,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  return context.next();
}
