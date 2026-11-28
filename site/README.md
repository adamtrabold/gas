# The project site

A small viewing site for the gas station project, generated from this repo and published with GitHub Pages.
It looks and works like the synths-to-go site. It is for the prototypes and for how the place works
(owner record, section 37). Three items in the nav, nothing else:

- **try** — the first page. The short note from `site/now.md` at the top, then the prototypes: the station
  (its views and hours are read from how `sketches/place/index.html` routes its plain `#names`) and the
  controls test page.
- **elements** — what the place is made of: `elements.md`, then `lights.md` as a section after it. Where the
  station prototype has a view of one element (`try/#view-pump`), that view is embedded under the element's
  heading so it can be turned and zoomed (owner record, section 38). See "Elements in 3D" below.
- **how it works** — `concepts/05-left-on.md` (the concept), `concepts/controls.md` (moving and looking),
  `concepts/00-shared.md` (the shared place), as three tabs under the one item.

Everything else stays in the repo and is not published: sheets and stills, notes, scores and judgments, the owner
record, jobs, history, earlier concepts, and everything under `inspo/`. No images are published; the only image
files in the output are the prototype's own paper textures. Addresses of pages the site used to have land on "try".

## Commands

- **Build:** `python3 site/build.py` writes `site/dist/` (git-ignored). Needs Python 3 with `markdown`
  (`pip install markdown`).
- **Look at it locally:** `python3 -m http.server -d site/dist 8000`, then open http://localhost:8000/.
- **Publish:** `bash site/publish.sh` rebuilds and force-pushes `site/dist/` to the `gh-pages` branch, which
  GitHub Pages serves at https://adamtrabold.github.io/gas/.

## What is where

- `build.py` renders the records above to HTML, copies the two prototypes with their three.js import path fixed
  (behaviour untouched; the build stops if either starts loading files it doesn't know about), and writes one
  `index.html`. The nav words are the `WORDS` table at its top.
- `app.html` is the viewer: styles and script, with the data dropped in by the build.
- `now.md` is the one hand-kept file: a few lines on what changed last and the one thing being asked. It is shown
  as it is.

## Elements in 3D

Nothing to do in `site/`. When the prototype gains a view, write its hash (for example `#view-pump`) in
`design/gas-station/concepts/look-notes.md`. The build picks up every `#view-name` in that file and embeds it
under the element whose heading contains that name ("1. Pump (two of them)" for `view-pump`; hyphens match
spaces). For a name that doesn't match a heading, add a line to `ELEMENT_VIEWS` in `build.py`. A hash the
prototype's own source doesn't mention is skipped, so nothing shows before it works. On the page only the view
most in sight is loaded, and it is unloaded when scrolled away; touches scroll the page until the button under
it is tapped.

The prototype is published at `try/` (it was `walk/`; old links are passed on, name after the `#` included).

Markdown in the repo is the source; the site shows it as HTML. Don't edit records for the site's sake.
