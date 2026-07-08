#!/usr/bin/env node
/* shiproom CLI — deterministic utility layer.
 * The deliberation lives in your agent (via the skill); this handles the boring parts:
 * init | validate | view | card | docket | canary
 * Zero dependencies. Node >= 18.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');

const PKG_ROOT = path.join(__dirname, '..');
const CWD = process.cwd();
const VOTES = ['INVEST', 'SHIP_AND_SEE', 'SHELVE', 'ABSTAIN'];
const VOTE_LABEL = { INVEST: 'Invest', SHIP_AND_SEE: 'Ship & See', SHELVE: 'Shelve', ABSTAIN: 'Abstain' };
const VOTE_COLOR = { INVEST: '#1E6B4F', SHIP_AND_SEE: '#9A6B0B', SHELVE: '#9C3B2E', ABSTAIN: '#5B6770' };

const log = (s) => console.log(s);
const die = (s) => { console.error(`✗ ${s}`); process.exit(1); };
const ok = (s) => log(`✓ ${s}`);

function readJSON(p) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); }
  catch (e) { die(`Cannot read/parse ${p}: ${e.message}`); }
}
function cpDir(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name), d = path.join(dst, e.name);
    e.isDirectory() ? cpDir(s, d) : fs.copyFileSync(s, d);
  }
}
function findVerdict(arg) {
  const candidates = arg ? [arg] : ['.council/verdict.json', 'verdict.json'];
  for (const c of candidates) if (fs.existsSync(path.resolve(CWD, c))) return path.resolve(CWD, c);
  die(`No verdict found (looked for ${candidates.join(', ')}). Run the council first, or pass a path.`);
}
function esc(s) { return String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

/* ---------- validate ---------- */
function structuralErrors(d) {
  const errs = [];
  const req = (obj, key, type, where) => {
    if (obj[key] === undefined || obj[key] === null) { errs.push(`${where}: missing "${key}"`); return false; }
    if (type === 'array' ? !Array.isArray(obj[key]) : typeof obj[key] !== type) { errs.push(`${where}: "${key}" should be ${type}`); return false; }
    return true;
  };
  req(d, 'project', 'string', 'root');
  req(d, 'date', 'string', 'root');
  if (req(d, 'members', 'array', 'root')) {
    if (d.members.length < 5) errs.push(`root: at least 5 members required (found ${d.members.length})`);
    d.members.forEach((m, i) => {
      const w = `members[${i}]`;
      req(m, 'seat', 'number', w); req(m, 'role', 'string', w);
      req(m, 'argument', 'string', w); req(m, 'flipCondition', 'string', w); req(m, 'action', 'string', w);
      if (req(m, 'vote', 'string', w) && !VOTES.includes(m.vote)) errs.push(`${w}: vote "${m.vote}" not one of ${VOTES.join('|')}`);
    });
  }
  if (req(d, 'verdict', 'object', 'root')) {
    req(d.verdict, 'summary', 'string', 'verdict');
    if (req(d.verdict, 'decision', 'string', 'verdict') && !['INVEST','SHIP_AND_SEE','SHELVE'].includes(d.verdict.decision))
      errs.push(`verdict: decision "${d.verdict.decision}" invalid`);
  }
  if (d.grill) {
    const g = d.grill, w = 'grill';
    if (!['appeal','standalone'].includes(g.mode)) errs.push(`${w}: mode must be appeal|standalone`);
    if (!Array.isArray(g.openWounds)) errs.push(`${w}: openWounds must be an array`);
    if (!['INVEST','SHIP_AND_SEE','SHELVE'].includes(g.finalDecision)) errs.push(`${w}: finalDecision invalid`);
  }
  return errs;
}
function cmdValidate(args) {
  const p = findVerdict(args[0]);
  const errs = structuralErrors(readJSON(p));
  if (errs.length) { errs.forEach(e => console.error(`  ✗ ${e}`)); die(`${p}: ${errs.length} error(s)`); }
  ok(`${path.relative(CWD, p)} is a valid council verdict`);
}

