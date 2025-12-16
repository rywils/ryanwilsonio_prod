// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";
import maintenance from "astro-maintenance";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: 'server',

  vite: {
    plugins: [tailwindcss()],
        assetsInclude: ['**/*.glb', '**/*.gltf'],

  },

  adapter: cloudflare(),
  integrations: [maintenance({
    enabled: false,
    template: "construction", // 'simple', 'countdown', 'construction'
    title: "Ryan Wilson",
    description: "Launch will be in just a few days after a complete rehaul.",
    override: "preview", // Access site with ?preview
    emailAddress: "mail@ryanwilson.io",
    logo: "/apple-touch-icon.png",
    countdown: "2025-11-05T11:59:00Z",
    socials: {
      linkedin: "https://www.linkedin.com/in/rywils/",
      x: "https://x.com/regded_",
      github: "https://github.com/rywils",
    },
  }), react()],
});