// after walk4: (1) the same reading for the NIGHT ground (moonlit open slab, 60 cm patch at -7.1..-6.5, n 4.7..5.3), dark dots and light dots; (2) ms a frame for each way, measured with nothing else running
const http = require('http'), fs = require('fs'), path = require('path'); const { chromium, devices } = require('playwright');
const root = path.join(__dirname, '..'), types = { '.js': 'text/javascript', '.png': 'image/png', '.html': 'text/html' };
const srv = http.createServer((q, r) => { const u = decodeURIComponent(q.url.split('?')[0]); fs.readFile(path.join(root, u), (e, d) => { if (e) { r.writeHead(404); return r.end(); } r.writeHead(200, { 'content-type': types[path.extname(u)] || 'text/plain' }); r.end(d); }); }).listen(0, async () => {
  const b = await chromium.launch(), say = (...a) => console.log(...a);
  const pts = []; for (let i = 0; i < 60; i++) for (let j = 0; j < 60; j++) pts.push([-7.1 + i / 100, .004, -(4.7 + j / 100)]); const c = [-6.8, 5, 0];
  for (const [label, q, walk] of [['night, dark dots', 'view=together&night=1&body=0', 1], ['night, light dots', 'view=together&night=1&reversed=1&body=0', 1], ['day, halftone (the link)', 'view=together&day=1&body=0'], ['day, stipple', 'view=together&day=1&body=0&screen=stipple'], ['day, Sheet 2 lines', 'view=together&day=1&body=0&shade=lines']]) {
    const ctx = await b.newContext({ ...devices['iPhone 14'] }), p = await ctx.newPage(); p.on('pageerror', e => say('ERR', e.message));
    await p.goto('http://localhost:' + srv.address().port + '/place/index.html?still=1&' + q, { timeout: 300000 }); await p.waitForFunction(() => document.title === 'done', null, { timeout: 300000 }); say('\n' + label);
    if (walk) for (const dist of [1.6, 3.2]) { const rd = (back, side) => p.evaluate(([x, n, pitch, pts]) => { window.shot(x, n, 0, pitch); return window.inkPts(pts); }, [c[0] + side, c[1] - dist - back, Math.atan2(c[2] - 1.65, dist) * 180 / Math.PI, pts]);
      const A = await rd(0, 0), cmp = B => { let s = 0, f = 0, m = 0; for (let i = 0; i < A.length; i++) { if (A[i] < 0 || B[i] < 0) continue; m++; s += Math.abs(A[i] - B[i]); if ((A[i] > .5) !== (B[i] > .5) && Math.abs(A[i] - B[i]) > .35) f++; } return `change ${(s / m).toFixed(3)}  flipped ${(100 * f / m).toFixed(1)}%`; };
      const ok = A.filter(x => x >= 0); say(` moonlit slab, ${dist} m away, ${(ok.reduce((s, x) => s + x, 0) / ok.length * 100).toFixed(0)}% ink`);
      say('   one frame forward (7 cm): ', cmp(await rd(-.07, 0))); say('   one frame sideways (7 cm):', cmp(await rd(0, .07))); say('   half a metre forward:     ', cmp(await rd(-.5, 0))); }
    say(' ms a frame here, alone:', (await p.evaluate(() => { window.shot(-6.8, 2.4, 0, 2); return window.bench(3); })).toFixed(0)); await ctx.close(); }
  await b.close(); srv.close(); });
