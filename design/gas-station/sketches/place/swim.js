// node swim.js -> out/swim-test.png and numbers on the console. throwaway
// The swim test. Follow one fixed spot in the world (a shadow edge on the slab by day; the edge of the canopy lamp's pool at night)
// while the view turns and walks. Cut the same small square round that spot from every frame. If the ink belongs to the world,
// the squares match. If it belongs to the screen, they don't. The number is the share of pixels in the square that changed
// between one frame and the next.
const http = require('http'), fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const root = path.join(__dirname, '..'), out = path.join(__dirname, 'out');
fs.mkdirSync(out, { recursive: true });
const srv = http.createServer((q, r) => {
  const u = decodeURIComponent(q.url.split('?')[0]);
  fs.readFile(path.join(root, u), (e, d) => { if (e) { r.writeHead(404); return r.end(); } r.writeHead(200, { 'content-type': u.endsWith('.js') ? 'text/javascript' : 'text/html' }); r.end(d); });
}).listen(0, async () => {
  const b = await chromium.launch(), rows = [], HALF = 90;
  const cases = [
    ['day, shadow edge on the slab', 'c=1&hour=10.5&decl=-21', 'sun'],
    ['night, edge of the lamp pool', 'c=1&night=1', 'lamp'],
  ];
  for (const [title, q, kind] of cases) for (const anchor of ['world', 'screen']) {
    const p = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
    p.on('pageerror', e => console.log('ERR', e.message));
    await p.goto('http://localhost:' + srv.address().port + '/place/index.html?still=1&anchor=' + anchor + '&' + q);
    await p.waitForFunction(() => document.title === 'done', null, { timeout: 90000 });
    await p.addStyleTag({ content: '#note{display:none}' });
    // the spot: by day, where the shadow of the canopy's south-east corner lands; by night, a point on the ground south of the lamp
    const P = kind === 'sun' ? await p.evaluate(() => window.sunShadow(-2.2, 8.4, 4.2)) : [-5.5, 4.6];
    const cam0 = [P[0] + 3.5, P[1] - 8];
    const frames = [];
    // six frames: turning 2.5 degrees a frame, then walking 0.35 m a frame toward the spot
    for (let i = 0; i < 6; i++) {
      const turn = i < 3 ? (i - 1) * 2.5 : 2.5, walk = i < 3 ? 0 : (i - 2) * .35;
      const dx = P[0] - cam0[0], dn = P[1] - cam0[1], L = Math.hypot(dx, dn), cx = cam0[0] + dx / L * walk, cn = cam0[1] + dn / L * walk;
      const head = Math.atan2(-(P[0] - cx), P[1] - cn) * 180 / Math.PI + turn;
      const bits = await p.evaluate(([cx, cn, head, P, HALF]) => { window.shot(cx, cn, head, -8); return [window.probe(P[0], P[1], 0, HALF), window.proj(P[0], P[1], 0)]; }, [cx, cn, head, P, HALF]);
      const png = await p.screenshot({ clip: { x: Math.round(bits[1][0]) - HALF / 2, y: Math.round(bits[1][1]) - HALF / 2, width: HALF, height: HALF } });
      frames.push({ bits: bits[0], png: png.toString('base64') });
    }
    const diffs = []; for (let i = 1; i < frames.length; i++) { let d = 0; const a = frames[i - 1].bits, c = frames[i].bits; for (let k = 0; k < a.length; k++) if (a[k] !== c[k]) d++; diffs.push(d / a.length); }
    const turnD = (diffs[0] + diffs[1]) / 2, walkD = (diffs[2] + diffs[3] + diffs[4]) / 3;
    console.log(`${title} | ink fixed to the ${anchor}: changed while turning ${(turnD * 100).toFixed(1)}%, while walking ${(walkD * 100).toFixed(1)}%`);
    rows.push({ title, anchor, frames, turnD, walkD });
    await p.close();
  }
  const html = `<body style="margin:0;background:#d9d4c8;font:12px/1.4 'Courier 10 Pitch',monospace;color:#111;padding:16px;width:780px">
  <b>THE SWIM TEST</b><br>One fixed spot in the world, followed while the view turns (frames 1 to 3) and walks toward it (frames 4 to 6). Each square is 90 px of a phone screen round that spot.<br>If the ink belongs to the world the squares match. The figure is the share of pixels that changed from one frame to the next.<br><br>
  ${rows.map(r => `<div style="margin:0 0 12px"><div>${r.title} &middot; ink fixed to the <b>${r.anchor}</b> &middot; turning ${(r.turnD * 100).toFixed(1)}% &middot; walking ${(r.walkD * 100).toFixed(1)}%</div><div style="display:flex;gap:6px;margin-top:4px">${r.frames.map(f => `<img src="data:image/png;base64,${f.png}" style="width:120px;height:120px;border:1px solid #111;image-rendering:pixelated">`).join('')}</div></div>`).join('')}</body>`;
  const p = await b.newPage({ viewport: { width: 812, height: 400 } }); await p.setContent(html); await p.screenshot({ path: path.join(out, 'swim-test.png'), fullPage: true });
  await b.close(); srv.close();
});
