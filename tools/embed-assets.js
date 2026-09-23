#!/usr/bin/env node
// Embeds the fonts (assets/fonts/*.woff2) and the council artwork (assets/council.jpg)
// into the verdict page as data URIs, so the page stays one self-contained file that
// works offline and when copied anywhere. Run after changing either:
//   node tools/embed-assets.js        (a test checks the page is current)
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

function heroCss() {
  const data = fs.readFileSync(path.join(ASSETS, 'council.jpg')).toString('base64');
  return `.hero{background-image:url(data:image/jpeg;base64,${data})}`;
}

const BLOCKS = [['<style id="shiproom-fonts">', fontFaceCss], ['<style id="shiproom-hero">', heroCss]];
const END = '</style>';
function embed(html) {
  return BLOCKS.reduce((out, [start, build]) => {
    const i = out.indexOf(start);
    if (i === -1) throw new Error(`${start} not found in ${PAGE}`);
    const j = out.indexOf(END, i);
    return out.slice(0, i + start.length) + '\n' + build() + '\n' + out.slice(j);
  }, html);
}

module.exports = { embed, fontFaceCss, heroCss, PAGE };

if (require.main === module) {
  const html = fs.readFileSync(PAGE, 'utf8');
  fs.writeFileSync(PAGE, embed(html));
  console.log(`embedded ${FACES.length} font faces + council.jpg into ${path.relative(process.cwd(), PAGE)}`);
}