/* ---------- init ---------- */
function cmdInit(args) {
  const all = args.includes('--all');
  const payload = ['council', 'dashboard', 'SHIPROOM.md', 'AGENTS.md'];
  for (const item of payload) {
    const src = path.join(PKG_ROOT, item), dst = path.join(CWD, item);
    if (fs.existsSync(dst)) { log(`  · ${item} exists, skipped`); continue; }
    fs.statSync(src).isDirectory() ? cpDir(src, dst) : fs.copyFileSync(src, dst);
    ok(`installed ${item}`);
  }
  const harnesses = [
    { flag: '--claude', detect: '.claude', install: () => {
        cpDir(path.join(PKG_ROOT, 'skills'), path.join(CWD, '.claude', 'skills'));
        fs.mkdirSync(path.join(CWD, '.claude', 'commands'), { recursive: true });
        fs.copyFileSync(path.join(PKG_ROOT, 'commands', 'council.md'), path.join(CWD, '.claude', 'commands', 'council.md'));
        if (!fs.existsSync(path.join(CWD, 'CLAUDE.md'))) fs.copyFileSync(path.join(PKG_ROOT, 'CLAUDE.md'), path.join(CWD, 'CLAUDE.md'));
      }, name: 'Claude Code (.claude/commands + skills)' },
    { flag: '--cursor', detect: '.cursor', install: () => cpDir(path.join(PKG_ROOT, 'skills'), path.join(CWD, '.cursor', 'skills')), name: 'Cursor (.cursor/skills)' },
    { flag: '--codex', detect: '.agents', install: () => cpDir(path.join(PKG_ROOT, 'skills'), path.join(CWD, '.agents', 'skills')), name: 'Codex (.agents/skills)' },
    { flag: '--gemini', detect: '.gemini', install: () => {
        cpDir(path.join(PKG_ROOT, 'skills'), path.join(CWD, '.gemini', 'skills'));
        if (!fs.existsSync(path.join(CWD, 'GEMINI.md'))) fs.copyFileSync(path.join(PKG_ROOT, 'GEMINI.md'), path.join(CWD, 'GEMINI.md'));
      }, name: 'Gemini CLI (.gemini/skills)' },
  ];
  let any = false;
  for (const h of harnesses) {
    if (all || args.includes(h.flag) || fs.existsSync(path.join(CWD, h.detect))) { h.install(); ok(`wired ${h.name}`); any = true; }
  }
  if (!any) log('  · no harness dir detected — AGENTS.md covers Codex/Cursor/Copilot/Windsurf; use --claude/--cursor/--codex/--gemini/--all to force');
  log('\nNext: tell your agent —  "Run the Shiproom per council/CHARTER.md on this project."');
  log('In Claude Code:            /shiproom scope');
}

