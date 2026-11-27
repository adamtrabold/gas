# Sheet 2 — the slab, the island and the canopy (and the pump, settled)

Visual designer. After `owner.md` 18 (his picks: the short pump, dots, drawn once, a paper on each part, brand names his to supply), `elements.md` 1 to 3, `steer-4.md` and `sheet-1-judge.md`.

**The picture: `concepts/stills/sheet-2-island-canopy.png`** (1170 x 7993, made for a phone). The same things are walkable in `sketches/place/index.html`: `#pump`, `#slab`, `#together`, each with `-day` or `-night`.

Not yet seen by the director or the owner.

## What is on the sheet

- **A. The pump, as he picked it.** A1 the short pump in dots. A2 the hose and nozzle, drawn for the first time. A3 the two pumps on the island, with the question it raises. A4 the walked pump from 3, 6 and 13 m at a phone's actual pixels.
- **B. The slab and the island**, whole with the pumps lifted off, then six pieces tagged to the list: joints, cracks and scrub; island and kerb; bell line; old stains; broken edge; your shadow on it.
- **C. The canopy**, whole and joined to the building, then fascia, post, lamp, and the lamp at night. Worn and still-works lines for both elements, from the list.
- **D. What the light does now.** The question "drawn once" raises for ground and shade, shown three ways from one spot.
- **E. Together, walked.** Pump, island and canopy at the phone's own lens, by day and at night, and a piece of the day frame at actual pixels.
- **Plainly:** what is not good or not real.

Nothing is on any element that is not in `elements.md` 1 to 3. I removed three things my predecessor had built that are not on the list: the concrete feet and steel heads on the canopy posts, and the eave along the building front. The oil-can rack, the bucket and squeegee between the pumps are hidden in the owner's views (the rack is element 11; the bucket is on no list).

## A. The pump

### The stipple test

My predecessor expected stipple to crawl in motion and go soft at distance. It did crawl, for a reason that could be fixed.

**Why it crawled.** Dots are sized by the screen so they stay sharp. The old stipple kept two sets of dots and cross-faded between them as you moved: over every halving of your distance to the pump, every dot was replaced by a different one.

**What changed.**
1. Each dot now has a place on the thing and a rank, for good. Walking away, the finest dots shrink out and the rest stay exactly where they were. Walking in, new dots grow between the old ones. Nothing is swapped.
2. A dot is round on the screen whatever angle its surface is at (before, dots on a turning surface were stretched ovals).
3. A dot grows in as the tone passes its rank, so tone is dot size as well as dot count.
4. The pump's cabinet was mapped unevenly (dots stretched three times wider across the flat faces). Now mapped by true distance round the form.

**How it was measured** (`sketches/place/walk3.js`, emulated iPhone 14 at 3 dots per point). From a stand, a ray through every third pixel finds points on the pump's drawn steel. The ink at each point is read; you move; the ink at the same points of the pump is read again. "Change" is the mean difference in ink (0 none, 1 everything swapped). "Flipped" is the share of points that went from paper to ink or back.

| Distance, move | Picks now | Stipple as on Sheet 1 | Cut hand (hatching) |
|---|---|---|---|
| 1.6 m, one frame forward (7 cm) | change 0.012, flipped 0.0 % | 0.024, 0.7 % | 0.025, 1.0 % |
| 1.6 m, one frame sideways | 0.018, 0.7 % | 0.031, 1.4 % | 0.036, 2.1 % |
| 1.6 m, half a metre forward | 0.053, 2.3 % | 0.104, 6.8 % | 0.125, 10.6 % |
| 3.2 m, one frame forward | 0.015, 0.0 % | 0.017, 0.0 % | 0.013, 0.0 % |
| 3.2 m, half a metre forward | 0.039, 0.4 % | 0.055, 2.3 % | 0.045, 1.9 % |
| 6.5 m, one frame forward | 0.019, 0.0 % | 0.021, 0.0 % | 0.016, 0.0 % |
| 6.5 m, half a metre forward | 0.027, 0.0 % | 0.028, 0.1 % | 0.020, 0.1 % |
| 13 m, one frame forward | 0.021, 0.0 % | 0.024, 0.0 % | 0.020, 0.0 % |
| 13 m, half a metre forward | 0.031, 0.3 % | 0.034, 0.1 % | 0.031, 0.1 % |

