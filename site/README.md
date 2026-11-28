# The project site

A viewing site for the gas station design work, generated from this repo. It works the same way as the
synths-to-go site and uses its viewer.

- **Build:** `python3 site/build.py` writes `site/dist/` (git-ignored). Needs Python 3 with `markdown` and `Pillow`
  (`pip install markdown pillow`).
- **Look at it locally:** `python3 -m http.server -d site/dist 8000`, then open http://localhost:8000/.
- **Publish:** `bash site/publish.sh` rebuilds and force-pushes `site/dist/` to the `gh-pages` branch, which
  GitHub Pages serves at https://adamtrabold.github.io/gas/. Pages is turned on once in the repo's
  Settings → Pages (branch `gh-pages`, folder `/`).

## What is where

- `build.py` reads `design/gas-station/` and `git log`, renders every markdown record to HTML, copies the stills
  and the walkable prototype (`sketches/place`, with its three.js import path fixed), and writes one `index.html`.
- `app.html` is the viewer: styles and script, with the data dropped in by the build.
- `now.md` is the one hand-kept file: where things stand and what is waiting on the owner. The orchestrator
  updates it when a sheet goes out or an answer comes in. Everything else on the site comes from the records.
- `vendor/lightbox/` is the image viewer bundle from the synths-to-go site (Ramka; licences beside it).

## Rules it follows

- Markdown in the repo is the source; the site shows it as HTML. Don't edit records for the site's sake.
- Nothing under `design/gas-station/inspo/` is published: those images are other people's work. Records that
  mention them show as text.
- New sheets are picked up by name: `concepts/sheet-N.md`, `concepts/stills/sheet-N-*.png`,
  `concepts/sheet-N-judge.md`. Which walkable views match a sheet is the small `SHEET_VIEWS` table in `build.py`.
