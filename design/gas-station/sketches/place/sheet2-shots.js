// [name, query, file, device]. Sheet 2: the pump settled, the slab and island, the canopy, and the three together. All in the owner's picks (view=...), which is how the link opens.
// s-* are flash views the sheet is cut from: a long lens, the thing's best side. w-* are walked frames at the phone's own lens and true density. L: the same phone held sideways, for wide things.
const L = 'iPhone 14 landscape', I = 'index.html', D = 'day=1';
const at = (x, n, h, tx, tn, tu, fov) => { const dx = tx - x, dn = tn - n, d = Math.hypot(dx, dn); return `x=${x}&n=${n}&h=${h}&head=${(-Math.atan2(dx, dn) * 180 / Math.PI).toFixed(2)}&pitch=${(Math.atan2(tu - h, d) * 180 / Math.PI).toFixed(2)}&fov=${fov}`; };   // stand at x,n with the eye at h, look at tx,tn,tu
module.exports = [
  // A. the pump
  ['s-pump', `view=pump&${D}&body=0&` + at(-6.6, 6.2, 1.22, -8.12, 11.5, 1.22, 26)],
  ['s-nozzle', `view=pump&${D}&body=0&` + at(-6.9, 6.6, 1.1, -7.72, 11.4, 1.02, 8.5)],
  ['s-two', `view=slab&${D}&body=0&` + at(-6.8, -5, 1.25, -6.8, 11.5, 1.05, 14.5), I, L],
  ...[[3.2, 'a'], [6.5, 'b'], [13, 'c']].map(([d, k]) => [`w-dist-${k}`, `view=pump&${D}&body=0&x=${(-8.2 - .682 * d).toFixed(2)}&n=${(11.5 - .731 * d).toFixed(2)}&head=-43&pitch=-2`]),
  ['w-pump-day', `view=pump&${D}`], ['w-pump-night', 'view=pump&night=1'],
  // B. the slab and the island, alone
  ['s-slab', `view=slab&${D}&body=0&hide=pumps&` + at(-21, -13, 8.5, -3.6, 8.2, 0, 21), I, L],
  ['s-island', `view=slab&${D}&body=0&hide=pumps&` + at(-12.5, 4.5, 1.9, -7.4, 11.3, .1, 16), I, L],
  ['s-joint', `view=slab&${D}&body=0&hide=pumps&` + at(1.2, 2.4, 1.65, 4.6, 5.4, 0, 30), I, L],
  ['s-bell', `view=slab&${D}&body=0&hide=pumps&` + at(-5.2, 6.6, 1.65, -4.2, 9.25, 0, 30), I, L],
  ['s-stain', `view=slab&${D}&body=0&hide=pumps&` + at(-6.8, 6.9, 1.65, -6.8, 10.3, 0, 30), I, L],
  // C. the canopy, alone (the wall behind it is not drawn yet: outline and shade only)
  ['s-canopy', `view=together&${D}&body=0&hide=pumps&` + at(-23, -9, 1.5, -6.6, 11.5, 2.3, 17.5), I, L],
  ['s-fascia', `view=together&${D}&body=0&hide=pumps&` + at(-15, 1.5, 1.6, -10.6, 8.4, 4.12, 9), I, L],
  ['s-post', `view=together&${D}&body=0&hide=pumps&` + at(-13.4, 4.6, 1.3, -11.1, 8.8, .75, 13)],
  ['s-lamps', `view=together&${D}&body=0&hide=pumps&` + at(-12.2, 9.6, 1.5, -6.6, 12, 3.42, 24), I, L],
  ['s-lamps-night', `view=together&night=1&lamp=0&feet=0&hide=pumps&` + at(-12.2, 9.6, 1.5, -6.6, 12, 3.42, 24), I, L],
  // D. what the light does: three ways, same stand
  ['w-light-lines', `view=together&${D}&x=-10.6&n=5.4&head=-31&pitch=-3`], ['w-light-dots', `view=together&${D}&x=-10.6&n=5.4&head=-31&pitch=-3&shadedots=1`], ['w-light-none', `view=together&${D}&x=-10.6&n=5.4&head=-31&pitch=-3&dayk=0&veil=0&veilyou=0&body=0`],
  ['w-veil', `view=together&${D}&body=0&x=-10.3&n=8.9&head=-39&pitch=-4`], ['w-veil-0', `view=together&${D}&body=0&x=-10.3&n=8.9&head=-39&pitch=-4&veil=0`],
  ['w-you', `view=slab&${D}`],
  // E. together, walked
  ['w-together-day', `view=together&${D}`], ['w-together-night', 'view=together&night=1'], ['w-together-night-far', 'view=together&night=1&x=-9&n=-3&head=-8&pitch=6'],
];
