// The stroke sheet. Generated for now; this is the one file the owner's own drawn sheet replaces (?sheet=his.png).
// A sheet is a square, tiling, greyscale picture of brush strokes laid side by side, all running left to right.
// It is not a picture of ink. It is a picture of WHEN each bit of a stroke shows:
//   R  how soon this pixel inks as its place gets darker. 1 = the spine of a loaded stroke, shows first in half-light.
//      Low = the thin edge, the tail, a dry-brush gap: shows only in deep shade. 0 = never, except in full dark.
//   G  one value per stroke. Each stroke reads the light a little ahead of or behind itself, so a row of strokes
//      ends raggedly at a shadow's edge, each with its own taper, and not along a ruled line.
//   B  slow noise, to break up the steps of the light.
// A hand-drawn sheet only needs R (black strokes on white, scanned; darker = sooner). G and B can be made from it.
export function makeSheet(N = 1024, seed = 7) {
  let sd = seed; const rnd = () => (sd = (sd * 16807) % 2147483647) / 2147483647, rr = (a, b) => a + (b - a) * rnd();
  const H = new Float32Array(N * N), G = new Float32Array(N * N).fill(.5);
  const vn = (tab, x) => { const i = Math.floor(x), f = x - i, s = f * f * (3 - 2 * f); return tab[i & 63] * (1 - s) + tab[(i + 1) & 63] * s; };
  const strokes = [];
  // rows, stacked like the owner's inspo 14: each row a run of strokes end to end, each its own length, load and lean
  for (let y = 0; y < N;) {
    const big = rnd() < .12, rowW = big ? rr(20, 34) : rr(6, 15);
    for (let x = rr(-200, 0); x < N;) {
      const len = rowW * rr(13, 24), gap = rnd() < .2 ? rr(20, 90) : rr(-len * .25, 6);
      strokes.push({ x, y: y + rr(-rowW * .5, rowW * .5), len, w: rowW * rr(.75, 1.2), tilt: rr(-.05, .05), sag: rr(-.6, .6) * rowW,
        belly: rr(.22, .55), level: Math.pow(rnd(), .8) * .72 + .28, dry0: rnd() < .3 ? rr(0, .25) : rr(.45, .95), dryAmt: rr(.6, 1),
        flip: rnd() < .22, off: rnd(), tab: Array.from({ length: 64 }, rnd), br: Array.from({ length: 3 + Math.floor(rnd() * 5) }, () => [rr(-.85, .85), rr(.035, .1), rnd() * 64]) });
      x += len + gap;
    }
    y += rowW * rr(.62, 1.0);
  }
  for (const s of strokes) {
    const a = Math.log(.5) / Math.log(s.belly), ct = Math.cos(s.tilt), st = Math.sin(s.tilt), R = Math.ceil(s.w * 1.4 + Math.abs(s.sag) + Math.abs(st) * s.len);
    for (let px = Math.floor(s.x) - 2; px < s.x + s.len + 2; px++) {
      let t = (px - s.x) / s.len; if (t <= 0 || t >= 1) continue; if (s.flip) t = 1 - t;
      const spine = s.y + (px - s.x) * st / ct + s.sag * Math.sin(Math.PI * t);
      const hw = s.w * Math.pow(Math.sin(Math.PI * Math.pow(t, a)), 1.25) * (1 + .22 * (vn(s.tab, t * 9) - .5) * 2) + .4;          // swell, then a long taper; the edge wobbles
      const ends = Math.pow(Math.min(1, t / .1, (1 - t) / .45), .6);                                                              // the tail lets go first
      const dry = Math.max(0, (t - s.dry0) / (1 - s.dry0 + 1e-3)) * s.dryAmt;                                                      // the brush runs out toward the tail
      for (let py = Math.floor(spine - R); py <= spine + R; py++) {
        const d = (py - spine) / hw, e = Math.abs(d); if (e >= 1) continue;
        let h = s.level * (1 - Math.pow(e, 1.7)) * ends;
        if (dry > 0) for (const [bd, bw, ph] of s.br) { const k = Math.abs(d - bd - .08 * (vn(s.tab, t * 5 + ph) - .5)) / bw; if (k < 1) h *= 1 - Math.min(1, dry * 1.5 * (.55 + .7 * vn(s.tab, t * 40 + ph))) * (1 - k * k); }
        const i = ((py % N + N) % N) * N + ((px % N + N) % N); if (h > H[i]) { H[i] = h; G[i] = s.off; }
      }
    }
  }
  const nt = Array.from({ length: 64 * 64 }, rnd), data = new Uint8Array(N * N * 4);
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) { const i = y * N + x, u = x / 16, w = y / 16, ui = Math.floor(u), wi = Math.floor(w), fu = u - ui, fw = w - wi, q = (a, b) => nt[((b & 63) << 6) | (a & 63)];
    const n = (q(ui, wi) * (1 - fu) + q(ui + 1, wi) * fu) * (1 - fw) + (q(ui, wi + 1) * (1 - fu) + q(ui + 1, wi + 1) * fu) * fw;
    data[i * 4] = Math.round(H[i] * 255); data[i * 4 + 1] = Math.round(G[i] * 255); data[i * 4 + 2] = Math.round(n * 255); data[i * 4 + 3] = 255; }
  return { data, N, strokes: strokes.length };
}

