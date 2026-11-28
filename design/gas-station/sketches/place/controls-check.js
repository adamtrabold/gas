// node controls-check.js -> the settled controls, driven in the station itself with real multi-touch TouchEvents through CDP (emulated iPhone 14; a tiny canvas so frames are quick, the control code is the same). Prints where you end up after each gesture.
const http = require('http'), fs = require('fs'), path = require('path'); const { chromium, devices } = require('playwright');
const root = path.join(__dirname, '..'), types = { '.js': 'text/javascript', '.png': 'image/png', '.html': 'text/html' };
const srv = http.createServer((q, r) => { const u = decodeURIComponent(q.url.split('?')[0]); fs.readFile(path.join(root, u), (e, d) => { if (e) { r.writeHead(404); return r.end(); } r.writeHead(200, { 'content-type': types[path.extname(u)] || 'text/plain' }); r.end(d); }); }).listen(0, async () => {
  const b = await chromium.launch(), ctx = await b.newContext({ ...devices['iPhone 14'] }), p = await ctx.newPage(), cdp = await ctx.newCDPSession(p); const errs = [];
  p.on('pageerror', e => { errs.push(e.message); console.log('PAGEERROR', e.message); }); p.on('console', m => { if (m.type() === 'error') console.log('console', m.text().slice(0, 300)); });
  const Qs = process.env.Q || 'view=together&day=1';
  await p.goto('http://localhost:' + srv.address().port + '/place/index.html?dpr=1&res=.2&msaa=0&' + Qs + (process.env.HASHX || ''), { timeout: 120000 });
  await p.waitForFunction(() => window.papersLoaded && window.lastMs > 0, null, { timeout: 180000 });
  const sleep = ms => new Promise(r => setTimeout(r, ms)), st = () => p.evaluate(() => window.state()), put = (...a) => p.evaluate(a => window.put(...a), a);
  const touch = (type, pts) => cdp.send('Input.dispatchTouchEvent', { type, touchPoints: pts.map((q, i) => ({ x: q[0], y: q[1], id: q[2] ?? i })) });
  // move fingers from A (list of points) to B over ms, in steps
  const drag = async (A, B, ms, { lift = true, stagger = 0, hold = 120 } = {}) => { if (stagger) { await touch('touchStart', [A[0]]); await sleep(stagger); } await touch('touchStart', A); const n = Math.max(2, Math.round(ms / 16));
    for (let i = 1; i <= n; i++) { await touch('touchMove', A.map((a, k) => [a[0] + (B[k][0] - a[0]) * i / n, a[1] + (B[k][1] - a[1]) * i / n])); await sleep(ms / n); }
    if (lift) { await sleep(hold); await touch('touchEnd', []); } await sleep(700); };
  const out = (k, v) => console.log(k.padEnd(46), typeof v === 'string' ? v : JSON.stringify(v));
  out('frame ms (tiny canvas)', await p.evaluate(() => window.lastMs.toFixed(0)) + '   hint: ' + await p.evaluate(() => document.getElementById('hint').textContent));
  let a, c;
  await put(-6.8, 2.4, 0, 2); a = await st(); await drag([[100, 300]], [[300, 300]], 1000); c = await st(); out('1 finger right 200 px, slow: head', `${a.head} -> ${c.head}  (turn left is +; 200/390*90 = 46.2)  x,n ${c.x},${c.n}`);
  await put(-6.8, 2.4, 0, 2); await drag([[300, 300]], [[100, 300]], 1000); c = await st(); out('1 finger left 200 px, slow: head', `0 -> ${c.head}`);
  await put(-6.8, 2.4, 0, 2); await drag([[200, 200]], [[200, 300]], 800); c = await st(); out('1 finger down 100 px, slow: pitch', `2 -> ${c.pitch}  (look up is +; 100/664*60 = 9.0)`);
  await put(-6.8, 2.4, 0, 2); await drag([[200, 300]], [[200, 200]], 800); c = await st(); out('1 finger up 100 px, slow: pitch', `2 -> ${c.pitch}`);
  await put(-6.8, 2.4, 0, 2); await drag([[100, 300]], [[300, 300]], 130, { hold: 0 }); c = await st(); out('1 finger right 200 px, flicked: head', `0 -> ${c.head}  (curve and carry-on)`);
  await put(-6.8, 2.4, 0, 2); await touch('touchStart', [[200, 300]]); await sleep(1500); await touch('touchEnd', []); await sleep(500); c = await st(); out('hold 1.5 s, no move', `${c.x},${c.n} head ${c.head} pitch ${c.pitch}`);
  // pinch out on the west pump from the opening stand. where is it on screen?
  await put(-6.8, 2.4, 0, 2); await sleep(300); const pp = await p.evaluate(() => window.proj(-8.2, 11.5, 1.0)); out('west pump on screen at', pp.map(v => Math.round(v)));
  await drag([[pp[0] - 40, pp[1]], [pp[0] + 40, pp[1]]], [[pp[0] - 130, pp[1]], [pp[0] + 130, pp[1]]], 1200, { stagger: 80 }); c = await st(); out('pinch out on the pump 80 -> 260 px: you', `${c.x},${c.n} head ${c.head}  ${Math.hypot(c.x + 8.2, c.n - 11.5).toFixed(2)} m from its centre`);
  const pq = await p.evaluate(() => window.proj(-8.2, 11.5, 1.0)); await drag([[pq[0] - 40, pq[1]], [pq[0] + 40, pq[1]]], [[pq[0] - 150, pq[1]], [pq[0] + 150, pq[1]]], 900); c = await st(); out('  again, hard: stops at the pump', `${c.x},${c.n}  ${Math.hypot(c.x + 8.2, c.n - 11.5).toFixed(2)} m from its centre (its face is 0.2 to 0.3 m out; stop is 0.9 m short of the face)`);
  await drag([[100, 300], [300, 300]], [[160, 300], [240, 300]], 900); c = await st(); out('  pinch in 200 -> 80 px: backs away', `${c.x},${c.n} head ${c.head}`);
  // lopsided pinch (a still thumb) stays a pinch
  await put(-6.8, 2.4, 0, 2); await drag([[150, 420], [230, 380]], [[150, 420], [330, 330]], 900); c = await st(); out('lopsided pinch out (thumb still)', `${c.x},${c.n} head ${c.head}`);
  // two fingers sideways
  await put(-6.8, 2.4, 0, 2); await drag([[100, 400], [170, 400]], [[250, 400], [320, 400]], 1200); c = await st(); out('2 fingers right 150 px, slow', `x -6.8 -> ${c.x}  n ${c.n} head ${c.head}  (you step left: x falls)`);
  await put(-6.8, 2.4, 0, 2); await drag([[250, 400], [320, 400]], [[100, 400], [170, 400]], 1200); c = await st(); out('2 fingers left 150 px, slow', `x -6.8 -> ${c.x}  n ${c.n} head ${c.head}`);
  await put(-6.8, 2.4, 0, 2); await drag([[150, 300], [220, 300]], [[150, 420], [220, 420]], 900); c = await st(); out('2 fingers down together', `${c.x},${c.n} head ${c.head} pitch ${c.pitch}  (nothing)`);
  // track into a pump: stops
  await put(-6.6, 11.5, 0, 0); await drag([[60, 400], [130, 400]], [[330, 400], [370, 400]], 1200); c = await st(); out('track left toward the west pump from 1.6 m', `x -6.6 -> ${c.x}  (${Math.hypot(c.x + 8.2, c.n - 11.5).toFixed(2)} m from its centre; solid inside 0.75)`);
  // tap
  await put(-6.8, 2.4, 0, 2); await touch('touchStart', [[195, 560]]); await sleep(60); await touch('touchEnd', []); await sleep(2800); c = await st(); out('tap on the ground ahead', `${c.x},${c.n}`);
  await put(-6.8, 2.4, 0, 2); await sleep(200); const pe = await p.evaluate(() => window.proj(-5.4, 11.5, 1.0)); await touch('touchStart', [pe]); await sleep(60); await touch('touchEnd', []); await sleep(2800); c = await st(); out('tap on the east pump', `${c.x},${c.n}  ${Math.hypot(c.x + 5.4, c.n - 11.5).toFixed(2)} m from its centre`);
  await put(-6.8, 2.4, 0, 2); await touch('touchStart', [[195, 60]]); await sleep(60); await touch('touchEnd', []); await sleep(800); c = await st(); out('tap on the sky', `${c.x},${c.n}`);
  // the door: two beats
  await put(0, 9, 0, 0); await sleep(300); const dd = await p.evaluate(() => window.proj(0, 16, 1.2)); out('door on screen at', dd.map(v => Math.round(v)) + '  under: ' + JSON.stringify(await p.evaluate(d => { const u = window.under(d[0], d[1]); return { kind: u.kind, d: +u.d.toFixed(2), door: !!u.door }; }, dd)));
  await drag([[dd[0] - 30, dd[1]], [dd[0] + 30, dd[1]]], [[dd[0] - 170, dd[1]], [dd[0] + 170, dd[1]]], 900); c = await st(); out('beat 1: hard pinch out on the door', `${c.x},${c.n} inside ${c.inside}  (door at n 16: stop 15.1)`);
  await drag([[dd[0] - 30, dd[1]], [dd[0] + 30, dd[1]]], [[dd[0] - 170, dd[1]], [dd[0] + 170, dd[1]]], 150, { hold: 0 }); c = await st(); out('  (a flick on the way does not go through)', `${c.x},${c.n} inside ${c.inside}`);
  await drag([[150, 300], [240, 300]], [[130, 300], [262, 300]], 500); await sleep(600); c = await st(); out('beat 2: a new pinch out, x1.47', `${c.x},${c.n} inside ${c.inside}  (lands 1.5 m in: 17.5)`);
  await p.evaluate(() => history.back()); await sleep(500); c = await st(); out('back', `${c.x},${c.n} inside ${c.inside} head ${c.head}`);
  await put(0, 14.8, 0, 0); await sleep(200); const d2 = await p.evaluate(() => window.proj(0, 16, 1.2)); await touch('touchStart', [d2]); await sleep(60); await touch('touchEnd', []); await sleep(900); c = await st(); out('tap on the door from the door', `${c.x},${c.n} inside ${c.inside}`);
  await p.evaluate(() => history.back()); await sleep(400);
  // second finger's start swallowed: only moves listing two fingers
  await put(-6.8, 2.4, 0, 2); await touch('touchStart', [[150, 300]]); await sleep(30); for (let i = 0; i <= 40; i++) { await touch('touchMove', [[150 - i * 2, 300], [240 + i * 2, 300]]); await sleep(20); } await touch('touchEnd', []); await sleep(700); c = await st(); out('pinch whose 2nd start never arrives', `${c.x},${c.n} head ${c.head}`);
  // edge
  await put(-6.8, 2.4, 0, 2); await drag([[8, 300]], [[200, 300]], 500); c = await st(); out('swipe starting 8 px from the left edge', `head ${c.head} (not ours: 0)`);
  // keys
  await put(-6.8, 2.4, 0, 2); await p.keyboard.down('ArrowLeft'); await sleep(1000); await p.keyboard.up('ArrowLeft'); c = await st(); out('left arrow 1 s', `head ${c.head} (about +90)  hint: ` + await p.evaluate(() => document.getElementById('hint').textContent));
  await put(-6.8, 2.4, 0, 2); await p.keyboard.down('w'); await sleep(1000); await p.keyboard.up('w'); c = await st(); out('w 1 s', `n 2.4 -> ${c.n} (about 4 m)`);
  await put(-6.8, 2.4, 0, 2); await p.keyboard.down('d'); await sleep(1000); await p.keyboard.up('d'); c = await st(); out('d 1 s', `x -6.8 -> ${c.x} (about 3 m right)`);
  await put(0, 14, 0, 0); await p.keyboard.down('ArrowUp'); await sleep(1200); c = await st(); const mid = `${c.n} inside ${c.inside}`; await sleep(900); await p.keyboard.up('ArrowUp'); c = await st(); out('forward key held into the door', `after 1.2 s: ${mid};  after 2.1 s: ${c.n} inside ${c.inside}`);
  await p.keyboard.press('Escape'); await sleep(400); c = await st(); out('Escape', `${c.x},${c.n} inside ${c.inside}`);
  // wheel (mouse)
  await put(-6.8, 2.4, 0, 2); await p.mouse.move(195, 420); for (let i = 0; i < 3; i++) { await p.mouse.wheel(0, -100); await sleep(60); } await sleep(700); c = await st(); out('wheel 3 notches in, on the ground', `${c.x},${c.n}`);
  // canopy post, world edge
  await put(-11.1, 6, 0, 0); await p.keyboard.down('w'); await sleep(1200); await p.keyboard.up('w'); c = await st(); out('walk at the west canopy post (at -11.1, 8.8)', `${c.x},${c.n}  ${Math.hypot(c.x + 11.1, c.n - 8.8).toFixed(2)} m from it (solid inside 0.45)`);
  await put(0, -127, 180, 0); await p.keyboard.down('w'); await sleep(1500); await p.keyboard.up('w'); c = await st(); out("the world's edge (130 m), walking south", `${c.x},${c.n} head ${c.head}`);
  out('page errors', errs.length ? errs : 'none');
  await b.close(); srv.close(); });
