# Notes — product designer (visual)

Last updated: after "shade in dots" (fifth visual designer). Nothing is committed by me. The owner has not seen any of this turn's work.

Read first: `owner.md` 18 to 38 (they changed the job several times during this turn), `concepts/steer-5.md`, `lights.md`, `concepts/look-notes.md` (the short version of this file, with the hashes and the one question).

## Where things stand

- **There are no sheets any more** (`owner.md` 37). He judges the walked prototype, `sketches/place/index.html`, on his iPhone in Safari, and is asked one question at a time in chat. Do not make a Sheet 3 or 4. Sheets 1 and 2 and their stills stay as records.
- **One hand: dots.** "Dots for the thing, lines for the light" is dead (`owner.md` 22). Shade, his shadow and night are dots. He offered "a sort of halftone" (23) and that is what solved it.
- **The light is real** (30, 31): scene lights from `lights.md`. Nothing follows where he looks (26, 28; the director's ruling in `steer-5.md`). There is a moon (32).
- **Two pumps: the same model, worn separately** (23). Settled; not a question.
- Elements in the new look: 1 pump, 2 slab and island, 3 canopy. Their drawing-needs slots in `elements.md` are updated. Nothing else is redrawn; the environment (road, desert, horizon, sky, front) is next, then the sign (his photos have arrived: `inspo/23` to `25`).
- New controls (`concepts/controls.md`: swipe turns, pinch moves, tap, tilt) are **not** in the prototype. The old drag-to-look, hold-to-walk still is.
- `concepts/05-left-on.md`'s looks half is still out of date (round 3 look, and the lamp). Not mine to rewrite until the concept question is answered.

## How shade in dots was made to read (the idea)

The director's finding on Sheet 2 was: with dots for shade "the pumps hold, but the shade reads as dirt". The cause was that shade used the same dots as matter: loose, of every size, clumped. Looking at his references:

- His stippled flash sheet (`inspo/20`): tone is very fine, even dots; a shape has an edge because the dots stop at it; the oval is ringed by a row of even dots.
- His brush-pen flash sheet (`inspo/22`) and the Kirby pages (`16` to `18`): printed dot screens for tone; solid black with round dots at its edge; a thin line of bare paper round a figure against a dark ground.
- The woodcut sheet (`19`): shadow hugs the foot of what casts it.

So:

1. **Two kinds of dot.** Matter is loose dots of every size (unchanged: `spots()` and `stipple()`). Light is a **screen**: one size, even spacing, in rows at an angle (`screenDots()`). Regular means laid on purpose; random means dirt.
2. **Each dot decides for itself.** A dot of the screen looks up the sun's (or moon's) shadow at its own centre. It is whole or absent, never cut. A shadow's edge is a row of whole dots, like the flash sheet.
3. **A rim.** Just inside a shadow's edge the screen is a step heavier (four more look-ups a dot, a dot's width out).
4. **Heavier near the caster.** The shadow map gives the distance to what stands in the light's way; shade under 15 cm from its caster is the heaviest, shade 3 m or more from it the lightest. The wall right under the canopy is dark; the forecourt shade is light; a pump's shadow is darkest at its foot.
5. **A paper edge** (the inker's halo). In the last pass, shade on ground or wall is wiped within about 2 points of anything standing nearer than it. A pump in shade never touches the shade behind it.
6. **A thing in shade is shaded** (he said real light): a light screen over its own dots (`veil` .22), lighter than the wall behind, heavier outline.
7. **His shadow** is the closest screen on the lot (`shyou` .86), from the same seven capsules as before, looked up per dot.
8. **The canopy's underside** is a screen (`under` .5) with its stains loose on top.

## Halftone or stipple: what I took and why

Both are in the file; the link uses the halftone.

| | Halftone screen (the link) | Hand's stipple (`stipple-` in the hash) |
|---|---|---|
| Places | A square grid, 1.9 points apart, turned 0.5 rad from the sun's direction on the ground, a tenth of a cell of wander | The same grid, each dot up to 0.6 of a cell off its place, not turned |
| Tone carried by | Dot size (every place filled) | How many places are filled, then size |
| Reads as | A printed comic's screen. Dark, firm, a clear shape | His stippled flash sheet. Lighter, softer, nearer the pump's own dots |
| Walking away | Every other dot shrinks together; the screen keeps its tone | Dots drop out one at a time |
| Risk | Bands on the ground at each halving of distance; mechanical if overused | Nearer to "dirt" at a distance; lighter shade |

Why halftone as the default: it is his suggestion, it is the one that cannot be read as dirt, and it gives the day picture the dark it lacked. Stipple is the first thing in the queue to put to him after night.

Only the light's tone is a screen. A thing's own form shading is still the loose stipple he picked on Sheet 1.

## Dots keeping their place (how, and the numbers)

How: the screen's places are fixed on the surface (`gP`, metres along the sun's direction on flat ground; along the wall on walls; `gM` on things). Spacing is by the phone's points, so there are nested grids, each twice the last. A dot at a place that is also on the coarser grid stays for good; the in-between dots shrink out as you back away (`lv 0` in the loop) and the rest never move. A dot's wander, size and order are hashed from its place reduced to its own coarsest grid, so they are the same at every distance. The same ordering thins the stipple when tone gets lighter, so tone and distance thin it the same way.

