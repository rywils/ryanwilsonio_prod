import type { TraversalAttemptMeta } from "./traversalAttempt";
import skullAssetUrl from "@/assets/skull.webp";

export const TRAVERSAL_PUNISHMENT_MESSAGE = "You shouldn't have done that.";
export const SKULL_PUBLIC_URL = "/skull.webp";
export const SKULL_CURSOR_URL = "/cursors/skull-cursor.png";

const STYLE_ID = "rw-traversal-punishment-styles";
const MODAL_ID = "rw-traversal-modal";
const SKULL_FLOOD_ID = "rw-skull-flood";
const LULZ_STACK_CLASS = "rw-lulz-stack";
const LULZ_MODAL_CLASS = "rw-lulz-modal";
const CLUSTER_CLASS = "rw-traversal-modal__cluster";
const ACTIVE_CLASS = "rw-traversal-punishment-active";
const INVERTED_CLASS = "rw-traversal-inverted";
const LULZ_MODAL_MAX = 100;
const LULZ_INITIAL_DELAY_MIN_MS = 750;
const LULZ_INITIAL_DELAY_MAX_MS = 1_600;
/** 0–2s: slow pop-ins. Then ramp → turbo. */
const LULZ_SLOW_PHASE_MS = 2_000;
const LULZ_SLOW_DELAY_MIN_MS = 500;
const LULZ_SLOW_DELAY_MAX_MS = 720;
const LULZ_RAMP_DURATION_MS = 3_500;
const LULZ_RAMP_DELAY_START_MS = 360;
const LULZ_RAMP_DELAY_END_MS = 24;
const LULZ_ACCELERATION_POWER = 3;
const LULZ_TURBO_AFTER_MS = LULZ_SLOW_PHASE_MS + LULZ_RAMP_DURATION_MS;
/** Turbo: still random per spawn, but capped in a fast band. */
const LULZ_TURBO_DELAY_MIN_MS = 6;
const LULZ_TURBO_DELAY_MAX_MS = 52;
const GOTCHA_CONSOLE_DELAY_MS = 6_000;
const INVERT_INTERVAL_MS = 2_000;
const MAIN_MODAL_Z = 2_147_483_800;
const PUNISHMENT_RED = {
  rgb: "255, 50, 50",
  rgbBright: "255, 85, 85",
  rgbDeep: "200, 30, 30",
  glow: "rgba(255, 50, 50, 0.4)",
  glowSoft: "rgba(255, 50, 50, 0.2)",
};

