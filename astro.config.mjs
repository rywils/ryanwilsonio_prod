import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from '@astrojs/sitemap';
import sentry from '@sentry/astro';

export default defineConfig({
  site: 'https://ryanwilson.io',
  trailingSlash: 'never',
  build: {
    format: 'file'
  },
  output: 'static',

  vite: {
    plugins: [tailwindcss()],
    assetsInclude: ['**/*.glb', '**/*.gltf'],
  },

  integrations: [
    sitemap(),
    sentry({
      project: 'ryanwilsonio-astro',
      org: 'ryanwilsonio-sy',
      authToken: process.env.SENTRY_AUTH_TOKEN,
      bundleSizeOptimizations: {
        excludeDebugStatements: true,
        excludeReplayIframe: true,
        excludeReplayShadowDom: true,
        excludeReplayWorker: true,
      },
    }),
  ],
});
