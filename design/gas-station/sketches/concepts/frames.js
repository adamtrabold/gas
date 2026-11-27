// The stills. Each returns a canvas. Tall phone, 300 x 650 at 2x. Throwaway.
const ROADA = [0, -13, 1.65];
const HAND = 'italic', HANDF = '"DejaVu Serif"';

// ---------------------------------------------------------------- upright Googie arrow sign (01, 03, 04)
// by the road, left of centre. a pylon, the name in lit boxes stacked down it, a flat painted arrow diving at the door, a starburst on top
const SG = { X: -1.75, Y: -2, TOP: 11.2, sz: .74 };
SG.a0 = [SG.X + .35, SG.Y, 9.7]; SG.dir = norm([.2, 0, -.98]); SG.per = [SG.dir[2], 0, -SG.dir[0]]; SG.LEN = 7.0; SG.H1 = 4.9;
function signA(F, o = {}) {
  const { X, Y, TOP, sz, a0, dir, per, LEN, H1 } = SG, night = F.night;
  const sh = (s, w) => arrowShape(s, w, 0, H1, LEN, .4, 1.2);
  if (o.occ) {
    F.boxes.push([X - 1.0, X - .2, Y - .1, Y + .1, 5.2, 10.9]);
    F.occ.push((p, S) => { if (Math.abs(S[1]) < 1e-6) return false; const t = (Y - p[1]) / S[1]; if (t <= 0) return false; const d = add(add(p, S, t), a0, -1); return sh(dot(d, dir), dot(d, per)); });
    return;
  }
  if (!night) { poleShadow(F, X, Y, TOP, .1); F.stroke([X, Y, 0], [X, Y, TOP], .1, [1, 0, 0], INK, { flat: 1, e0: 0, e1: 0 }); }
  if (!night) F.quad(arrowPoly(a0, dir, per, 0, H1, LEN, .4, 1.2), INK);
  for (let i = 0; i < 8; i++) { const an = (i * 45 + 22) * RAD, l = i % 2 ? .5 : .95; F.stroke([X, Y, TOP + .3], [X + Math.cos(an) * l, Y, TOP + .3 + Math.sin(an) * l], .03, [Math.sin(an), 0, -Math.cos(an)], F.fg, { flat: 1, e0: 0, e1: 0 }); }
  for (let s = .45; s < LEN - .3; s += .56) {
    const hw = s < H1 ? .4 : 1.2 * (LEN - s) / (LEN - H1);
    [-1, 1].forEach(k => { if (night && o.chase != null && Math.abs(s / LEN - o.chase) > .38) return; F.dot(add(add(a0, dir, s), per, k * Math.max(.05, hw - .13)), night ? .1 : .06, PAPER); });
  }
  NAME.split('').forEach((ch, i) => {
    const z = TOP - .6 - i * sz * 1.03, c = [X - .6, Y - .05, z];
    F.quad([[c[0] - sz / 2, Y - .05, z - sz / 2], [c[0] + sz / 2, Y - .05, z - sz / 2], [c[0] + sz / 2, Y - .05, z + sz / 2], [c[0] - sz / 2, Y - .05, z + sz / 2]], PAPER);
    if (!night) { F.stroke([c[0] - sz / 2, Y - .06, z - sz / 2], [c[0] + sz / 2, Y - .06, z - sz / 2], .04, [0, 0, 1], INK, { flat: 1, e0: 0, e1: 0 }); const k = F.S[0] > 0 ? -1 : 1; F.stroke([c[0] + sz / 2 * k, Y - .06, z - sz / 2], [c[0] + sz / 2 * k, Y - .06, z + sz / 2], .03, [1, 0, 0], INK, { flat: 1, e0: 0, e1: 0 }); }
    F.text(c, ch, sz * .92, INK);
  });
}
function dashed(F, A, B, perp, col = INK, w = .02, on = .3, per = .5) { const d = add(B, A, -1), len = Math.hypot(...d); for (let t = 0; t < len; t += per) F.stroke(add(A, d, t / len), add(A, d, Math.min(len, t + on) / len), w, perp, col, { flat: 1, e0: 0, e1: 0, n: 3 }); }

