import * as Sentry from "@sentry/astro";

Sentry.init({
  dsn: "https://1da08b6b01241f484b96747690384dec@o4511322198704128.ingest.us.sentry.io/4511345407688704",
  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/astro/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
});