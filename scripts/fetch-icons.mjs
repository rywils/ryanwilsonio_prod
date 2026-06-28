#!/usr/bin/env node
/**
 * Downloads Iconify SVGs into public/icons/{collection}/{name}.svg
 * so Cloudflare Pages serves them from the same origin (no api.iconify.design).
 */
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "public", "icons");

const EXTRA = [
  "mdi:shield-search",
  "mdi:radar",
  "mdi:alarm-light",
  "mdi:lock-open-variant",
  "mdi:shield-lock",
  "mdi:web-check",
  "mdi:code-braces",
  "mdi:lan",
  "mdi:cloud-outline",
  "simple-icons:github",
  "simple-icons:linkedin",
  "simple-icons:bluesky",
  "skill-icons:c",
  "skill-icons:rust",
  "skill-icons:python-dark",
  "skill-icons:golang",
  "skill-icons:php-dark",
  "skill-icons:cs",
  "skill-icons:elixir-dark",
];

async function collectFromSkillData() {
  const src = await fs.readFile(path.join(ROOT, "src/data/skillData.ts"), "utf8");
  const icons = new Set(EXTRA);
  for (const m of src.matchAll(/icon: "([^"]+)"/g)) icons.add(m[1]);
  return [...icons].sort();
}

async function fetchIcon(iconId) {
  const [collection, name] = iconId.split(":");
  const url = `https://api.iconify.design/${collection}/${name}.svg`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${iconId} → ${res.status}`);
  return res.text();
}

async function main() {
  const icons = await collectFromSkillData();
  await fs.mkdir(OUT, { recursive: true });

  let ok = 0;
  let fail = 0;
  for (const iconId of icons) {
    const [collection, name] = iconId.split(":");
    const dir = path.join(OUT, collection);
    const file = path.join(dir, `${name}.svg`);
    try {
      await fs.mkdir(dir, { recursive: true });
      const svg = await fetchIcon(iconId);
      await fs.writeFile(file, svg);
      ok++;
      process.stdout.write(".");
    } catch (err) {
      fail++;
      console.error(`\nFailed ${iconId}:`, err.message);
    }
  }
  console.log(`\nDone: ${ok} saved, ${fail} failed → public/icons/`);
}

main();
