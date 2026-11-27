// [name, query, file?]. the look test: the pump, by itself. hour 10.5 = mid-morning, 15.6 = low afternoon sun from the other side
const D = 'hour=10.5&decl=-21', PM = 'hour=15.6&decl=-21', N = 'night=1&lamp=1', L = ['pen', 'brush', 'paper'], P = 'study=pump';
const each = (name, q) => L.map(l => [`look-${name}-${l}`, `${q}&look=${l}`]);
module.exports = [
  ...each('pump-day', `${D}&${P}`), ...each('pump-close', `${D}&${P}&x=-9.25&n=10.6&head=-52&pitch=-9`), ...each('pump-night', `${N}&${P}`),
  ['look-pump-pm-pen', `${PM}&${P}&look=pen`], ['look-pump-pm-brush', `${PM}&${P}&look=brush`], ['look-pump-far-pen', `${D}&${P}&look=pen&x=-14.5&n=4.5&head=-42&pitch=2`], ['look-pump-far-brush', `${D}&${P}&look=brush&x=-14.5&n=4.5&head=-42&pitch=2`],
];
