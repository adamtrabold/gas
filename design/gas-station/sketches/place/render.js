// node render.js [prefix]  -> stills from the walked prototype into out/. throwaway
// serves the parent folder (sketches/) so the prototype can share three.js from ../ink-is-shadow/vendor
const http = require('http'), fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const root = path.join(__dirname, '..'), out = path.join(__dirname, 'out');
fs.mkdirSync(out, { recursive: true });
const SHOTS = require('./shots.js');
const types = { '.js': 'text/javascript', '.png': 'image/png', '.html': 'text/html' };
const srv = http.createServer((q, r) => {
  const u = decodeURIComponent(q.url.split('?')[0]);
  fs.readFile(path.join(root, u), (e, d) => {
    if (e) { r.writeHead(404); return r.end(); }
    r.writeHead(200, { 'content-type': types[path.extname(u)] || 'text/plain' }); r.end(d);
  });
}).listen(0, async () => {
  const b = await chromium.launch();
  const only = process.argv[2];
  for (const [name, q, wide] of SHOTS) {
    if (only && !name.startsWith(only)) continue;
    const p = await b.newPage({ viewport: wide ? { width: 1280, height: 720 } : { width: 300, height: 650 }, deviceScaleFactor: wide ? 1 : 2 });
    p.on('pageerror', e => console.log('ERR', name, e.message));
    p.on('console', m => { if (m.type() === 'error') console.log(name, m.text().slice(0, 300)); });
    await p.goto('http://localhost:' + srv.address().port + '/place/index.html?still=1&' + q);
    await p.waitForFunction(() => document.title === 'done', null, { timeout: 90000 }).catch(() => console.log('timeout', name));
    await p.addStyleTag({ content: '#note{display:none}' });
    await p.screenshot({ path: path.join(out, name + '.png') });
    await p.close();
  }
  await b.close(); srv.close();
});
