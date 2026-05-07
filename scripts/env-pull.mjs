/**
 * Pulls plain-text environment variables from Cloudflare Pages into .env.local.
 *
 * NOTE: Variables added as "Secret" (encrypted) in the Cloudflare dashboard
 * cannot be retrieved via the API — by design. Those must still be kept in
 * your local .env file. This script only syncs plain-text variables.
 *
 * Usage:
 *   npm run env:pull
 *
 * Requires two env vars in your shell (or existing .env):
 *   CLOUDFLARE_API_TOKEN  — an API token with Pages:Read permission
 *   CLOUDFLARE_ACCOUNT_ID — your Cloudflare account ID (found in the dashboard sidebar)
 */

import { writeFileSync } from 'fs';

const TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const PROJECT_NAME = 'ryanwilsonio-prod';
const OUTPUT_FILE = '.env.local';

if (!TOKEN || !ACCOUNT_ID) {
  console.error(
    '\nMissing required environment variables:\n' +
    (!TOKEN ? '  CLOUDFLARE_API_TOKEN\n' : '') +
    (!ACCOUNT_ID ? '  CLOUDFLARE_ACCOUNT_ID\n' : '') +
    '\nSet them in your shell or .env file, then re-run.\n'
  );
  process.exit(1);
}

console.log(`Fetching env vars for Pages project "${PROJECT_NAME}"...`);

const res = await fetch(
  `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT_NAME}`,
  {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
  }
);

const data = await res.json();

if (!data.success) {
  console.error('\nCloudflare API error:', JSON.stringify(data.errors, null, 2));
  process.exit(1);
}

const envVars = data.result?.deployment_configs?.production?.env_vars ?? {};
const entries = Object.entries(envVars);

if (entries.length === 0) {
  console.log('No environment variables found on this project.');
  process.exit(0);
}

const pulled = [];
const skipped = [];

for (const [key, config] of entries) {
  if (config.type === 'secret_text') {
    skipped.push(key);
  } else {
    pulled.push(`${key}=${config.value}`);
  }
}

if (pulled.length > 0) {
  writeFileSync(OUTPUT_FILE, pulled.join('\n') + '\n');
  console.log(`\n✓ Wrote ${pulled.length} variable(s) to ${OUTPUT_FILE}:`);
  pulled.forEach(line => console.log(`  ${line.split('=')[0]}`));
} else {
  console.log('\nNo plain-text variables to write.');
}

if (skipped.length > 0) {
  console.log(`\n⚠ Skipped ${skipped.length} secret(s) — these cannot be pulled and must stay in .env:`);
  skipped.forEach(key => console.log(`  ${key}`));
}
