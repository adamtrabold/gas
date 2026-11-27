// [name, query]. Sheet 1, the pump. s-* are the flash views the sheet is assembled from (a long lens, from the thing's best side); look-* are walked frames at the phone's own lens
const D = 'hour=10.5&decl=-21', N = 'night=1&lamp=1', P = 'study=pump', H = ['brush', 'cut', 'dot'];
const F = (px, tall) => `${D}&${P}&fixed=1${tall ? '&tall=1' : ''}&x=${px + 1.6}&n=6.2&head=16.8&pitch=0&h=${tall ? 1.42 : 1.22}&fov=${tall ? 31 : 26}`, part = (px, dx, dn, head, h, fov) => `${D}&${P}&fixed=1&x=${px + dx}&n=${11.5 + dn}&head=${head}&pitch=0&h=${h}&fov=${fov}`;
module.exports = [
  ...H.map(l => [`s-short-${l}`, F(-8.2) + `&look=${l}`]), ...H.map(l => [`s-tall-${l}`, F(-5.4, 1) + `&look=${l}`]),
  ['s-short-paper', F(-8.2) + '&look=paper'],
  ['s-globe', part(-8.2, .5, -5.3, 5.4, 2.13, 8) + '&look=brush'], ['s-window', part(-8.2, .5, -5.3, 5.4, 1.2, 9) + '&look=cut'], ['s-base', part(-8.2, 1.6, -5.3, 16.8, .32, 9) + '&look=brush'],
  ['s-nozzle', part(-8.2, 4.6, -2.2, 64.4, 1.02, 10) + '&look=cut'], ['s-badge', `${D}&${P}&fixed=1&tall=1&x=-4.9&n=6.2&head=5.4&pitch=0&h=1.05&fov=8&look=dot`],
  ...H.map(l => [`look-pump-day-${l}`, `${D}&${P}&look=${l}`]), ...H.map(l => [`look-pump-night-${l}`, `${N}&${P}&look=${l}`]),
  ['look-pump-day-fixed', `${D}&${P}&look=brush&fixed=1`], ['look-pump-night-fixed', `${N}&${P}&look=brush&fixed=1`], ['look-pump-pm-fixed', `hour=15.6&decl=-21&${P}&look=brush&fixed=1`], ['look-pump-pm-brush', `hour=15.6&decl=-21&${P}&look=brush`],
  ['look-pump-tall-cut', `${D}&${P}&tall=1&look=cut`], ['look-pump-close-cut', `${D}&${P}&look=cut&x=-9.25&n=10.5&head=-52&pitch=-6`],
];
