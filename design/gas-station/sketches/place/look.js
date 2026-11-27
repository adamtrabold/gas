// SHOTS=./sheet2-shots.js node look.js [prefix] [device] -> out/<name>.png (the shot list defaults to look-shots.js; a shot may name its own device as a 4th item, e.g. 'iPhone 14 landscape'). Stills of the look test from an emulated real phone at its true density (iPhone 14: 3 dots per point; Pixel 7: 2.625).
// The device's own descriptor sets size, density, touch and user agent; nothing is overridden. Throwaway.
const http = require('http'), fs = require('fs'), path = require('path');
const { chromium, devices } = require('playwright');
const root = path.join(__dirname, '..'), out = path.join(__dirname, 'out'); fs.mkdirSync(out, { recursive: true });
const SHOTS = require(process.env.SHOTS || './look-shots.js'), only = process.argv[2], DEV = process.argv[3] || 'iPhone 14';
const types = { '.js': 'text/javascript', '.png': 'image/png', '.html': 'text/html' };
const srv = http.createServer((q, r) => { const u = decodeURIComponent(q.url.split('?')[0]); fs.readFile(path.join(root, u), (e, d) => { if (e) { r.writeHead(404); return r.end(); } r.writeHead(200, { 'content-type': types[path.extname(u)] || 'text/plain' }); r.end(d); }); }).listen(0, async () => {
  const b = await chromium.launch();
  for (const [name, q, file = 'index.html', dev = DEV] of SHOTS) { if (only && !name.startsWith(only)) continue;
    const ctx = await b.newContext({ ...devices[dev] }), p = await ctx.newPage();
    p.on('pageerror', e => console.log('ERR', name, e.message)); p.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') console.log(name, m.text().slice(0, 900)); });
    await p.goto('http://localhost:' + srv.address().port + '/place/' + file + '?still=1&' + q);
    await p.waitForFunction(() => document.title === 'done', null, { timeout: 180000 }).catch(() => console.log('timeout', name));
    if (file === 'index.html') console.log(name, JSON.stringify(await p.evaluate(() => window.stat())));
    await p.screenshot({ path: path.join(out, name + '.png') }); await ctx.close(); }
  await b.close(); srv.close();
});
