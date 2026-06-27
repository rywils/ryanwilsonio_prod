import {
  extractTraversalRequestMeta,
  logTraversalAttempt,
} from "../../src/lib/traversalAttempt";

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

type TraversalLogBody = {
  attemptedUrl?: string;
};

export const onRequestPost = async ({
  request,
}: {
  request: Request & { cf?: { asOrganization?: string } };
}) => {
  let body: TraversalLogBody = {};

  try {
    const contentType = request.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
      body = (await request.json()) as TraversalLogBody;
    }
  } catch {
    /* use defaults */
  }

  const meta = extractTraversalRequestMeta(request, request.cf, {
    source: "client",
    attemptedUrl: body.attemptedUrl,
  });

  logTraversalAttempt(meta);

  return json(meta);
};
