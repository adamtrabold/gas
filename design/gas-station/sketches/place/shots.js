// [name, query, wide?]  heading: 0 looks north, positive turns west. winter = decl -21 (late November), equinox = decl 0
const D = 'hour=10.5&decl=-21', N = 'night=1';
module.exports = [
  // the one building, for all three
  ['place-day-road', `c=1&${D}&x=5&n=-15&head=9&pitch=13`],
  ['place-day-door', `c=1&${D}&x=-2.8&n=11.2&head=-28&pitch=3`],
  ['place-night-road', `c=1&${N}&x=5&n=-15&head=9&pitch=13`],
  ['place-night-canopy', `c=1&${N}&x=-1&n=1&head=28&pitch=7`],
  ['place-edge', `c=1&${D}&x=4&n=-86&head=2&pitch=5`],
  ['place-marked', `c=1&${D}&x=12.5&n=6.2&head=-38&pitch=-20`],
  // 01
  ['01-counter', `c=1&${D}&inside=1&x=.25&n=16.8&head=0&pitch=-2`],
  ['01-aisle-near', `c=1&${D}&inside=1&x=5.5&n=24.3&head=0&pitch=0`],
  ['01-aisle-far', `c=1&${D}&inside=1&x=5.5&n=50.5&head=180&pitch=0`],
  ['01-disc', `c=1&${N}&canopy=0&other=1&ox=-3.5&on=7&x=4&n=-7&head=22&pitch=2`],
  ['01-anywhere', `c=1&${D}&x=17.9&n=1.6&head=108&pitch=4`],
  ['01-wide', `c=1&${D}&x=3&n=-24&head=6&pitch=6`, 1],
  // 02: the sign's shadow, at eye height, at four hours around the equinox. the thing it points at is in solid black
  ['02-morning-pump', `c=2&hour=10.5&decl=0&awake=pumpW&x=1.6&n=-3&head=38&pitch=-4`],
  ['02-late-air', `c=2&hour=11.67&decl=0&awake=air&x=1.0&n=-4&head=12&pitch=-5`],
  ['02-noon-door', `c=2&hour=12&decl=0&awake=door&x=1.4&n=-6&head=4&pitch=4`],
  ['02-after-bench', `c=2&hour=12.45&decl=0&awake=bench&x=-1.2&n=-3&head=-14&pitch=-3`],
  ['02-window', `c=2&hour=12&decl=0&tube=0&aislelights=0&inside=1&x=5.6&n=21&head=168.7&pitch=2`],
  ['02-door-out', `c=2&hour=12&decl=-21&tube=0&aislelights=0&inside=1&x=.25&n=19.6&head=180&pitch=3`],
  ['02-winter-noon', `c=2&hour=12&decl=-21&awake=door&x=1.6&n=-2.5&head=4&pitch=2`],
  ['02-night', `c=2&${N}&x=2.5&n=-8&head=6&pitch=16`],
  ['02-anywhere', `c=2&hour=15&decl=0&awake=phone&x=17.9&n=1.6&head=108&pitch=4`],
  ['02-wide', `c=2&hour=10.5&decl=0&awake=pumpW&x=3&n=-20&head=10&pitch=5`, 1],
  // 03
  ['03-shadow', `c=3&hour=12&decl=-21&x=1&n=-3&head=0&pitch=-24`],
  ['03-touch', `c=3&hour=12&decl=-21&awake=air&x=-1.5&n=7.7&head=0&pitch=-20`],
  ['03-night-arrive', `c=3&${N}&lamp=0&x=5&n=-15&head=9&pitch=13`],
  ['03-night-aim', `c=3&${N}&lamp=1&x=2.2&n=3&head=-4&pitch=1`],
  ['03-night-kept', `c=3&${N}&lamp=0&adapt=1&seen=phone,bench,door&x=9.5&n=-1&head=-20&pitch=4`],
  ['03-other', `c=3&${N}&lamp=0&adapt=1&other=1&ox=9&on=9&x=2&n=-3&head=-32&pitch=-2`],
  ['03-inside', `c=3&hour=12&decl=-21&inside=1&x=0&n=16.5&head=0&pitch=-16`],
  ['03-anywhere', `c=3&${N}&lamp=1&x=-0.4&n=11.7&head=327&pitch=2`],
  ['03-wide', `c=3&${N}&lamp=1&x=2&n=-18&head=2&pitch=6`, 1],
];
