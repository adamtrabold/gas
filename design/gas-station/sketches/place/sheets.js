// node sheets.js -> copies the stills from out/ into ../../concepts/stills/ and builds sheet-05-left-on.png there: one tall sheet, two frames across, to be read on a phone. throwaway
const fs = require('fs'), path = require('path'); const { chromium } = require('playwright');
const out = path.join(__dirname, 'out'), dest = path.join(__dirname, '..', '..', 'concepts', 'stills');
const ROWS = [
  ['h', 'Arriving: the first frame, untouched'],
  ['lo-arrive-day', 'Day, 390 × 844. His name and nothing else on the sign. A mesa of long dry strokes behind the station, a butte, the road as a band of strokes, a drift of dry ground and scrub this side of it.'],
  ['lo-arrive-dusk', 'Dusk, one frame. No sun, no shadows. The sky is being inked in from the top in strokes far bigger than any on the ground; four letters of the name are on against it and three are not yet.'],
  ['lo-arrive-night', 'Night, lamp down. The name, the bulbs, the canopy lamp\'s pool.'],
  ['lo-arrive-day-small', 'Day on a smaller phone, 360 × 740. The name is whole.'],
  ['lo-arrive-night-small', 'Night, 360 × 740.'],
  ['lo-walk-3s', 'Three seconds of walking in (4 m a second): on the road.'],
  ['lo-walk-6s', 'Six seconds in: under the sign, on the slab. The strokes on the building have changed from the large size to the small one on the way.'],
  ['h', 'The desert'],
  ['lo-desert-east', 'From the arrival spot, turned east along the road. Fence, scrub, drifts, the horizon.'],
  ['lo-anywhere-day', 'A view nobody composed (position and heading drawn with a random number generator; the same one that was a blank page last round).'],
  ['h', 'Making things out: before (what the owner walked) and after'],
  ['lo-pumps-a', 'Before. The pumps from the forecourt, mid-morning.'],
  ['lo-pumps-b', 'After. A thing has a tone of its own and is always drawn, in strokes finer than the ground\'s; a lost edge or corner gets a thin broken line; the island is there.'],
  ['lo-front-a', 'Before. The front wall east of the door. There is a bench in this picture.'],
  ['lo-front-b', 'After. The bench, the foot of the wall, the door\'s frame, the window.'],
  ['lo-shade-a', 'Before. Under the canopy at noon in summer.'],
  ['lo-shade-b', 'After. Shade is more open and the island\'s edge is drawn. The pump body is still a slab here: the weakest of the five pairs.'],
  ['lo-room-a', 'Before. Inside by day, three lights on.'],
  ['lo-room-b', 'After. The stock on the shelf, the things on the counter and the cooler are each a thing.'],
  ['lo-nightpump-a', 'Before. A pump at night in the canopy lamp\'s light.'],
  ['lo-nightpump-b', 'After.'],
  ['h', 'Brush strokes, near'],
  ['lo-strokes-day', 'Day, on the slab. Shadow edges are strokes ending. Your shadow is a person, kept cleaner than the brush.'],
  ['lo-strokes-night', 'Night, the canopy pool from the forecourt.'],
  ['h', 'You'],
  ['lo-door-in', 'Just through the door by day, lights off. Your shadow in the doorway\'s light: a head, shoulders, a body. Your lamp on the back wall and at your feet.'],
  ['lo-night-away', 'Night, turned away from the station. Never a black screen: the lamp finds the ground in front of your feet.'],
  ['lo-night-still', 'The same, twelve seconds after you stop, facing away from the still point: the lamp has closed to a small pool a few steps ahead, and a star or two is up. Never blank.'],
  ['lo-night-lamp', 'Your lamp on the front wall at night.'],
  ['lo-anywhere-night', 'A view nobody composed, night (random): under the canopy facing the garage door.'],
  ['h', 'Inside, and the sign from the side'],
  ['lo-aisle', 'The aisle from its mouth with two stretches switched on.'],
  ['lo-aisle-back', 'The far end, looking back with the lamp closed: the front window, a long way off, small and bright.'],
  ['lo-sign-side', 'The sign from the east, on the road: the arrow\'s slab, the cabinets, the starburst. No blade.'],
  ['w', 'lo-wide-day', 'Wide desktop, 1440 × 810, day.'],
];
(async () => {
  fs.mkdirSync(dest, { recursive: true });
  for (const f of fs.readdirSync(out)) if (f.endsWith('.png') && (f.startsWith('lo-') || f === 'walk-test.png')) fs.copyFileSync(path.join(out, f), path.join(dest, f));
  const img = f => `data:image/png;base64,${fs.readFileSync(path.join(out, f + '.png')).toString('base64')}`;
  let html = `<body style="margin:0;background:#d9d4c8;font:15px/1.4 'Courier 10 Pitch',monospace;color:#111;padding:16px;width:780px"><div style="font-weight:bold;font-size:19px">Left on — frames from the walked three.js prototype</div><div style="margin:4px 0 6px">Every frame is the live prototype at the size named, at double density, not retouched. Boxes stand in for models; generated strokes stand in for his. Round 3.</div><div style="display:flex;flex-wrap:wrap;gap:14px 20px;align-items:flex-start">`;
  for (const r of ROWS) {
    if (r[0] === 'h') html += `<div style="width:100%;font-weight:bold;font-size:17px;border-top:2px solid #111;padding-top:8px;margin-top:8px">${r[1]}</div>`;
    else if (r[0] === 'w') html += `<figure style="margin:0;width:780px"><img src="${img(r[1])}" style="width:778px;border:1px solid #111;display:block"><figcaption style="margin-top:5px">${r[2]}</figcaption></figure>`;
    else html += `<figure style="margin:0;width:380px"><img src="${img(r[0])}" style="width:378px;border:1px solid #111;display:block"><figcaption style="margin-top:5px">${r[1]}</figcaption></figure>`;
  }
  const PAIRS = [['pumps', 'The pumps, from the forecourt, mid-morning'], ['front', 'The front wall east of the door (there is a bench)'], ['room', 'Inside by day, three lights on'], ['nightpump', 'A pump at night under the canopy lamp'], ['shade', 'Under the canopy at noon in summer']];
  const ph = `<body style="margin:0;background:#d9d4c8;font:15px/1.4 'Courier 10 Pitch',monospace;color:#111;padding:16px;width:780px"><div style="font-weight:bold;font-size:19px">Making things out: before and after</div><div style="margin:4px 0 10px">Left: the look you walked on your phone. Right: now. Same spot, same hour, same view. Still only black and white.</div>${PAIRS.map(([k, cap]) => `<div style="font-weight:bold;font-size:16px;border-top:2px solid #111;padding-top:8px;margin-top:12px">${cap}</div><div style="display:flex;gap:20px;margin-top:6px">${[['a', 'BEFORE'], ['b', 'AFTER']].map(([v, l]) => `<figure style="margin:0;width:380px"><figcaption style="font-weight:bold;margin-bottom:4px">${l}</figcaption><img src="${img('lo-' + k + '-' + v)}" style="width:378px;border:1px solid #111;display:block"></figure>`).join('')}</div>`).join('')}</body>`;
  const b = await chromium.launch(), p = await b.newPage({ viewport: { width: 812, height: 800 } }); await p.setContent(html + '</div></body>'); await p.screenshot({ path: path.join(dest, 'sheet-05-left-on.png'), fullPage: true }); await p.setContent(ph); await p.screenshot({ path: path.join(dest, 'pairs-05.png'), fullPage: true }); await b.close();
})();
