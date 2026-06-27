import { hasTraversalInRequest } from "../src/lib/pathTraversal";
import {
  extractTraversalRequestMeta,
  logTraversalAttempt,
} from "../src/lib/traversalAttempt";
import { buildTraversalBlockedHtml } from "../src/lib/traversalPunishmentRunner";

export async function onRequest(context: {
  request: Request & { cf?: { asOrganization?: string } };
  next: () => Promise<Response>;
}) {
  if (hasTraversalInRequest(context.request)) {
    const meta = extractTraversalRequestMeta(context.request, context.request.cf, {
      source: "middleware",
      attemptedUrl: context.request.url,
    });

    logTraversalAttempt(meta);

    return new Response(buildTraversalBlockedHtml(meta), {
      status: 403,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  return context.next();
}
