# Sheet 1 — the pump

Visual designer. For the design director first, then the owner. After `owner.md` 13 to 15, `steer-4.md` and `elements.md`.

**The picture: `concepts/stills/sheet-1-pump.png`** (1170 x 4927, made for a phone). The same pump is walkable in `sketches/place/index.html`.

## What is on the sheet

- **A. Which pump?** Both shapes from his photographs, side by side, same hand: A1 short and round-shouldered (his Route 66 photo), A2 tall with a stepped top (his 1934 station photo). He can answer by pointing.
- **B. Which hand?** The short pump three ways. They differ in how tone is made:
  - **B1 brush** — broad dry strokes with bristle streaks, a second coat, black spotted in. Nearest 13, 14 and 22.
  - **B2 cut** — an even, heavier outline and short fine hatching one way; no solid black by day. Nearest 19, and Kirby's line in 16 and 17.
  - **B3 dot** — stipple packed closer for dark, a finer outline, the most worn. Nearest 20.
- **C. Its parts**, each alone with a typed caption and a tag to the list: globe (crack PROPOSED), number window (dust PROPOSED), grade plate and knob, badge (name PROPOSED), hose and nozzle, dark base with rust.
- **D. Does the light redraw it?** (the steer's tension A). D1: as now, the sun, your shadow and your lamp make all the shading. D2: the pump keeps a shading of its own at every hour, and night and shadows are only added on top.
- **E. One paper, or a paper each?** (tension C). E1: one old sheet, and each material's grain only ever breaks the ink. E2: his scanned-paper method, real grey in the steel.
- **Plainly:** a short list of what is not good or not real, printed on the sheet itself.

Nothing is on the pump that is not in `elements.md` section 1. No clock. No weeds (not on the list). PROPOSED things are marked on the sheet.

**Brand names, PROPOSED:** PLAYA (a dry lake bed) and LLANO (the flat plain), each with a low sun on a flat horizon. Plain place-words of the region, not jokes. **I have not checked them against real oil companies; someone must before he is asked to choose.**

## How the sheet was made, and what that means

Every drawing on the sheet is a frame of the three.js pump, captured in the iPhone 14 emulation at 3 dots per point, then cut out and laid on a sheet. Nothing was drawn or retouched outside the prototype. `sketches/place/sheet1.py` assembles it from `look.js` captures.

What the script adds that the walked world does not have:

1. **A long lens and a chosen side.** The flash views use a narrow lens (26 to 31 degrees, against the phone's 68) from the pump's front quarter. That flattens it the way flash is drawn. Walking, he sees it smaller, wider-angled and from wherever he is.
2. **Its own light.** Every flash view uses "drawn once" (D2), with the pump's light from the upper left, because flash shades a thing for itself. In the walked default (lit by the hour) the pump's sunlit face at mid-morning is much barer than on the sheet: `look-pump-day-*`.
3. **The sheet's paper**: generated tone, mottling, foxing, flecks, darker edges. The walked world's paper is flat warm cream.
4. **A ragged cut-out** round each piece, and a little extra ink dropout over the whole sheet.
5. **Captions and headings**, set in type.

So: **the sheet looks better than the walked pump**, and it says so on its face. The drawing itself (line, marks, rust, lettering, wear on the thing) is identical in both, because it is the same pixels. What the sheet flatters is framing, light and paper.

## What transfers into real-time 3D, and what doesn't

| | transfers | how, or why not |
|---|---|---|
| Line first, with weight | yes | The contour pass. Even and heavier in cut, swelling in brush, fine in dot. |
| Three hands | yes | All three walk: `#brush`, `#cut`, `#dot`. Marks stay on the thing and more arrive as you come close. |
| Stipple as tone | yes | Dots are placed on the surface and sized by the screen. Not seen in motion yet: stipple is the hand most likely to crawl. |
| Marks that follow the form | yes | Up the cabinet, round the dome, round the rim. |
| Abandoned drawn in | partly | Rust rising from the base, pits, flecked lettering, dusty window, cracked globe: all on the thing. Dents, a perished hose, peeling paint: not done. |
| Worn print | partly | Ink drops out where each material's paper is low, on the thing, fixed to it. Photocopy-style bleed and doubled edges: no. |
| Drawn lettering | no, not yet | It is set type (DejaVu Serif) roughened. It needs a hand, his or a sign painter's alphabet. In 3D it is a flat picture on the part, which works. |
| Each thing alone with its own ground | partly | Alone: yes, the lone-pump view. Its own ground: its real cast shadow and pebbles, not a few chosen strokes. In the full place things share one ground and one sun. |
| No common light | his choice | D2 does it for the thing. But the concept is light: your shadow, your lamp. D2 keeps both and only fixes the thing's own modelling. |
| Aged paper everywhere | not built | The world's paper could carry the same mottling fixed to the screen or to the ground. One paper under everything is cheap; I have not done it because it changes every frame of the place and he should choose E first. |
| Best side | no | He walks. From behind, the pump is the same drawing with no hose side. It holds from all sides I looked at; nobody has looked at all of them. |

## The tensions, as shown

- **A (own drawing or light's drawing):** shown as D1 and D2, by afternoon sun and at night, walkable with the `lit/drawn once` link. At the sheet's size the two afternoon frames look alike because your own shadow dominates both. The difference shows best at mid-morning: `look-pump-day-brush.png` against `look-pump-day-fixed.png`.
- **B (which hand):** B1 to B3.
- **C (paper):** E1 and E2. The difference is small at this size.
- **D (dots), mine to solve:** if he picks dot, tone-stipple is fine and irregular; bulbs stay a ruled row of large round lamps; the alien marks become open rings (they are dashed circles on the ground already). If he picks brush or cut, dots stay rare and keep their meaning. Printed on the sheet.
- **E (walked, not frontal), mine:** the marks are on the surfaces, so the drawing holds as you move; measured last pass on the ground, not re-measured on the pump.
- **F (charm):** nothing here is charming on purpose. The sun emblem on the globe is the only invented motif; it is a brand mark and is PROPOSED with the name.

## Where I disagree with the steer

- The steer asks for the base "with what grows round it". Weeds are not on the pump's list, so I left them out under "nothing invented". If wanted, they go on the list first.
- "Drawn lettering": I agree it is needed and have not done it. I would rather he sees that plainly than see type dressed as a hand.
- I would not let "drawn once" (D2) win everywhere even if he likes it on the pump. On the ground and walls the light has to draw, or Left on has nothing to show.

## Walked frames (`concepts/stills/`, iPhone 14 emulation, true density)

| still | proves | doesn't |
|---|---|---|
| `look-pump-day-{brush,cut,dot}.png` | The walked pump at the phone's own lens, mid-morning, lit by the hour, three hands. | It is plainer than the sheet: the lit face carries texture and rust but little tone. |
| `look-pump-night-{brush,cut,dot}.png` | In the lamp, three hands. Dot at night is a stippled pool of light. | Motion. |
| `look-pump-day-fixed.png`, `-night-fixed.png`, `-pm-fixed.png`, `-pm-brush.png` | Tension A, walked. | |
| `look-pump-tall-cut.png` | The tall pump, walked. | |
| `look-pump-close-cut.png` | At arm's length, edges and lettering are sharp at 3 dots per point. | The grade plate shows as a very slightly lighter rectangle than the paper round it. |

Routes: the link opens on the lone short pump in brush. Foot links: brush · cut · dot, short/tall, lit/drawn once, day · night. Everything else stays behind `#team`.

## Not good yet

- The nozzle and holder (C5) do not read as a nozzle.
- The tall pump is a taller version of the same drawing; his 1934 pump has a more particular top and a nozzle boot on its face.
- Brush strokes on the cabinet are straight and parallel and can read as wood grain.
- Rust patches are heavy near the base in brush and cut.
- D and E are hard to tell apart at phone size.
- Nothing seen in motion or on a real phone. Multisampling at 3 dots per point is still the frame-rate risk.

## Questions

For the owner (the sheet asks them by letter): A1 or A2, and two the same or different? B1, B2 or B3? D1 or D2? E1 or E2? Is PLAYA or LLANO right, or his own name for it?
For the director: is the sheet honest enough to send as is? Should the flash views use D2 light, given it flatters?