function exteriorA(F, o = {}) {
  const L = layout('A'); occluders(F, L); signA(F, { occ: 1 });
  desert(F); stationDay(F, L);
  L.pumps.forEach(x => pump(F, x)); thing(F, L.ice, 15.5, 1.2, 1.05); thing(F, L.phone, 12.4, .9, 2.3);
  // the door card
  F.quad([[-.2, FY - .07, 1.36], [.2, FY - .07, 1.36], [.2, FY - .07, 1.62], [-.2, FY - .07, 1.62]], PAPER);
  if (o.before) o.before(F, L);
  signA(F); return L;
}
function exteriorNightA(F, o = {}) {
  const L = layout('A');
  if (o.stars !== 0) F.stars(o.stars || 16, o.age || 3.5);
  const lx = L.lamps[1];
  pool(F, [lx, 11, 0], 3.4, 5.2, { ymax: 15.9, block: [[L.pumps[1], 11.4]] });
  L.pumps.forEach(x => { if (Math.abs(x - lx) > 5.2) return; F.stroke([x, 11.4, 0], [x, 11.4, 1.55], .3, [1, 0, 0], INK, { flat: 1, e0: 0, e1: 0 }); F.dot([x, 11.4, 1.85], .27, INK); });
  F.quad([[lx - .42, 11, 4.28], [lx + .42, 11, 4.28], [lx + .3, 11, 4.2], [lx - .3, 11, 4.2]], PAPER);
  // what the lamp reaches of the wall: the lower part of one window, as paper strokes laid away from the lamp
  for (let x = L.wins[0][0]; x < L.wins[0][1]; x += .22) F.stroke([x, FY - .05, .15], [x + (x - lx) * .25, FY - .05, rr(1.4, 2.3)], .12, [1, 0, 0], PAPER, { e0: 0, e1: .05 });
  F.quad([[-.2, FY - .07, 1.36], [.2, FY - .07, 1.36], [.2, FY - .07, 1.62], [-.2, FY - .07, 1.62]], PAPER);
  signA(F, o); return L;
}

