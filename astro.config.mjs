import { defineConfig, sessionDrivers, svgoOptimizer } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

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
  // In-memory sessions (no Cloudflare KV SESSION binding) for static + adapter builds
  session: {
    driver: sessionDrivers.lruCache({ max: 500 }),
  },

  experimental: {
    svgOptimizer: svgoOptimizer(),
  },

  vite: {
    plugins: [tailwindcss()],
        assetsInclude: ['**/*.glb', '**/*.gltf'],

  },

  integrations: [react(), sitemap(), sentry()],
});