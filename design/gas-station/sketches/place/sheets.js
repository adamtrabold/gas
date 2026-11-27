// node sheets.js -> copies the stills from out/ into ../../concepts/stills/ and builds sheet-05-left-on.png there: one tall sheet, two frames across, to be read on a phone. throwaway
const fs = require('fs'), path = require('path'); const { chromium } = require('playwright');
const out = path.join(__dirname, 'out'), dest = path.join(__dirname, '..', '..', 'concepts', 'stills');
const ROWS = [
  ['h', 'Arriving'],
  ['lo-arrive-day', 'Arriving by day, 390 × 844. The first frame anyone sees, untouched. His whole name, the arrow, the door under it, the road as a band of dry strokes.'],
  ['lo-arrive-night', 'Arriving at night, same spot, lamp down. The name, the bulbs, the canopy lamp\'s pool breaking outward in strokes.'],
  ['lo-arrive-day-small', 'The same arrival on a smaller phone, 360 × 740. The name is whole.'],
  ['lo-arrive-night-small', 'Night, 360 × 740.'],
  ['h', 'Brush strokes in the walked world'],
  ['lo-strokes-day', 'Day, on the slab, looking at the canopy. The far edge of its shadow is strokes ending, each with its own taper. The post is dry brush. Your shadow is one loaded mark.'],
  ['lo-strokes-night', 'Night, the canopy lamp\'s pool from the forecourt. The strokes are laid outward from the lamp and stay on the ground when you walk (walk-test.png).'],
  ['lo-strokes-day-drawn', 'The same view with the stroke sheet loaded from a picture file (sheet-example.png) the way his own drawn sheet would be. Coarser, because a hard black-and-white drawing carries less than a grey one.'],
  ['lo-night-lamp', 'Your lamp on the front wall at night. Its rim breaks along the wall\'s own strokes; the strokes do not follow the lamp.'],
  ['h', 'Under the canopy at noon in summer (the deepest shade the lot has)'],
  ['lo-canopy-shade-before', 'Last round\'s rule: shade is flat black. The pumps read only where they stand against the light.'],
  ['lo-canopy-shade', 'This round: shade is brushed, not filled, and a near thing in shade keeps a broken paper edge. The island, the pump\'s sides and its globe are there.'],
  ['lo-canopy-shade-lamp', 'The same with your lamp on, as the systems designer proposed. It lands as a sliver on the globe. It does not read as a lamp. I would drop it by day.'],
  ['lo-anywhere-night', 'A view nobody composed, night (position and heading drawn with a random number generator): under the canopy, facing the garage door.'],
  ['h', 'Your shadow: column or person'],
  ['lo-shadow-column', 'A plain column. Noon in late November, looking down. The sign\'s shadow is the long mark on the left.'],
  ['lo-shadow-person', 'A plain standing person. At brush size the two come out nearly the same: the hand decides more than the shape does.'],
  ['h', 'Inside'],
  ['lo-door-in', 'Just through the door by day, every light off. The doorway on the floor with your shadow in it; your lamp on the back wall.'],
  ['lo-inside-lights', 'Inside by day with three lights on: the counter tube, the cooler (off frame left) and the attendant\'s light at the aisle mouth. Shelves, jacket, the things on the counter, the door\'s sun on the floor.'],
  ['lo-inside-lights-b', 'The same room from the east window, looking at the cooler. Your lamp\'s disc is on the partition; the tube\'s pool breaks across the floor.'],
  ['lo-aisle', 'The aisle from its mouth with two stretches switched on.'],
  ['lo-aisle-back', 'The far end, looking back. Not solved: the front window is not yet the bright thing in this picture.'],
  ['lo-sign-side', 'The sign from the east, on the road. It used to be a line. Now: the arrow as a slab, the starburst, and a blade that says GAS to the road.'],
  ['lo-anywhere-day', 'A view nobody composed, day (random position and heading): behind the east end, facing south. Nothing. In a desert that is allowed, and it is the honest result.'],
  ['w', 'lo-wide-day', 'Wide desktop, 1440 × 810, day.'],
  ['w', 'lo-wide-night', 'Wide desktop, night.'],
];
(async () => {
  fs.mkdirSync(dest, { recursive: true });
  for (const f of fs.readdirSync(out)) if (f.endsWith('.png') && (f.startsWith('lo-') || f === 'walk-test.png')) fs.copyFileSync(path.join(out, f), path.join(dest, f));
  fs.copyFileSync(path.join(__dirname, 'sheet-example.png'), path.join(dest, 'stroke-sheet.png'));
  const img = f => `data:image/png;base64,${fs.readFileSync(path.join(out, f + '.png')).toString('base64')}`;
  let html = `<body style="margin:0;background:#d9d4c8;font:15px/1.4 'Courier 10 Pitch',monospace;color:#111;padding:16px;width:780px"><div style="font-weight:bold;font-size:19px">Left on — frames from the walked three.js prototype</div><div style="margin:4px 0 6px">Every frame is the live prototype at the size named, at double density, not retouched. Boxes stand in for models; generated strokes stand in for his.</div><div style="display:flex;flex-wrap:wrap;gap:14px 20px;align-items:flex-start">`;
  for (const r of ROWS) {
    if (r[0] === 'h') html += `<div style="width:100%;font-weight:bold;font-size:17px;border-top:2px solid #111;padding-top:8px;margin-top:8px">${r[1]}</div>`;
    else if (r[0] === 'w') html += `<figure style="margin:0;width:780px"><img src="${img(r[1])}" style="width:778px;border:1px solid #111;display:block"><figcaption style="margin-top:5px">${r[2]}</figcaption></figure>`;
    else html += `<figure style="margin:0;width:380px"><img src="${img(r[0])}" style="width:378px;border:1px solid #111;display:block"><figcaption style="margin-top:5px">${r[1]}</figcaption></figure>`;
  }
  const b = await chromium.launch(), p = await b.newPage({ viewport: { width: 812, height: 800 } }); await p.setContent(html + '</div></body>'); await p.screenshot({ path: path.join(dest, 'sheet-05-left-on.png'), fullPage: true }); await b.close();
})();
