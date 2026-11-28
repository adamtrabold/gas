// node walk4.js -> numbers. Does the SHADE stay on the ground and the wall as you walk, now that it is dots? (walk3.js asks the same of the pump's own dots.)
// On an emulated iPhone 14 at true density, the three together by day. A patch of slab in the canopy's shade (60 cm square, a point every centimetre) and a patch of the shaded wall between the pumps
// are read at fixed points of the world; then you move and the SAME points are read again. Per move: change = mean difference in ink (0 none, 1 all swapped); flipped = share of points gone from mostly paper to mostly ink or back.
// Three ways of drawing shade are measured the same way: the halftone screen (the link), the loose-stipple screen, and Sheet 2's ruled lines.
// "same stand twice" is the floor (0). A drawing that is perfectly fixed still scores above 0 when you move, because the same dot lands on different pixels. Also prints window.bench: milliseconds a frame in THIS machine's software renderer (no GPU here): only good for comparing the three with each other.
const http = require('http'), fs = require('fs'), path = require('path'); const { chromium, devices } = require('playwright');
const root = path.join(__dirname, '..'), types = { '.js': 'text/javascript', '.png': 'image/png', '.html': 'text/html' };
const srv = http.createServer((q, r) => { const u = decodeURIComponent(q.url.split('?')[0]); fs.readFile(path.join(root, u), (e, d) => { if (e) { r.writeHead(404); return r.end(); } r.writeHead(200, { 'content-type': types[path.extname(u)] || 'text/plain' }); r.end(d); }); }).listen(0, async () => {
  const b = await chromium.launch(), only = process.argv[2];
  const grid = (f) => { const o = []; for (let i = 0; i < 60; i++) for (let j = 0; j < 60; j++) o.push(f(i / 100, j / 100)); return o; };
  const patches = { 'slab in shade': [grid((a, c) => [-7.1 + a, .004, -(11.4 + c) + 1.3]), [-6.8, 10.4, 0]], 'wall in shade': [grid((a, c) => [-7.1 + a, 1.2 + c, -16]), [-6.8, 16, 1.5]] };   // points, and where the patch is [x, n, up]
  const kinds = [['halftone screen (the link)', 'view=together&day=1&body=0'], ['loose stipple screen', 'view=together&day=1&body=0&screen=stipple'], ['Sheet 2: ruled lines', 'view=together&day=1&body=0&shade=lines']];
  for (const [label, q] of kinds) { if (only && !label.startsWith(only)) continue; const ctx = await b.newContext({ ...devices['iPhone 14'] }), p = await ctx.newPage(); p.on('pageerror', e => console.log('ERR', e.message));
    await p.goto('http://localhost:' + srv.address().port + '/place/index.html?still=1&' + q); await p.waitForFunction(() => document.title === 'done', null, { timeout: 300000 });
    console.log('\n' + label);
    for (const [pn, [pts, c]] of Object.entries(patches)) for (const dist of pn[0] === 's' ? [1.6, 3.2, 6.5] : [3.2, 6.5]) {
      const rd = (back, side) => p.evaluate(([x, n, pitch, pts]) => { window.shot(x, n, 0, pitch); return window.inkPts(pts); }, [c[0] + side, c[1] - dist - back, Math.atan2(c[2] - 1.65, dist) * 180 / Math.PI, pts]);
      const A = await rd(0, 0), cmp = B => { let s = 0, f = 0, m = 0; for (let i = 0; i < A.length; i++) { if (A[i] < 0 || B[i] < 0) continue; m++; s += Math.abs(A[i] - B[i]); if ((A[i] > .5) !== (B[i] > .5) && Math.abs(A[i] - B[i]) > .35) f++; } return `change ${(s / m).toFixed(3)}  flipped ${(100 * f / m).toFixed(1)}%  (${m} points)`; };
      const ok = A.filter(x => x >= 0); console.log(` ${pn}, ${dist} m away, ${(ok.reduce((s, x) => s + x, 0) / ok.length * 100).toFixed(0)}% ink`);
      console.log('   same stand twice:         ', cmp(await rd(0, 0))); console.log('   one frame forward (7 cm): ', cmp(await rd(-.07, 0))); console.log('   one frame sideways (7 cm):', cmp(await rd(0, .07))); console.log('   half a metre forward:     ', cmp(await rd(-.5, 0))); }
    console.log(' ms a frame here, turning on the spot at the opening stand:', (await p.evaluate(() => { window.shot(-6.8, 2.4, 0, 2); return window.bench(3); })).toFixed(0));
    await ctx.close(); }
  await b.close(); srv.close(); });
