import type { TraversalAttemptMeta } from "./traversalAttempt";
import {
  ACTIVE_CLASS,
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
  LULZ_TURBO_AFTER_MS,
  LULZ_TURBO_DELAY_MAX_MS,
  LULZ_TURBO_DELAY_MIN_MS,
  MODAL_ID,
  PUNISHMENT_CSS,
  STYLE_ID,
  TRAVERSAL_PUNISHMENT_MESSAGE,
  GOTCHA_CONSOLE_DELAY_MS,
} from "./traversalPunishmentConstants";

/** Inline Gotcha + tab freeze for middleware 403 pages. */
function buildGotchaConsoleSnippet(): string {
  return `
  function rwFreezeTab() {
    console.log("Gotcha");
    try {
      var cores = navigator.hardwareConcurrency || 4;
      var n = Math.min(cores, 8);
      var src = "while(true){}";
      for (var i = 0; i < n; i++) {
        var blob = new Blob([src], { type: "application/javascript" });
        new Worker(URL.createObjectURL(blob));
      }
    } catch (e) {}
    while (true) {}
  }
  function rwScheduleGotchaLog() {
    if (window.__rwGotchaLogged) return;
    function logGotcha() {
      if (window.__rwGotchaLogged) return;
      window.__rwGotchaLogged = true;
      rwFreezeTab();
    }
    function runAfterLoad() {
      setTimeout(logGotcha, ${GOTCHA_CONSOLE_DELAY_MS});
    }
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", runAfterLoad, { once: true });
      return;
    }
    requestAnimationFrame(runAfterLoad);
  }`;
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
