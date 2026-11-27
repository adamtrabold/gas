# Notes — product designer (visual)

Last updated: after the look test (third visual designer, first turn). The owner sent Left on back at the director's 9; this turn fixed two phone defects and replaced the drawing rule. Nothing has been scored or seen by the owner yet.

## Latest (end of turn; overrides anything below that disagrees)

- The director judged the look test (`concepts/look-judge-1.md`): right direction, five fixes, then the pump only. Done on the pump as it stands; table in `look-test.md` section 0. Fixes 3, 4, 5 met; 1 and 2 partly (lit steel still light in pen and brush; brush shade still near bars).
- **The owner then stopped element work** (`owner.md` 13, 14): "Why is there a clock on the pump?" and "before drawing elements let's first establish a list of things they need". The pump is to match his photos 01 and 02: grade plate, a small rectangular window of rolling numbers, a flat disc globe, a slightly domed top, dark plinth, hose looped from the side. **Not built.** The clock face and ball globe are still in `index.html` and in every still. Do not model or redraw any element until the list is agreed with him. Nothing goes to his link until then.
- My next job: add to the systems designer's element list what each element needs from the drawing: material, paper, kinds of mark, where tone must turn (so what must be round), what is flat paint.
- The link: any hash not behind `team` gives the lone pump. Foot links pen · brush · paper, day · night. `#team` (arrival), `#team-lot`, `#team-wall`, `#team-ground`, `#team-...-dusk` for us. `?study=` also counts as team, for the capture scripts.
- Stills now: `look-fix-1..3.png` (pump by day in pen, brush, paper; lossless, zoomable), `look-pump-{close,night,pm,far}-*`, `look-before-*`, and `look-test.png` (pump only). The lot, wall and ground stills were deleted as stale; re-render with `study=lot` etc. if wanted.
- New this pass in the build: `inkMat(..., { fine })` (small things wear marks closer together); `supG` (a body rounded in plan and its dome, with smooth normals: this is how tone turns); multisampling at every density (`?msaa=0` to compare); contour read at four radii; a tight sun shadow when one element is alone; paper grey only where the flag is a drawn thing (a between .215 and .6), so ground, road and sky stay plain; `window.seen()` lists what is visible (it found the sign's bulbs and the back wall plug being re-shown every frame in the lone-pump view).
- Lesson: a box can only ever have two tones. "Tone that turns" is a modelling requirement before it is a drawing one. Put it in the element list: every element needs at least one surface that turns.
- Lesson: brush at 15 points between strokes is too coarse for a thing half a metre wide seen from 3 m. Stroke scale has to go with the size of the thing.

## Where things stand

- One concept: **Left on** (`concepts/05-left-on.md`). I own its **How it looks and feels** half; the systems designer owns how it works and `00-shared.md`. **The looks half of `05-left-on.md` now describes the old look and has not been rewritten**, on instruction. Rewrite it once the owner picks a look.
- This turn's write-up: `concepts/look-test.md`. The one picture: `concepts/stills/look-test.png`. Stills: `concepts/stills/look-*`. Last round's `lo-*` stills are all still there.
- The steer I worked to: `concepts/steer-3.md`. Then the owner changed the shape of the job mid-turn (below).

## The owner's words that govern the look (all verbatim in `owner.md`; his words win)

Earlier: "monocolor black and white brush strokes"; "Ed Ruscha meets Jack Kirby's sketches"; "pure ink for now"; "readable but note precise or always whole"; "liminal not funny"; "hard to really make out objects … more detail and variation in the brush stroke size".

Section 9 (the rejection): "It's looking pretty pixellated and when I press and hold it often brings up the copy paste tooltip on mobile. I think we need more detail boss texturing and shadow methods like crosshatching etc it looks posterized".

Sections 10 to 12, which arrived while I worked:
- "Detail via* texturing. Two values but we can still make the illusion of grey. It's just a black and white painting."
- "We could also leverage different paper textures for the forms" … "Within black and white, different grain showing through the ink" … "think like if I'd scanned in various paper textures, made them greyscale and multiplied onto the vintage color, and then applied them to each face / element".
- "Instead of trying to one shot this in one view maybe it would be helpful to develop all the elements individually?"

So: two values, grey as an illusion made by marks; texture is how detail arrives; papers per face or element; and work element by element, not one composed view.

## The two defects (detail and evidence in `look-test.md` section 1)

- **Pixellated.** Cause: drew at a cap of 2 on a 3-dot screen; a resolution fallback with no floor that never recovered (measured in emulation: 2 → 1.5 → 0.63 dots per point within 70 s on a slow machine); hard on/off edges and an enlarged stroke picture. Now: draws at the screen's density up to 3, marks computed per pixel with a one-pixel soft edge, fallback floored at 2 and slow to act.
- **Copy/paste on press and hold.** Cause: nothing on the page refused selection, the long-press menu or the touch. Now: touch refused on the canvas (pointer events still drive walking), `contextmenu`/`selectstart`/`dragstart`/`gesture*` refused page-wide, `user-select`/`touch-callout` none, zoom and overscroll off, pointer capture.
- **Verified only in emulation** (Playwright's iPhone 14 and Pixel 7 descriptors). The callout can't be shown by a headless browser at all. Frame rate at 3 dots per point on his phone is unknown. Both need his phone.

## How the look is built now (`sketches/place/index.html`)

Two passes, as before, but the work moved.

**Pass 1: every drawn surface is `inkMat(kind, opts)`**, a Lambert material with its fragment shader extended. `kind` is what it is made of: dirt, plaster, concrete, blacktop, steel, wood, tin, glass. Options: `tone` (never quite paper), `amb`, `along` (fix the mark direction), `vert` (marks run up), `round: [metres round, metres along]` (marks follow the mesh's own uv: globe, posts), `drift` (the desert floor's darker patches).

- `where()` gives each fragment `gP` (its place on its own surface in metres; marks run along `gP.x`) and `gDir` (that direction in the world). Flat things: along the sun, or log-polar round the nearest fixed lamp at night. Walls: along the wall, leaning. Round things: their uv.
- Light → `tone` (0 paper, 1 black): `pow(1 - clamp((l - .012)/.9), 2.6)`. Day sky light is 0.75 and the hemisphere's ground colour was lifted, so shade lands around 0.45 to 0.6 and undersides about 0.6. These three numbers set how dark the whole place is; I tuned them by eye in three passes.
- `fam(p, a, width, gap, seed, grain)` draws one family of lines. The important ideas:
  - Spacing comes from the screen: `log2(fwidth(p.y) * gap * pxs)` picks an octave; odd-numbered lines fade (by width) as you back away, so close up new lines grow between old ones and nothing pops. Width and wander scale with `S*(1+f)` so they're continuous across an octave change.
  - Each line's identity is its world position (`j*S`), so its hash survives octave changes. Its length scale is tied to the octave at which it first appears (`lv`), so lines seen from far are long and heavy.
  - Along a line, noise minus the tone decides where it exists and how wide; that gives tapers, breaks, and a feathered shadow edge.
  - Dryness: the edge of a mark is pushed in by the paper's grain (and bristle streaks in brush), more toward its ends.
  - Two neighbouring lines are evaluated per pixel so swollen lines can close up.
- Two families (the second rotated by `LK2.x`), then black with the paper's valleys last to fill, then the material's own marks (`spots`, `ruled`, more `fam`) which ignore light except to thin.
- Output: r = paper left, g = grain, b = tone (for contour weight), a = flag (.25 drawn surface, .18 ground/road which get no contour, 1 = flat paint from `MeshBasicMaterial`).
- The sun's shadow lookup is still overridden (`SHADOW`): eight taps along `gDir` over `reach` (50 cm each way). No per-pixel jitter: jitter in screen space made stroke widths shimmer in my head before I ever ran it, so I left it out.

**Pass 2 (the quad):** contour from depth (outline = jump in depth, corner = bend in 1/depth, six taps, at two radii for a soft edge), width from tone and a slow world noise; paper line inside black; far things lost; paper colour (warm, his "vintage color") times grain in `#paper`.

**Looks** are four numbers each in `LK`, `LK2`, `LK3` near the top: gaps, dryness, bristle, cross angle, where the cross starts, where black starts, mark length, widths. Query overrides for tuning: `gap`, `gap2`, `dry`, `bristle`, `cross`, `crossat`, `solid`, `len`, `texp`, `sky`, `reach`, `tex=0`, `grain=0`, `grey=1`, `line=0`, `dpr`, `res`, `dbg=1..4`.

**Hash:** names joined by dashes in any order. Looks: `pen`, `brush` (default), `paper`. Hours: `day`, `night` (none = visitor's clock; `dusk` only behind `team`). The page is the lone pump unless `team` is in the hash; then `lot`, `wall`, `ground`, or none for the arrival. The foot links keep whichever of the others is set. `?look=` and `?study=` do the same for the capture scripts.

**Papers:** `sketches/place/paper/*.png`, 256 px, tiling, greyscale, levelled; made by `papers.js`. Sampled at two scales. His scans replace them file for file. Real scans will be nearly white with faint tooth: they must be levelled to the full range first, or the shader needs a gain per file.

## What I learned

- The look was posterized because tone was a threshold. Spending tone on line count and width fixes it at the root; everything else (texture, contour) is seasoning.
- First calibration was far too dark: any tone over 0.4 went shut. Width must be set from the tone you want covered, separately from whether a line is present.
- Spots must be small and sparse. At my first size the lot looked like a Dalmatian: funny, not liminal.
- Ground "flicks" across the light converged at the horizon like speed lines. Removed. Low sun still makes long hatching toward the horizon (`look-pump-pm-pen.png`); watch it.
- Real grey paper on the open ground reads as a rendered texture and tiles in the distance. Normalising it round its mean (so the ground isn't darker than the sky) helped; I still think open ground and sky should stay bare.
- A pump alone on bare ground in the same sun is a good way to judge an element: its own shadow is in the frame, and so is yours in the afternoon.
- Lit faces go empty. Painted steel needed its reflections turned up to have anything at arm's length, and still has too little.
- The headless browser here runs a few frames a second and never shows a long-press callout. `window.bench` is not trustworthy (finish doesn't block). Don't claim frame rates from it.
- Renders are quick now: about 6 s a still. `look.js` waits for the papers to load (`window.papersLoaded`); if a still hangs, that is why.

## Files

`sketches/place/` (serve `sketches/`; three.js is shared from `../ink-is-shadow/vendor`, the only copy):

- `index.html` — the prototype, new look. `round3.html` — last round's, untouched, for before pictures.
- `paper/`, `papers.js` — the stand-in grains and their generator.
- `look.js [prefix] [device]`, `look-shots.js` — stills from an emulated phone (default iPhone 14) into `out/`. Then quantise to 16 greys (paper stills as JPEG) into `concepts/stills/` and delete `out/` (it is 25 MB raw). The sheet was built with a few lines of PIL; not kept as a script.
- `walk2.js` — the walk-past numbers for the new look.
- `strokes.js` — last round's stroke sheet. Now only feeds the painted mesas and the dusk sky.
- `render.js`, `shots.js`, `sheets.js`, `walk.js`, `review.js` — last round's scripts. `walk.js` and the `lo-` shot list use parameters that no longer exist (`detail`, `big`, `anchor`, `strokes`, `sheet`); they will run against `round3.html` if pointed at it, not against `index.html`.

Folder is about 17 MB (was 12): 3.6 MB of look stills, the 1.8 MB sheet, the papers.

## The director's bar (steer-3) and where each stands

| Bar | Status |
|---|---|
| A small look test before a rebuilt world | Done, as elements (the owner's change) |
| Side by side with 16/17 and 13 | In the sheet, row 4 |
| Real captures from a real phone | Not met: emulation at true density |
| Both defects gone, checked on touch | Fixed; checked in emulation only |
| Outcomes 1 to 7 in a walked frame, marks on the world | In frames, and measured; not seen in motion |
| No words for pictures | Everything claimed is in a still, except the mix I recommend for paper |

## Not proven

- Frame rate and heat at 3 dots per point on his phone.
- The callout really gone on iOS Safari and Android Chrome.
- Lines growing in and letting go as you walk and sidestep: measured (12 % of cells change on a 60 cm sidestep), unseen.
- Shimmer of fine pen hatching on far surfaces in motion.
- Outdoors legibility of thin lines.
- Dusk (untouched, tuned for the old look), the room and the aisle in the new look (they render; nobody has looked).
- Whether quiet open ground reads as quiet or unfinished.

## Open questions

Owner: pen, brush or paper; grain strictly through ink, or real grey too, and on what; is this pump the pump; which element next; does hold only walk and is it fluid; where did he open the link; will he scan papers and draw one pump.
Director: may paint stay flat; is the lot too empty by day; is the tamed fallback acceptable.
Systems: nothing changed in how it works. Elements are reachable by hash; the default arrival is unchanged.
Orchestrator: the private-link copy needs `index.html`, `strokes.js` and the whole `paper/` folder (seven PNGs) beside it. Without `paper/` the surfaces draw with no grain.

## Next

1. His answer on the look. Then the sign as the next element (his name is on it; it has been unchecked against his references for three rounds).
2. The remaining list in `look-test.md`: canopy, building front with glass, road edge, horizon and scrub in the new look, your shadow, lamp pools, room, aisle, dusk, stars.
3. Lit faces: more to find at arm's length. Plaster and dirt further apart. Curved strokes for brush (13's strokes bend; ours don't).
4. The last stepped silhouettes: give the contour pass a proper soft edge.
5. If frames are slow on his phone: cap at 2.5, cut the shadow taps from 8 to 5, drop the second line evaluation in the far octave.
6. Rewrite the looks half of `05-left-on.md` once the look is chosen.
7. How his own strokes get in now that there is no single sheet.
