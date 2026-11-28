# Look notes — shade, night and light in dots

Visual designer. Short on purpose. There is no Sheet 3: the owner ended sheets (`owner.md` 37). What he judges is the prototype itself, `sketches/place/index.html`, on his iPhone. The long version, with how it is built, is `notes/visual.md`.

## What changed

1. **Shade is dots.** No ruled lines anywhere in the link. Shade, his shadow and the dark at night are a *screen*: small dots, all one size, evenly spaced, at an angle, like a printed halftone. A thing's own dots (rust, stains, form) stay loose and of every size. That difference is what stops shade reading as dirt.
2. **A shadow has an edge.** Each dot asks, at its own centre, whether it is in shade. So a dot is whole or absent, never sliced, and a shadow's edge is a clean row of dots. Shade is heavier close under what casts it.
3. **A thing in shade stands clear.** It is shaded, as it would be (a light screen over its own dots). The shade on the wall or ground behind it stops just short of its outline, leaving a thin edge of bare paper, and its outline is heavier. This is the inker's halo; his Kirby pages do it.
4. **His shadow is a figure.** The closest screen on the lot, with a head and shoulders.
5. **The light is real** (`owner.md` 30, 31; `lights.md`). Built as scene lights so far: the sun, the sky's light, the moon, the middle canopy lamp, the west pump's globe. Nothing follows where he looks: the lamp that did is gone from the link.
6. **Night is drawn, never blank.** The moon lights the open ground and throws shadows, his included. The canopy lamp lights the forecourt, falls off, and throws shadows, his included. Where no light reaches there is still a drawing. Two ways, switchable (below).
7. **The moon** is in the sky: huge (about fifteen times real width), a paper disc with its seas in dots. Full, opposite the sun, so it is in the south at night: behind him as the link opens. He has to turn round.
8. **Two pumps, one model, worn separately** (`owner.md` 23). West: rustier, rust higher, stained, cracked globe, globe lit at night. East: paler, less rust, globe dead.
9. **The canopy's underside** is a screen now, not loose dots. It read as a speckled ceiling; it reads as a ceiling in shade.
10. **An object viewer** for the elements page (`owner.md` 38).

## What each default is, and the hashes

Plain names after `#`, joined by dashes, any order.

| Hash | What it shows |
|---|---|
| `#together` (also no hash) | Pumps, island, slab, canopy, blank wall. Day. Shade as a halftone screen. Opens square on from the road |
| `#pump`, `#slab` | The lone pump; the slab with both pumps in open sun (his shadow is in this one) |
| add `-day`, `-night` | Night is "dark dots": more and bigger dark dots on paper, the moon and the canopy lamp as real lights |
| add `-night-reversed` | Night as "light dots": paper dots on black, most where the light is |
| add `stipple-` (e.g. `#stipple-together`) | The same shade as a hand's stipple: the dots sit off their places and tone is carried by how many there are, not their size. Not in the foot links |
| `#team-lines-together`, `#team-lines-pump-night` ... | Sheet 2, for comparison only: ruled lines for shade, and the old night with the light that followed the view |
| `#team`, `#team-lot` ... | The rest of the place in the old hands. Not maintained |

Foot links in the prototype: `together · pump · slab` and `day · night, dark dots · night, light dots`. That is the one comparison put to him.

### Object viewer (for embedding)

| Hash | Element |
|---|---|
| `#view-pump` | 1, the pump (the west one) |
| `#view-slab` | 2, the slab and its island |
| `#view-canopy` | 3, the canopy |

Each also takes `-night` and `-night-reversed`. Same file: `sketches/place/index.html#view-pump`.

