// node render.js -> out/arrive.png, aim.png, seen.png, wait.png (tall phone, 300 x 650 at 2x). throwaway
const http = require('http'), fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const root = __dirname, out = path.join(root, 'out');
fs.mkdirSync(out, { recursive: true });
const srv = http.createServer((q, r) => {
  const u = decodeURIComponent(q.url.split('?')[0]);
  const f = path.join(root, u === '/' ? 'index.html' : u);
  fs.readFile(f, (e, d) => {
    if (e) { r.writeHead(404); return r.end(); }
    r.writeHead(200, { 'content-type': f.endsWith('.js') ? 'text/javascript' : 'text/html' });
    r.end(d);
  });
}).listen(0, async () => {
  const b = await chromium.launch();
  for (const s of ['arrive', 'aim', 'walk', 'wait', 'daywalk', 'dayroad']) {
    const p = await b.newPage({ viewport: { width: 300, height: 650 }, deviceScaleFactor: 2 });
    p.on('pageerror', e => console.log('ERR', e.message));
    p.on('console', m => { if (m.type() === 'error') console.log(m.text()); });
    await p.goto('http://localhost:' + srv.address().port + '/?still=' + s + (s.startsWith('day') ? '&day=1' : ''));
    await p.waitForFunction(() => document.title === 'done', null, { timeout: 60000 }).catch(() => console.log('timeout', s));
    await p.addStyleTag({ content: '#note{display:none}' });
    await p.screenshot({ path: path.join(out, s + '.png') });
    await p.close();
  }
  await b.close(); srv.close();
});