On ground seen at a slant the cells keep their screen area (up to 9 to 1) and a dot is an oval, as a dot printed on the floor would be, up to 2 to 1 (`soval`); past that it is clipped and the tone lightens; past about 20 to 1 the tone snaps to paper or black (`thin`).

`walk4.js` (new): an emulated iPhone 14 at true density, the three together by day. A 60 cm patch of slab in the canopy's shade and a patch of shaded wall, a point every centimetre, read at the same world points before and after a move.

WALK4_TABLE

For scale, `walk3.js` last turn: the pump's own dots at 1.6 m change 0.012 a frame, 0.053 and 2.3 % over half a metre.

Reading: frame to frame the screen is as still as anything else in the picture. Over half a metre close up on the ground it is not: dots are sized by the screen, so their footprint on the ground shrinks as you close in and the ovals change shape, and that is 7 to 8 % of points flipping. On the wall nothing flips. Whether that reads as shimmer on a phone is not known.

**Frame rate is not measured.** No GPU here; the software renderer takes 12 s a frame by day and 21 s at night for this view (`window.bench`, which now reads a pixel back so the frame is really drawn). Only the ratio means anything. Cost per pixel: lit ground reads the shadow map about 8 times; shaded ground up to 8 dots times 5 reads; lines read it 32 times; night adds the point lamp's shadow. The post pass has 8 more depth reads on shaded ground for the paper edge.

## The lights that are built (against `lights.md`)

| Light | Built as | Where the list is not met |
|---|---|---|
| Sun | The one directional light, 2048 shadow map fixed to the lot. Per-dot shadows on ground and walls; analytic roofs for things (`structSh`); his shadow from capsules (`youD`) | Each view still has its own fixed hour and season (pump and slab 10:30 midwinter, together 13:30 summer). Not his clock |
| Sky's light | Hemisphere light, .75 | — |
| Moon | The same directional light at night, weak (`moon` 1.5), pointing from the antisolar point: a full moon. A link that asks for night at a day hour gets 11 pm. Everything the sun does, it does: per-dot shadows, his shadow | Full only; no phase (the list leans to the real phase). In midsummer it is low (32 degrees), not "high". Brightness by eye. Indoors patches not built |
| The moon in the sky | A disc 7.5 degrees wide, paper with seas in a screen of dots, in the group that travels with you | Not seen as the link opens (it is behind you; the list wants that) |
| Canopy lamp, middle | three's point light at the bulb, 14 m reach, decay 1.5, its own shadow map; his shadow from it worked out (`youD` toward the lamp). On only in `together` | A bare point: lights upward too, and reaches much further than "2 m beyond the canopy". Should be a cone. Its shadows are per pixel, so they cut dots |
| Pump globes | West lit (its face is paper-white all night), east dead (dark with pale lettering). A glow: lights nothing else | — |
| Not built | Neon name, arrow bulbs, the board, lamp post, aisle and payphone lamps, everything you switch on, twilight, sun through the door, stars (old ones exist behind `#team`) | |