- One element alone on bare paper, in the real look and real light, with its real cast shadow. No words in the frame.
- **One finger across turns it.** The thing turns with the finger (drag right, its near side goes right).
- **One finger up or down is left to the page**, so the page scrolls past it. This is the plainest of the choices: no tap to wake it, no mode.
- **Two fingers:** apart comes closer, together backs off, both up or down tips it. Limits per element. Page zoom is refused inside the frame only.
- Mouse: drag turns and tips; the wheel comes closer only after a click on it, and lets go when the mouse leaves, so the page still scrolls under the wheel.
- Touch events, not pointer events, as `controls.md` asks for iPhone Safari.
- **It draws once, then only when touched.** No loop. Several on one page cost nothing while still.
- Made for a frame about 390 wide by 300 to 400 high, and for full width. For scripts: `?obj=pump&az=&el=&r=`; `window.turn(az, el, r)`.
- Each frame is its own WebGL scene and loads three.js (shared file) and eight small paper images. A page with many should load them as they scroll into view. iPhone Safari allows a limited number of live WebGL frames at once (I don't know the number on his phone).

## Measured

Emulated iPhone 14 (Playwright's descriptor, nothing overridden), canvas 1170 x 1992 at 3 dots per point. Software renderer, no GPU.

**Do the shade dots keep their place as you walk?** (`walk4.js`; the same points of the world read before and after a move; change 0 = nothing, 1 = all swapped; flipped = points gone from paper to ink or back.) See the table in `notes/visual.md`. In short: the halftone screen changes about 0.03 a frame on the slab and 0.01 on the wall with under 1 % of points flipped, the same order as the pump's own dots (0.012) and as Sheet 2's lines.

**Half a metre forward, close up on the ground, is the weak spot:** 0.14 to 0.17 change, 7 to 8 % flipped. Dots are sized by the screen, so as you close in each dot covers less ground, and every halving of distance brings in the in-between dots. On the wall, and from 6 m, nothing flips.

**Frame rate: not measured.** There is no GPU here. What I can say: a shaded pixel of ground now reads the sun's shadow map about 8 to 40 times (it was 32 for lines) and the lit ground about 8; the old stipple on things is unchanged. It should cost about what Sheet 2 did, which he called fluid, but that is a guess until it is on his phone.

## Not good yet, or not real

- **Bands on the ground.** Every halving of distance the screen drops every other dot. On a wall you can't tell. On the ground, looking along it, there is a faint band where the in-between dots are half size. Worst at night, when the whole slab is screened.
- **Far ground.** Beyond about 15 m the dots on the ground flatten to dashes and thin out; past that the tone snaps to paper or black. Far shade needs to be solid shapes. The road and desert will force this.
- **Night sky is flat black**, moon aside. "Never a black screen" holds for the ground and things, not for the sky. Sky, stars and clouds come with the environment.
- **Under a lamp, dots are cut by the shadow's edge** (the lamp's shadows are worked out per pixel, the sun's and moon's per dot). The lamp is a bare point: it lights the canopy's underside and reaches 14 m. `lights.md` says a spread downward, spilling 2 m.
- **Plates and number windows at night:** paper-white with the canopy lamp on, dark with pale lettering in the other two views. A stand-in, not worked out from the light.
- **A pump's own shading is still "drawn once"** (his earlier pick): its light side does not turn with the sun or the moon. That now sits oddly beside "lighting should work as in the real world". Queued as a question.
- **Stipple and halftone can't yet be told apart on things.** Only the light's tone is a screen. If he wants a thing's form in halftone too, that is a change to the pump he picked.
- **Moon:** always full; no phase. Its light is tuned by eye.
- The viewer has not been on a phone. Whether a vertical swipe on it scrolls the page inside an iframe on iPhone Safari is the thing to check first.
- Lettering is set type. LLANO is a stand-in. Wear differs between the pumps in dots and paint only: same dents (none), same hose.
- Everything else of the place (road, desert, horizon, front, sign) is still in the old hands and hidden.

## Stills kept as evidence (`concepts/stills/dots-*.png`)

Walked frames at true density, 8 shades, nothing composed: `dots-together-day`, `dots-shade-edge`, `dots-pump-in-shade`, `dots-your-shadow`, `dots-wall-stipple`, `dots-together-night`, `dots-together-night-reversed`, `dots-your-shadow-night`, `dots-slab-night-moon`, `dots-moon`, `dots-view-pump`, `dots-view-canopy`, `dots-view-slab`. For lines, Sheet 2's own stills stand (`s2-*`, `s2j-*`).

## The one question for him

> Night is now just darker, in dots, with a moon. There are two ways to draw it. Open the link, tap "night, dark dots", then "night, light dots". Which one is night?

## Queue (one at a time, after that)

1. Shade as a ruled halftone screen (the link) or as a looser hand's stipple (`#stipple-together`)?
2. You said the light shouldn't redraw a thing, and later that light should work as in the real world. Should a pump's light side now follow the sun and the moon, or stay as drawn?
3. The moon: always full, or tonight's real shape?
4. Is the canopy lamp the right one to be working (the middle one)? West globe lit, east dead?
5. On your phone: do the dots hold still as you move, and is it still fluid?
6. In the elements page: does a swipe up or down over a 3D element scroll the page, and does a swipe across turn it?
