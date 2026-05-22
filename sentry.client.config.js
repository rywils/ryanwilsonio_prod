import * as Sentry from "@sentry/astro";

function initSentry() {
  Sentry.init({
    dsn: "https://1da08b6b01241f484b96747690384dec@o4511322198704128.ingest.us.sentry.io/4511345407688704",
    sendDefaultPii: true,
  });
}

/** Defer Sentry so it does not compete with LCP / TBT on first paint. */
if (typeof window !== "undefined") {
  const run = () => initSentry();
  if ("requestIdleCallback" in window) {
    requestIdleCallback(run, { timeout: 4000 });
  } else {
    window.addEventListener("load", () => setTimeout(run, 1500), { once: true });
  }
}