// ---------------------------------------------------------------- inside: the counter, seen square on
// modes: 'lit' (tube on, 01) | 'sun' (dark room, a patch of sun through the window is the hand, 02) | 'lights' (dark room, each thing is a light, 03)
function counter(F, mode, o = {}) {
  const g = F.g, dark = mode !== 'lit', WY = 3.0, CY = 1.5, CT = 1.02, base = [0, 1.85, CT];
  const jacket = P => { const dx = Math.abs(P[0] - .98), z = P[2]; return z < 1.98 && z > 1.06 && dx < (z > 1.78 ? .1 + (1.98 - z) * 1.25 : .33 - (1.78 - z) * .06); };
  const stock = P => {            // shelf unit on the back wall: ink recess, paper stock standing in it
    const x = P[0], z = P[2]; if (x < -1.36 || x > .12 || z < 1.3 || z > 2.56) return false; const lv = Math.floor((z - 1.3) / .42), zl = z - 1.3 - lv * .42; if (zl < .045) return false;
    const cx = (x + 1.36) / .19, ci = Math.floor(cx), fr = cx - ci, hh = .1 + ((ci * 7 + lv * 13) % 5) * .055; return !(fr > .1 && fr < .9 && zl - .045 < hh);
  };
  const things = (col, lineCol) => {                 // what stands on the counter, as silhouettes
    F.quad([[-.98, base[1], CT], [-.42, base[1], CT], [-.42, base[1], CT + .3], [-.6, base[1], CT + .3], [-.66, base[1], CT + .46], [-.98, base[1], CT + .46]], col);     // register
    F.quad([[-.93, base[1] - .01, CT + .33], [-.7, base[1] - .01, CT + .33], [-.7, base[1] - .01, CT + .42], [-.93, base[1] - .01, CT + .42]], lineCol);
    for (let i = 0; i < 3; i++) for (let j = 0; j < 4; j++) F.dot([-.56 + i * .05 - .0, base[1] - .01, CT + .06 + j * .055], .014, lineCol);
    F.quad([[.0, base[1], CT], [.09, base[1], CT], [.1, base[1], CT + .1], [-.01, base[1], CT + .1]], col);                                                               // the cup
    F.dot([.3, base[1], CT + .035], .06, col); F.quad([[.24, base[1], CT], [.36, base[1], CT], [.36, base[1], CT + .035], [.24, base[1], CT + .035]], col); F.dot([.3, base[1], CT + .1], .014, col);   // the bell
    F.quad([[.52, base[1], CT], [.88, base[1], CT], [.88, base[1], CT + .22], [.52, base[1], CT + .22]], col); F.stroke([.84, base[1], CT + .22], [.98, base[1], CT + .62], .006, [1, 0, 0], col, { flat: 1, e0: 0, e1: 0 });   // the radio
    F.dot([.62, base[1] - .01, CT + .11], .055, lineCol);
  };
  if (!dark) {
    for (let y = -1.5; y < WY; y += .3) F.stroke([-2.4, y, 2.8], [2.4, y, 2.8], .2, [0, 1, 0], INK, { e0: 0, e1: .02 });                                  // ceiling
    F.stroke([-.75, 2.35, 2.78], [.75, 2.35, 2.78], .05, [0, 1, 0], PAPER, { flat: 1, e0: 0, e1: 0 });                                                     // the tube
    F.stroke([.5, 2.2, 2.78], [.5, 2.2, 2.05], .004, [1, 0, 0], INK, { flat: 1, e0: 0, e1: 0 }); F.dot([.5, 2.2, 2.03], .018, INK);                        // pull cord
    F.fill([0, WY - .02, 0], [1, 0, 0], [0, 0, 1], [-1.4, .15], [1.28, 2.58], .034, stock, INK, [-1, 0, 0], { step: .01, maxlen: [.6, 1.6], drop: 0, so: { e0: 0, e1: 0, blunt: 1, whole: 1 } });
    F.fill([0, WY - .02, 0], [1, 0, 0], [0, 0, 1], [.5, 1.5], [1.0, 2.0], .05, jacket, INK, [0, 0, 1], { step: .02, maxlen: [.5, 1.2], drop: .02, so: { e0: 0, e1: .08, blunt: 1 } });   // the jacket on its hook
    F.dot([.98, WY - .03, 2.02], .02, INK);
    F.dot([.42, WY - .02, 2.3], .19, INK); F.dot([.42, WY - .03, 2.3], .16, PAPER); F.stroke([.42, WY - .04, 2.3], [.42, WY - .04, 2.42], .008, [1, 0, 0], INK, { flat: 1, e0: 0, e1: 0 }); F.stroke([.42, WY - .04, 2.3], [.5, WY - .04, 2.26], .008, [0, 0, 1], INK, { flat: 1, e0: 0, e1: 0 });   // the clock
    chart(F, [.22, WY - .03, 1.2], .42, .52);
    // counter: its top is lit and lost. its face is the big black, laid downward
    for (let z = CT - .09; z > .02; z -= .1) F.stroke([-1.9, CY, z], [1.9, CY, z], .075, [0, 0, 1], INK, { e0: 0, e1: 0, blunt: 1 });
    for (let y = CY - .08; y > .95; y -= .13) F.stroke([-1.9 + rr(0, .3), y, 0], [1.9 - rr(0, .5), y, 0], .08, [0, 1, 0], INK, { e0: 0, e1: .02 });           // its shadow on the floor, toward you
    things(INK, PAPER);
    [[.02, .17], [.07, .2]].forEach(([x, h], i) => F.sstroke(Array.from({ length: 12 }, (_, k) => F.pj([x + Math.sin(k * .7 + i) * .012, base[1], CT + .12 + k / 11 * h])), 1.6, INK, .8));   // the cup is still warm
  } else {
    const S = o.S, win = o.win, lit = P => { const t = (win.y - P[1]) / S[1]; if (t <= 0) return false; const x = P[0] + S[0] * t, z = P[2] + S[2] * t; return x > win.x[0] && x < win.x[1] && z > win.z[0] && z < win.z[1] && !(win.mull && Math.abs(((x - win.x[0]) % win.mull) - win.mull / 2) > win.mull / 2 - .04); };
    const you = o.you ? P => { const t = (o.you[1] - P[1]) / S[1]; if (t <= 0) return false; const x = P[0] + S[0] * t - o.you[0], z = P[2] + S[2] * t; return z < 1.45 ? Math.abs(x) < (z > 1.25 ? .24 : .2) : (z < 1.78 && Math.abs(x) < .1); } : () => false;
    const T = P => lit(P) && !you(P), dirL = [-S[0], -S[1], -S[2]];
    const SO = { e0: 0, e1: .02, blunt: 1 };
    F.fill([0, 0, 0], [1, 0, 0], [0, 1, 0], [-2.2, 2.2], [-1.2, CY], .09, T, PAPER, null, { step: .02, maxlen: [1.2, 3], drop: .03, so: SO });                         // the patch on the floor
    F.S = S; F.fill([0, CY - .01, 0], [1, 0, 0], [0, 0, 1], [-1.7, 1.7], [0, CT], .07, T, PAPER, null, { step: .02, maxlen: [.8, 1.6], drop: .03, so: SO });
    F.fill([0, 0, CT], [1, 0, 0], [0, 1, 0], [-1.7, 1.7], [CY, 2.2], .05, T, PAPER, null, { step: .02, maxlen: [.5, 1.2], drop: .02, so: SO });
    F.fill([0, WY - .02, 0], [1, 0, 0], [0, 0, 1], [-1.6, 1.6], [CT, 2.8], .06, P => T(P) && !stock(P) && !jacket(P), PAPER, null, { step: .02, maxlen: [.8, 1.8], drop: .03, so: SO });
    things(INK, PAPER);
    if (o.awake) { const sx = -S[0] / S[1] * .0, gs = [-S[0] / S[2] * .1, -S[1] / S[2] * .1]; F.stroke([.045, base[1], CT + .001], [.045 + gs[0], base[1] + gs[1], CT + .001], .05, [1, 0, 0], INK, { e0: 0, e1: .1 }); }
    (o.lamps || []).forEach(([P, r]) => {            // 03: a thing that is on. paper laid away from it
      for (let a = 8; a < 172; a += rr(9, 15)) { const d = [Math.cos(a * RAD), 0, Math.sin(a * RAD)]; F.stroke([P[0] + d[0] * r * .2, WY - .02, CT + .02 + d[2] * r * .2], [P[0] + d[0] * r * rr(.7, 1), WY - .02, CT + .02 + d[2] * r * rr(.7, 1)], r * .07, [-d[2], 0, d[0]], PAPER, { e0: 0, e1: .05, blunt: 1 }); }
      for (let x = P[0] - r; x < P[0] + r; x += .07) F.stroke([x, CY + .05, CT], [x, 2.2, CT], .03, [1, 0, 0], PAPER, { e0: 0, e1: 0, blunt: 1 });
    });
    if (o.lamps) things(INK, PAPER);
  }
}
// the sightings chart: small line drawings, a place and a date under each (after the owner's image 15)
function chart(F, P, w, h) {
  const g = F.g, [x, y, z] = P; F.quad([[x, y, z], [x + w, y, z], [x + w, y, z + h], [x, y, z + h]], PAPER);
  F.stroke([x, y, z], [x + w, y, z], .006, [0, 0, 1], INK, { flat: 1, e0: 0, e1: 0 }); F.stroke([x + w, y, z], [x + w, y, z + h], .006, [1, 0, 0], INK, { flat: 1, e0: 0, e1: 0 });
  for (let i = 0; i < 2; i++) for (let j = 0; j < 3; j++) {
    const c = [x + w * (.27 + i * .46), y - .005, z + h * (.82 - j * .31)], p = F.pj(c), r = F.px(c, w * .13); if (!p) continue; g.strokeStyle = INK; g.lineWidth = 1.2;
    if (i + j * 2 < 2) { g.beginPath(); g.ellipse(p[0], p[1], r, r * (i ? .35 : .5), 0, 0, 7); g.stroke(); if (!i) { g.beginPath(); g.ellipse(p[0], p[1] - r * .3, r * .4, r * .3, 0, Math.PI, 0); g.stroke(); } }
    g.fillStyle = INK; g.fillRect(p[0] - r, p[1] + r * .9, r * (i + j * 2 < 2 ? 1.6 : .0), 1.5);
  }
  F.dot([x + w / 2, y - .01, z + h - .02], .008, INK);
}

