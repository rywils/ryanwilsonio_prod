/** Shared traversal punishment tokens — safe for middleware + client bundles. */
export const TRAVERSAL_PUNISHMENT_MESSAGE = "You shouldn't have done that.";
/** Static asset in `public/` — do not import `.webp` here (breaks Wrangler esbuild). */
export const SKULL_PUBLIC_URL = "/skull.webp";
export const SKULL_CURSOR_URL = "/cursors/skull-cursor.png";

export const STYLE_ID = "rw-traversal-punishment-styles";
export const MODAL_ID = "rw-traversal-modal";
export const SKULL_FLOOD_ID = "rw-skull-flood";
export const LULZ_STACK_CLASS = "rw-lulz-stack";
export const LULZ_MODAL_CLASS = "rw-lulz-modal";
export const CLUSTER_CLASS = "rw-traversal-modal__cluster";
export const ACTIVE_CLASS = "rw-traversal-punishment-active";
export const INVERTED_CLASS = "rw-traversal-inverted";
export const LULZ_MODAL_MAX = 100;
export const LULZ_INITIAL_DELAY_MIN_MS = 750;
export const LULZ_INITIAL_DELAY_MAX_MS = 1_600;
/** 0–2s: slow pop-ins. Then ramp → turbo. */
export const LULZ_SLOW_PHASE_MS = 2_000;
export const LULZ_SLOW_DELAY_MIN_MS = 500;
export const LULZ_SLOW_DELAY_MAX_MS = 720;
export const LULZ_RAMP_DURATION_MS = 3_500;
export const LULZ_RAMP_DELAY_START_MS = 360;
export const LULZ_RAMP_DELAY_END_MS = 24;
export const LULZ_ACCELERATION_POWER = 3;
export const LULZ_TURBO_AFTER_MS = LULZ_SLOW_PHASE_MS + LULZ_RAMP_DURATION_MS;
/** Turbo: still random per spawn, but capped in a fast band. */
export const LULZ_TURBO_DELAY_MIN_MS = 6;
export const LULZ_TURBO_DELAY_MAX_MS = 52;
export const GOTCHA_CONSOLE_DELAY_MS = 6_000;
export const INVERT_INTERVAL_MS = 2_000;
export const MAIN_MODAL_Z = 2_147_483_800;
export const PUNISHMENT_RED = {
  rgb: "255, 50, 50",
  rgbBright: "255, 85, 85",
  rgbDeep: "200, 30, 30",
  glow: "rgba(255, 50, 50, 0.4)",
  glowSoft: "rgba(255, 50, 50, 0.2)",
};

