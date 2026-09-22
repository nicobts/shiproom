#!/usr/bin/env node
// Embeds skills/shiproom/assets/fonts/*.woff2 into the verdict page as data URIs, so
// the page stays one self-contained file that works offline and when copied anywhere.
// Run after changing the fonts: node tools/embed-fonts.js  (tests check it is current).
'use strict';
const fs = require('fs');
const path = require('path');

const ASSETS = path.join(__dirname, '..', 'skills', 'shiproom', 'assets');
const PAGE = path.join(ASSETS, 'dashboard.html');
const FACES = [
  ['Fraunces', 'normal', '400 700', 'fraunces.woff2'],
  ['Fraunces', 'italic', '400 700', 'fraunces-italic.woff2'],
  ['Instrument Sans', 'normal', '400 600', 'instrument-sans.woff2'],
  ['IBM Plex Mono', 'normal', '400', 'ibm-plex-mono-400.woff2'],
  ['IBM Plex Mono', 'normal', '500', 'ibm-plex-mono-500.woff2'],
];

function fontFaceCss() {
  return FACES.map(([family, style, weight, file]) => {
    const data = fs.readFileSync(path.join(ASSETS, 'fonts', file)).toString('base64');
    return `@font-face{font-family:'${family}';font-style:${style};font-weight:${weight};font-display:swap;` +
      `src:url(data:font/woff2;base64,${data}) format('woff2')}`;
  }).join('\n');
}

const START = '<style id="shiproom-fonts">';
const END = '</style>';
function embed(html) {
  const i = html.indexOf(START);
  if (i === -1) throw new Error(`${START} not found in ${PAGE}`);
  const j = html.indexOf(END, i);
  return html.slice(0, i + START.length) + '\n' + fontFaceCss() + '\n' + html.slice(j);
}

module.exports = { embed, fontFaceCss, PAGE };

if (require.main === module) {
  const html = fs.readFileSync(PAGE, 'utf8');
  fs.writeFileSync(PAGE, embed(html));
  console.log(`embedded ${FACES.length} font faces into ${path.relative(process.cwd(), PAGE)}`);
}