// ---------------------------------------------------------------- 01 Nobody's here
var SHEETS = [];
var FR = {};
FR['01a'] = () => { const F = Frame({ cam: ROADA, pitch: 12, hour: 10.6, decl: -21, seed: 3 }); exteriorA(F); return F.cv; };
FR['01b'] = () => {            // crossing the door: one loaded stroke dragged across, the room behind it
  const A = Frame({ cam: [-.75, 11.4, 1.5], pitch: 3, hour: 10.6, decl: -21, seed: 9 }); const L = layout('A'); occluders(A, L);
  for (let x = -.52; x < .6; x += .13) A.stroke([x, FY - .05, 2.25], [x, FY - .05, 0], .09, [1, 0, 0], INK, { e0: 0, e1: .01 });
  for (let x = 1.5; x < 2.2; x += .13) A.stroke([x, FY - .05, 2.5], [x, FY - .05, .9], .09, [1, 0, 0], INK, { e0: 0, e1: .01 });
  A.stroke([-8, FY - .04, BH - .55], [8, FY - .04, BH - .55], .11, [0, 0, 1], INK, { flat: 1, e0: 0, e1: 0 }); A.stroke([-8, FY - .04, BH - .95], [8, FY - .04, BH - .95], .07, [0, 0, 1], INK, { flat: 1, e0: 0, e1: 0 });
  A.quad([[-.26, FY - .07, 1.3], [.26, FY - .07, 1.3], [.26, FY - .07, 1.66], [-.26, FY - .07, 1.66]], PAPER);
  A.text([0, FY - .08, 1.54], 'BACK IN', .085, INK, 'bold', '"Courier 10 Pitch"'); A.text([0, FY - .08, 1.42], '5 MINUTES', .085, INK, 'bold', '"Courier 10 Pitch"');
  A.dot([.47, FY - .07, 1.05], .03, PAPER);
  A.word([.1, FY - .1, 2.85], 'DING', .4);
  const B = Frame({ cam: [0, -1.6, 1.5], pitch: -3, seed: 4, hour: 12 }); counter(B, 'lit');
  const g = A.g, edge = []; for (let y = -20; y <= H + 20; y += 26) edge.push([W * .34 + (y - H / 2) * .1 + Math.sin(y * .011) * 14 + rr(-3, 3), y]);
  g.save(); g.beginPath(); g.moveTo(-10, -20); edge.forEach(p => g.lineTo(...p)); g.lineTo(-10, H + 20); g.closePath(); g.clip(); g.drawImage(B.cv, 0, 0); g.restore();
  g.fillStyle = INK; g.beginPath(); edge.forEach((p, i) => i ? g.lineTo(p[0] - 26 - 5 * Math.sin(i * 1.3), p[1]) : g.moveTo(p[0] - 26, p[1])); edge.slice().reverse().forEach((p, i) => g.lineTo(p[0] + 22 + 4 * Math.sin(i * 2.1), p[1])); g.fill();
  for (let i = 0; i < 22; i++) { const p = edge[2 + Math.floor(rnd() * (edge.length - 4))], len = rr(40, 190), yy = p[1] + rr(-12, 12); g.fillRect(p[0] - 30 - len, yy, len, rr(1, 3.5)); }      // bristles trailing into the room
  return A.cv;
};
FR['01c'] = () => { const F = Frame({ cam: [0, -1.6, 1.5], pitch: -3, seed: 4, hour: 12 }); counter(F, 'lit'); return F.cv; };
FR['01d'] = () => { const F = Frame({ cam: ROADA, pitch: 12, night: 1, seed: 5 }); exteriorNightA(F, { stars: 14, age: 4 }); return F.cv; };
SHEETS.push(['01', '01 Nobody\'s here', [
  ['01a', 'Arriving, late morning. Square on, eye height. The front wall is in sun, so it is paper against a paper sky and has no edge: the station is its paint (the two stripes), its openings, and the shadows it throws. The arrow is the only solid black a person made.'],
  ['01b', 'Crossing the door. One loaded stroke dragged across; the room is behind the brush. The bell over the door lands its word and the word sits there.'],
  ['01c', 'Inside, the counter. Lit from behind, so everything he left is a silhouette: register, cup (still warm), bell, radio. The jacket on its hook is the one brushed mass on the wall. The chart is pinned under the clock.'],
  ['01d', 'Another hour: arriving at night. Almost all ink. The name, the arrow\'s bulbs, one lamp and what it reaches, the card in the door, and the sky going round.'],
]]);

