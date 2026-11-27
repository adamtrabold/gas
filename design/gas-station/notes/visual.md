# Notes — product designer (visual)

Last updated: after the round-3 score (9), visual turn 5 (second visual designer). Left on goes to the owner.

## Where things stand

- One concept: **Left on** (`concepts/05-left-on.md`). I own its **How it looks and feels** half only; the systems designer owns the how-it-works half and `00-shared.md`. Do not edit theirs.
- Scores: round 1, 7 and 8. Round 2, 8.5. Round 3, 9.
- **The owner has walked the round-2 prototype on his phone** (`owner.md` section 8): "Prototype feels pretty good and fluid. Rendering is pretty high contrast though ... hard to really make out objects. I think there can be slightly more detail and variation in the brush stroke size or something to give more detail to the scene". So feel and frame rate are no longer the main risk; legibility became this round's first job alongside the desert and brush on arrival.
- Also from him (section 7): "Canopy over pumps yes." "Gas is unnecessary." (the GAS blade I added in round 2 is gone).
- Stills: `concepts/stills/` holds this round's `lo-*` set, `sheet-05-left-on.png`, `walk-test.png`, `stroke-sheet.png`, and `cross-2d.png` from round 1.

## The owner's words that govern the look (all in `owner.md`)

"Aesthetic should be monocolor black and white brush strokes"; "set in the desert"; "Ed Ruscha meets Jack Kirby's sketches"; "pure ink for now"; brush "somewhere in the middle. I want them readable but note precise or always whole" (not precise, not always whole); "Route 66 but there's gotta be a googie arrow sign"; "it should feel liminal not funny"; "place first"; "Me"; "walk around"; "I'm thinking threejs"; "draw but generate for now. I want to eventually export blender models and texture them"; "Gas is unnecessary."; "hard to really make out objects ... more detail and variation in the brush stroke size".

## What I did this round, and why

