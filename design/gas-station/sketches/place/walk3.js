// node walk3.js -> numbers. Does the stipple stay on the pump as you walk, or does it crawl?
// On an emulated iPhone 14 at true density. From a stand, a ray through every 3rd pixel finds points on the pump's drawn steel (not its lettering). The ink at each point is read there,
// then you move and the ink at the SAME points of the pump is read again (a 1-point box, placed to the fraction of a pixel). Reported per move:
//   change = the mean difference in ink (0 none, 1 everything swapped);  flipped = the share of points that went from mostly paper to mostly ink or back.
// Three drawings are measured the same way: the picks as they are now, the stipple as it was on Sheet 1 (every dot swapped over each halving of distance), and the cut hand's hatching for scale.
// "same stand twice" is the floor of the method (should be 0). A perfectly fixed drawing still scores above 0 when you move, because the same dot lands on different pixels.
const http = require('http'), fs = require('fs'), path = require('path'); const { chromium, devices } = require('playwright');
const root = path.join(__dirname, '..'), types = { '.js': 'text/javascript', '.png': 'image/png', '.html': 'text/html' };
const srv = http.createServer((q, r) => { const u = decodeURIComponent(q.url.split('?')[0]); fs.readFile(path.join(root, u), (e, d) => { if (e) { r.writeHead(404); return r.end(); } r.writeHead(200, { 'content-type': types[path.extname(u)] || 'text/plain' }); r.end(d); }); }).listen(0, async () => {
  const b = await chromium.launch(), PX = -8.2, PN = 11.5, dir = [Math.sin(43 * Math.PI / 180), Math.cos(43 * Math.PI / 180)];   // you walk straight at the pump from the south-west, as the link opens
  const kinds = [['picks: dots that keep their place', 'view=pump&day=1&body=0'], ['stipple as on Sheet 1', 'study=pump&look=dot&hour=10.5&body=0&oldstip=1&nopick=1'], ['cut hand (hatching)', 'study=pump&look=cut&hour=10.5&body=0']];
  for (const [label, q] of kinds) { const ctx = await b.newContext({ ...devices['iPhone 14'] }), p = await ctx.newPage(); p.on('pageerror', e => console.log('ERR', e.message));
    await p.goto('http://localhost:' + srv.address().port + '/place/index.html?still=1&' + q); await p.waitForFunction(() => document.title === 'done', null, { timeout: 120000 });
    console.log('\n' + label);
    for (const dist of [1.6, 3.2, 6.5, 13]) { const at = (back, side = 0) => [PX - dir[0] * (dist + back) + dir[1] * side, PN - dir[1] * (dist + back) - dir[0] * side];
      const rd = (pos, pts) => p.evaluate(([x, n, pts, pitch]) => { window.shot(x, n, -43, pitch); const P = pts || window.hits(3); return [P, window.inkAt(P)]; }, [pos[0], pos[1], pts, dist < 2 ? -8 : -2]);
      const [P, A] = await rd(at(0)), cmp = B => { let s = 0, f = 0, m = 0; for (let i = 0; i < A.length; i++) { if (A[i] < 0 || B[i] < 0) continue; m++; s += Math.abs(A[i] - B[i]); if ((A[i] > .5) !== (B[i] > .5) && Math.abs(A[i] - B[i]) > .35) f++; } return `change ${(s / m).toFixed(3)}  flipped ${(100 * f / m).toFixed(1)}%  (${m} points)`; };
      const cover = (A.filter(x => x >= 0).reduce((s, x) => s + x, 0) / A.filter(x => x >= 0).length * 100).toFixed(0);
      console.log(` ${dist} m away, ${P.length} points on the pump, ${cover}% ink`);
      console.log('   same stand twice:        ', cmp((await rd(at(0), P))[1]));
      console.log('   one frame forward (7 cm):', cmp((await rd(at(-.07), P))[1]));
      console.log('   one frame sideways (7 cm):', cmp((await rd(at(0, .07), P))[1]));
      console.log('   half a metre forward:    ', cmp((await rd(at(-.5), P))[1])); }
    await ctx.close(); }
  await b.close(); srv.close(); });
