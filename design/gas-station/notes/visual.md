# Notes — product designer (visual)

Last updated: after the director's check of Sheet 2 and its six fixes (fourth visual designer). The owner has not seen Sheet 2. Nothing is committed by me.

## Latest: Sheet 2 after the director's fixes (read this first; it overrides anything below that disagrees)

The director (`concepts/sheet-2-judge.md`) judged the pump settled and the rule "dots for the thing, lines for the light" a fair reading of his "no", then asked for six fixes and four stills, no full re-judge. All six are done; the list with evidence is at the top of `concepts/sheet-2.md`. In short:

- **A thing stays in dots in every light.** At night the dark on a thing is its own dots packing to black (in the shader, for things at night: `tl=0`, `tO=max(tO,tone)`; `tl` is the tone the lines are drawn from). Day veil 0.16, your shadow on a thing 0.34. `s2-fix-1.png`, `s2-fix-2.png`.
- **The herringbone was the island's kerb face** hatched at the wall's angle. Its shade is now dots. The cross family is at .33 rad with a wider gap. `s2-fix-3.png`.
- **Your shadow** is read along the mark at six points, so its lines end raggedly; lighter. `s2-fix-4.png`. Better, not solved: still parallel upright lines. Shade lines in general are still even and ruled; making them swell and taper like a hand's is the open drawing job.
- **The link opens on `together` by day whatever the clock** (non-team routes default to day), from the road square on: stand x -6.8, n 2.4, looking north. Foot: together · pump · slab.
- **Sheet 2 is now 1170 x 6642**, sections numbered 1 to 5, nothing lettered, the light question in words. Off the sheet: fascia, post, joints, stains, bell line, distance strip.
- White hairline and night specks fixed (`scene.background` green channel .5; wear no longer bites solid black).
- My claim that a pump sinks when shade is dots was overstated: the pump holds; the shade reads as dirt.
- The director's count: about two thirds of the day frame's ink is line. He picked dots. "Plainly" tells him.

Stills now: `sheet-2-island-canopy.png`, `s2-together-day.png`, `s2-together-night.png`, `s2-fix-1.png` to `-4.png`; the director's `s2j-*`. The earlier `s2-pump-*`, `s2-slab-your-shadow`, `s2-together-night-far` are deleted. `sheet2-shots.js` now lists only what the sheet uses plus `f-1` to `f-4`.

The director's picks (for the orchestrator, not to be told to the owner first): same pump twice, mirrored; lines for the light; a pump in shade shaded but barely; the middle lamp; open square on from the road. Their guess at his answer: yes to the pumps, yes to lines with a remark that they look mechanical or the ground is plain, and a wish for more black by day. Their placing: lone pump 8.5, together by day 7, night under the lamp 8.

Not asked for now, all real: finer dots at distance, a less plain slab, heavier contour on the canopy, drawn lettering, the desert.

Below, anything that says the link opens on the pump, veil 0.4 or 0.8, "turned to face each other", or names a deleted still is out of date.

## Where things stand

- One concept: **Left on** (`concepts/05-left-on.md`). Its looks half still describes the round-3 look and has not been rewritten. Rewrite it once the owner has agreed how light is drawn (Sheet 2, section D).
- The look is being settled element by element, as flash sheets, in the order in `elements.md`. Done: 1 pump (Sheet 1, then his picks), 2 slab and island, 3 canopy (Sheet 2). Next: 4 station front. **5, the sign, is not to be drawn until his photos arrive.**
- **His picks (`owner.md` 18):** the short flat-topped pump; the dot hand; "no" to "does the light redraw it?" (read as drawn once; reading not confirmed by him); a scanned paper on each part with real grey; brand names his to supply, mock for now.
- The link now opens on the lone pump in those picks. Other hands, the tall pump and "lit by the hour" are behind `#team`.

## Delivered this turn