/* ---------- view ---------- */
function cmdView(args) {
  let dir = args.find(a => !a.startsWith('--')) || (fs.existsSync(path.join(CWD, '.council')) ? '.council' : '.');
  dir = path.resolve(CWD, dir);
  if (!fs.existsSync(path.join(dir, 'index.html'))) {
    fs.copyFileSync(path.join(PKG_ROOT, 'dashboard', 'index.html'), path.join(dir, 'index.html'));
    ok('placed dashboard/index.html');
  }
  const port = Number((args.find(a => a.startsWith('--port=')) || '').split('=')[1]) || 4177;
  const types = { '.html': 'text/html', '.json': 'application/json', '.svg': 'image/svg+xml', '.md': 'text/plain' };
  http.createServer((req, res) => {
    const f = path.join(dir, decodeURIComponent(req.url === '/' ? '/index.html' : req.url).split('?')[0]);
    if (!f.startsWith(dir) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end('not found'); }
    res.writeHead(200, { 'Content-Type': types[path.extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    fs.createReadStream(f).pipe(res);
  }).listen(port, () => log(`Verdict page: http://localhost:${port}  (Ctrl+C to stop)`));
}

/* ---------- card ---------- */
function cmdCard(args) {
  const p = findVerdict(args.find(a => !a.startsWith('--')));
  const d = readJSON(p);
  const dec = (d.grill && d.grill.finalDecision) || d.verdict.decision;
  const tally = {};
  d.members.forEach(m => tally[m.vote] = (tally[m.vote] || 0) + 1);
  const tallyStr = Object.entries(tally).map(([v, n]) => `${VOTE_LABEL[v]} ${n}`).join(' · ');
  const seatW = 120, gap = 14, benchW = d.members.length * seatW + (d.members.length - 1) * gap;
  const x0 = (1200 - benchW) / 2;
  const seats = d.members.map((m, i) => {
    const x = x0 + i * (seatW + gap);
    return `<rect x="${x}" y="330" width="${seatW}" height="110" rx="10" fill="${VOTE_COLOR[m.vote]}"/>
      <text x="${x + seatW/2}" y="470" text-anchor="middle" font-family="ui-monospace,monospace" font-size="19" fill="#8A96AC">${esc(m.role)}</text>`;
  }).join('\n');
  const wounds = d.grill && d.grill.openWounds && d.grill.openWounds.length
    ? `<text x="600" y="560" text-anchor="middle" font-family="ui-monospace,monospace" font-size="20" fill="#C97A6D">${d.grill.openWounds.length} open wound${d.grill.openWounds.length>1?'s':''} on record</text>` : '';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#111A2B"/>
  <rect x="0" y="0" width="1200" height="8" fill="${VOTE_COLOR[dec]}"/>
  <text x="600" y="96" text-anchor="middle" font-family="ui-monospace,monospace" font-size="22" letter-spacing="4" fill="#7C89A0">SHIPROOM · VERDICT</text>
  <text x="600" y="185" text-anchor="middle" font-family="Georgia,serif" font-weight="bold" font-size="64" fill="#F5F7FA">${esc(d.project)}</text>
  <text x="600" y="262" text-anchor="middle" font-family="Georgia,serif" font-size="52" fill="${VOTE_COLOR[dec]}">${esc(VOTE_LABEL[dec] || dec)}</text>
  <text x="600" y="305" text-anchor="middle" font-family="ui-monospace,monospace" font-size="22" fill="#B4C0D3">${esc(tallyStr)}</text>
  ${seats}
  ${wounds}
  <text x="600" y="602" text-anchor="middle" font-family="ui-monospace,monospace" font-size="19" fill="#7C89A0">Run your own council → github.com/nicobts/shiproom</text>
</svg>`;
  const out = path.join(path.dirname(p), 'card.svg');
  fs.writeFileSync(out, svg);
  ok(`share card → ${path.relative(CWD, out)}  (1200×630; convert to PNG for social embeds, e.g. via resvg/Inkscape)`);
}

/* ---------- docket ---------- */
function cmdDocket(args) {
  const p = findVerdict(args.find(a => !a.startsWith('--')));
  const d = readJSON(p);
  const errs = structuralErrors(d);
  if (errs.length) die(`verdict invalid (${errs.length} errors) — run "shiproom validate" first`);
  d.sample = false;
  const slug = (d.project || 'project').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const dir = path.join(CWD, 'docket-entry', `${d.date || 'undated'}-${slug}`);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'verdict.json'), JSON.stringify(d, null, 2));
  const tpl = fs.readFileSync(path.join(PKG_ROOT, 'dashboard', 'index.html'), 'utf8');
  const m = tpl.match(/const SAMPLE = ([\s\S]*?);\n\nconst VOTE_LABEL/);
  if (!m) die('dashboard template anchor not found');
  fs.writeFileSync(path.join(dir, 'index.html'), tpl.slice(0, m.index) + `const SAMPLE = ${JSON.stringify(d, null, 2)};\n\nconst VOTE_LABEL` + tpl.slice(m.index + m[0].length));
  const dec = (d.grill && d.grill.finalDecision) || d.verdict.decision;
  const tally = {}; d.members.forEach(mm => tally[mm.vote] = (tally[mm.vote] || 0) + 1);
  fs.writeFileSync(path.join(dir, 'README.md'),
`# ${d.project} — Council Verdict\n\n- **Date:** ${d.date}\n- **Decision:** ${VOTE_LABEL[dec] || dec}\n- **Tally:** ${Object.entries(tally).map(([v,n])=>`${VOTE_LABEL[v]} ${n}`).join(' · ')}\n- **Story:** ${(d.verdict.disagreement || d.verdict.summary || '').split('.')[0]}.\n\nGenerated by the [Shiproom](https://github.com/nicobts/shiproom). Published verdicts are never edited.\n`);
  ok(`docket entry → ${path.relative(CWD, dir)}/  (verdict.json, index.html, README.md)`);
  log('  PR this folder into the upstream repo\'s docket/ to publish.');
}

/* ---------- canary ---------- */
function cmdCanary(args) {
  const p = findVerdict(args[0]);
  const d = readJSON(p);
  const errs = structuralErrors(d);
  const fails = [];
  if (errs.length) fails.push(`structure: ${errs.length} schema error(s)`);
  const votes = new Set(d.members.map(m => m.vote));
  if (votes.size === 1 && votes.has('INVEST')) fails.push('unanimous INVEST — on the flawed fixture this means the ground rules did not bite');
  if (!d.members.some(m => m.vote === 'SHELVE')) fails.push('no SHELVE votes — the fixture contains planted fatal flaws; at least one seat must catch them');
  if (d.verdict.decision === 'INVEST') fails.push('decision INVEST — the fixture is designed to be shelved');
  const banned = ['this is exciting', 'great idea', "i love this", 'huge potential'];
  d.members.forEach(m => banned.forEach(b => { if ((m.argument || '').toLowerCase().includes(b)) fails.push(`${m.role}: banned cheerleading phrase "${b}"`); }));
  if (!d.members.every(m => (m.flipCondition || '').length > 10)) fails.push('some seats lack substantive flip conditions');
  if (fails.length) { fails.forEach(f => console.error(`  ✗ ${f}`)); die(`CANARY FAILED — model drift toward flattery detected (${fails.length} check(s)). Tighten the protocol before trusting runs on this model.`); }
  ok('CANARY PASSED — the protocol still bites on this model');
  log('  (fixture: council/canary/FIXTURE.md — re-run the council on it with each new model release)');
}

/* ---------- main ---------- */
const [,, cmd, ...rest] = process.argv;
const commands = { init: cmdInit, validate: cmdValidate, view: cmdView, card: cmdCard, docket: cmdDocket, canary: cmdCanary };
if (!cmd || cmd === '--help' || cmd === '-h' || !commands[cmd]) {
  log(`shiproom — deterministic utilities (the deliberation lives in your agent)

Usage: council <command>

  init      install the protocol into this project (auto-detects harness; --claude --cursor --codex --gemini --all)
  validate  [path] check a verdict.json against the protocol contract
  view      [dir] [--port=4177] serve the verdict page locally
  card      [path] generate a 1200×630 share card (card.svg) from a verdict
  docket    [path] package a verdict for publishing to the public Docket
  canary    [path] anti-drift check: validates a council run on the flawed fixture project

Run the council itself from your agent: "/shiproom scope" (Claude Code) or per AGENTS.md.`);
  process.exit(cmd && cmd !== '--help' && cmd !== '-h' ? 1 : 0);
}
commands[cmd](rest);
