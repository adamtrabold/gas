// node walk2.js -> numbers. Do the marks stay on the world? One 4 m square of ground at the edge of the canopy's shadow is read at the same 80 x 80 fixed
// points in the world (5 cm cells) from several stands, on an emulated iPhone at true density. Same marks from two stands = same picture, cell for cell.
// Reported: the share of cells whose ink differs by more than a fifth. One frame of walking and a small turn should be near nothing. Walking closer is
// allowed to differ: new lines grow between the old ones (that is the detail arriving), so that row is a measure of how much is added, not a failure.
const http = require('http'), fs = require('fs'), path = require('path'); const { chromium, devices } = require('playwright');
const root = path.join(__dirname, '..'), types = { '.js': 'text/javascript', '.png': 'image/png', '.html': 'text/html' };
const srv = http.createServer((q, r) => { const u = decodeURIComponent(q.url.split('?')[0]); fs.readFile(path.join(root, u), (e, d) => { if (e) { r.writeHead(404); return r.end(); } r.writeHead(200, { 'content-type': types[path.extname(u)] || 'text/plain' }); r.end(d); }); }).listen(0, async () => {
  const b = await chromium.launch(), c = [-1.9, 9.2], side = 4, N = 80;
  for (const look of ['pen', 'brush']) { const ctx = await b.newContext({ ...devices['iPhone 14'] }), p = await ctx.newPage();
    await p.goto('http://localhost:' + srv.address().port + `/place/index.html?still=1&hour=10.5&decl=-21&body=0&look=${look}`); await p.waitForFunction(() => document.title === 'done', null, { timeout: 120000 });
    const read = (x, n, head, pitch) => p.evaluate(([x, n, head, pitch, c, side, N]) => { window.shot(x, n, head, pitch); return window.groundInk(c[0] - side / 2, c[1] - side / 2, side, N); }, [x, n, head, pitch, c, side, N]);
    const diff = (a, b) => { let k = 0, m = 0; for (let i = 0; i < a.length; i++) { if (a[i] === '?' || b[i] === '?') continue; m++; if (Math.abs(a.charCodeAt(i) - b.charCodeAt(i)) > 5) k++; } return (100 * k / m).toFixed(1) + '% of ' + m + ' cells'; };
    const ink = a => { let s = 0, m = 0; for (const ch of a) if (ch !== '?') { s += ch.charCodeAt(0) - 97; m++; } return (4 * s / m).toFixed(0) + '% ink'; };
    const base = await read(-1.9, 3.2, 0, -14);
    console.log(look, 'base, 6 m away:', ink(base));
    console.log(look, 'same stand, read twice:', diff(base, await read(-1.9, 3.2, 0, -14)));
    console.log(look, 'one frame of walking (7 cm):', diff(base, await read(-1.9, 3.27, 0, -14)));
    console.log(look, 'turned 3 degrees:', diff(base, await read(-1.9, 3.2, 3, -14)));
    console.log(look, 'a step to the side (60 cm):', diff(base, await read(-1.3, 3.2, -5.7, -14)));
    const near = await read(-1.9, 5.7, 0, -24); console.log(look, 'walked in to 3.5 m:', diff(base, near), '|', ink(near));
    await ctx.close(); }
  await b.close(); srv.close(); });