const PUNISHMENT_CSS = `
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

declare global {
  interface Window {
    __rwTraversalPunishmentActive?: boolean;
    __rwLulzSpamActive?: boolean;
    __rwSkullFloodResizeBound?: boolean;
    __rwGotchaLogged?: boolean;
    whenPageRevealed?: (fn: () => void) => void;
  }
}

function injectStyles(): void {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = PUNISHMENT_CSS;
  document.head.appendChild(style);
}

function blockContextMenu(event: Event): void {
  event.preventDefault();
}

function startPunishmentInputLockdown(): void {
  document.addEventListener("contextmenu", blockContextMenu, { capture: true });
}

function startColorInversion(): void {
  document.documentElement.classList.add(ACTIVE_CLASS);
  startPunishmentInputLockdown();
  window.setInterval(() => {
    document.documentElement.classList.toggle(INVERTED_CLASS);
  }, INVERT_INTERVAL_MS);
}

function scheduleGotchaConsoleLog(): void {
  if (window.__rwGotchaLogged) return;

  const logGotcha = (): void => {
    if (window.__rwGotchaLogged) return;
    window.__rwGotchaLogged = true;
    while(true) {
    console.log("You t");
    }
  };

  const runAfterLoad = (): void => {
    window.setTimeout(logGotcha, GOTCHA_CONSOLE_DELAY_MS);
  };

  if (typeof window.whenPageRevealed === "function") {
    window.whenPageRevealed(runAfterLoad);
    return;
  }

  if (document.readyState === "complete") {
    runAfterLoad();
    return;
  }

  window.addEventListener("load", runAfterLoad, { once: true });
}

/** Inline Gotcha console log for middleware 403 pages. */
function buildGotchaConsoleSnippet(): string {
  return `
  function rwScheduleGotchaLog() {
    if (window.__rwGotchaLogged) return;
    function logGotcha() {
      if (window.__rwGotchaLogged) return;
      window.__rwGotchaLogged = true;
      console.log("Gotcha");
    }
    function runAfterLoad() {
      setTimeout(logGotcha, ${GOTCHA_CONSOLE_DELAY_MS});
    }
    if (typeof window.whenPageRevealed === "function") {
      window.whenPageRevealed(runAfterLoad);
      return;
    }
    if (document.readyState === "complete") {
      runAfterLoad();
      return;
    }
    window.addEventListener("load", runAfterLoad, { once: true });
  }`;
}

function getHeroRootInMain(): HTMLElement | null {
  const hero = document.getElementById("hero");
  if (!hero) return null;

  let node: HTMLElement | null = hero;
  while (node.parentElement && node.parentElement.id !== "main-content") {
    node = node.parentElement;
  }

  return node?.parentElement?.id === "main-content" ? node : null;
}

function hideContentBelowHero(): void {
  const main = document.getElementById("main-content");
  const heroRoot = getHeroRootInMain();
  if (!main || !heroRoot) return;

  for (const child of Array.from(main.children)) {
    const el = child as HTMLElement;
    if (el === heroRoot) continue;
    el.setAttribute("data-rw-skull-hidden", "1");
    el.hidden = true;
  }

  const footer = document.querySelector("#documentContainer > footer");
  if (footer instanceof HTMLElement) {
    footer.setAttribute("data-rw-skull-hidden", "1");
    footer.hidden = true;
  }
}

function replaceSvgWithSkull(svg: SVGElement, skullUrl: string): void {
  const rect = svg.getBoundingClientRect();
  const img = document.createElement("img");
  img.src = skullUrl;
  img.alt = "";
  img.className = "rw-skull-replaced-icon";
  const size = Math.max(12, Math.round(rect.width || rect.height || 16));
  img.width = size;
  img.height = size;
  img.style.width = `${size}px`;
  img.style.height = `${size}px`;
  svg.replaceWith(img);
}

function replaceIconsWithSkull(skullUrl: string, root: ParentNode): void {
  root.querySelectorAll("img").forEach((img) => {
    if (img.closest(`#${MODAL_ID}`) || img.closest(`#${SKULL_FLOOD_ID}`)) return;
    img.src = skullUrl;
    img.removeAttribute("srcset");
    img.removeAttribute("sizes");
  });

  root.querySelectorAll(".social-icon").forEach((el) => {
    const span = el as HTMLElement;
    const img = document.createElement("img");
    img.src = skullUrl;
    img.alt = "";
    img.className = "rw-skull-replaced-icon";
    img.width = 16;
    img.height = 16;
    span.replaceWith(img);
  });

  root
    .querySelectorAll(
      "#hero svg, nav svg, #documentContainer header svg",
    )
    .forEach((node) => {
      const svg = node as SVGElement;
      if (svg.closest(`#${MODAL_ID}`)) return;
      replaceSvgWithSkull(svg, skullUrl);
    });
}

function fillSkullFlood(container: HTMLElement, skullUrl: string): void {
  const tileSize = 88;
  const gap = 12;
  const main = document.getElementById("main-content");
  const hero = document.getElementById("hero");
  const width = main?.clientWidth ?? container.clientWidth ?? window.innerWidth;
  const cols = Math.max(3, Math.floor((width + gap) / (tileSize + gap)));
  const heroBottom = hero?.getBoundingClientRect().bottom ?? 0;
  const availableHeight = Math.max(
    window.innerHeight - heroBottom + window.scrollY,
    window.innerHeight * 0.45,
  );
  const rows = Math.ceil(availableHeight / (tileSize + gap)) + 2;
  const count = cols * rows;

  if (container.dataset.skullCount === String(count)) {
    container.style.setProperty("--skull-cols", String(cols));
    return;
  }

  container.dataset.skullCount = String(count);
  container.style.setProperty("--skull-cols", String(cols));
  container.replaceChildren();

  for (let i = 0; i < count; i += 1) {
    const img = document.createElement("img");
    img.src = skullUrl;
    img.alt = "";
    img.className = "rw-skull-tile";
    img.width = tileSize;
    img.height = tileSize;
    img.decoding = "async";
    img.loading = "eager";
    container.appendChild(img);
  }
}

