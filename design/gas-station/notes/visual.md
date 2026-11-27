# Notes — product designer (visual)

Last updated: concept phase, round 2, visual turn 3 (second visual designer; the first was replaced when their context got heavy). The director scores the one merged concept next.

## Where things stand

- One concept: **Left on** (`concepts/05-left-on.md`). The systems designer wrote its how-it-works half; I wrote its **How it looks and feels** half this turn. 01–04 are history.
- **The stroke question is answered: yes.** Brush strokes (swell, taper, dry breakup, not always whole) live in the walked three.js world and stay fixed to it. Built in `sketches/place/`, tested with a walk-past test. The owner does not have to choose between three.js and brush strokes. Not yet seen on a real phone.
- Stills: `concepts/stills/` holds this round's set only (`lo-*.png`, `sheet-05-left-on.png`, `walk-test.png`, `stroke-sheet.png`) plus `cross-2d.png` from round 1. Everything else from round 1 is deleted.
- Round 1 scores: 01 = 7, 03 = 8. Nothing has gone to the owner.

## The owner's words that govern the look (all in `owner.md`)

"Aesthetic should be monocolor black and white brush strokes"; "pure ink for now"; brush "somewhere in the middle. I want them readable but note precise or always whole" (not precise, not always whole); "Route 66 but there's gotta be a googie arrow sign and it should have some elements of that era in places"; "it should feel liminal not funny"; "place first"; name on the sign "Me"; "walk around"; "I'm thinking threejs"; "draw but generate for now. I want to eventually export blender models and texture them"; "let's not worry about the work right now I just want to nail the world"; public with a note "yes but no".

Open with him: does the station have a canopy (kept on, west of the door).

## How the strokes work (the decision, and why)

- Every surface wears one tiling picture, the **stroke sheet** (`sketches/place/strokes.js`). It records how soon each bit of each stroke shows as its place gets darker: spine first, thin edge and dry tail last. Light on the surface sets the cut-off. So one sheet gives every tone in two values, and a shadow edge is strokes thinning out.
- On the ground the sheet is laid along the light (sun: along the shadows; fixed lamp: outward from it, in a log-polar wrap). On walls and things it is laid along the surface with a lean. Your own lamp has no grain, on purpose: a grain that followed a moving light would slide.
- Each stroke reads the sun's shadow a little ahead of or behind itself, along its length, over about 0.7 m. That is what makes a shadow's edge a ragged row of tapers and not a line.
- Why this and not strokes laid on last round's noise: decorating an edge would still leave flat fills. The owner asked for brush strokes, so the stroke is what surfaces are made of.
- Why it suits "draw, generate for now, Blender later": the sheet is an ordinary texture. `?sheet=file.png` loads a drawn sheet (tested with `sheet-example.png`). A Blender model can carry its own sheet in its own UVs.
- Day shade is brushed, not filled, because by day a little sky light is let into shadows (`sky`, 0.2). Full dark (night, indoors) is whole. Indoors is cut off from the sky in the shader by position.
- Paint is told from light by a flag in the first pass (alpha), not by a tint as in round 1.

## The walk-past test

`sketches/place/walk.js` → `stills/walk-test.png`. One 4 m square of ground from eight stands; ink read from the live frame per 5 cm cell of ground and compared.