- `concepts/stills/sheet-2-island-canopy.png` (1170 x 7993) and `concepts/sheet-2.md` (what is on it, the stipple test with numbers, what "drawn once" became, how it was made, what transfers, what each frame proves, questions).
- Walked stills at true density: `concepts/stills/s2-together-day.png`, `s2-together-night.png`, `s2-together-night-far.png`, `s2-pump-day.png`, `s2-pump-night.png`, `s2-slab-your-shadow.png`.
- `sketches/place/index.html`: new stipple; dots-for-things and lines-for-light; hose and nozzle; two short pumps; slab, island, bell line, scrub; canopy with fascia, posts, three lamps; views `#pump`, `#slab`, `#together`.
- `sketches/place/walk3.js` (the crawl measurement), `sheet2-shots.js`, `sheet2.py`, `paper/rubber.png` (and its line in `papers.js`).
- `elements.md`: drawing-needs slots for 1, 2 and 3 filled. Slots 4 to 16 are empty. Another designer edits the rest of that file and it changed under me once; check the slots survive.
- Deleted as superseded: every `concepts/stills/look-*` (the Sheet 1 walked frames in three hands, the before pictures, and `look-test.png` with the clock pump). `sheet-1.md` and `look-test.md` still name those files; they are gone on purpose.

## The rule the look now runs on