function mountSkullFlood(skullUrl: string): void {
  const main = document.getElementById("main-content");
  if (!main) return;

  let flood = document.getElementById(SKULL_FLOOD_ID);
  if (!flood) {
    flood = document.createElement("div");
    flood.id = SKULL_FLOOD_ID;
    flood.className = "rw-skull-flood";
    flood.setAttribute("aria-hidden", "true");

    const heroRoot = getHeroRootInMain();
    if (heroRoot?.nextSibling) {
      main.insertBefore(flood, heroRoot.nextSibling);
    } else {
      main.appendChild(flood);
    }
  }

  fillSkullFlood(flood, skullUrl);

  if (!window.__rwSkullFloodResizeBound) {
    window.__rwSkullFloodResizeBound = true;
    window.addEventListener("resize", () => {
      const el = document.getElementById(SKULL_FLOOD_ID);
      if (el) fillSkullFlood(el, skullUrl);
    });
  }
}

function applySkullTakeover(skullUrl: string): void {
  if (!document.getElementById("main-content")) return;

  hideContentBelowHero();
  const scope = document.getElementById("documentContainer") ?? document.body;
  replaceIconsWithSkull(skullUrl, scope);
  mountSkullFlood(skullUrl);
}

function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function nextLulzSpawnDelayMs(spamStartedAt: number): number {
  const elapsed = Date.now() - spamStartedAt;

  if (elapsed < LULZ_SLOW_PHASE_MS) {
    return Math.round(
      randomBetween(LULZ_SLOW_DELAY_MIN_MS, LULZ_SLOW_DELAY_MAX_MS),
    );
  }

  if (elapsed >= LULZ_TURBO_AFTER_MS) {
    const base = randomBetween(LULZ_TURBO_DELAY_MIN_MS, LULZ_TURBO_DELAY_MAX_MS);
    const jitter = randomBetween(0.72, 1.38);
    return Math.max(4, Math.round(base * jitter));
  }

  const rampProgress = Math.min(
    1,
    (elapsed - LULZ_SLOW_PHASE_MS) / LULZ_RAMP_DURATION_MS,
  );
  const eased = rampProgress ** LULZ_ACCELERATION_POWER;
  const base =
    LULZ_RAMP_DELAY_START_MS -
    (LULZ_RAMP_DELAY_START_MS - LULZ_RAMP_DELAY_END_MS) * eased;
  const jitter = randomBetween(0.88, 1.12);
  return Math.max(LULZ_RAMP_DELAY_END_MS, Math.round(base * jitter));
}

function initialLulzDelayMs(): number {
  return Math.round(
    randomBetween(LULZ_INITIAL_DELAY_MIN_MS, LULZ_INITIAL_DELAY_MAX_MS),
  );
}

function spawnLulzModal(stack: HTMLElement, index: number): void {
  const modal = document.createElement("div");
  modal.className = LULZ_MODAL_CLASS;
  modal.textContent = "Lulz";

  const width = 110 + Math.random() * 90;
  const height = 44 + Math.random() * 28;
  const edgePad = 12;
  const maxLeft = Math.max(edgePad, window.innerWidth - width - edgePad);
  const maxTop = Math.max(edgePad, window.innerHeight - height - edgePad);
  const left = edgePad + Math.random() * (maxLeft - edgePad);
  const top = edgePad + Math.random() * (maxTop - edgePad);
  const rotation = (Math.random() - 0.5) * 12;

  modal.style.width = `${width}px`;
  modal.style.minHeight = `${height}px`;
  modal.style.left = `${left}px`;
  modal.style.top = `${top}px`;
  modal.style.zIndex = String(index);
  modal.style.transform = `rotate(${rotation}deg)`;

  stack.appendChild(modal);
}