- Strokes on the world: day 0.4–3.3% changed, night 0.5–1.4%. Control (same sheet stuck to the screen): day 7–12%, night 20–28%.
- **It found a real fault:** with the ground as one huge quad, strokes crept by centimetres with any camera move (9% changed for a 1 cm step). Cause: position precision across a huge triangle. Fixed by cutting the ground into 6 m squares. Tell the builder.
- `swim.js` (round 1's test) is deleted; `walk.js` replaces it.
- I also lost twenty minutes to my own bug (a comment that swallowed the line adding the ground). The test reading 0.00% everywhere was the clue: a test that passes perfectly is worth a look.
- Frame rate in the headless browser: about 2.5 frames a second, same as round 1's version. Software rendering; says nothing about a phone.

## Limits I found (said in the concept file too)

1. A stroke has a size in the world, not on the screen. From the road the strokes are texture and feathered edges; up close they are marks. The arrival gets its brush from big things: the road (a band of long dry strokes, added this turn), the canopy shadow, the night pool's rays.
2. Narrow shadows are eaten by the brush. Column and person shadows come out nearly the same.
3. The sheet repeats every 8 m. Not visible so far.
4. A hard black-and-white drawn sheet converts coarsely; a grey one would do better.

## The director's objections (score-1) and where each stands

1. "Where are the brush strokes?" — answered. Needs his eye and the owner's.
2. "I haven't felt it" — still true. Nobody has walked it on a phone.
3. Day is thin — systems rewrote it; the look half follows.
5. Tombstone shadow — both shapes drawn; nearly the same at brush size; I recommend the person's proportions.
6. Sign unchecked against the owner's references — still unchecked (hosts blocked). The six questions are at the end of `00-shared.md`.
7. Can't see the pumps under the canopy — fixed: brushed shade plus a broken paper edge on near things in shade.
- Arrival crops the name at 390 wide — fixed: you arrive 21 m south of the sign. Whole name at 390 × 844 and 360 × 740 from the live first frame.
- Sign is a line from the side — fixed: deep cabinets, slab arrow, crossed starburst, and a GAS blade facing the road (my addition; flagged).
- Inside by day with lights on — drawn twice.
- Twilight — **not drawn.**
- Far end of the aisle as a picture / the look back — half done; the front window is still not the bright thing.

## Where I disagreed (all written in `05-left-on.md`)

- Systems: no lamp in daytime shade. `lo-canopy-shade-lamp` shows it adds a sliver that reads as a fault. Lamp is for indoors and night. This removes one of the four choices for the owner.
- Director: I replaced the noise fibres and didn't build on them.
- Layout: you arrive across the road, not on it. The door is about 11 s away; I'd walk a little faster (4 m/s) over starting closer.

## Sketches

`sketches/place/` (serve `sketches/`, open `place/index.html`; three.js is shared from `../ink-is-shadow/vendor`, the only copy):

- `index.html` — the prototype. Parameters: `hour`, `decl`, `night=1`, `x`, `n`, `head`, `pitch`, `inside=1`, `tube`, `cooler`, `mouth`, `aislelights` (1 all, 2 first two), `lamp`, `body=person`, `daylamp=1`, `strokes=0` (round 1's flat look), `line=0`, `sky`, `reach`, `sheet=file.png`, `anchor=screen` (the test's control), `dbg=1..4` (raw light, sheet, paint flag, depth), `other=1`, `seen=`.
- `strokes.js` — the sheet generator, and the loader for a drawn sheet. The one file his strokes replace.
- `sheet-example.png` — the generated sheet as a black-and-white drawing; also copied to `stills/stroke-sheet.png`.
- `shots.js` (every still's position), `render.js` (stills into `out/`, at 390 × 844, 360 × 740 or 1440 × 810, double density), `walk.js` (the test), `sheets.js` (copies to `concepts/stills/` and builds the sheet), `review.js` (contact sheet). Order: `render.js`, `walk.js`, `sheets.js`. `out/` is deleted after use. A full render takes about three minutes; run it in the background.
- Older: `sketches/concepts/` (round 1's 2D engine), `ink-is-shadow/`, `dial-on-a-phone/`. Untouched.

## Not proven

- Anything on a real phone in a hand: feel, frame rate, whether far fine strokes sparkle in motion.
- His own strokes.
- Twilight. Lights arriving in strokes. The lamp closing in held steps. The crossing stroke and DING in the walked world. Sound.
- The look back down the aisle.
- Whether the day building, drawn only by its shadows and small from the road, is a picture he likes.
- The sign against his saved article and photo pool.

## Open questions

- Owner: canopy or not. Does the sign carry only his name, or also GAS on a blade facing the road. (Shadow shape: low stakes now; I'd stop asking.) Whether these generated strokes are near enough to his hand to go on with.
- Director: accept dropping the day-shade lamp; accept arriving across the road; whether twilight must be drawn before scoring.
- Systems: walk speed, now that the door is 37 m from the arrival; "you arrive on the road" in the shared file needs changing to "across the road".
- Orchestrator: a throwaway link so the owner (or anyone) can walk it on a phone is now the most useful next thing. Nothing else can retire the main risk.

## Next

- Read the round-2 score.
- Twilight: sky strokes from the same sheet at large scale, letters one at a time.
- Lights arriving and leaving in held steps; the lamp closing in steps.
- The look back down the aisle: darken the front room from that end so the window is the bright thing.
- The crossing stroke in the walked world.
- If a sheet of his strokes arrives: load it with `?sheet=`, fix the conversion for hard black-and-white, re-run `walk.js`.
