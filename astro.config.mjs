import { defineConfig } from "astro/config";
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

  vite: {
    plugins: [tailwindcss()],
    assetsInclude: ['**/*.glb', '**/*.gltf'],
    // Pre-warm deps so the first dev-server scan doesn’t re-optimize, reload, and
    // briefly 404 stale hashed chunks (e.g. audit-*.js under node_modules/.vite/deps).
    optimizeDeps: {
      include: [
        '@sentry/astro',
        'gsap',
        'gsap/ScrollTrigger',
        'astro/virtual-modules/transitions-router.js',
        'astro/virtual-modules/transitions-types.js',
        'astro/virtual-modules/transitions-events.js',
        'astro/virtual-modules/transitions-swap-functions.js',
      ],
    },
  },

  integrations: [
    react(),
    sitemap(),
    sentry({
      project: 'ryanwilsonio-astro',
      org: 'ryanwilsonio-sy',
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
  ],
});