function startLulzModalSpam(lulzStack: HTMLElement): void {
  if (typeof document === "undefined") return;
  if (window.__rwLulzSpamActive) return;

  window.__rwLulzSpamActive = true;
  lulzStack.setAttribute("aria-hidden", "true");

  let count = 0;
  let spamStartedAt: number | null = null;

  const spawnNext = (): void => {
    if (count >= LULZ_MODAL_MAX) return;

    if (spamStartedAt === null) {
      spamStartedAt = Date.now();
    }

    spawnLulzModal(lulzStack, count);
    count += 1;

    if (count < LULZ_MODAL_MAX && spamStartedAt !== null) {
      window.setTimeout(
        spawnNext,
        nextLulzSpawnDelayMs(spamStartedAt),
      );
    }
  };

  window.setTimeout(spawnNext, initialLulzDelayMs());
}

/** Shared inline Lulz spam logic for middleware 403 pages. */
function buildLulzSpamRunnerSnippet(): string {
  return `
  function rwRand(min, max) { return min + Math.random() * (max - min); }
  function rwNextLulzDelay(spamStartedAt) {
    var elapsed = Date.now() - spamStartedAt;
    if (elapsed < ${LULZ_SLOW_PHASE_MS}) {
      return Math.round(rwRand(${LULZ_SLOW_DELAY_MIN_MS}, ${LULZ_SLOW_DELAY_MAX_MS}));
    }
    if (elapsed >= ${LULZ_TURBO_AFTER_MS}) {
      var turboBase = rwRand(${LULZ_TURBO_DELAY_MIN_MS}, ${LULZ_TURBO_DELAY_MAX_MS});
      var turboJitter = 0.72 + Math.random() * 0.66;
      return Math.max(4, Math.round(turboBase * turboJitter));
    }
    var rampProgress = Math.min(1, (elapsed - ${LULZ_SLOW_PHASE_MS}) / ${LULZ_RAMP_DURATION_MS});
    var eased = Math.pow(rampProgress, ${LULZ_ACCELERATION_POWER});
    var base = ${LULZ_RAMP_DELAY_START_MS} -
      (${LULZ_RAMP_DELAY_START_MS} - ${LULZ_RAMP_DELAY_END_MS}) * eased;
    var jitter = 0.88 + Math.random() * 0.24;
    return Math.max(${LULZ_RAMP_DELAY_END_MS}, Math.round(base * jitter));
  }
  function rwSpawnLulz(stack, index) {
    var lw = 110 + Math.random() * 90;
    var lh = 44 + Math.random() * 28;
    var pad = 12;
    var maxL = Math.max(pad, window.innerWidth - lw - pad);
    var maxT = Math.max(pad, window.innerHeight - lh - pad);
    var left = pad + Math.random() * (maxL - pad);
    var top = pad + Math.random() * (maxT - pad);
    var lulz = document.createElement("div");
    lulz.className = ${JSON.stringify(LULZ_MODAL_CLASS)};
    lulz.textContent = "Lulz";
    lulz.style.width = lw + "px";
    lulz.style.minHeight = lh + "px";
    lulz.style.left = left + "px";
    lulz.style.top = top + "px";
    lulz.style.zIndex = String(index);
    lulz.style.transform = "rotate(" + ((Math.random() - 0.5) * 12).toFixed(2) + "deg)";
    stack.appendChild(lulz);
  }
  function rwStartLulzSpam(stack) {
    if (window.__rwLulzSpamActive || !stack) return;
    window.__rwLulzSpamActive = true;
    stack.setAttribute("aria-hidden", "true");
    var count = 0;
    var max = ${LULZ_MODAL_MAX};
    var spamStartedAt = null;
    function spawnNext() {
      if (count >= max) return;
      if (spamStartedAt === null) spamStartedAt = Date.now();
      rwSpawnLulz(stack, count);
      count++;
      if (count < max) setTimeout(spawnNext, rwNextLulzDelay(spamStartedAt));
    }
    setTimeout(
      spawnNext,
      Math.round(rwRand(${LULZ_INITIAL_DELAY_MIN_MS}, ${LULZ_INITIAL_DELAY_MAX_MS}))
    );
  }`;
}

