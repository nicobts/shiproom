'use strict';
// Tests for skills/shiproom/scripts/shiproom.js. Run with: npm test (node --test).
const { test } = require('node:test');
const assert = require('node:assert');
const { spawn, spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const http = require('node:http');

const ROOT = path.join(__dirname, '..');
const SCRIPT = path.join(ROOT, 'skills', 'shiproom', 'scripts', 'shiproom.js');
const SAMPLE = path.join(ROOT, 'skills', 'shiproom', 'references', 'examples', 'sample.verdict.json');
const DOCKET_001 = path.join(ROOT, 'docket', '001-shiproom', 'verdict.json');

const run = (args, cwd = ROOT) => spawnSync(process.execPath, [SCRIPT, ...args], { cwd, encoding: 'utf8' });
const tmpDir = () => fs.mkdtempSync(path.join(os.tmpdir(), 'shiproom-test-'));
const sample = () => JSON.parse(fs.readFileSync(SAMPLE, 'utf8'));
function writeVerdict(dir, data) {
  const p = path.join(dir, 'verdict.json');
  fs.writeFileSync(p, JSON.stringify(data));
  return p;
}
const readVersion = (file, re) => fs.readFileSync(path.join(ROOT, file), 'utf8').match(re)[1];

test('--version matches SKILL.md, plugin.json, and package.json', () => {
  const r = run(['--version']);
  assert.strictEqual(r.status, 0);
  const v = r.stdout.trim();
  assert.strictEqual(v, readVersion('skills/shiproom/SKILL.md', /version:\s*"([^"]+)"/));
  assert.strictEqual(v, JSON.parse(fs.readFileSync(path.join(ROOT, '.claude-plugin', 'plugin.json'))).version);
  assert.strictEqual(v, JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'))).version);
});

test('unknown command exits 1 with help', () => {
  const r = run(['frobnicate']);
  assert.strictEqual(r.status, 1);
  assert.match(r.stderr, /Unknown command/);
});

test('validate accepts the published docket and the sample', () => {
  for (const p of [DOCKET_001, SAMPLE]) assert.strictEqual(run(['validate', p]).status, 0, p);
});

test('validate rejects schema violations without a stack trace', () => {
  const dir = tmpDir();
  const d = sample();
  d.date = 'yesterday';
  d.members[0].vote = 'MAYBE';
  delete d.verdict;
  const r = run(['validate', writeVerdict(dir, d)]);
  assert.strictEqual(r.status, 1);
  assert.match(r.stderr, /YYYY-MM-DD/);
  assert.match(r.stderr, /MAYBE/);
  assert.match(r.stderr, /missing "verdict"/);
  assert.doesNotMatch(r.stderr, /at .*\.js:\d+/);
});

test('validate enforces protocol rules: unique seats, non-empty arguments', () => {
  const dir = tmpDir();
  const d = sample();
  d.members[1].seat = d.members[0].seat;
  d.members[2].argument = '   ';
  const r = run(['validate', writeVerdict(dir, d)]);
  assert.strictEqual(r.status, 1);
  assert.match(r.stderr, /duplicate seat number/);
  assert.match(r.stderr, /argument: must not be empty/);
});

test('validate finds .council/verdict.json by default', () => {
  const dir = tmpDir();
  fs.mkdirSync(path.join(dir, '.council'));
  fs.copyFileSync(SAMPLE, path.join(dir, '.council', 'verdict.json'));
  assert.strictEqual(run(['validate'], dir).status, 0);
  assert.strictEqual(run(['validate'], tmpDir()).status, 1);
});

test('card writes an SVG next to the verdict and refuses invalid input', () => {
  const dir = tmpDir();
  const p = writeVerdict(dir, sample());
  assert.strictEqual(run(['card', p]).status, 0);
  const svg = fs.readFileSync(path.join(dir, 'card.svg'), 'utf8');
  assert.match(svg, /^<svg/);
  assert.doesNotMatch(svg, /undefined/);
  const bad = tmpDir();
  assert.strictEqual(run(['card', writeVerdict(bad, { project: 'x' })]).status, 1);
  assert.ok(!fs.existsSync(path.join(bad, 'card.svg')));
});

test('docket builds a self-contained entry', () => {
  const dir = tmpDir();
  const p = writeVerdict(dir, sample());
  assert.strictEqual(run(['docket', p], dir).status, 0);
  const entries = fs.readdirSync(path.join(dir, 'docket-entry'));
  assert.strictEqual(entries.length, 1);
  const entry = path.join(dir, 'docket-entry', entries[0]);
  const html = fs.readFileSync(path.join(entry, 'index.html'), 'utf8');
  assert.match(html, /"sample": false/);
  assert.ok(fs.existsSync(path.join(entry, 'README.md')));
  assert.strictEqual(run(['validate', path.join(entry, 'verdict.json')]).status, 0);
});

test('canary fails a cheerful run and passes a critical one', () => {
  const dir = tmpDir();
  const cheerful = sample();
  cheerful.members.forEach(m => { m.vote = 'INVEST'; });
  cheerful.verdict.decision = 'INVEST';
  const r = run(['canary', writeVerdict(dir, cheerful)]);
  assert.strictEqual(r.status, 1);
  assert.match(r.stderr, /CANARY FAILED/);

  const critical = sample();
  critical.members[0].vote = 'SHELVE';
  critical.verdict.decision = 'SHELVE';
  assert.strictEqual(run(['canary', writeVerdict(tmpDir(), critical)]).status, 0);
});

function get(port, urlPath) {
  return new Promise((resolve, reject) => {
    http.get({ host: '127.0.0.1', port, path: urlPath }, (res) => {
      let body = '';
      res.on('data', (c) => { body += c; });
      res.on('end', () => resolve({ status: res.statusCode, body }));
    }).on('error', reject);
  });
}

test('view serves the dashboard on 127.0.0.1 only and blocks path traversal', async () => {
  const dir = tmpDir();
  writeVerdict(dir, sample());
  const child = spawn(process.execPath, [SCRIPT, 'view', dir, '--port=0'], { cwd: dir });
  try {
    const line = await new Promise((resolve, reject) => {
      child.stdout.on('data', (c) => resolve(String(c)));
      child.on('exit', (code) => reject(new Error(`view exited early with ${code}`)));
    });
    const [, host, port] = line.match(/http:\/\/([\d.]+):(\d+)/);
    assert.strictEqual(host, '127.0.0.1');
    const index = await get(port, '/');
    assert.strictEqual(index.status, 200);
    assert.match(index.body, /verdict\.json/);
    assert.strictEqual((await get(port, '/verdict.json')).status, 200);
    assert.strictEqual((await get(port, '/..%2f..%2fetc%2fpasswd')).status, 403);
    assert.ok(!fs.existsSync(path.join(dir, 'index.html')), 'view must not write into the folder');
  } finally {
    child.kill();
  }
});