// A drawn sheet: black strokes on white, running left to right, square, any size. Darker = sooner. Soft edges are kept;
// a hard black-and-white scan is softened a little so its strokes still thin out toward the light. Each band of the page gets its own load.
export function sheetFromImage(img, N = 1024, seed = 3) {
  const c = document.createElement('canvas'); c.width = c.height = N; const g = c.getContext('2d', { willReadFrequently: true }); g.fillStyle = '#fff'; g.fillRect(0, 0, N, N); g.drawImage(img, 0, 0, N, N);
  const px = g.getImageData(0, 0, N, N).data; let a = new Float32Array(N * N), b = new Float32Array(N * N); for (let i = 0; i < N * N; i++) a[i] = 1 - px[i * 4] / 255;
  for (let pass = 0; pass < 2; pass++) { const r = 5;
    for (let y = 0; y < N; y++) { let s = 0; for (let k = -r; k <= r; k++) s += a[y * N + ((k + N) % N)]; for (let x = 0; x < N; x++) { b[y * N + x] = s / (2 * r + 1); s += a[y * N + (x + r + 1) % N] - a[y * N + (x - r + N) % N]; } }
    for (let x = 0; x < N; x++) { let s = 0; for (let k = -r; k <= r; k++) s += b[((k + N) % N) * N + x]; for (let y = 0; y < N; y++) { a[y * N + x] = s / (2 * r + 1); s += b[((y + r + 1) % N) * N + x] - b[((y - r + N) % N) * N + x]; } } }
  let sd = seed; const rnd = () => (sd = (sd * 16807) % 2147483647) / 2147483647, nt = Array.from({ length: 64 * 64 }, rnd), q = (u, w) => nt[((w & 63) << 6) | (u & 63)];
  const vn = (u, w) => { const ui = Math.floor(u), wi = Math.floor(w), fu = u - ui, fw = w - wi; return (q(ui, wi) * (1 - fu) + q(ui + 1, wi) * fu) * (1 - fw) + (q(ui, wi + 1) * (1 - fu) + q(ui + 1, wi + 1) * fu) * fw; };
  const data = new Uint8Array(N * N * 4);
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) { const i = y * N + x, band = vn(x / 256, y / 20);
    data[i * 4] = Math.round(Math.min(1, a[i] * 1.15) * (.45 + .55 * band) * 255); data[i * 4 + 1] = Math.round(vn(x / 256 + 9, y / 20 + 5) * 255); data[i * 4 + 2] = Math.round(vn(x / 16, y / 16) * 255); data[i * 4 + 3] = 255; }
  return { data, N };
}