// ---------------------------------------------------------------- 02 The Arrow
function exteriorB(F, o = {}) {
  const L = layout('B'); occluders(F, L); rakeOcc(F);
  desert(F, { pad: 16 });
  // the joints of the slab: they fan from the foot of the arrow. paint-thin, broken
  for (let h = 7; h <= 17; h++) { const th = Math.atan(Math.sin(LAT) * Math.tan((h - 12) * 15 * RAD)), d = [Math.sin(th), Math.cos(th), 0]; for (let q = 3; q < 40; q += rr(1.2, 2.6)) { const A = add([AX, AYC, 0], d, q), B = add([AX, AYC, 0], d, q + rr(.5, 1.3)); if (B[1] > FY - .2 || B[0] < L.bx[0] - 3 || B[0] > 12) continue; F.stroke(A, B, .018, [d[1], -d[0], 0], INK, { flat: 1, e0: 0, e1: 0, n: 3 }); } }
  stationDay(F, L, o);
  L.pumps.forEach(x => pump(F, x)); thing(F, L.ice, 15.5, 1.2, 1.05, { awake: o.awake === 'ice' }); thing(F, L.phone, 12.4, .9, 2.3);
  if (o.awake === 'ice') { F.quad([[L.ice - .45, 15.49, .62], [L.ice + .45, 15.49, .62], [L.ice + .45, 15.49, .86], [L.ice - .45, 15.49, .86]], PAPER); F.text([L.ice, 15.48, .74], 'ICE', .2, INK); }
  if (o.post) { const [px, py] = o.post; for (let k = -1; k <= 1; k++) F.stroke([px + k * .07, py, 0], [px + k * .07, py, 1.25], .05, [1, 0, 0], INK, { e0: 0, e1: 0, blunt: 1 }); F.dot([px, py, 1.42], .2, INK); F.dot([px, py - .01, 1.42], .13, PAPER); F.stroke([px, py - .02, 1.42], [px + .08, py - .02, 1.5], .012, [0, 0, 1], INK, { flat: 1, e0: 0, e1: 0 }); F.sstroke(Array.from({ length: 14 }, (_, k) => F.pj([px + .12 + Math.sin(k / 13 * Math.PI) * .32, py, 1.1 - k / 13 * .85])), 2.2, INK, .3); }
  if (o.ajar) { const d = L.door; F.quad([[d[0], FY - .06, 0], [d[0] + .1, FY - .06, 0], [d[0] + .1, FY - .06, 2.25], [d[0], FY - .06, 2.25]], PAPER); F.stroke([d[0] + .1, FY - .06, 0], [d[0] + .55, FY - .9, 0], .012, [1, 0, 0], INK, { flat: 1, e0: 0, e1: 0 }); F.stroke([d[0] + .55, FY - .9, 0], [d[0] + .55, FY - .9, 2.25], .03, [1, 0, 0], INK, { flat: 1, e0: 0, e1: 0 }); }
  signRaked(F); return L;
}
FR['02a'] = () => {
  const F = Frame({ cam: [-6.6, .3, 1.65], yaw: 3, pitch: -5, hour: 10.75, decl: 23.44, seed: 12 });
  const at = F.gsh(add([AX, AYC, 0], AD, 17.5));
  exteriorB(F, { post: at }); return F.cv;
};
FR['02b'] = () => { const F = Frame({ cam: [0, -15, 1.65], yaw: -7, pitch: 10, hour: 12, decl: 0, seed: 14 }); exteriorB(F, { ajar: 1 }); return F.cv; };
FR['02c'] = () => {
  const F = Frame({ cam: [-2.2, -12, 1.65], yaw: -3, pitch: 21, night: 1, seed: 21 }); const L = layout('B');
  F.stars(18, 4);
  pool(F, [-4, 14.6, 0], 1.6, 2.6, { ymax: 15.9, sq: .9 });
  for (let x = L.door[0] + .08; x < L.door[1]; x += .17) F.stroke([x, FY - .05, 2.25], [x, FY - .05, 0], .11, [1, 0, 0], PAPER, { e0: 0, e1: .01 });
  F.quad([[-4.3, FY - .1, 2.5], [-3.7, FY - .1, 2.5], [-3.8, FY - .1, 2.62], [-4.2, FY - .1, 2.62]], PAPER);
  signRaked(F); return F.cv;
};
FR['02d'] = () => {
  const S = sunAt(16.6, -21), F = Frame({ cam: [0, -1.6, 1.5], pitch: -3, seed: 4, dark: 1, hour: 16.6, decl: -21 });
  counter(F, 'sun', { S, win: { y: -3.2, x: [-10.35, -9.2], z: [.9, 2.5] }, awake: 1 }); return F.cv;
};
SHEETS.push(['02', '02 The Arrow', [
  ['02a', 'On the forecourt, a June morning. The arrow is behind and above you. Its shadow comes past your feet as a band and ends on the air post, which is the one thing here in solid black. The name of the shadow is not readable from eye height; the band and the black thing are.'],
  ['02b', 'Arriving at noon, equinox. Arrow in the air, arrow on the ground, both ending at the door. The name stays upright on the pylon under the arrow. The door stands ajar.'],
  ['02c', 'Night, from the foot of the arrow. The bulbs run up the shaft. One pool of paper, at the door. The sky turns round a point just past the arrow\'s tip.'],
  ['02d', 'Inside, last light. The room is ink; the patch of sun through the window is the hand indoors. This still does not carry it: the patch is a sliver and the thing it is on cannot be told. Unproven.'],
]]);