Reading the same stand twice gives 0.000 in every case.

**What I take from it, honestly.**
- Close up, where it matters most, the new stipple changes half as much per step as the old and a third as much over half a metre. It is now steadier than hatching was.
- From 6 m out the three are the same, at about 2 % of ink per frame. That figure is mostly the same dot landing on different pixels, which any fixed drawing does. I cannot separate that from real crawl with stills. **Only a phone in the hand can say whether 2 % reads as still or as shimmer.**
- "Stipple as on Sheet 1" is the old cross-fade run inside today's file, not the exact Sheet 1 build. It is a fair stand-in, not a replay.
- **Soft at distance: yes, partly.** At 3 m the dots read as dots and the form turns. At 6 m they clump. At 13 m they are speckle and the outline carries the pump (A4). The lettering goes before the dots do.
- Frame rate is not measured. The new stipple reads twelve dot places per pixel where the old read six. On his phone that is unknown.

### Hose and nozzle

After his Route 66 photo: the hose leaves the side high up through a small fitting, hangs in one long loop nearly to the island, and comes back up to the nozzle, which hangs by its hooked spout in a boot on the side. Grip, thin trigger guard, spout. The rubber has its own paper (dark, crazed) and cracks across it for "perished".

### Two pumps

Not answered. **What I did:** the same short pump twice, turned to face each other with hoses inward, HI-TEST and REGULAR, one globe cracked. That is what his Route 66 photo shows (one model, two grades). A3 puts the question to him. The tall pump is still in the file behind `#team-pump-tall`.

### Brand

LLANO stays on the globe as a stand-in and the sheet says so twice. He is supplying the names.

## B and C. What "abandoned" is, per the list

| | Worn | Still works |
|---|---|---|
| Slab and island | Cracked; broken at the edges, giving way to dirt; scrub in the joints; sand against the kerb and the wall; old stains | The bell line rings. It takes every shadow |
| Canopy | Stripes faded almost to nothing; fascia peeling; posts rusted (PROPOSED); underside stained (PROPOSED); two lamps of three dead or gone (PROPOSED) | By day the biggest shade on the lot. By night one lamp lights it from below |

The four-minute event on the list (the lamp goes out, a disc of light crosses, the lamp comes back) is not drawn.

## D. What "drawn once" had to become

His answer to "does the light redraw it?" was "no", read as: a thing keeps its own shading at every hour; shadows and night are added on top. He picked that looking at one pump on bare ground.

Ground and walls have no shading of their own to keep. And the concept is light: where the sun is you are a shadow; where it isn't you are a lamp. My predecessor's warning stands: if "drawn once" covers the ground, there is nothing left for Left on to show. D3 on the sheet is that case, rendered.

**What I did (D1), and what the link opens on:**

- **Dots belong to the thing.** Its form, its rust, its stains, its pits. Put down once. They never change with the hour. The pump, the canopy, the posts, the lamps and the hose are things.
- **Lines belong to the light.** A cast shadow by day and the dark at night are drawn in lines laid along the sun, or outward from a lamp, over whatever is there. A shadow ends where its lines stop. Deeper dark crosses the lines, then goes black.
- **Ground and walls are where the light writes.** They carry what they are made of (joints, cracks, stains, in thin line and dots) and take shade in full.
- **A thing in shade** keeps all its dots and takes a thin veil of lines (four tenths of what the ground gets). So a pump under the canopy stays lighter than the shaded wall behind it. That is the fix for "hard to really make out objects".
- **The canopy takes no shade.** It makes it. Its underside is dark because it is an underside.
- **At night** everything is black until a lamp reaches it. A lamp does not shade a thing again: it shows the drawing that was always there, whichever way the face is turned. The globe faces and the working bulb are paper-white all night.

This also settles the director's worry about dots (steer 4, tension D): dots now mean matter. Bulbs are white discs, not dots. The alien marks stay dashed rings.

**The other way (D2):** one hand for everything, shade as more dots. It is purer flash. A pump in shade sinks into the shaded wall, which is the failure he named after round 2.

**What I am not sure of.** The veil on things is my reading of "shadows are added on top"; he may have meant shadows on the ground only. And your own shadow now climbs a pump as a veil rather than a solid shape. Both are his to say.

