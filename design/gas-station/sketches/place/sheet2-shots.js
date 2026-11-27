// [name, query, file, device]. Sheet 2: the three together, the pump settled, the slab and island, the canopy, and the light question. All in the owner's picks (view=...), which is how the link opens.
// s-* are flash views the sheet is cut from: a long lens, the thing's best side. w-* are walked frames at the phone's own lens and true density. L: the same phone held sideways, for wide things.
// f-* are the four frames the director asked to see after the fixes (sheet-2-judge.md).
const L = 'iPhone 14 landscape', I = 'index.html', D = 'day=1';
const at = (x, n, h, tx, tn, tu, fov) => { const dx = tx - x, dn = tn - n, d = Math.hypot(dx, dn); return `x=${x}&n=${n}&h=${h}&head=${(-Math.atan2(dx, dn) * 180 / Math.PI).toFixed(2)}&pitch=${(Math.atan2(tu - h, d) * 180 / Math.PI).toFixed(2)}&fov=${fov}`; };   // stand at x,n with the eye at h, look at tx,tn,tu
const Q3 = 'x=-10.6&n=5.4&head=-31&pitch=-3';
module.exports = [
  ['w-together-day', `view=together&${D}`], ['w-together-night', 'view=together&night=1'],
  ['s-pump', `view=pump&${D}&body=0&` + at(-6.6, 6.2, 1.22, -8.12, 11.5, 1.22, 26)],
  ['s-nozzle', `view=pump&${D}&body=0&` + at(-6.9, 6.6, 1.1, -7.72, 11.4, 1.02, 8.5)],
  ['s-two', `view=slab&${D}&body=0&` + at(-6.8, -5, 1.25, -6.8, 11.5, 1.05, 14.5), I, L],
  ['s-slab', `view=slab&${D}&body=0&hide=pumps&` + at(-21, -13, 8.5, -3.6, 8.2, 0, 21), I, L],
  ['s-canopy', `view=together&${D}&body=0&hide=pumps&` + at(-23, -9, 1.5, -6.6, 11.5, 2.3, 17.5), I, L],
  ['s-lamps', `view=together&${D}&body=0&hide=pumps&` + at(-12.2, 9.6, 1.5, -6.6, 12, 3.42, 24), I, L],
  ['s-lamps-night', `view=together&night=1&lamp=0&feet=0&hide=pumps&` + at(-12.2, 9.6, 1.5, -6.6, 12, 3.42, 24), I, L],
  ['w-light-lines', `view=together&${D}&${Q3}`], ['w-light-dots', `view=together&${D}&${Q3}&shadedots=1`], ['w-light-none', `view=together&${D}&${Q3}&dayk=0&veil=0&veilyou=0&body=0`],
  ['f-1', 'view=pump&night=1'], ['f-2', `view=together&${D}&body=0&x=-9.45&n=10.25&head=-45&pitch=-6`], ['f-3', `view=together&${D}&body=0&x=-2.2&n=9.2&head=68&pitch=-14`], ['f-4', `view=slab&${D}`],
];