// ---------------------------------------------------------------- 03 Your light (day and indoors; the night frames come from the prototype)
FR['03a'] = () => {
  const F = Frame({ cam: [0, -26, 1.65], pitch: -12, hour: 12.0, decl: -21, seed: 3 }); SG.Y = -1; SG.a0[1] = -1; F.gy0 = -27;
  const youAt = [0, -26.0]; F.occ.push((o, S) => { const t = (youAt[1] - o[1]) / S[1]; if (t <= 0) return false; const x = o[0] + S[0] * t - youAt[0], z = o[2] + S[2] * t; return z < 1.45 ? Math.abs(x) < (z > 1.22 ? .25 : (z < .85 ? (Math.abs(x) > .04 && Math.abs(x) < .2) : .19)) : (z < 1.78 && Math.abs(x) < .105); });
  exteriorA(F, { }); SG.Y = -2; SG.a0[1] = -2; return F.cv;
};
FR['03e'] = () => {
  const S = sunAt(12, -21), F = Frame({ cam: [0, -1.6, 1.5], pitch: -5, seed: 4, dark: 1, hour: 12, decl: -21 });
  counter(F, 'lights', { S, win: { y: -1.9, x: [-.6, .6], z: [0, 2.25] }, you: [0, -1.6], lamps: [[[.62, 1.84, 1.13], .55]] }); return F.cv;
};

