import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";

import react from "@astrojs/react";

import sitemap from '@astrojs/sitemap';

import sentry from '@sentry/astro';

export default defineConfig({
  site: 'https://ryanwilson.io',
  trailingSlash: 'never',
  build: {
    format: 'file'
  },
  output: 'static',
  // Disable Cloudflare KV-backed sessions (not used) to avoid requiring a SESSION binding
  session: {
    driver: 'memory',
  },

  vite: {
    plugins: [tailwindcss()],
        assetsInclude: ['**/*.glb', '**/*.gltf'],

  },

  adapter: cloudflare({
    imageService: 'compile'
  }),
  integrations: [react(), sitemap(), sentry()],
});