Limits to tell the systems designer: only the one far-off light gets per-dot shadows. Every lamp that throws real shadows costs six more shadow passes in three.js; a phone will take two or three, not ten. Expect: nearest two lamps throw shadows, the rest light without them. And one compiled program serves every `inkMat`, so lights that come and go must be uniforms.

A thing's own form shading does not follow any light (his "no" on Sheet 1). Real light now only adds shade and night on top. That conflict is in the queue.

## Night

- No lamp of his. `you` and `feet` spot lights are off in the link (they survive behind `#team-lines-...`).
- Light at a point = what three works out for the lamps, plus the moon where nothing is in its way (per dot on ground and walls).
- **Dark dots** (default): light to tone to the screen. Full light is a light screen (.16), no light is a close one (`ntg` .8), never solid. Things: their own dots pack closer in the dark (`ntt`).
- **Light dots** (`reversed`): everything drawn so far becomes paper and the rest is black. Ground: paper dots, most where the light is, a thin scatter (`nlg` .1) where there is none. Things: their loose dots in paper, most on their light side. Contours come out as broken paper lines (the old "line of paper in black").
- Sky: flat black with the moon. Not solved; it is the top third of every night frame.
- Plates: see "weak points".

## Routes

- Owner's: `#together` (default), `#pump`, `#slab`; `-day`, `-night`, `-night-reversed`. Foot links: `together · pump · slab` / `day · night, dark dots · night, light dots`. Non-team routes open by day whatever the clock.
- `stipple` anywhere in the hash: the looser screen. Kept through the foot links.
- `#team-lines-together`, `#team-lines-pump-night` ...: Sheet 2's look in the owner's views (lines, the old lamp-lit night). `lines` turns `team` back into an owner's view. For comparison only.
- `#view-pump`, `#view-slab`, `#view-canopy` (+ `-night`, `-night-reversed`): the object viewer.
- `#team`, `#team-lot`, `#team-wall`, `#team-ground`, hands `brush` `cut` `dot`, `tall`, `lit`, `dusk`: as before, unmaintained. Shade there is dots now too.
- Query, for scripts: `view=`, `obj=`, `day=1`, `night=1`, `reversed=1`, `screen=stipple`, `shade=lines`, `hour`, `decl`, `x n h head pitch fov`, `hide=`, `body=0`, `az el r`. Tuning: `sgap` 1.9 (screen gap, points), `sjit`, `sang`, `srho`, `srhomax`, `st1`, `soval`, `shnear` .62, `shfar` .4, `shrim` .74, `shyou` .86, `veil`, `veilyou`, `under`, `halo` 2.1, `ntg`, `ntt`, `nlg`, `nlt`, `moon`, `mhour`, `moonsize`, and the old ones.
- `window.stat()` reports shade, night kind and viewer.

## How it is built (`sketches/place/index.html`)

Two passes as before (ink per pixel into a target, then contour and paper). New this turn:

