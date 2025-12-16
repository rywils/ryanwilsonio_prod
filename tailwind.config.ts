/** @type {import('tailwindcss').Config} */
import animate from 'tailwindcss-animate'; // Plugin for animations

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Primary colors
        'primary-blue': '#00BFFF',
        'primary-green': '#00FF8D',
        
        // Secondary colors
        'secondary-purple': '#8A2BE2',
        'secondary-pink': '#FF007F',
        
        // Theme colors
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'var(--card-bg)',
        muted: {
          foreground: 'var(--muted-foreground)',
        },
      },
    },
  },
  plugins: [ animate, ],
}