// ---------------------------------------------------------------- 04 The makeover: three states of finish in one picture
FR['04a'] = () => {
  const F = Frame({ cam: ROADA, pitch: 12, hour: 10.6, decl: -21, seed: 3 }), L = layout('A'), g = F.g;
  signA(F, { occ: 1 }); F.boxes.push([-.7, .7, FY, FY + .3, 0, 2.4]);
  desert(F);
  F.fill([0, 0, 0], [1, 0, 0], [0, 1, 0], [-40, 40], [-14, FY - .03], .3);
  const line = (A, B, perp, w = .014) => { const d = add(B, A, -1), len = Math.hypot(...d); F.stroke(add(A, d, -.35 / len), add(A, d, 1 + .35 / len), w, perp, INK, { flat: 1, e0: 0, e1: 0 }); };
  const rect = (x0, x1, z0, z1, y, cross) => { line([x0, y, z0], [x1, y, z0], [0, 0, 1]); line([x0, y, z1], [x1, y, z1], [0, 0, 1]); line([x0, y, z0], [x0, y, z1], [1, 0, 0]); line([x1, y, z0], [x1, y, z1], [1, 0, 0]); if (cross) { const p = F.pj([x0, y, z0]), q = F.pj([x1, y, z1]), r = F.pj([x0, y, z1]), s = F.pj([x1, y, z0]); g.strokeStyle = INK; g.lineWidth = 1; g.setLineDash([7, 6]); g.beginPath(); g.moveTo(...p); g.lineTo(...q); g.moveTo(...r); g.lineTo(...s); g.stroke(); g.setLineDash([]); } };
  // roughed in: the building, in thin line with the construction left showing
  rect(L.bx[0], L.bx[1], 0, BH, FY - .03); L.wins.forEach(w => rect(w[0], w[1], .9, 2.5, FY - .04, 1)); rect(L.garage[0], L.garage[1], 0, 3.0, FY - .04, 1);
  line([L.bx[0], FY - .04, BH - .55], [L.bx[1], FY - .04, BH - .55], [0, 0, 1], .01); line([0, FY - .04, 0], [0, FY - .04, BH + .8], [1, 0, 0], .006);
  L.pumps.forEach(x => { rect(x - .3, x + .3, 0, 1.55, 11.4); const p = F.pj([x, 11.4, 1.85]); g.strokeStyle = INK; g.lineWidth = 1.2; g.beginPath(); g.arc(p[0], p[1], F.px([x, 11.4, 1.85], .27), 0, 7); g.stroke(); });
  L.lamps.forEach(x => line([x, 11, 0], [x, 11, 4.4], [1, 0, 0], .012));
  // done: the door (and the sign)
  for (let x = L.door[0] + .14; x < L.door[1]; x += .3) F.stroke([x, FY - .05, 2.25], [x, FY - .05, 0], .2, [1, 0, 0], INK, { e0: 0, e1: .02 });
  F.quad([[-.2, FY - .07, 1.36], [.2, FY - .07, 1.36], [.2, FY - .07, 1.62], [-.2, FY - .07, 1.62]], PAPER);
  // marked out: a chalk footprint on the ground and a word in his hand
  const mark = (x0, x1, y0, y1, word) => { dashed(F, [x0, y0, 0], [x1, y0, 0], [0, 1, 0]); dashed(F, [x0, y1, 0], [x1, y1, 0], [0, 1, 0]); dashed(F, [x0, y0, 0], [x0, y1, 0], [1, 0, 0]); dashed(F, [x1, y0, 0], [x1, y1, 0], [1, 0, 0]); F.text([(x0 + x1) / 2, y0 - .2, .9], word, .5, INK, HAND, HANDF, 'center', -.08); };
  mark(L.ice - .7, L.ice + .7, 14.6, 15.8, 'ice box'); mark(L.phone - .5, L.phone + .5, 11.6, 12.9, 'phone'); mark(-6.6, -4.9, 9, 12.6, 'air');
  // marked out, in another hand, and not in the ledger
  for (let k = 0; k < 3; k++) { const c = [[3.6, 1.6], [5.3, 3.9], [2.6, 4.4]][k]; for (let a = 0; a < 360; a += 24) { const p = [c[0] + Math.cos(a * RAD) * .75, c[1] + Math.sin(a * RAD) * .75, 0], q = [c[0] + Math.cos((a + 13) * RAD) * .75, c[1] + Math.sin((a + 13) * RAD) * .75, 0]; F.stroke(p, q, .03, [Math.cos(a * RAD), Math.sin(a * RAD), 0], INK, { flat: 1, e0: 0, e1: 0, n: 3 }); } }
  signA(F); return F.cv;
};

