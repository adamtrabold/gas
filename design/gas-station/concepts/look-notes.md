# Look notes — shade, night and light in dots

Visual designer. Short on purpose. The owner judges the prototype itself, `sketches/place/index.html`, on his iPhone. The long version is `notes/visual.md`.

## This turn: the director's four (`look-judge-2.md`)

| | What was done | See |
|---|---|---|
| **A. Night is darker than day, both ways** | The canopy lamp is a weak bulb throwing a pool downward: full for about 3 m, gone by 7 m, about 2 m past the canopy's edge, a metre up the wall. Real shadows in it, his included. Beyond it only the moon: open ground a little over half dark, the moon's shade the darkest thing there is. The canopy's underside is black. In dark dots the dark is now a hand's packed stipple, not a ruled screen | `night-fix-1` (dark dots), `night-fix-2` (light dots): the opening stand |
| **Rows of half-made dots on the ground** | Dark dots: gone. The ruled screen broke into rows at night's tones, so night's dark is laid as jittered dots, and their order was changed so the tone stays even along the ground. Light dots: with the light right its dots are small and apart, and the rows are faint; left as it was | `night-fix-4` (dark), `night-fix-4b` (light) |
| **B. The moon is epic** | 30 % of the screen's width (was a sixth), ringed by two rows of dots, 24 degrees up in the south-east so it sits in one frame with the ground it lights. A pale moonlit floor runs to a true horizon under a black sky | `night-fix-3`: the opening stand, turned round |
| **C. No hairline** | It was the far edge of the ground. At night the far floor is now pale to the horizon | `night-fix-5` (pump), `night-fix-6` (slab, light dots) |
| **D. The controls** | Ported from the approved test page. Drag-to-look and hold-to-walk are gone. The foot words say `swipe to look · pinch to move · tap to go` | Below |

Day is untouched.

## The two nights, as they now differ

- **Night, dark dots:** paper in the lamp's pool; everywhere else ink packed on by hand, closer where it is darker. Things keep their own dots under a veil of the same.
- **Night, light dots:** black; a ruled screen of paper dots, big in the pool, small under the moon, a thin scatter where no light reaches. Things are paper dots on black.

Before, they were the same screen, one inverted. Now they are two kinds of drawing. That is my call and the director should see it before he is asked.

## Hashes

Unchanged: `#together` (default), `#pump`, `#slab`; add `-day`, `-night`, `-night-reversed`; `stipple-` for the looser day screen; `#view-pump`, `#view-slab`, `#view-canopy`; `#team-…` for the old hands. New: add `-debug` for the controls readout (e.g. `#together-night-debug`).

## The controls: what was checked, and how

Real multi-touch TouchEvents sent through the browser's debugging channel (CDP `Input.dispatchTouchEvent`) to the station itself, emulated iPhone 14, on a very small canvas so frames are quick (the control code is the same). From the opening stand unless said.

| What | Result |
|---|---|
| One finger right 200 px, slowly | You turn left 43.2 degrees (the test page: 43.7). Left: 43.2 the other way. You do not move |
| One finger down 100 px | You look up 8.1 degrees. Up: down 8.1 |
| A finger held 1.5 s | Nothing |
| Pinch out on the west pump, 80 to 260 px | 9.2 m to 2.1 m from it, facing unchanged |
| Again, hard | Stops 1.12 m from its centre (0.9 m short of its face). Does not go through |
| Pinch in, 200 to 80 px | Backs away 7.5 m |
| A lopsided pinch (thumb still) | Stays a pinch |
| Two fingers right 150 px, slowly | You slide 3.8 m to the left, facing unchanged. Left: 3.8 m right |
| Two fingers down together | Nothing |
| Two fingers toward a pump from 1.6 m | Stops 0.81 m from its centre |
| Tap on the ground; on the east pump; on the sky | Taken there; taken to 1.12 m from its centre; nothing |
| The door, beat 1: a hard pinch on it from 7 m | Stops at 14.9 m north (the door is at 16), outside |
| The door, beat 2: a new pinch out; or a tap on it; or the forward key held | Inside, 1.5 m in |
| Back; Escape | Outside, 1.5 m from the door, facing out |
| A pinch whose second finger's start never arrives | Still a pinch |
| A swipe starting 8 px from the left edge | Not ours: nothing |
| Left arrow; W; D; the wheel | Turns left; walks; steps right; moves you in |
| Walking at a canopy post | Stops 0.6 m from it |
| The world's edge at 130 m | Put down on the far side |
| The speed curve, one finger 200 px (timed events made inside the page) | Slow 42.9, fast with the finger stopping 61, flicked 88 degrees |

**What only his iPhone can confirm**
- That it works at all in iOS Safari. Everything above is desktop Chromium pretending to be a phone.
- That the directions are still the ones he approved. The sums say so; his thumb decides.
- The eased curve and carry-on (×1.8, 0.10 s). Here only the one-finger curve could be shown: this machine's frames are too slow to time a two-finger flick. The pinch's and the track's curve are the test page's code unchanged.
- Whether a pinch feels right against the real pumps and the wall, and whether stopping 0.9 m short of a pump is where he wants to be.
- The 12 px moment that tells a pinch from a track, in a real hand.
- Tilt. No sensor here.
- That the foot links and the word `tilt` still take a tap, now that the page refuses its own zoom.
- Frame rate while moving, which decides whether any of it feels like the test page did.