## How the sheet was made, and what that means

Every drawing is a frame of the three.js prototype from Playwright's iPhone 14 descriptor (3 dots per point; wide things with the same phone held sideways), cut out and laid on a generated sheet. `sketches/place/sheet2-shots.js` lists the frames; `SHOTS=./sheet2-shots.js node look.js` captures them into `out/`; `python3 sheet2.py` assembles the sheet. Nothing is drawn or retouched outside the prototype.

What the sheet adds that the walked world does not have:

1. **A long lens and a chosen side** in sections A to C (8 to 26 degrees against the phone's 68).
2. **The sheet's paper:** generated tone, mottling, foxing, darker edges, under everything. The walked world's sheet is flat cream.
3. **A ragged cut-out** round each piece, and captions in type.

What it no longer adds: its own light. Sheet 1 used a flattering light for the flash views. Now the thing's own shading is simply how it is drawn everywhere, so the flash views and the walked views are lit the same.

Frames are laid on by multiplying, so the real grey of each part's paper comes through onto the sheet.

## What transfers to the walked world

| | Transfers | How, or why not |
|---|---|---|
| Stipple for a thing's own tone | yes | It is the walked pump. Steadier than before; see the test |
| Lines for shade and night | yes | Laid along the sun or out from a lamp, on the surface |
| A paper on each part, real grey | yes | Steel, rubber, concrete, plaster papers; stand-ins in `paper/`, replaceable file for file |
| Each thing alone on old paper | no | The walked world has one ground and one sun. The aged sheet exists only in `sheet2.py` |
| Best side | no | He walks. The pump from its lit side is barer than on A1 (see A4) |
| Abandoned drawn in | partly | Rust, cracks, stains, sand, peeling, dead lamps: on the things. Dents, a sagging canopy, a leaning post: no |
| Slab detail | partly | Joints, cracks, edge, stains are on the ground and fixed. They are generated, so nobody chose where a crack runs |
| Drawn lettering | no | Still set type |

## Walked frames (`concepts/stills/`, iPhone 14 emulation, true density)

| Still | Proves | Doesn't |
|---|---|---|
| `s2-together-day.png` | Pump, island and canopy together at the phone's lens. Pumps in the canopy's shade stay readable against a shaded wall. Shade is lines; things are dots | Motion. The wall is an outline, so the hardest case (a detailed wall in shade behind a pump) is not tested |
| `s2-together-night.png` | The one lamp shows the pumps' own drawing; globes lit; black beyond | Your own lamp. The lamp's pool has a hard edge on the left |
| `s2-together-night-far.png` | From the road at night the forecourt is an island of light | Nothing else of the place is there |
| `s2-pump-day.png`, `s2-pump-night.png` | How the link opens. At night, your lamp's pool in crossed lines | |
| `s2-slab-your-shadow.png` | Your shadow on the slab in lines; pumps in open sun | The pumps' own shadows are thin from here |

## Not good yet

- The slab is quiet to the point of plain in open sun. Joints are ruled lines. Sand barely reads.
- Shade lines are still the loudest thing in the day frame. I thinned them twice; they may want to be finer again on a real phone.
- The canopy's fascia stripes are now so faded they hardly read as stripes.
- The canopy lamps are small plain fittings; from most stands only one or two show.
- Lone pump at night: outside your lamp's cone the cabinet is solid black with white lettering floating on it.
- The veil on a shaded pump is hard to tell from no veil at phone size.
- Lettering is type.
- Nothing seen in motion or on a real phone.

## Questions

For the owner, in plain words:

1. Your two pumps: the same pump twice, facing each other, as in your Route 66 photo? Or one of each shape?
2. You said the light doesn't redraw a thing. Is it right that shade and night are then drawn in lines over it, and on the ground? Or should shade be more dots, in the same hand as everything else?
3. Should a pump standing in the canopy's shade look shaded at all, or exactly as it does in the sun?
4. On your phone, walking up to the pump: do the dots hold still, or do they shimmer?
5. Which canopy lamp still works: the middle one, as drawn?

For the director: is the dots-for-things, lines-for-light rule a fair reading of his "no", or have I rebuilt "lit by the hour" for the ground by another name? Is the sheet too long?