- `DOTS` (the picks and not `lines`), `NN` (0 old night, 1 dark dots, 2 light dots), `TONE`, `VIEWER`, `CANLIT`.
- In the `SHADOW` string, after three's shadow chunk: `shGap()` (metres to what stands in the far light's way, read from `directionalShadowMap[0]` with `smat`), `capD`/`youD(p, toLight)`, `shadeAt()`, `nTone`/`nMap`, `screenDots()`. In dots, `getShadow` returns 1 for the far light, so three no longer darkens ground by the sun; the screen does.
- `where0()` also sets `gA`, `gB` (world directions of `gP`'s two axes) and `gFlat`, so a dot's centre can be turned back into a world point. Lamps no longer bend `gP` into rings in dots (a screen laid in rings round a lamp looked like ripples).
- Main: the `if(dotsU>.5)` block sets `scrT` (the screen's tone here), `tO` (the thing's own), `rev`, `tb`. After `stipple(tO)` comes `screenDots(...)`. Reversed night inverts at the very end.
- Alpha kinds out of the first pass: .18 ground and road, .2 slab, **.225 walls** (new: lets the paper edge tell a wall from a thing), .25 things, 1 paint.
- Post pass: `halo`.
- Per material: `seed` (shifts every pattern on it), `rust` is now an amount, `under`. `pump(..., wr)` takes the wear: `[seed, rust height, paint tone, stained]`. The pump's steel, base, rim, hose and nozzle materials are made per pump.
- `cv(w, h, draw, lit)`: paint. At night an unlit plate is inverted in its own shader. `lit === 2` means dead globe.
- `FARL` is the one far-off light there is (sun or moon); `sunD`, `sunA`, the shadow camera and `youOn` follow it.
- `far` (horizon group) has its own layer `sky` so the moon shows in the owner's views; the mesas in it show only behind `#team`.
- Object viewer: `ORB`, `orbit()`, touch and mouse handlers; the walking handlers are inside `if (!VIEWER) { ... }`. It renders on demand (`ask()`), never in a loop.
- `window.inkPts(pts)`, `window.bench(n)` (fixed), `window.turn(az, el, r)`.

Things that cost me time:
- A trailing `//` comment on a one-line statement swallowed the `layer('pumps')` call after it and the pumps vanished without an error. Lines here are long; put comments at the very end.
- `pkill -f "walk4.js ..."` kills the shell that typed it. I lost twenty minutes of numbers.
- `page.goto` times out at 30 s when two renders run at once. Run one thing at a time here; a still takes 25 to 60 s, `walk4.js` about 25 minutes.

## Scripts

- `look.js` with `SHOTS=./dots-shots.js` then `python3 dots-stills.py`: the evidence stills (`concepts/stills/dots-*.png`, 8 shades). **Delete `out/` afterwards** (git-ignored, tens of MB).
- `walk4.js`: the shade's stillness, three ways, and the frame time. Appends to `walk4.txt` (delete it; the numbers are in this file).
- `walk3.js`: the pump's own dots. Not rerun this turn (its stipple code is unchanged; in shade the pump now has the veil over it, which it does not measure).
- `sheet2.py`, `sheet2-shots.js`, `sheet1.py`: Sheet 1 and 2 records. Older scripts as before.

## Decisions I made, and why

- Halftone as the default for the light's tone: above.
- Per-dot shadow look-up: the single change that made shade a shape. A dot cut by an edge reads as a rendered texture; a whole dot reads as drawn.
- The paper edge, not a lighter pump: he said real light, so the pump is shaded. Separation has to come from the drawing.
- Ovals on the ground: round-on-screen dots merged into stripes on a slanted floor; holding them apart thinned the shade to nothing. A printed dot on the ground would be an oval.
- Night never solid on the ground: "never a black screen" is the drawing's job now.
- Moon opposite the sun: real, needs no phase logic, and puts it behind him on arrival as `lights.md` wants.
- West pump is the worn one with the lit globe: `lights.md` proposed west lit; the cracked globe was already west.
- No rings round lamps.
- Kept `s2-*` and `s2j-*` stills: they are Sheet 2's record and my "before".

## Known weak points

- Bands on the ground at each halving of distance (halftone). Could be softened by letting the in-between dots go over a shorter stretch, at the cost of popping.
- Far ground: the screen does not hold past about 15 m at eye height.
- Night sky. Lamp shadows cut dots. The lamp is a point.
- Plates at night are switched by view, not by light.
- The wall outside the shade carries a faint fine screen by day (it is lit at a slant). It may read as texture.
- The west pump in shade is close to too dark: loose dots plus the veil.
- The shade's edge on the wall steps along the screen's rows. I like it; he may not.
- Canopy alone in the viewer floats on two posts (it is joined to a building that isn't there).
- Slab in open sun is still plain; lettering is set type; the tall pump is a stretched short one; posts are round.
- `#team` views: untested since these changes.

## Not proven

- Anything in motion on a real phone: frame rate, heat, whether 3 % a frame reads as still, the bands as you walk.
- The viewer inside an iframe on iPhone Safari: page scroll on a vertical swipe, pinch, how many live frames a page may hold.
- The shadow map's reach: 48 m square for `slab` and `together`. The whole lot will need a bigger map or one that follows you.
- Whether he reads the halftone as "walking through an illustration" or as a filter.

## What I expect to break in the environment (50 to 200 m)

- **Screen on far ground**: gone past 15 to 20 m (above). Far shadows (the sign's, the building's, clouds') need to be solid black shapes with a dotted edge, or nothing. Decide per distance band: near, a screen; middle, solid with a screen fringe; far, lost.
- **Bands**: an open desert floor at night is one big screen seen along its length. The bands will be the first thing he sees. Either the far ground at night is solid with paper dots (the reversed way has no bands, its dots are sparse), or the screen fades to solid sooner.
- **Sky**: no surface to hang dots on. Needs a dome whose dots have places by direction. Clouds as paper shapes ringed in dots; night sky as a close screen or black with stars; dusk as the screen thickening from the top.
- **Mountains, mesas, distant brush**: now painted from the old stroke sheet. Redraw as silhouettes with a screen inside, sized by the screen (they are at fixed distance, so a texture works, like the moon).
- **Road**: blacktop is still "long dry strokes" (lines). Needs a dot answer: a close screen with the centre line as paper.
- **Scrub tufts and the fence**: brush strokes and black boxes. Redraw.
- **Shadow map**: one 2048 map over 96 m is 4.7 cm a texel; per-dot look-ups will show stair steps on thin things (poles, wires). Wires cast nothing useful; poles need analytic shadows like the roofs.
- **Poles repeating to the horizon**: the paper edge and contour passes are per pixel and fine; the cost is draw calls, use instances.
- **Cost**: the whole ground is the screen at night. Lit open ground by day costs 8 shadow reads a pixel over most of the frame; consider skipping the look-up where no caster is within reach (a coarse mask).

## Size of the next jobs, plainly

- **Environment**: road, desert floor, horizon and mountains, sky and clouds, boulders, far brush, utility poles and wires, and the station front (stucco over brick, door, two lettered windows, garage door, stripes, boarded window). That is seven or eight things, two of them (sky, far ground) needing new ways of drawing, not just new parts. About two turns of this size if it is to be one whole picture from the road; the station front alone is most of one. `elements.md` slots 4, 6, 7 are empty.
- **Controls**: the walking code is one block (`if (!VIEWER) { ... }` and the first lines of `step()`). `controls.md` says to take the code from `sketches/controls-test/`. A day's work, most of it on a real phone. The viewer already uses touch events.
- The file is 620 very long lines in one HTML. It is still a throwaway and reads like one. Before the environment, split the shader into its own file.

## Open questions

Owner (one at a time; the first is the one to ask now): see the queue in `concepts/look-notes.md`.
Director: is the halftone the look or a filter; is the paper edge too much of a device (it passes your test: it would be in the illustration if nobody could touch it); does "drawn once" survive "real light".
Systems: the limits on lamps above; `lights.md` says the canopy lamp spills 2 m, which needs a cone.
Orchestrator: the private-link copy and the site need `index.html`, `strokes.js`, all of `paper/` and the shared three.js, as before. No new files are loaded.

## Next

1. His answer on night; then stipple or halftone.
2. Controls from `controls.md`.
3. The environment, starting with the station front and the ground to the horizon, as one picture from the road by day and by night.
4. The canopy lamp as a cone; the lamp post; the sign once drawn.
5. Lettering drawn by hand; his brand names.
