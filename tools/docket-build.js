#!/usr/bin/env node
// Rebuilds every published Docket entry from its own verdict.json, using the current
// verdict page and card design:
//
//   node tools/docket-build.js            write index.html and card.svg (card.png too,
//                                         when Chrome, Edge or Chromium is installed)
//   node tools/docket-build.js --check    fail if either is stale (CI runs this)
//
// verdict.json and the entry's README.md are never touched: a published verdict is the
// record, the page around it is a view that may improve.
'use strict';
const fs = require('fs');
const path = require('path');
const { cardSvg, entryHtml, verdictErrors, findBrowser, renderPng } = require('../skills/shiproom/scripts/shiproom.js');

const ROOT = path.join(__dirname, '..');
const DOCKET = path.join(ROOT, 'docket');
const SITE = 'https://nicobts.github.io/shiproom';

const check = process.argv.includes('--check');
const rel = (p) => path.relative(ROOT, p).replace(/\\/g, '/');

function entries() {
  if (!fs.existsSync(DOCKET)) return [];
  return fs.readdirSync(DOCKET, { withFileTypes: true })
    .filter((e) => e.isDirectory() && fs.existsSync(path.join(DOCKET, e.name, 'verdict.json')))
    .map((e) => path.join(DOCKET, e.name));
}

let stale = [];
let written = [];

for (const dir of entries()) {
  const name = path.basename(dir);
  const verdict = JSON.parse(fs.readFileSync(path.join(dir, 'verdict.json'), 'utf8'));
  const errors = verdictErrors(verdict);
  if (errors.length) {
    console.error(`✗ ${rel(dir)}/verdict.json is invalid:`);
    errors.forEach((e) => console.error(`    ${e}`));
    process.exit(1);
  }
  const base = `${SITE}/docket/${name}/`;
  const want = {
    'index.html': entryHtml(verdict, { url: base, image: `${base}card.png` }),
    'card.svg': cardSvg(verdict, 'dark'),
  };
  for (const [file, content] of Object.entries(want)) {
    const target = path.join(dir, file);
    const current = fs.existsSync(target) ? fs.readFileSync(target, 'utf8') : null;
    if (current === content) continue;
    if (check) { stale.push(`${rel(dir)}/${file}`); continue; }
    fs.writeFileSync(target, content);
    written.push(`${rel(dir)}/${file}`);
  }
  if (!check) {
    const png = path.join(dir, 'card.png');
    if (findBrowser()) {
      if (fs.existsSync(png)) fs.unlinkSync(png);
      try { renderPng(path.join(dir, 'card.svg'), png); written.push(`${rel(dir)}/card.png`); }
      catch (e) { console.error(`  · ${name}/card.png skipped: ${e.message}`); }
    } else {
      console.error(`  · ${name}/card.png skipped: no Chrome, Edge or Chromium found`);
    }
  }
}

if (check) {
  if (stale.length) {
    console.error(`✗ ${stale.length} Docket file(s) out of date with the current design:`);
    stale.forEach((f) => console.error(`    ${f}`));
    console.error('  Run: node tools/docket-build.js');
    process.exit(1);
  }
  console.log('✓ every Docket entry matches the current verdict page and card');
} else {
  written.forEach((f) => console.log(`✓ ${f}`));
  if (!written.length) console.log('✓ nothing to rebuild — the Docket is current');
}