export const PUNISHMENT_CSS = `
html.${ACTIVE_CLASS} {
  --primary-blue: ${PUNISHMENT_RED.rgb};
  --primary-cyan: ${PUNISHMENT_RED.rgbBright};
  --primary-purple: ${PUNISHMENT_RED.rgb};
  --secondary-purple: ${PUNISHMENT_RED.rgbDeep};
  --secondary-pink: ${PUNISHMENT_RED.rgbBright};
  transition: filter 0.5s ease;
}
html.${ACTIVE_CLASS} .primary-purple,
html.${ACTIVE_CLASS} .secondary-pink {
  color: rgba(255, 50, 50, 0.9) !important;
}
html.${ACTIVE_CLASS} .glow-mixed-effect1,
html.${ACTIVE_CLASS} .glow-primary-blue,
html.${ACTIVE_CLASS} .glow-primary-purple,
html.${ACTIVE_CLASS} .glow-primary-betweenpurple,
html.${ACTIVE_CLASS} .glow-primary-pink,
html.${ACTIVE_CLASS} .glow-primary-orange,
html.${ACTIVE_CLASS} .glow-primary-green,
html.${ACTIVE_CLASS} .glow-secondary-purple,
html.${ACTIVE_CLASS} .glow-secondary-pink,
html.${ACTIVE_CLASS} [class*="glow-primary"]:not(.glow-grey) {
  box-shadow: 0 0 30px ${PUNISHMENT_RED.glow} !important;
}
html.${ACTIVE_CLASS} .glow-primary-bg-blue,
html.${ACTIVE_CLASS} .glow-primary-bg-green {
  box-shadow: 0 0 30px ${PUNISHMENT_RED.glowSoft} !important;
}
html.${ACTIVE_CLASS} .card-lift:hover {
  box-shadow:
    0 20px 40px -10px rgba(255, 50, 50, 0.3),
    0 0 30px rgba(255, 50, 50, 0.1) !important;
}
html.${ACTIVE_CLASS} .nav-logo img,
html.${ACTIVE_CLASS} .loader-segment,
html.${ACTIVE_CLASS} img[src*="Logo"],
html.${ACTIVE_CLASS} img[src*="rwlogo"],
html.${ACTIVE_CLASS} img[src*="logo.svg"] {
  filter: hue-rotate(145deg) saturate(1.35) brightness(1.05);
}
html.${ACTIVE_CLASS} .social__link {
  border-color: rgb(${PUNISHMENT_RED.rgb}) !important;
}
html.${ACTIVE_CLASS} .social-icon {
  background-color: transparent !important;
  mask-image: none !important;
  -webkit-mask-image: none !important;
}
html.${ACTIVE_CLASS} #${SKULL_FLOOD_ID} {
  display: grid;
  grid-template-columns: repeat(var(--skull-cols, 6), minmax(0, 1fr));
  gap: 1rem 0.75rem;
  width: 100%;
  padding: 1.75rem 1.25rem 5rem;
  min-height: 55vh;
  box-sizing: border-box;
}
html.${ACTIVE_CLASS} .rw-skull-tile {
  width: 100%;
  max-width: 5.5rem;
  height: auto;
  aspect-ratio: 1;
  object-fit: contain;
  justify-self: center;
  opacity: 0.92;
  pointer-events: none;
  user-select: none;
}
html.${ACTIVE_CLASS} .rw-skull-replaced-icon {
  display: inline-block;
  vertical-align: middle;
  object-fit: contain;
}
html.${ACTIVE_CLASS} #hero .skill img,
html.${ACTIVE_CLASS} #hero .rw-skull-replaced-icon {
  width: 70%;
  height: 70%;
  margin: 15%;
  max-width: none;
}
html.${ACTIVE_CLASS} .skill {
  border-color: rgb(${PUNISHMENT_RED.rgb}) !important;
  box-shadow: 0 0 14px color-mix(in srgb, rgb(${PUNISHMENT_RED.rgb}) 65%, transparent) !important;
}
html.${ACTIVE_CLASS} .astra-contact-btn,
html.${ACTIVE_CLASS} .astra-contact-btn--secondary,
html.${ACTIVE_CLASS} .astra-contact-btn--github {
  --cta-color: rgb(${PUNISHMENT_RED.rgb});
  --cta-shadow: ${PUNISHMENT_RED.glow};
  border-color: rgb(${PUNISHMENT_RED.rgb});
  color: rgb(${PUNISHMENT_RED.rgb});
}
html.${ACTIVE_CLASS}.${INVERTED_CLASS} {
  filter: invert(1) hue-rotate(180deg);
}
html.${ACTIVE_CLASS},
html.${ACTIVE_CLASS} * {
  cursor: url("${SKULL_CURSOR_URL}") 24 24, crosshair !important;
}
#${MODAL_ID} {
  position: fixed;
  inset: 0;
  z-index: ${MAIN_MODAL_Z};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  pointer-events: all;
}
#${MODAL_ID} .rw-traversal-modal__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.72);
}
#${MODAL_ID} .${LULZ_STACK_CLASS} {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  overflow: visible;
}
#${MODAL_ID} .${CLUSTER_CLASS} {
  position: relative;
  z-index: 2;
  width: min(92vw, 40rem);
  min-height: 14rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
#${MODAL_ID} .rw-traversal-modal__panel {
  position: relative;
  z-index: 1;
  max-width: 32rem;
  width: 100%;
  padding: 2rem 2.25rem;
  border-radius: 0.75rem;
  border: 2px solid rgb(var(--primary-blue));
  background: #0a0a0a;
  color: #f5f5f5;
  text-align: center;
  box-shadow: 0 0 40px ${PUNISHMENT_RED.glow};
  filter: invert(0);
}
html.${INVERTED_CLASS} #${MODAL_ID} .rw-traversal-modal__panel,
html.${INVERTED_CLASS} #${MODAL_ID} .${LULZ_MODAL_CLASS} {
  filter: invert(1) hue-rotate(180deg);
}
#${MODAL_ID} .rw-traversal-modal__message {
  margin: 0;
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: clamp(1.125rem, 3vw, 1.5rem);
  font-weight: 700;
  letter-spacing: 0.04em;
  line-height: 1.4;
}
#${MODAL_ID} .${LULZ_MODAL_CLASS} {
  position: absolute;
  margin: 0;
  padding: 0.85rem 1.35rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
  border: 2px solid rgb(var(--primary-blue));
  background: #0a0a0a;
  color: #f5f5f5;
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: clamp(0.95rem, 2.4vw, 1.2rem);
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  box-shadow: 0 0 28px ${PUNISHMENT_RED.glowSoft};
  pointer-events: none;
  min-width: 7.5rem;
  min-height: 3rem;
}
`;
