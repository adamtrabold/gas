// node render.js [prefix]  -> stills from the walked prototype into out/. throwaway
// every still is a frame of the live prototype at the size of a real phone (or one wide desktop frame), deviceScaleFactor 2
// serves the parent folder (sketches/) so the prototype can share three.js from ../ink-is-shadow/vendor
const http = require('http'), fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const root = path.join(__dirname, '..'), out = path.join(__dirname, 'out');
fs.mkdirSync(out, { recursive: true });
const SHOTS = require('./shots.js');
const SIZES = { tall: [390, 844], small: [360, 740], wide: [1440, 810] };
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
  for (const [name, q, sz = 'tall'] of SHOTS) {
    if (only && !name.startsWith(only)) continue;
    const [width, height] = SIZES[sz];
    const p = await b.newPage({ viewport: { width, height }, deviceScaleFactor: 2 });
    p.on('pageerror', e => console.log('ERR', name, e.message));
    p.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') console.log(name, m.text().slice(0, 600)); });
    await p.goto('http://localhost:' + srv.address().port + '/place/index.html?still=1&' + q);
    await p.waitForFunction(() => document.title === 'done', null, { timeout: 120000 }).catch(() => console.log('timeout', name));
    await p.addStyleTag({ content: '#note{display:none}' });
    await p.screenshot({ path: path.join(out, name + '.png') });
    if (name === 'lo-arrive-day') fs.writeFileSync(path.join(__dirname, 'sheet-example.png'), Buffer.from((await p.evaluate(() => window.sheetPNG(.3))).split(',')[1], 'base64'));   // the generated sheet as a drawing: what a hand-drawn one would look like
    await p.close();
  }
  await b.close(); srv.close();
});
