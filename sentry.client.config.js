/** Load Sentry after idle so it never blocks first paint. */
function initSentry() {
  import("@sentry/astro").then((Sentry) => {
    Sentry.init({
      dsn: "https://1da08b6b01241f484b96747690384dec@o4511322198704128.ingest.us.sentry.io/4511345407688704",
      sendDefaultPii: true,
    });
  });
}

if (typeof window !== "undefined") {
  const run = () => initSentry();
  if ("requestIdleCallback" in window) {
    requestIdleCallback(run, { timeout: 8000 });
  } else {
    window.addEventListener("load", () => setTimeout(run, 2000), { once: true });
  }
}
