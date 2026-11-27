// lays the stills out as one sheet per concept
const only = new URLSearchParams(location.search).get('only');
SHEETS.forEach(([id, title, frames]) => {
  if (only && only !== id) return;
  const s = document.createElement('section'); s.id = 's' + id;
  const h = document.createElement('h2'); h.textContent = title; s.append(h);
  frames.forEach(([k, cap]) => {
    const f = document.createElement('figure'); let el;
    if (FR[k]) el = FR[k](); else { el = new Image(); el.src = k; }
    el.id = 'f' + k.replace(/\W/g, '');
    f.append(el);
    const c = document.createElement('figcaption'); c.textContent = cap; f.append(c);
    s.append(f);
  });
  document.getElementById('root').append(s);
});
document.title = 'done';