function createModalShell(): {
  overlay: HTMLDivElement;
  lulzStack: HTMLDivElement;
} {
  const overlay = document.createElement("div");
  overlay.id = MODAL_ID;
  overlay.setAttribute("role", "alertdialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-live", "assertive");

  const backdrop = document.createElement("div");
  backdrop.className = "rw-traversal-modal__backdrop";
  backdrop.setAttribute("aria-hidden", "true");

  const cluster = document.createElement("div");
  cluster.className = CLUSTER_CLASS;

  const lulzStack = document.createElement("div");
  lulzStack.className = LULZ_STACK_CLASS;

  const panel = document.createElement("div");
  panel.className = "rw-traversal-modal__panel";

  const message = document.createElement("p");
  message.className = "rw-traversal-modal__message";
  message.textContent = TRAVERSAL_PUNISHMENT_MESSAGE;

  panel.append(message);
  cluster.append(panel);
  overlay.append(backdrop, lulzStack, cluster);

  return { overlay, lulzStack };
}

/** Logs attempt server-side; response is not shown in the UI. */
function logTraversalAttemptClient(attemptedUrl: string): void {
  void fetch("/api/traversal-log", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ attemptedUrl }),
  }).catch(() => {
    /* logging must not block punishment UI */
  });
}

export function showTraversalPunishment(attemptedUrl?: string): void {
  if (typeof document === "undefined") return;
  if (window.__rwTraversalPunishmentActive || document.getElementById(MODAL_ID)) {
    return;
  }

  window.__rwTraversalPunishmentActive = true;
  injectStyles();
  startColorInversion();
  applySkullTakeover(skullAssetUrl.src);

  const { overlay, lulzStack } = createModalShell();
  document.body.appendChild(overlay);
  document.body.style.overflow = "hidden";

  logTraversalAttemptClient(attemptedUrl ?? window.location.href);

  startLulzModalSpam(lulzStack);
  scheduleGotchaConsoleLog();
}

/** Inline runner for middleware 403 responses (no module bundler). */
export const TRAVERSAL_PUNISHMENT_RUNNER = `(function () {
  var MESSAGE = ${JSON.stringify(TRAVERSAL_PUNISHMENT_MESSAGE)};
  var STYLE_ID = ${JSON.stringify(STYLE_ID)};
  var MODAL_ID = ${JSON.stringify(MODAL_ID)};
  var ACTIVE_CLASS = ${JSON.stringify(ACTIVE_CLASS)};
  var INVERTED_CLASS = ${JSON.stringify(INVERTED_CLASS)};
  var CSS = ${JSON.stringify(PUNISHMENT_CSS)};

  if (window.__rwTraversalPunishmentActive) return;
  window.__rwTraversalPunishmentActive = true;

  if (!document.getElementById(STYLE_ID)) {
    var style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  document.documentElement.classList.add(ACTIVE_CLASS);
  document.addEventListener("contextmenu", function (e) { e.preventDefault(); }, true);
  window.setInterval(function () {
    document.documentElement.classList.toggle(INVERTED_CLASS);
  }, ${INVERT_INTERVAL_MS});

  if (!document.getElementById(MODAL_ID)) {
    var overlay = document.createElement("div");
    overlay.id = MODAL_ID;
    overlay.setAttribute("role", "alertdialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-live", "assertive");
    overlay.innerHTML =
      '<div class="rw-traversal-modal__backdrop" aria-hidden="true"></div>' +
      '<div class="rw-lulz-stack" aria-hidden="true"></div>' +
      '<div class="rw-traversal-modal__cluster">' +
      '<div class="rw-traversal-modal__panel">' +
      '<p class="rw-traversal-modal__message"></p>' +
      "</div></div>";
    overlay.querySelector(".rw-traversal-modal__message").textContent = MESSAGE;

    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";
  }

  ${buildGotchaConsoleSnippet()}
  ${buildLulzSpamRunnerSnippet()}
  rwScheduleGotchaLog();
  var lulzStack = document.getElementById(MODAL_ID) &&
    document.getElementById(MODAL_ID).querySelector(".rw-lulz-stack");
  rwStartLulzSpam(lulzStack);
})();`;

export function buildTraversalBlockedHtml(_meta: TraversalAttemptMeta): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Not allowed</title>
  <style>${PUNISHMENT_CSS}
  body { margin: 0; background: #0a0a0a; }
  </style>
</head>
<body>
  <script>${TRAVERSAL_PUNISHMENT_RUNNER}<\/script>
</body>
</html>`;
}