SHEETS.push(['03', '03 Your light', [
  ['03a', 'Day, best case: noon in winter, sun square behind you. Your shadow comes in from the bottom edge and points at the station. Drawn in 2D. At most other hours it leaves a tall frame to the side, or is under your feet.'],
  ['proto/arrive.png', 'Prototype (three.js). Arriving at night with your lamp down. Mostly ink. The name, the bulbs, and the front of the station found by its one lamp. Nobody is lost.'],
  ['proto/aim.png', 'Prototype. Your lamp on the corner of the station. A disc of paper; the pump stands in it as ink.'],
  ['proto/wait.png', 'Prototype. Keep still: the lamp closes and the sky comes up. What you lit keeps a thin line.'],
  ['03e', 'Inside by day, drawn in 2D. You bring in the doorway: a patch of floor with your shadow in it. The radio is on, so the bell beside it exists.'],
]]);
SHEETS.push(['04', '04 The makeover', [['04a', 'Three states of finish in one picture. Done: the sign and the door, in full ink. Roughed in: the building, pumps and lamps, in thin line with the construction left showing. Marked out: chalk footprints with a word in his hand. Bottom right: three circles in another hand.']]]);
SHEETS.push(['walk', 'Walking (prototype)', [
  ['proto/dayroad.png', 'Prototype (three.js), day, from the road. Two values, no outlines, in real time. Edges are frayed by noise, not laid as strokes.'],
  ['proto/daywalk.png', 'Prototype, day, a spot nobody composed: walked to the east side of the forecourt and turned. It still holds as a picture.'],
  ['proto/walk.png', 'Prototype, night, walked in under the sign and turned toward the pumps with the lamp up.'],
]]);

