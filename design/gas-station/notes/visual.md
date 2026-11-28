# Notes — product designer (visual)

Last updated: after "night fix and the controls" (sixth visual designer). Nothing is committed by me. The owner has not seen any of this turn's work.

Read first: `owner.md` 22 to 43, `concepts/look-judge-2.md` (the director's four, which were this turn's task), `lights.md`, `concepts/controls.md`, `concepts/look-notes.md` (the short version of this file).

## Where things stand

- **He judges the walked prototype**, `sketches/place/index.html`, on his iPhone in Safari, one question at a time. No sheets (`owner.md` 37).
- **Day is ready** (director, `look-judge-2.md`). I did not touch how day is drawn. `e-day` checked by eye against `dots-together-day.png`: the same.
- **Night is rebuilt** (the director's fixes 1 to 3). Not yet seen by the director or the owner. Stills: `concepts/stills/night-fix-1` to `-6`.
- **The settled controls are in the station** (fix 4). Drag-to-look and hold-to-walk are gone. Checked with real multi-touch events in desktop Chromium; never on a phone.
- Elements in the look: 1 pump, 2 slab and island, 3 canopy. The environment is next, then the sign.
- `concepts/05-left-on.md`'s looks half is still out of date. Not mine to rewrite until the concept question is answered.

## A. Night: what it is now, and why

The fault was light, not drawing: a bare point lamp reaching 14 m made the whole forecourt and wall "fully lit", and full light mapped to a light screen.

1. **The canopy lamp is the lamp in `lights.md`.** A three.js spot light pointing straight down from the bulb: half-angle 64 degrees, soft over the outer 45 % of the cone, falls off with the square of distance, cut at 11 m, strength 55. On the ground it is a pool about 3 m across at full strength, gone by about 7 m: under the canopy and about 2 m past its edge. It climbs the wall behind the pumps about a metre and fades. The canopy's own underside and fascia get none of it (they are above the bulb). One shadow map (1024), not six: cheaper than the point light was.
2. **Beyond the pool, only the moon.** Moonlit open ground is a little over half way to dark. The moon's shade (the wall under the canopy, behind things) is the darkest tone on the lot. The canopy's shadow on the wall is a shape with a diagonal edge, as by day.
3. **Tone at night is one curve from real light**: `nDark(l) = (1 − l / 0.8)^2.2`, 0 in the pool, about 0.6 for moonlit ground, 1 with no light. `nMap` turns it into the screen's tone (dark dots: 0.05 to 0.9) or into how much paper (light dots: 0.55 down to 0.03).
4. **Things at night (dark dots)** keep their own loose dots and take a veil of the screen over them, `0.75 × nDark^0.7`: a step lighter than the ground they stand on, so they stand clear without the paper halo. The halo is off at night (the director: it read as a sticker). The canopy's underside with no light is solid black.
5. **Dark dots: the dark is a hand's stipple, not a ruled screen.** With the light fixed, the ruled halftone at 80 to 95 % ink showed rows of half-made dots across the whole ground, worse than before (the dots overlap, so the screen stops keeping its tone as it changes scale). I tried it against the looser screen that was already in the file: no rows at all. So "night, dark dots" now lays its dark as jittered dots, tone carried by how many, then by size (`NSTIP`). It also reads like the dense passages of his stippled flash sheet (`inspo/20`), and it makes the two nights differ in kind: **dark dots = a hand packing ink onto paper; light dots = a ruled screen of paper dots on black.**
   - To keep that stipple's tone even along the ground I changed how its dots are ordered: a dot's order is now spread evenly over its level (`.25 + .75 h`), and a dot comes in over a short stretch. This also changes `#stipple-…` by day (see the numbers: it is lighter and a little less steady over half a metre than before).
6. **Light dots** is unchanged in kind (halftone, inverted). It is mostly black now because the light is right. Looked along the ground its bands are faint; I left them (`night-fix-4b`).
7. **Lights that are off are out of the scene.** three.js was drawing shadow maps for the counter tube, the old lamp of yours and the canopy point light on every frame, and running all of them in every pixel. Now `visible = false` when off. No change to any picture.

Dials (query): `lampi` 55, `lampcone` 64, `lamppen` .45, `lampreach` 11, `moon` 1.25, `ntg` .9, `nt0` .05, `ntt` .75, `nlg` .03, `nl1` .55, `nlp` 1.9, `nlum` .8, `ngam` 2.2, `nstip=0` (dark dots as a ruled screen again), `halo`.

## B. The moon

- **13 degrees wide: 30 % of a phone's width** (was 7.5 degrees, a sixth). `lights.md` says about a quarter; he said exaggerated.
- **Two rows of even dots round it**, the outer finer. His stippled flash sheet rings its oval the same way. It is the glow, in his own reference's hand.
- **It is low: 24 degrees up, in the south-east.** The fixed night of each view is now the hour at which the moon, rising, stands 24 degrees high (about 9 pm in `together`, 7 pm in `pump` and `slab`; `stat().moonHour`). Reasons: a moon 40 to 70 degrees up cannot be in one phone frame with the ground it lights; low is when a moon looks huge; and its shadows are long. It is still on `lights.md`'s path, and still behind him and to his right on arrival. **For systems and the director:** when the clock is real the moon will climb, and at midnight in winter it is 76 degrees up. Either "always epic" means it is drawn low whatever the hour (a second knowing exception), or it is only epic early and late.
- **There is a horizon.** Moonlit ground pales with distance (the same stipple thinning dot by dot, from 12 m out to bare paper), and past the edge of the ground mesh the last pass paints paper below eye level. So: black sky, a razor horizon, a pale floor, stipple thickening toward your feet. The far shade stays dark and snaps to solid black shapes.
- The frame from the opening stand, turned round: `night-fix-3`.

**After the director's look ("Night is now night"; one fix; both solo calls accepted for this test):** the pale floor and the painted horizon are gone. Far ground at night ends in black in both nights: `nMap` takes the tone to black (or the paper to none) with `gFar` (5 m to 32 m), dark dots adds a solid fill over the last stretch, and the last pass makes everything past 240 m black. Everything in this section about a pale floor and a horizon is superseded. Day frames and the viewer were compared pixel for pixel before and after: identical. "Always epic" does not mean always low: the low moon is this test's fixed hour, not a rule.

## C. The hairline

It was the edge of the ground mesh (360 m out), where the far ground was drawn as itself against the black sky. At night the last pass now makes everything past 240 m the pale floor, and paints sky pixels below eye level the same. `night-fix-5` (pump) and `-6` (slab, light dots): no line in the sky.

## D. The controls in the station

A port of `sketches/controls-test/index.html`, same functions and names (`under`, `march`, `startPinch`, `pinchTo`, `trackTo`, `liftPinch`, `coastPinch`, `startSwipe`, `swipeTo`, `endSwipe`, `tap`, `cross`, `onTouch`, `onTilt`), in one block starting at "moving and looking: THE SETTLED CONTROLS".

- **The numbers he tunes are one object, `CTL`,** at the top of that block: the curve (300 to 1,500 px a second, ×1.8), the carry-on (halves every 0.10 s; at most 50 degrees, 80 px, ×1.33), tracking ×1.5, pinch power 1.5, swipe 90 and 60 degrees, lag 60 ms. They are `controls.md`'s block as eased after `owner.md` 43.
- Fingers from `e.touches` on every touch event; pointer events only for mouse and pen; Safari's gesture events prevented and used as a second way in.
- The viewer (`#view-…`) keeps its own controls, untouched.
- Foot words: `swipe to look · pinch to move · tap to go` (touch), `drag to look · scroll to move · click to go` (mouse), and after the first key `arrows turn and walk · a d step sideways · enter at the door`. Each dims when done. `tilt` beside them on a phone. The foot now has a dark band behind it: the words could not be read over the night ground.
- `#debug` (in the hash, e.g. `#together-night-debug`) shows the readout from the test page, plus ms a frame.

**What the station needed that the test page did not** (my calls, following `controls.md`):
- **The anchor is the real drawing:** a ray into the visible meshes. Anything under 0.3 m (slab, kerb, bell hose) or over 2.6 m (the canopy) counts as ground: you can stand there, there is no 0.9 m stop. So the island kerb never stops a pinch.
- **Only what is in the view is solid:** pumps and canopy posts (and the building in `together`). Before, the hidden sign pole, air post, phone box and bench were invisible obstacles in `together`.
- **The door** is the hole in the wall: a ray through it is "the door". Two beats, the stroke, back and Escape as on the test page. In the owner's views the room behind it is an empty shell (the inside is not drawn).
- **Tracking stops at walls and things and never slides** (`controls.md`; the test page slid).
- **The edge rule** (20 px left and right, 40 px at the foot) is in, which the test page left out.
- **Not built:** Tab, standing spots and facings, "use" (nothing in these views can be used), the door off the latch at midday, the aisle's back door.
- Removed: "stop, and the view levels". The view stays where he leaves it.

**Checked** (`sketches/place/controls-check.js`; method and results in `look-notes.md`): one finger both axes and both ways, a hold, pinch out on a pump, the stop, pinch in, a lopsided pinch, two fingers both ways, two fingers down, tracking into a pump, taps on ground, pump and sky, the door's two beats by pinch, by tap and by a held key, back, Escape, a pinch whose second start never arrives, the edge rule, arrows, W, D, the wheel, a canopy post, the world's edge. No page errors.

## Numbers (rerun this turn)

`walk4.js`, emulated iPhone 14, canvas 1170 × 1992, the three together by day. Mean change in ink, then share of points flipped.

| Where, and the move | Halftone (the link) | Stipple | Sheet 2's lines |
|---|---|---|---|
| Slab, 1.6 m: one frame forward (7 cm) | 0.035, 0.5 % | 0.026, 0 % | 0.028, 2.0 % |
| Slab, 1.6 m: one frame sideways | 0.008, 0 % | 0.008, 0 % | 0.008, 0.3 % |
| Slab, 1.6 m: half a metre forward | 0.178, 10.4 % | 0.134, 5.7 % | 0.208, 20.7 % |
| Slab, 3.2 m: one frame forward | 0.034, 0.4 % | 0.024, 0 % | 0.011, 0 % |
| Slab, 3.2 m: half a metre forward | 0.153, 8.3 % | 0.110, 4.1 % | 0.146, 12.8 % |
| Wall, 3.2 m: one frame forward | 0.015, 0 % | 0.019, 0 % | 0.008, 0 % |
| Wall, 3.2 m: half a metre forward | 0.117, 0.1 % | 0.091, 3.2 % | 0.041, 0 % |
| Ink in the patch (slab, wall) | 55 %, 63 % | 32 %, 27 % | 24 % |

- The halftone's numbers are a little worse than the pre-fix ones my predecessor quoted (8.4 % → 10.4 % over half a metre at 1.6 m) and its patch is much darker (40 % → 55 %): those were taken before the gap went to 2.5. These are the true ones for the link.
- The stipple by day is lighter and flips more than before (2.4 % → 5.7 %): my change to its ordering. If stipple is ever chosen for day shade, retune it first.
- **Night ground** (`walk5.js`, new; moonlit open slab): dark dots 0.042 and 0.5 % a frame, **0.203 and 16.6 % over half a metre at 1.6 m** (11.9 % at 3.2 m); light dots 0.017 and 0 %, 0.104 and 0.5 %. The dark stipple re-dots as you close in: worse than day's shade. It is the price of losing the rows. If it swims on his phone, the fix is to hold the stipple's dots at one scale for longer (bigger steps between levels) or to give dark dots the ruled screen back with the paper-hole trick (white dots on black above half tone).
- **Seconds a frame here, alone**: day 13.3, lines 10.5, night dark dots 13.9, night light dots 15.0. Night was about twice day; now about a tenth more.
- **Frame rate is still not measured.** No GPU here.

## How it is built: what changed in `sketches/place/index.html`

- `NSTIP`, `STIP`; `scr`/`scrB` take the night stipple's values. In `screenDots`: `ord` and `gr` for the hand's screen; `thP` (far ground thins by count, no grey fade); at night `thin` runs from 16 to 56 (26 m to 90 m).
- `nDark`, `nMap(l, vis)`, `moonVis`; `gFar`; uniforms `nightB` (`nt0`, `nl1`, `nlum`, `ngam`), `nightC` (`nlp`, `nfar`, `nfar0`, `nfar1`).
- Night block in `main`: `m3` is what three.js itself added for the moon (things get 0.8 of it whichever way they face) and is taken off exactly; `mT` is the moon's real share (things: 0.45, as open ground). Getting these two apart was the bug that left the ceiling speckled.
- `canLamp` is a `SpotLight`. `MHOUR`. The moon's canvas (1024, disc 80 % of it, rings).
- Last pass: `farG`; `lost` is off at night.
- Controls: above. `window.state()`, `window.put(x, n, head, pitch)`, `window.under(x, y)` for scripts. `window.shot` and the rest unchanged.
- Page: viewport without `user-scalable=no`; `#dbg`, `#stroke`, `#tiltwrap`.

Things that cost time: a render at true density takes 15 to 50 s here and two at once time out; I ran `walk4.js` on a frozen copy of the folder so I could keep editing. In-page timed touch events are stretched by slow frames, so only the swipe's curve could be shown here.

## How ready the code is for "a thing's light side follows the light"

The director has ruled it (real light wins; matter fixed, light real) and wants it with the environment. It is close to a switch:

1. A thing's form tone `tf` is one line in `main`, worked from a fixed direction `vec3(-.8, .5, .35)`. Put `sunD` there (it is already the sun by day and the moon at night) and the light side follows the far light.
2. For lamps: the line that makes three.js light a thing at 0.8 whichever way it faces (`dotNL = pick>.5&&isT>.5 ? .8 : …`) goes back to the real facing, and `m3`/`mT` in the night block lose their special case for things.
3. Rust, stains, pits and paper (`tx`, `rustK`, `stainK`, the grain) do not read the light at all. They stay.
4. The switch back already exists: the `own` uniform (`#team-lit-…` turns it off today).

What will need the eye: a pump's shadow side under a low sun or moon goes nearly black (the old `tf` was chosen to flatter it), and the veil at night was tuned against the fixed drawing.

## Known weak points

- **Under the lamp, dots are still cut** by its shadows and his (worked out per pixel, soft). The sun's and moon's are per dot. To fix: read the lamp's shadow map at each dot's centre, as `shGap` does for the far light (`canLamp.shadow.matrix` as a uniform).
- **A faint grey strip under the horizon** in light dots (`night-fix-6`), where the ruled screen fades out. Dark dots thins by count and has none.
- The dark stipple's tone still drifts a little along the ground (soft, no rows).
- Night sky is flat black, moon aside. The top third of the opening frame. Comes with the environment.
- The pale far floor is a blank band about 25 points high. It wants the horizon's mountains in front of it.
- Plates at night are still switched by view, not by light. Twins by day from the road. Lettering is set type.
- `#team` views: load without errors; not looked at.
- Moon: always full; brightness by eye.

## Not proven

- Anything on a real phone: frame rate, heat, whether the dark stipple shimmers as he moves (it is denser and looser than anything he has walked), and every control's feel. See `look-notes.md` for exactly what only his iPhone can say.
- The eased curve, in a hand.
- Tilt, on any phone.

## Open questions

Owner: the queue in `look-notes.md`.
Director: is the low moon right as a standing rule; is dark dots as a stipple and light dots as a ruled screen the right pair to put to him, or should both be the same kind of dot.
Systems: the moon's height against "always epic"; the lamp's reach as built (7 m to nothing) against "2 m beyond the canopy"; my station-only calls in the controls, above.

## Next

1. The director's look at `night-fix-1` to `-4`. Then the one question to him.
2. The environment, first turn: far ground, horizon, mountains, sky by day and night with stars, the road. Real light on things goes in with it.
3. Per-dot lamp shadows.
4. The station front, scrub, boulders, poles. Then the sign.
