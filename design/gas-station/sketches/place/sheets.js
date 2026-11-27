// node sheets.js -> copies the stills into ../../concepts/stills/ and builds one sheet per concept there. throwaway
const fs = require('fs'), path = require('path'); const { chromium } = require('playwright');
const out = path.join(__dirname, 'out'), dest = path.join(__dirname, '..', '..', 'concepts', 'stills');
const SHEETS = {
  'sheet-00-place': ['The place, shared by all three (walked three.js prototype)', [
    ['place-day-road', 'Arriving by day, from the road. Sign at the road with the name stacked and the arrow diving at the door; canopy and pumps to the west; the door clear of them. Late November, mid-morning.'],
    ['place-day-door', 'At the door. The card is paint and stays sharp at any distance. The stripes are paint. The wall has no edge against the sky.'],
    ['place-night-road', 'Arriving at night. The name, the bulbs, the canopy lit from below, the sky going round.'],
    ['place-night-canopy', 'Under the sign at night, looking at the canopy. The pool on the ground breaks into the dark along fibres laid away from the lamp.'],
    ['place-edge', 'Where the world ends: 86 m out, walking back in. Far things are lost, so the sign returns a few marks at a time. Nothing else is in the picture to show a join.'],
    ['place-marked', 'Marks in another hand: three dashed circles on the ground east of the slab. From 04, folded in.'],
  ]],
  'sheet-01': ['01 Nobody\'s here (walked prototype, except the first frame)', [
    ['cross-2d', 'Crossing the door, drawn in 2D last round, on the old building. Kept because the prototype has no crossing stroke yet: one loaded stroke across, the room behind it, the bell\'s word landed.'],
    ['01-counter', 'Inside, from the door. Lit from behind the counter, so what he left is silhouette: register, cup, bell, radio. The jacket on the wall. Crude boxes; the picture is the arrangement.'],
    ['01-aisle-near', 'The aisle, at the door end. Tube light every third bay; you walk from pool to pool.'],
    ['01-aisle-far', 'The aisle from the far end, looking back. 28 m of it behind an 8 m building.'],
    ['01-disc', 'Doing nothing, five minutes in: the canopy lamp is out and a disc of light is on the forecourt with nothing above it.'],
    ['01-anywhere', 'A view nobody composed (position and heading drawn at random). East of the lot, looking back. The sign is flat, so from the side it is one line. Almost nothing. In a desert that is allowed.'],
  ]],
  'sheet-02': ['02 The Arrow (walked prototype). The thing the shadow points at is drawn in solid black', [
    ['02-morning-pump', 'Mid-morning, equinox. The shadow has gone in under the canopy. The west pump is awake. You cannot tell: everything under a canopy is black.'],
    ['02-late-air', 'Late morning. The shadow of the arrow lies on the slab as an arrow, and the air post stands at its tip in black. This one reads.'],
    ['02-noon-door', 'Noon, equinox. A short dark arrow on the slab, aimed at the door.'],
    ['02-after-bench', 'Early afternoon. The bench is awake. It is a dark bar against the wall and the shadow stops 7 m short of it. This one does not read.'],
    ['02-winter-noon', 'Noon in winter, the best case: the arrow\'s shadow is long and lies right up to the door.'],
    ['02-door-out', 'Inside at that hour, looking out. The doorway is the picture: the sign, the air post, and the shadow coming in over the threshold.'],
    ['02-window', 'Inside, the east window and the clock in reach. A good picture of a window. The shadow is not in it from here.'],
    ['02-night', 'Night. No path. Bulbs and the lit front.'],
  ]],
  'sheet-03': ['03 Your light (walked prototype)', [
    ['03-shadow', 'Your shadow by day, looking down at it. A plain upright shape, no head, cut by the bottom of the screen. Noon in winter.'],
    ['03-touch', 'Day touching. You stand by the air post with the sun behind you; your shadow runs to it and it has taken its blacks.'],
    ['03-inside', 'Inside by day with every light off: the doorway on the floor with your shadow in it.'],
    ['03-night-arrive', 'Arriving at night with your lamp down.'],
    ['03-night-aim', 'Your lamp on the front wall by the door. The lamp sits a little above the eye.'],
    ['03-night-kept', 'Lamp down, sky up. The phone box, lit a moment ago and left, keeps three strokes of itself (lower right).'],
    ['03-other', 'A disc on the ground that is not yours.'],
    ['03-anywhere', 'A view nobody composed (random position and heading), at night with the lamp up: a disc on a wall and nothing else.'],
  ]],
  'sheet-wide': ['One wide desktop frame per concept (walked prototype, 1280 x 720)', [
    ['01-wide', '01, day, from the road.'], ['02-wide', '02, mid-morning at the equinox, west pump awake.'], ['03-wide', '03, night, lamp up.'],
  ]],
};
(async () => {
  fs.mkdirSync(dest, { recursive: true });
  const b = await chromium.launch();
  for (const [name, [title, frames]] of Object.entries(SHEETS)) {
    const wide = name === 'sheet-wide';
    const html = `<body style="margin:0;background:#d9d4c8;font:12px/1.4 'Courier 10 Pitch',monospace;color:#111;padding:14px;width:max-content"><div style="font-weight:bold;margin:0 0 10px">${title}</div><div style="display:flex;gap:16px;align-items:flex-start;${wide ? 'flex-direction:column' : ''}">${frames.map(([f, cap]) => { const src = fs.existsSync(path.join(out, f + '.png')) ? path.join(out, f + '.png') : path.join(dest, f + '.png'); if (src.startsWith(out)) fs.copyFileSync(src, path.join(dest, f + '.png')); return `<figure style="margin:0;width:${wide ? 640 : 240}px"><img src="data:image/png;base64,${fs.readFileSync(src).toString('base64')}" style="width:${wide ? 640 : 240}px;border:1px solid #111;display:block"><figcaption style="margin-top:5px">${cap}</figcaption></figure>`; }).join('')}</div></body>`;
    const p = await b.newPage({ viewport: { width: 1200, height: 600 } }); await p.setContent(html); await p.screenshot({ path: path.join(dest, name + '.png'), fullPage: true }); await p.close();
  }
  fs.copyFileSync(path.join(out, 'swim-test.png'), path.join(dest, 'swim-test.png'));
  await b.close();
})();
