// node walk.js -> out/walk-test.png and the numbers. The walk-past test for strokes. throwaway
// One square of ground is watched while the visitor turns, walks toward it, and walks past it. From every stand the ink is read at the
// same 128 x 128 fixed points in the world and laid out flat. If the strokes are on the world, the flat pictures are the same picture.
// Run twice: strokes on the world, and (the control) the same stroke sheet stuck to the screen.
const http = require('http'), fs = require('fs'), path = require('path'); const { chromium } = require('playwright');
const root = path.join(__dirname, '..'), out = path.join(__dirname, 'out'); fs.mkdirSync(out, { recursive: true });
const NN = 80;
const CASES = [
  { name: 'Day, the east edge of the canopy\'s shadow', q: 'hour=10.5&decl=0&body=0', c: [-3.9, 13.6], side: 4 },
  { name: 'Night, the edge of the canopy lamp\'s pool', q: 'night=1&lamp=0', c: [-5.5, 4.6], side: 4 },
];
// stands: [x offset, n offset] from the square's centre, always looking at the centre
const STANDS = [['start', 0, -6], ['one frame of walking on (5 cm)', 0, -5.95], ['turned 10° left', 0, -6, 10], ['turned 10° right', 0, -6, -10], ['walked 1.5 m in', 0, -4.5], ['walked 3 m in', 0, -3], ['past it: 3 m to the east', 3, -4], ['past it: 6 m to the east', 6, -1.5]];
const srv = http.createServer((q, r) => { const u = decodeURIComponent(q.url.split('?')[0]); fs.readFile(path.join(root, u), (e, d) => { if (e) { r.writeHead(404); return r.end(); } r.writeHead(200, { 'content-type': u.endsWith('.js') ? 'text/javascript' : 'text/html' }); r.end(d); }); }).listen(0, async () => {
  const b = await chromium.launch(), res = [];
  for (const cs of CASES) for (const anchor of ['world', 'screen']) {
    const p = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
    await p.goto('http://localhost:' + srv.address().port + `/place/index.html?still=1&${cs.q}&anchor=${anchor}`); await p.waitForFunction(() => document.title === 'done', null, { timeout: 120000 });
    const maps = [];
    for (const [label, dx, dn, turn = 0] of STANDS) {
      const x = cs.c[0] + dx, n = cs.c[1] + dn, dist = Math.hypot(dx, dn), head = Math.atan2(-(cs.c[0] - x), cs.c[1] - n) * 180 / Math.PI + turn, pitch = -Math.atan2(1.65, dist) * 180 / Math.PI;
      maps.push(await p.evaluate(([x, n, h, pt, x0, n0, side, N]) => { window.shot(x, n, h, pt); return window.groundInk(x0, n0, side, N); }, [x, n, head, pitch, cs.c[0] - cs.side / 2, cs.c[1] - cs.side / 2, cs.side, NN]));
    }
    const diff = (a, b) => { let d = 0, k = 0; for (let i = 0; i < a.length; i++) { if (a[i] === '?' || b[i] === '?') continue; k++; d += Math.abs(a.charCodeAt(i) - b.charCodeAt(i)) / 25; } return k ? d / k * 100 : NaN; };
    const inkPct = m => { let k = 0, c = 0; for (const ch of m) { if (ch === '?') continue; k++; c += (ch.charCodeAt(0) - 97) / 25; } return c / k * 100; };
    const d = maps.map(m => diff(maps[0], m)); res.push({ name: cs.name, anchor, maps, d, ink: inkPct(maps[0]) });
    console.log(cs.name, '|', anchor, '| ink in square', inkPct(maps[0]).toFixed(0) + '%', '| changed vs start:', d.slice(1).map(v => v.toFixed(1) + '%').join('  '));
    await p.close();
  }
  const pg = await b.newPage({ viewport: { width: 1200, height: 400 }, deviceScaleFactor: 1 });
  await pg.setContent(`<body style="margin:0;background:#d9d4c8;font:12px/1.35 'Courier 10 Pitch',monospace;color:#111;padding:14px;width:max-content">
    <div style="font-weight:bold">Walk-past test: brush strokes in the walked world</div>
    <div style="max-width:1100px;margin:4px 0 10px">One 4 m square of ground, watched from eight stands. Each small picture is the ink on the same 80 × 80 cells of the ground (5 cm each), read out of the live frame and laid flat. Strokes that are on the world give the same picture from every stand. The percentage is how much ink, per cell, differs from the first stand (0% = identical, 100% = every cell flipped).</div>
    ${res.map(r => `<div style="margin:10px 0 3px"><b>${r.name}</b> · ${r.anchor === 'world' ? 'strokes on the world (the prototype)' : 'control: the same sheet stuck to the screen'}</div><div style="display:flex;gap:8px">${r.maps.map((m, i) => `<figure style="margin:0;width:150px"><canvas width="${NN}" height="${NN}" data-m="${m}" style="width:150px;height:150px;border:1px solid #111;image-rendering:pixelated;display:block"></canvas><figcaption>${STANDS[i][0]}${i ? '<br><b>' + r.d[i].toFixed(1) + '%</b> changed' : ''}</figcaption></figure>`).join('')}</div>`).join('')}
    <script>document.querySelectorAll('canvas').forEach(c=>{const g=c.getContext('2d'),m=c.dataset.m,im=g.createImageData(${NN},${NN});for(let i=0;i<m.length;i++){const v=m[i]==='?'?150:236-(m.charCodeAt(i)-97)/25*216;im.data[i*4]=im.data[i*4+1]=im.data[i*4+2]=v;im.data[i*4+3]=255;}g.putImageData(im,0,0);});</script></body>`);
  await pg.screenshot({ path: path.join(out, 'walk-test.png'), fullPage: true });
  fs.writeFileSync(path.join(out, 'walk-test.json'), JSON.stringify(res.map(({ name, anchor, d, ink }) => ({ name, anchor, ink, d }))));
  await b.close(); srv.close();
});