1. **Dots belong to the thing.** Its form shading, rust, stains, pits. Put down once; they never change with the hour.
2. **Lines belong to the light.** Cast shade by day and the dark at night, laid along the sun or outward from a fixed lamp. A shadow ends where its lines stop. Deeper dark crosses, then goes black.
3. **Ground and walls are where the light writes.** They have no shading of their own. They carry what they are made of and take shade in full.
4. **A thing in shade** keeps its dots and takes a thin veil of lines (`veil`, 0.4 of the ground's). Your shadow on a thing is a stronger veil (`veilyou`, 0.8).
5. **The canopy takes no shade** (it makes it); its underside is dark by its own drawing.
6. **At night** a lamp does not re-shade a thing; it shows the same drawing whichever way the face is turned. Dark is how far light reaches, nothing else.
7. Flat paint (lettering, globe faces, the working bulb) is always paper-white with ink on it.

Why: he said "no" to light redrawing a thing, on a lone pump. Ground has nothing to keep, and Left on is light. If "drawn once" covered the ground the concept would have nothing to show (Sheet 2, D3 renders that). This split keeps both. It also fixed the old together-view failure: a shaded pump no longer sinks into the shade behind it, because the pump is dots with a light veil and the wall is full lines. **Not confirmed by him.** The alternative, shade as more dots (`shadedots=1`), is D2 on the sheet.

Dots as a signal (steer 4, tension D): dots mean matter. Bulbs are white discs. Alien marks stay dashed rings.

## The stipple test (full table in `sheet-2.md`)

- The old stipple cross-faded two sets of dots, so every dot was replaced over each halving of distance. That was the crawl.
- Now: a dot has a place and a rank for good; three nested levels; only the finest level fades as you back away; a dot grows in as tone passes its rank; dots are round on the screen (the inverse of the surface's screen derivative); the pump cabinet's uv is true arc length.
- Measured by `walk3.js` on an emulated iPhone 14: at 1.6 m, one frame of walking changes 0.012 of the ink (old 0.024, cut hand 0.025); half a metre changes 0.053 with 2.3 % of points flipped (old 0.104 and 6.8 %, cut 0.125 and 10.6 %). From 6.5 m out all three sit at about 0.02 per frame with nothing flipped; that is mostly the same dot landing on different pixels and I can't separate it from real shimmer in stills.
- At 3 m dots read as dots. At 6 m they clump. At 13 m speckle; the outline carries the pump.
- `walk3.js` takes about 12 minutes here (ray casting on the CPU). "Stipple as on Sheet 1" in it is the old cross-fade (`oldstip=1&nopick=1`) inside today's file, a stand-in for the old build.

## Routes

Plain names after `#`, joined by dashes.

- Owner's views: `pump` (default), `slab`, `together`, each with `-day` or `-night` (no hour: the visitor's clock picks). Foot links offer exactly these.
- Each view has its own day hour: pump and slab at 10:30 in winter (long shadows, your shadow ahead of you on the slab); together at 13:30 in summer, because that is when the canopy's shade covers the pumps. In winter mid-morning the shade falls on the wall and the pumps stand in sun.
- `#team`: everything, old arrival. `#team-pump`, `#team-lot`, `#team-wall`, `#team-ground`; hands `brush` `cut` `dot`; `tall`; `lit`; `dusk`. Example: `#team-pump-brush-night`. Foot links there offer hands and toggles as before.
- Query, for scripts: `view=pump|slab|together` (owner's view, not team), `day=1`, `night=1`, `hour`, `decl`, `x n h head pitch fov`, `hide=pumps,canopy,shell,slab`, `one`, `body=0`. Tuning: `stg` (dot gap in points, 3), `std` (density, 2.2), `str` (dot radius, .32), `veil`, `veilyou`, `dayk` (how dark day shade is, .72), `shadedots`, `oldstip`, `nopick`, `und` (underside tone), plus the older ones (`gap`, `len`, `wear`, `msaa`, `dpr`, `res`, `grey`, `line`, `dbg`).
- `study=` still works and implies team.

## How it is built (`sketches/place/index.html`)

Two passes as before. What is new, all inside `inkMat`'s shader unless said:

- `PICK` (dot hand and drawn once) switches the rule above on. `LK`, `LK2`, `LK3` hold the light's line numbers for the picks: gap 4.6 points, second family from tone .62, black from .93, thin (.1 to .27 of the gap).
- `tone` is now the light's tone only (lines, then black). `tO` is the thing's own tone (dots). For a thing by day `tone` is just the veil; at night it comes from the lamps.
- `spots()` is the new hierarchy; `spots0()` is the old one, kept for the measurement. `stipple(t)` is one layer plus a finer second layer above tone .45.
- `gM` is a point's place in its own material and never turns with the light (world x,z on flat surfaces; the old `gP` elsewhere). Dots, grain, wear and rust use `gM`. Lines use `gP`, which runs along the sun.
- `structSh()` works out the canopy's and the building's shade for things from two rectangles (`cRect`, `bRect`, `cbTop`), so a thing is never shaded by itself and the veil has a clean edge. Ground and walls still use the sun's shadow map.
- Things do not receive shadows (`receiveShadow` off) and take lamp light without the facing term (`dotNL` replaced by uniform). **One compiled program serves every `inkMat`**, because three caches by the text of `onBeforeCompile`: anything per-material must be a uniform, not a text change. That cost me a wrong night.
- `thing: 1` drawn once; `thing: 2` drawn once and takes no shade (canopy parts). `bare: 1` no marks of its own (the wall in the owner's views). `slab`, `kerb`, `stain`, `flat` options. Kinds added: `fascia`, `rubber`.
- Concrete (`mk==2`): pits; on the slab, joints every 3.2 m by 4 m, cracks as the borders of big uneven cells (`crk`), a ragged discarded edge with a broken edge line, stains as closer dots (heavier south of the island), sand against kerb and wall. On the island, a kerb line set in 11 cm.
- Papers: `KIND` now carries how strongly a paper's grain shows as grey and how much darker than the sheet it is. The grey is applied in the last pass for anything flagged .2 (slab) or .25 (things, walls); open dirt and road stay bare.
- Layers: `layer(name)` tags scene children by section (`road`, `shell`, `detail`, `canopy`, `slab`, `pumps`, `rest`); a view shows only its layers. Lights are never hidden by this.
- **A bug that was there all along:** the sun's shadow camera was resized without `updateProjectionMatrix()`, so its frustum stayed at three's default 5 m. Small things outside that window cast nothing. Fixed. Any earlier still of the whole lot had shadows only near the middle.
- Geometry: pump cabinet uv by arc length (`supG`), `perim()`; hose, fitting, grip, spout, trigger guard and boot as tubes and boxes; `pump(name, x, tall, brand, grade, side, cracked)`.
- Removed as not on the list: post feet and heads, the building's eave (hidden outside team). Hidden in the owner's views: oil rack, bucket and squeegee, garage door paint, stripes, door card, everything indoors.

## How a sheet is made

`SHOTS=./sheet2-shots.js node look.js [prefix]` captures into `out/` (a shot may name its own device; wide things use `iPhone 14 landscape`). `python3 sheet2.py` (numpy, PIL) cuts, lays on by multiplying, generates the aged sheet, sets captions, quantises to 20 colours. Then save the walked frames you want into `concepts/stills/` (12 greys) and **delete `out/`**: it is tens of MB and someone commits it if it is left. All captures here took 5 to 8 minutes.

## Decisions I made, and why

- Dots for things, lines for light: above. The main thing for the director to judge.
- Two pumps the same, facing each other: his Route 66 photo shows one model in two grades. Marked as a question on the sheet.
- LLANO kept as the stand-in; he supplies names.
- Dots round on the screen, not on the surface: a pen makes round dots, and stretched ovals read as a rendered texture.
- The together view is shown in summer early afternoon so the pumps really are in shade; otherwise the frame would dodge the test.
- The wall is an outline that takes shade. Hiding the building would have left the canopy floating and the shade with nothing to fall on.
- Fascia stripes and rust as packed dots, not solid black: solid flakes looked torn and posterized.
- Shade lines thinned twice after looking at actual pixels; they were louder than the things in them.

## Known weak points

- Slab is plain in open sun; joints are rules; sand barely reads; cracks are generated, not placed.
- Shade lines are still the loudest marks in the day frame.
- Fascia stripes now hardly read as stripes. Posts are round and plain; his abandoned-station photo has square ones, one with a painted band.
- Lamps are small and plain.
- Lone pump at night outside your cone: solid black cabinet with white plates floating.
- The veil is hard to tell from no veil at phone size.
- Lettering is set type. Tall pump still a stretched short one.
- The world's own sheet is flat cream; the aged paper exists only in the sheet scripts.
- Dusk, room, aisle, road, horizon, scrub, sign: untouched in the picks. `#team` views run but nobody has looked at them since the shader changed; `walk2.js`, `walk.js`, `shots.js`, `sheets.js`, `render.js`, `review.js`, `look-shots.js` are older scripts and may not match.

## Not proven

- Anything in motion. Anything on a real phone: frame rate at 3 dots per point (the stipple now reads twelve or more dot places per pixel, up from six), heat, the press-and-hold callout, sharpness.
- Whether 2 % per-frame change reads as still.
- A pump in shade against a detailed shaded wall (the wall is blank for now).
- Your own lamp on the group; the four-minute lamp event; your shadow on a thing up close.
- Whether he meant shadows to fall on things at all.

## Open questions

Owner (plain words; never by picture number): two pumps the same or one of each; is shade and night in lines right, or should shade be more dots; should a pump in the canopy's shade look shaded at all; do the dots hold still on his phone; which canopy lamp works; still unanswered from before: is this what he meant by flash sheet vibes, and the phone check.
Director: is dots-for-things, lines-for-light a fair reading of "no", or "lit by the hour" for the ground under another name; is the sheet too long.
Orchestrator: the private-link copy needs `index.html`, `strokes.js` and the whole `paper/` folder (eight PNGs now, `rubber.png` is new) beside the shared three.js. Folder is about 23 MB.

## Next

1. The director's read of Sheet 2, then the owner's.
2. Element 4, the station front, as Sheet 3: stucco over brick, door with card, two lettered windows, garage door, two stripes, boarded side window. It is the real test of a pump in shade against a drawn wall.
3. Make the slab less plain: placed cracks near the island, a real sand drift, joints with weight.
4. Put the aged sheet into the walked world, if he wants one paper under everything as well as a paper per part.
5. Draw the lettering.
6. Rewrite the looks half of `05-left-on.md` once section D is answered.