**Legibility (the owner's objection).** `?detail=0` gives the look he walked, for before pictures.
- Things have a tone: painted things (pumps, bench, phone box, cooler) are never quite paper, so they are always drawn. Ground and plaster stay paper in sun. Done with the material's colour (`inkMat(scale, amb, tone)`).
- More stroke sizes: road 0.5, ground 1, walls 1.7, things 3.6, small dark things 5, globes 4.2 (the number is how many times smaller than the ground's the sheet is worn).
- A drawn line where an edge would be lost: in the last pass, from depth only. An outline is a jump in depth; a corner is a bend in 1/depth. Ink line on paper, paper line in shade, about 2 cm in the world, weight and breaks from the sheet's noise channel, within 34 m. No line in full dark.
- Day shade more open (`sky` 0.3, was 0.2).
- This breaks "a sunlit wall against the sky has no edge" within 34 m, which the director had ruled to keep. I chose the owner's eye. Flagged in the file; it is one number to restrict the line to things only.

**Desert (director's fix 2).** A horizon ring of mesas (a cylinder of paint that follows the visitor, drawn from the stroke sheet, dense at the cap and dry toward the ground; one long mesa placed behind the station for the arrival, a butte right of the sign). Scrub: 320 instanced tufts, lost at about 45 m. Drifts: patches of ground with a lower tone, so dry strokes lie on them; one placed in the arrival's foreground. A fence along the north side of the road, 4 m posts. No cactus: too close to a wink.

**Brush in the day arrival (fix 3).** A second, larger stroke size from far off: beyond 32 m a surface wears the sheet about 3.7 times larger; it cross-fades to the fine one by 12 m (`gK` in the shader; `?big=0` turns it off). Both world-fixed. The shadow reach grows with it. Measured in `walk.js` (third case). Not seen in motion.

**Shadow (fix 5).** No longer cast by a hidden mesh through the brushed shadow. It is computed directly in every ink material: seven capsules (head, shoulders, body, arms held in, legs), a clean edge. Works on the ground, the door, walls. `?body=0` turns it off (the walk test uses that).

**Night never black (fix 4).** A second, wide, shadowless spot aimed at the ground 2.6 m ahead (`feet`). Closes with the lamp.

**Twilight (fix 6).** `#dusk` / `?dusk=1`: no sun, strong even sky light (flat, shadowless), a sky dome of paint inked from the top using the sheet at very large size, letters 5 to 7 of the name dark (`?letters=`), bulbs small. One still. The sequence is not built.

**Aisle look back (fix 8).** Shot with the lamp closed and aisle lights off: the front window is the bright thing. With stretches lit they take the picture; said so in the file.

**Safe to hand him (fix 9), and the private link.** `#day` / `#dusk` / `#night` read from `location.hash`, reload on change; with none, the visitor's clock picks. Caption replaced by small grey "day · dusk · night" links and "drag to look · hold to walk" (fades after the first walk). Resolution drops by a quarter whenever 16 frames average over 30 ms, down to under half; never back up. three.js import unchanged. Walk speed 4 m/s. Lamp indoors and at night only.

## After the score (round 3 scored 9; it goes to the owner)

`concepts/score-3.md`. The director withdrew the edgeless-wall ruling, kept the clean shadow, and left the far-stroke handover on for the owner's walk (`?big=0` ready). Five small fixes asked for before the link goes out, all done and checked:

1. Edge line with a brush's weight, fewer of them. The weight now comes from a slow world noise written to the first pass's blue channel (the same for every surface, about 0.5 to 1 m), not the sheet's fine noise, which made beads. Outlines and square corners only.
2. Pole ladder at dusk: it was the pole's own horizontal strokes. Posts use a material that lays strokes up and down (`inkMat(..., vert)`), `Wp`.
3. Solid things in `canStand`: sign pole, canopy posts, pumps, air post, phone box, bench. Live check: stops 0.62 m from the pole.
4. The indoor tuft: your shadow is now multiplied in only where the sun's own shadow test says the sun reaches (`gYou`, set inside `getShadow`).
5. The pool at your feet never fully closes; it draws in and moves a little ahead so it stays in frame when the view levels.

New stills: `lo-night-still`, `lo-sign-foot`, `lo-sign-foot-live`, and `pairs-05.png` (the five before/after pairs on one page for the owner; built by `sheets.js`).

The orchestrator must refresh the private-link copy from `sketches/place/index.html` and `strokes.js` before he walks it. Tell him it is silent, the strokes are generated, and the building's marks change size as he walks in.

## The walk-past test

`sketches/place/walk.js` → `stills/walk-test.png`. Numbers for this round are in the concept file. Two things worth knowing:
- Round 2: it caught strokes creeping when the ground was one huge quad. The ground must stay cut into small squares (6 m).
- A result of exactly 0.00% everywhere means the ground isn't being drawn, not that it passed.

## The director's objections so far, and where each stands

| Objection | Status |
|---|---|
| "Where are the brush strokes?" (round 1) | Answered in round 2 |
| "I haven't felt it" | The owner has: "pretty good and fluid" (round-2 version) |
| GAS blade | Gone |
| No desert by day | In |
| Day arrival shows almost no brush | Road, mesa, drift, scrub, and larger far strokes |
| Solid black when turned away at night | Pool at the feet |
| Shadow with ears | A person with a clean outline |
| Twilight words only | One still |
| Look back down the aisle promised and unbuilt | Shot; limits stated |
| Sign unchecked against his references | Still unchecked (hosts blocked) |
| "These look generated" | True. One file to replace |

## Sketches

`sketches/place/` (serve `sketches/`, open `place/index.html`; three.js is shared from `../ink-is-shadow/vendor`, the only copy):

- `index.html` — the prototype. Hash: `#day`, `#dusk`, `#night`. Query: `hour`, `decl`, `night=1`, `dusk=1`, `x`, `n`, `head`, `pitch`, `inside=1`, `tube`, `cooler`, `mouth`, `aislelights` (1 all, 2 first two), `lamp`, `feet=0`, `body=0`, `detail=0`, `big=0`, `line` (0 none, 1 round 2's, 2 drawn line), `sky`, `reach`, `letters`, `skydown`, `res`, `strokes=0`, `sheet=file.png`, `anchor=screen`, `dbg=1..4`, `other=1`, `seen=`, `still=1`.
- `strokes.js` — the sheet generator and the loader for a drawn sheet. The one file his strokes replace. `sheet-example.png` is the generated sheet as a drawing.
- `shots.js`, `render.js`, `walk.js`, `sheets.js`, `review.js`. Order: `render.js lo-`, `walk.js`, `sheets.js`. `out/` is deleted after use. A full run takes about six minutes in software; run it in the background. After `sheets.js`, the stills are re-saved in 16 greys (a few lines of Python with PIL) to keep the folder small.
- Older, untouched: `sketches/concepts/`, `ink-is-shadow/`, `dial-on-a-phone/`.

## Not proven

- This round's look on his phone: the lines, tones, the far strokes changing as you walk in, and the frame rate with them.
- Whether "slightly more detail" is met or overshot.
- The world's edge with the desert in (reasoned and built, not captured from both sides).
- The resolution fallback on a slow phone.
- Dusk as a sequence; dawn; the real sun for the real hour.
- Lights arriving in strokes; the lamp closing in held steps; the door stroke and DING in the walked world; sound.
- His own strokes.
- The sign against his saved article and photo pool.

## Open questions

- Owner: are things easy enough to make out now, and is the line welcome on the building or only on things? Do the strokes read as brush strokes to him, and does his shadow read as his? (The director's two questions.)
- Director: I broke the edgeless-wall ruling inside 34 m; the shadow is exact, not just "less ragged"; no cactus.
- Systems: the prototype follows the visitor's clock when no hour is named; the lamp has a second part (the pool at your feet); the walk is 4 m/s.
- Orchestrator: the private-link copy needs refreshing from `sketches/place/` (and `strokes.js` beside it) for him to see any of this.

## Next

- Read the round-3 score.
- If he walks it again: listen for the far strokes crawling on the walk in. If they do, `big=0`.
- Capture the world's edge from both sides.
- Lights arriving and leaving in held steps; the lamp closing in steps; the door stroke.
- Dusk as a sequence.
- If a sheet of his strokes arrives: `?sheet=`, fix the conversion for hard black-and-white, re-run `walk.js`.
