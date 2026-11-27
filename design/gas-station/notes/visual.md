# Notes — product designer (visual)

Last updated: after the look test (third visual designer, first turn). The owner sent Left on back at the director's 9; this turn fixed two phone defects and replaced the drawing rule. Nothing has been scored or seen by the owner yet.

## Latest: Sheet 1, the pump (read this first; it overrides anything below that disagrees)

Last updated: after Sheet 1. Waiting on the design director, who wants to see the sheet before the owner does. Nothing goes on the owner's link until then.

**What happened since the look test.** The director judged it (`concepts/look-judge-1.md`) and asked for five fixes; done (`look-test.md` section 0). The owner asked "Why is there a clock on the pump?" and then for a list before any drawing. The systems designer wrote `elements.md`; he said yes to it, and: "abandoned", "realistic labeling with fake brand names", canopy "joined", "stucco over brick". Then: "I'm also thinking maybe a bit of flash sheet vibes should enter the visual approach equation", with `inspo/19` to `22`. The director's reading is `concepts/steer-4.md`: each thing a complete drawing alone on old paper, line first, tone by hatching, stipple or spotted black, worn print, drawn lettering; not the creatures, not the charm.

**Delivered this turn**
- `concepts/stills/sheet-1-pump.png`: the flash sheet. Write-up: `concepts/sheet-1.md` (what it shows, how it was made, what transfers to 3D, what is not good).
- The pump rebuilt from his photos in `sketches/place/index.html`: two shapes (short [Route 66] at x -8.2, tall [1934] at x -5.4), disc globe with brand, grade plate, knob, rolling-number window, badge, notice, hose, nozzle, dark base. No clock. Abandoned: rust, pits, flecked lettering, dusty window, one cracked globe (PROPOSED).
- Three hands: `brush`, `cut`, `dot` (and `paper` still works by name: brush on real grey papers). `pen` is gone; `cut` replaced it.
- "Drawn once" (`fixed`): things keep their own shading from a light at upper left; night and shadows only add. Only materials made with `thing: 1` obey it (the pump's).
- `elements.md`: the pump's drawing-needs slot is filled. The other fifteen are empty.
- Walked stills `look-pump-*` (16 `look-` files in all, with the before pictures and the old `look-test.png`, which shows the clock pump and is superseded).

**Routes.** Plain names after `#`, joined by dashes, any order: hands `brush` (default) `cut` `dot`; `tall`; `fixed`; `day` `night`. The page is the lone pump unless `team` is present (`#team`, `#team-lot`, `#team-wall`, `#team-ground`, dusk only there). Query, for scripts: `look`, `study`, `tall`, `fixed`, `h` (eye height), `fov`, plus the tuning ones listed further down and `wear`, `msaa`.

**How the hands are made** (all in `inkMat`'s shader; numbers in `LK`, `LK2`, `LK3`, `lw`, `wear` near the top, one entry per hand):
- brush: two families of broad dry strokes 15 and 12 points apart, bristle streaks, black from tone .86.
- cut: one family 7.5 points apart, short marks, no second family (cross-at over 1 switches it off; that guard matters, without it the whole world hatches), black only in the full dark, contour 1.7 times wider and nearly even.
- dot: families switched off, three layers of `spots` whose density follows tone, finer contour, most wear.
- `fine` scales gaps for small things; `rust: 1` adds blotches and stipple rising from the ground (uses world height, so it is for things standing on the ground); `wear` drops ink where the paper is low.
- Lettering and faces are canvas pictures on flat planes (`cv`, `globeM`, `plateM`, `windowM`, `badgeM`, `noteM`), with `worn` and `dust`.

**How the sheet is made.** `look.js` with `look-shots.js` captures `s-*` flash views (long lens, `fixed=1`, front quarter) and `look-*` walked frames into `out/`. `python3 sheet1.py` (in `sketches/place/`, needs numpy and PIL) cuts pieces out, generates the aged sheet, sets captions, saves the PNG. Then quantise the walked frames into `concepts/stills/` and delete `out/`. The sheet is honest about its flattery: long lens, chosen side, own light, generated paper.

**Decisions I made, and why**
- The sheet is built from real frames, not drawn separately, so it cannot promise what the world can't do.
- Flash views use `fixed` light because sunlit faces by the hour are nearly bare; said on the sheet and in `sheet-1.md`.
- No weeds at the base: not on the pump's list.
- Brand names PLAYA and LLANO, PROPOSED, with a low sun on a flat horizon. **Not checked against real brands.**
- Dots (the steer's tension D): if dot is the hand, bulbs stay a ruled row of round lamps and alien marks become open rings.

**Known weak points**: nozzle doesn't read; tall pump is not particular enough to his 1934 photo; lettering is type, not a hand; brush strokes on the cabinet are straight and can read as wood grain; rust heavy at the base; D1/D2 and E1/E2 hard to tell apart at phone size; the world's paper is still flat cream (the aged sheet exists only in `sheet1.py`); nothing seen in motion or on a real phone; multisampling at 3 dots per point is the frame-rate risk; dusk, room, aisle, horizon and scrub are still not looked at in any new hand.

**Open questions**: owner: A1 or A2 (and same or different), B1/B2/B3, D1 or D2, E1 or E2, the brand name; still the phone checks (callout gone, fluid, no blockiness). Director: is the sheet honest enough to send; is `fixed` light fair for the flash views.

**Next**: the director's read of the sheet. Then, once the owner picks: slab and island, then canopy (the order in `elements.md`), each as a sheet made the same way, filling each element's drawing slot as it is drawn. Fix the nozzle. Put the aged paper into the world if he picks one sheet. Draw the lettering.

Folder is about 19 MB.

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
