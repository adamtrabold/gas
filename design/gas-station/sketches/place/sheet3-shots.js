// [name, query]. Sheet 3, "Shade in dots": every drawing is a walked frame (the phone's own lens, an emulated iPhone 14 at its true density), saved one PNG each into concepts/stills/sheet-3/ by sheet3.py.
// SHOTS=./sheet3-shots.js node look.js [prefix] -> out/<name>.png, then python3 sheet3.py, then delete out/.
// The default is the link: shade as a halftone screen. screen=stipple: the looser screen. shade=lines: Sheet 2 (ruled lines, and its night with the lamp that followed the view). reversed=1: night as paper dots on black.
const D = 'day=1', T = 'view=together', EAST = 'body=0&x=-2.2&n=9.2&head=68&pitch=-14', BESIDE = 'body=0&x=-9.45&n=10.25&head=-45&pitch=-6', WALL = 'body=0&x=-6.8&n=7.4&head=0&pitch=-1', UNDER = 'x=-6.8&n=10.1&head=180&pitch=-38';
module.exports = [
  ['together-day', `${T}&${D}`], ['together-night', `${T}&night=1`], ['together-night-reversed', `${T}&night=1&reversed=1`],
  ['shade-edge', `${T}&${D}&${EAST}`], ['your-shadow', `view=slab&${D}`], ['pump-in-shade', `${T}&${D}&${BESIDE}`],
  ['wall-halftone', `${T}&${D}&${WALL}`], ['wall-stipple', `${T}&${D}&${WALL}&screen=stipple`],
  ['pump-night', 'view=pump&night=1'], ['pump-night-reversed', 'view=pump&night=1&reversed=1'], ['your-shadow-night', `${T}&night=1&${UNDER}`], ['your-shadow-night-reversed', `${T}&night=1&reversed=1&${UNDER}`],
  ['before-together-day', `${T}&${D}&shade=lines`], ['before-shade-edge', `${T}&${D}&${EAST}&shade=lines`], ['before-your-shadow', `view=slab&${D}&shade=lines`], ['before-pump-in-shade', `${T}&${D}&${BESIDE}&shade=lines`], ['before-together-night', `${T}&night=1&shade=lines`],
];
