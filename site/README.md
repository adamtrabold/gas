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

## Writing a sheet

From Sheet 3 on, a sheet is a page on the site: each drawing is its own image, and every word is web text
(owner record, section 20). Sheets 1 and 2 stay as tall images.

A sheet is two things in the repo, and nothing in `site/` needs touching:

- `design/gas-station/concepts/sheet-N.md` — the sheet itself, in ordinary Markdown. This is what the owner reads.
- `design/gas-station/concepts/stills/sheet-N/` — its drawings, one PNG each, at phone size (1170 px wide for a
  full-width drawing; they are copied as they are, never re-compressed).

The whole format:

| You write | The page shows |
|---|---|
| `# Sheet N — Title` | The sheet's name, on its page and on its card |
| The first paragraph | What this is, in one or two lines |
| `## 1. A section` | A numbered section. You number them |
| `![Caption](stills/sheet-N/file.png)` alone on a line | The drawing, with the caption under it. Tapping it opens it large |
| `![Caption](stills/sheet-N/file.png "Route 66, PROPOSED")` | The same, with tags after the caption (comma-separated) |
| Two or more image lines with **no blank line between them** | Those drawings side by side; on a phone they stack |
| Paragraphs, lists, tables | Text, lists and tables as usual |
| `## Questions` with a numbered list | The "What this sheet asks you" block at the top of the page. Only the numbered list is shown |
| `## Plainly` with a list | The plain notes, where you put them |
| Optional, at the very top: `---` / `walk: together, pump` / `---` | "Walk it" buttons to those views of the prototype (`together`, `pump`, `slab`, each also with `-day` or `-night`) |

Rules: write to the owner (the page is his); no words inside the images; keep working notes out of it. Notes on
how the sheet was made go in `concepts/sheet-N-notes.md`, and the director's check stays `concepts/sheet-N-judge.md`;
both are linked under "Behind it" on the sheet's page. The first drawing in the file is the picture on the sheet's card.
If a sheet has both this form and an old tall `stills/sheet-N-*.png`, the page form is used.

A worked example (it is the fixture in `site/verify/fixture/`, when that folder is present):

```markdown
---
walk: together, pump
---
# Sheet 9 — A throwaway example

A made-up sheet for trying the page format.

## 1. Together, from the road

How the link opens: standing in front of the pumps.

![By day, early afternoon](stills/sheet-9/together-day.png)
![At night, the one lamp](stills/sheet-9/together-night.png)

## 2. The pump

![Short, flat-topped, in dots](stills/sheet-9/pump.png "Route 66, you, PROPOSED")

Its shading is its own, the same at every hour.

## Questions

1. **An example question.** Is the first thing right, or the second?

## Plainly

- The shade lines are still even and ruled.
```

To try a sheet before it goes in the records, put `sheet-N.md` and `stills/sheet-N/` in any folder and run
`python3 site/build.py --fixture THAT_FOLDER --out site/verify/dist`, then serve `site/verify/dist`. The real
`site/dist/` is not touched.
