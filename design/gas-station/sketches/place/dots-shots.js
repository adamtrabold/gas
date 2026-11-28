// [name, query, file, device]. The few true-density frames kept as evidence of the look after "shade in dots" (concepts/look-notes.md): SHOTS=./dots-shots.js node look.js [prefix] -> out/<name>.png,
// then python3 dots-stills.py saves them small into concepts/stills/dots-*.png, then delete out/. Each is a walked frame from an emulated iPhone 14 at its own density, nothing composed.
// The default is the link: shade as a halftone screen, night in dark dots with the moon. screen=stipple: the looser screen. reversed=1: night in light dots on black. shade=lines: Sheet 2, for comparison only.
const D = 'day=1', T = 'view=together', I = 'index.html';
module.exports = [
  ['together-day', `${T}&${D}`], ['shade-edge', `${T}&${D}&body=0&x=-2.2&n=9.2&head=68&pitch=-14`], ['pump-in-shade', `${T}&${D}&body=0&x=-9.45&n=10.25&head=-45&pitch=-6`], ['your-shadow', `view=slab&${D}`],
  ['wall-stipple', `${T}&${D}&body=0&x=-6.8&n=5.6&head=0&pitch=1&screen=stipple`],
  ['together-night', `${T}&night=1`], ['together-night-reversed', `${T}&night=1&reversed=1`], ['your-shadow-night', `${T}&night=1&x=-6.8&n=10.1&head=180&pitch=-38`], ['slab-night-moon', 'view=slab&night=1'], ['moon', 'view=slab&night=1&x=-3&n=9&head=165&pitch=24'],
  ['view-pump', 'obj=pump', I, 'iPhone 14 landscape'], ['view-canopy', 'obj=canopy', I, 'iPhone 14 landscape'], ['view-slab', 'obj=slab', I, 'iPhone 14 landscape'],
];
