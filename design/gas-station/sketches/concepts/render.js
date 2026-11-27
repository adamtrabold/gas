// node render.js [sheetId]  -> out/sheet-*.png and each still as out/<id>.png. throwaway
const http = require('http'), fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const root = __dirname, out = path.join(root, 'out');
fs.mkdirSync(out, { recursive: true });
const types = { '.js': 'text/javascript', '.png': 'image/png', '.html': 'text/html' };
const srv = http.createServer((q, r) => {
  const u = decodeURIComponent(q.url.split('?')[0]);
  const f = path.join(root, u === '/' ? 'index.html' : u);
  fs.readFile(f, (e, d) => {
    if (e) { r.writeHead(404); return r.end(); }
    r.writeHead(200, { 'content-type': types[path.extname(f)] || 'text/plain' });
    r.end(d);
  });
}).listen(0, async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 2200, height: 900 }, deviceScaleFactor: 1 });
  p.on('pageerror', e => console.log('ERR', e.message));
  p.on('console', m => { if (m.type() === 'error') console.log(m.text()); });
  const only = process.argv[2] ? '?only=' + process.argv[2] : '';
  await p.goto('http://localhost:' + srv.address().port + '/' + only);
  await p.waitForFunction(() => document.title === 'done', null, { timeout: 240000 }).catch(() => console.log('timeout'));
  await p.waitForTimeout(400);
  for (const s of await p.$$('section')) {
    const id = (await s.getAttribute('id')).slice(1);
    await s.screenshot({ path: path.join(out, 'sheet-' + id + '.png') });
  }
  const stills = await p.evaluate(() => [...document.querySelectorAll('canvas')].map(c => [c.id.slice(1), c.toDataURL('image/png')]));
  for (const [id, d] of stills) fs.writeFileSync(path.join(out, id + '.png'), Buffer.from(d.split(',')[1], 'base64'));
  await b.close(); srv.close();
});
