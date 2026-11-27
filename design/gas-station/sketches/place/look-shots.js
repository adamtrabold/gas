// [name, query, file?]. the look test: elements one at a time, then together. hour 10.5 = mid-morning, 15.6 = low afternoon sun from the other side
const D = 'hour=10.5&decl=-21', PM = 'hour=15.6&decl=-21', N = 'night=1&lamp=1', L = ['pen', 'brush', 'paper'];
const each = (name, q) => L.map(l => [`look-${name}-${l}`, `${q}&look=${l}`]);
module.exports = [
  ...each('pump-day', `${D}&study=pump`),
  ...each('pump-night', `${N}&study=pump&x=-9.6&n=9.3&head=-33&pitch=-3`),
  ['look-pump-pm-pen', `${PM}&study=pump&look=pen`], ['look-pump-pm-brush', `${PM}&study=pump&look=brush`],
  ['look-pump-close-pen', `${D}&study=pump&look=pen&x=-9.25&n=10.6&head=-52&pitch=-9`], ['look-pump-close-brush', `${D}&study=pump&look=brush&x=-9.25&n=10.6&head=-52&pitch=-9`], ['look-pump-close-paper', `${D}&study=pump&look=paper&x=-9.25&n=10.6&head=-52&pitch=-9`],
  ['look-pump-far-pen', `${D}&study=pump&look=pen&x=-14.5&n=4.5&head=-42&pitch=2`], ['look-pump-far-brush', `${D}&study=pump&look=brush&x=-14.5&n=4.5&head=-42&pitch=2`],
  ...each('wall-day', `${D}&study=wall`),
  ...each('ground-day', `${D}&study=ground`),
  ...each('lot-day', `${D}&study=lot`),
  ...each('lot-night', `${N}&study=lot&x=-3&n=5&head=46&pitch=0`),
  ['look-before-day', `${D}&x=-2.5&n=6.5&head=42&pitch=0`, 'round3.html'], ['look-before-night', `${N}&x=-3&n=5&head=40&pitch=0`, 'round3.html'],
];