## Measured

Emulated iPhone 14, canvas 1170 × 1992 at 3 dots per point. Software renderer, no GPU.

**Day: do the shade dots keep their place as you walk?** (`walk4.js`, rerun this turn. Change 0 = nothing, 1 = all swapped; flipped = points gone from paper to ink or back.)

| | Halftone (the link) | Stipple | Sheet 2's lines |
|---|---|---|---|
| Slab at 1.6 m, one frame forward (7 cm) | 0.035, 0.5 % | 0.026, 0 % | 0.028, 2.0 % |
| Slab at 1.6 m, half a metre forward | 0.178, 10.4 % | 0.134, 5.7 % | 0.208, 20.7 % |
| Slab at 3.2 m, half a metre forward | 0.153, 8.3 % | 0.110, 4.1 % | 0.146, 12.8 % |
| Wall at 3.2 m, one frame forward | 0.015, 0 % | 0.019, 0 % | 0.008, 0 % |
| Wall at 3.2 m, half a metre forward | 0.117, 0.1 % | 0.091, 3.2 % | 0.041, 0 % |

Frame to frame the dots hold as well as the lines did. Over half a metre close up on the ground one point in ten flips: half of what the lines did, and still the weak spot.

**Night: does the ground hold as you walk?** (`walk5.js`, new: a patch of moonlit open slab, read the same way.)

| | Night, dark dots | Night, light dots |
|---|---|---|
| Slab at 1.6 m, one frame forward (7 cm) | 0.042, 0.5 % | 0.017, 0 % |
| Slab at 1.6 m, half a metre forward | 0.203, 16.6 % | 0.104, 0.5 % |
| Slab at 3.2 m, half a metre forward | 0.172, 11.9 % | 0.085, 0 % |
| Ink in the patch | 68 % | 85 % |

Frame to frame both hold. **Over half a metre the dark stipple re-dots: one point in six flips close up.** That is worse than day's shade (one in ten) and far worse than light dots (almost none). It is the price of the packed stipple that got rid of the rows, and it is the thing to watch on his phone: if dark dots swims as he pinches in, light dots is the steadier night.

**Seconds a frame in this machine's software renderer, nothing else running** (only the ratios mean anything): day 13.3 · day in Sheet 2's lines 10.5 · night, dark dots 13.9 · night, light dots 15.0. Night was about twice a day frame; it is now about a tenth more. The lamp is one shadow map, not six, and lights that are off no longer cost anything.

**Frame rate: not measured.** There is no GPU here.

## Not good yet, or not real

- **Under the lamp, dots are cut by the shadow's edge**, his included: the lamp's shadows are worked out per pixel and are soft; the moon's and sun's are per dot. Next after the environment's first turn.
- **Night sky is flat black**, moon aside: the top third of the opening frame. Sky, stars and clouds come with the environment. Tell him so in half a sentence.
- **The far floor at night is a blank pale band** under the horizon. It wants mountains in front of it.
- **Light dots has a faint grey strip** just under the horizon.
- **The moon is low at every hour** in these fixed nights. When the clock is real it will climb out of the frame unless we say otherwise.
- **A pump's own shading is still drawn once.** The director has ruled that real light wins; it goes in with the environment. The code is three lines from it (`notes/visual.md`).
- **Plates and number windows at night** are still switched by view, not by light.
- **Bands on the ground by day** (halftone): as before.
- Lettering is set type. LLANO is a stand-in. Twins by day from the road.
- Nothing has been on a phone.

## Stills kept as evidence

Walked frames at true density, 8 shades, nothing composed.
- Night, this turn: `night-fix-1` opening stand, dark dots · `-2` the same, light dots · `-3` the moon · `-4` the ground looked along, dark dots · `-4b` the same, light dots · `-5` the pump alone at night · `-6` the slab, light dots.
- Day and the viewer, from last turn and still true: `dots-together-day`, `dots-shade-edge`, `dots-pump-in-shade`, `dots-your-shadow`, `dots-wall-stipple`, `dots-view-pump`, `dots-view-canopy`, `dots-view-slab`.
- Deleted as superseded: the five `dots-*` night stills. The director's own `lj2-*` are his "before".

## The one question for him

> Night is now just darker, in dots, with a moon behind you. There are two ways to draw it. Open the link, tap "night, dark dots", then "night, light dots". Which one is night?

## Queue (one at a time, after that; the director's order)

1. On your phone, moving around: do the dots hold still, and is it still smooth?
2. Shade by day as an even printed screen, as now, or as looser hand-made dots? (Needs a foot link for the looser one first.)
3. The moon: always full, or tonight's real shape?
4. In the elements page: can you turn a thing with a swipe and still scroll past it?

Told, not asked: the working canopy lamp is the middle one; the sky comes next.
