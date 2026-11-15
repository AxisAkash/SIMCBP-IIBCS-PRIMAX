#!/usr/bin/env node
/**
 * Locale parity check: every key present in the English catalog must exist in
 * every other locale (and vice-versa). Prevents "half-translated" Bangla UI.
 * Exits non-zero on any mismatch so it can gate CI.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const localesDir = join(here, '..', 'src', 'locales');
const BASE = 'en';

function flatten(obj, prefix = '') {
  const out = [];
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) out.push(...flatten(v, key));
    else out.push(key);
  }
  return out;
}

function load(locale, ns) {
  return JSON.parse(readFileSync(join(localesDir, locale, ns), 'utf8'));
}

const locales = readdirSync(localesDir);
const namespaces = readdirSync(join(localesDir, BASE));
let failures = 0;

for (const ns of namespaces) {
  const baseKeys = new Set(flatten(load(BASE, ns)));
  for (const locale of locales) {
    if (locale === BASE) continue;
    const keys = new Set(flatten(load(locale, ns)));
    const missing = [...baseKeys].filter((k) => !keys.has(k));
    const extra = [...keys].filter((k) => !baseKeys.has(k));
    if (missing.length || extra.length) {
      failures++;
      console.error(`[parity] ${locale}/${ns}`);
      if (missing.length) console.error(`  missing: ${missing.join(', ')}`);
      if (extra.length) console.error(`  extra:   ${extra.join(', ')}`);
    }
  }
}

if (failures) {
  console.error(`\nLocale parity FAILED (${failures} namespace mismatch(es)).`);
  process.exit(1);
}
console.warn('Locale parity OK.');
