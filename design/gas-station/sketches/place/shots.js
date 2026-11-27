// [name, query, size?]  size: tall 390x844 (default), small 360x740, wide 1440x810. heading: 0 looks north, positive turns west. decl -21 = late November
// with no x, n, head or pitch the still is the arrival: the first frame anyone sees. '-a' frames are detail=0: the look the owner walked on his phone
const D = 'hour=10.5&decl=-21', NOON = 'hour=12&decl=-21', SHADE = 'hour=12.6&decl=20', N = 'night=1';
const PAIRS = { pumps: `${D}&x=-2.5&n=6.5&head=42&pitch=0`, front: `${D}&x=4&n=8&head=14&pitch=2`, shade: `${SHADE}&x=-3.4&n=9.9&head=70&pitch=-3`, room: `${NOON}&inside=1&x=-.2&n=17.3&head=-8&pitch=-4&tube=1&cooler=1`, nightpump: `${N}&lamp=1&x=-3&n=5&head=40&pitch=0` };
module.exports = [
  ['lo-arrive-day', `${D}`],
  ['lo-arrive-day-small', `${D}`, 'small'],
  ['lo-arrive-dusk', `dusk=1`],
  ['lo-arrive-night', `${N}&lamp=0`],
  ['lo-arrive-night-small', `${N}&lamp=0`, 'small'],
  ['lo-walk-3s', `${D}&x=2.2&n=-9.1&head=6&pitch=8`],
  ['lo-walk-6s', `${D}&x=1.2&n=2.8&head=4&pitch=6`],
  ['lo-desert-east', `${D}&x=2.6&n=-21&head=-78&pitch=3`],
  ['lo-anywhere-day', `${D}&x=24&n=18&head=184&pitch=0`],
  ['lo-anywhere-night', `${N}&x=-9&n=12&head=354&pitch=0`],
  ['lo-strokes-day', `${D}&x=1.5&n=3&head=30&pitch=-12`],
  ['lo-strokes-night', `${N}&lamp=0&x=-5.5&n=-1.4&head=0&pitch=-12`],
  ...Object.entries(PAIRS).flatMap(([k, q]) => [[`lo-${k}-a`, q + '&detail=0'], [`lo-${k}-b`, q]]),
  ['lo-door-in', `${NOON}&inside=1&x=0&n=16.5&head=0&pitch=-16`],
  ['lo-night-away', `${N}&x=2.6&n=-21&head=180&pitch=2`],
  ['lo-night-lamp', `${N}&x=2.2&n=3&head=-4&pitch=1`],
  ['lo-aisle', `${NOON}&inside=1&x=5.5&n=23.2&head=0&pitch=-2&tube=1&aislelights=2`],
  ['lo-aisle-back', `${NOON}&inside=1&x=5.5&n=50.5&head=180&pitch=0&lamp=0`],
  ['lo-sign-side', `${D}&x=17&n=.6&head=88&pitch=16`],
  ['lo-wide-day', `${D}&x=3&n=-22&head=6&pitch=7`, 'wide'],
];
