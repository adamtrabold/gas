// node papers.js -> paper/*.png. Stand-in paper grains, one per kind of surface. Throwaway.
// Each is a square, tiling, greyscale picture, 256 px, levelled to use the whole range: white = the paper's high tooth (takes ink first),
// dark = its valleys (a dry brush skips them). The owner's own scans replace these file for file: same names, square, greyscale, levelled.
const fs = require('fs'), path = require('path'), zlib = require('zlib'), N = 256, out = path.join(__dirname, 'paper');
fs.mkdirSync(out, { recursive: true });
const crcT = Array.from({ length: 256 }, (_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; });
const crc = b => { let c = ~0; for (const x of b) c = crcT[(c ^ x) & 255] ^ (c >>> 8); return ~c >>> 0; };
const chunk = (t, d) => { const l = Buffer.alloc(4); l.writeUInt32BE(d.length); const td = Buffer.concat([Buffer.from(t), d]), c = Buffer.alloc(4); c.writeUInt32BE(crc(td)); return Buffer.concat([l, td, c]); };
const png = g => { const h = Buffer.alloc(13); h.writeUInt32BE(N, 0); h.writeUInt32BE(N, 4); h[8] = 8; h[9] = 0; const raw = Buffer.alloc(N * (N + 1)); for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) raw[y * (N + 1) + 1 + x] = g[y * N + x]; return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', h), chunk('IDAT', zlib.deflateSync(raw, { level: 9 })), chunk('IEND', Buffer.alloc(0))]); };
let sd = 11; const rnd = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
// value noise that tiles: px cells across, py cells down
const noise = (px, py) => { const t = Array.from({ length: px * py }, rnd); return (x, y) => { const u = x / N * px, w = y / N * py, i = Math.floor(u), j = Math.floor(w); let f = u - i, h = w - j; f = f * f * (3 - 2 * f); h = h * h * (3 - 2 * h); const q = (a, b) => t[(b % py) * px + (a % px)]; return (q(i, j) * (1 - f) + q(i + 1, j) * f) * (1 - h) + (q(i, j + 1) * (1 - f) + q(i + 1, j + 1) * f) * h; }; };
const make = (name, layers, shape = v => v) => { const L = layers.map(([px, py, a]) => [noise(px, py), a]), v = new Float32Array(N * N); let lo = 1e9, hi = -1e9;
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) { let s = 0; for (const [f, a] of L) s += f(x, y) * a; s = shape(s, x, y); v[y * N + x] = s; lo = Math.min(lo, s); hi = Math.max(hi, s); }
  const g = new Uint8Array(N * N); for (let i = 0; i < N * N; i++) g[i] = Math.round((v[i] - lo) / (hi - lo) * 255); fs.writeFileSync(path.join(out, name + '.png'), png(g)); };
make('dirt', [[10, 10, .5], [28, 28, .3], [80, 80, .3]]);                                   // rough, cold-pressed: big tooth
make('plaster', [[6, 6, .35], [18, 18, .5], [60, 60, .25]], v => Math.pow(v, 1.4));        // lumpy, trowelled
make('concrete', [[40, 40, .4], [128, 128, .6]], v => v > .72 ? v - .5 : v);                // fine, with pits
make('blacktop', [[24, 24, .55], [64, 64, .45]], v => Math.abs(v - .5));                    // coarse aggregate: cells
make('steel', [[3, 90, .6], [128, 128, .15], [5, 5, .25]]);                                 // smooth, with faint drawn streaks one way
make('wood', [[2, 60, .7], [4, 128, .3]], (v, x, y) => v + .1 * Math.sin(y / N * 6.283 * 14 + 6 * Math.sin(x / N * 6.283)));   // laid: fibres along the plank
make('tin', [[128, 4, .5], [128, 128, .12], [4, 4, .38]]);                                  // smooth, scratched across
make('rubber', [[60, 60, .5], [128, 128, .5]], v => Math.abs(v - .5));                               // perished rubber: fine, pebbled, crazed
