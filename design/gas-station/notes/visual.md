# Notes — product designer (visual)

Last updated: jam pass 1, turn 2 (after systems, before the director).

## Where things stand

- Jam pass 1. Systems went first; I added `## Pass 1 — visual` to `jam.md`. The director has not steered yet. No concepts, no scores, no objections so far.
- Nothing is decided. Everything below is my proposal or lean.

## What applies (owner's words and direction)

- Portfolio site for Adam Trabold (designer, musician, design director). Vintage gas station, in the desert.
- "monocolor black and white brush strokes". "Ed Ruscha meets Jack Kirby's sketches".
- "a bit of a liminal world - you start out of the gas station and can go in".
- Easter eggs: "alike stuff" (probably alien, unconfirmed) and "time of day stuff".
- "every interaction has some artistic meaning".
- Later: "I'm thinking threejs" (a lean, not a decision). Systems' turn was written before this.
- 18 inspiration images in `inspo/`. I opened 02, 03, 04, 07, 08, 11, 13, 14, 15, 16, 18. Not yet opened: 01, 05, 06, 09, 10, 12, 17 (I relied on the brief's descriptions for those; open them before concept work).
- No project rules, brand or design system exist yet. Website, desktop and phone.

## What I proposed, and why

1. **The first question is what a brush stroke is in 3D.** Three kinds: S1 ink is shadow (lit geometry, two values), S2 real strokes hung in the air that line up from one spot, S3 flat drawn sheets. Lean: S1 for the still world, S2 for events.
2. **"Ink is where the light isn't."** Answers systems' night-or-inside question: both hold, as one rule. Day outside is paper, day inside is ink, night outside is ink, night inside is paper. The door always turns the page. Night is the station's own lamps, not an invert. Time of day is the sun's angle.
3. **Tall phone.** Frontal camera fails. Three ways out: the word in the sky (my pick for arrival), the Ruscha corner (a camera move, weakly composed in my sketch), the page of panels (a phone-native direction worth keeping alive).
4. **Four shapes.** A carries well. C is strongest (an aisle suits a tall screen). D is carried by lettering. B is weak with three.js and tall screens; I proposed it become the form of the plain list.
5. **Ruscha is stillness, Kirby is the event.** World at rest: deadpan, nothing moves. Any response to the visitor: an inked mark with force. Krackle dots reserved for the alien material. The margin of the art board holds plain controls.
6. **Strictly two values**, toned paper, greys only from dry brush, stipple, krackle.
7. **Three type voices**: slab (the station), brush hand (the attendant), typewriter (records). Faces not chosen.
8. **Work**: crushed to two values on the shelf by the same treatment, true colour when picked up.
9. **Motion**: still at rest; events in a few held frames; lean to stepped, composed camera views over free roaming.
10. "Attention is the inker" (detail stays pencil until looked at, persists across visits). Offered as something to argue over; risk is a faint first visit.

## The sketch

- `sketches/ink-is-shadow/` : `index.html` (three.js scene + a two-value post shader), `render.js` (Playwright, writes `sheet.png`), `vendor/three.module.min.js` (three 0.170.0).
- Run: `node render.js` in that folder.
- What it shows: the 2x2 of day/night and outside/inside from one scene; the frontal-on-phone failure; the word-in-sky proportion; the corner camera.
- What it does not show: real brushwork (lines are a procedural stand-in and look processed), a composed corner view (the sign is cropped in frames 3 and 4), any motion, any interaction, performance on a real phone. The sky type in 2b is pasted on flat in 2D, not in the scene.
- Finding: inside by day the shelves disappear into black (frame 5). Anything holding work needs its own light source.
- Throwaway. Don't build on the code.

## Dropped

Constant line wobble; plain invert as night; halftone for grey; free first-person walking.

## Open questions

- To the owner: will Adam draw the strokes (a scanned sheet of about forty)? Stepped views or free movement? Is toned paper acceptable as white? Plus systems' list (what goes in, who it's for, "alike", work in colour, music, station name).
- To the director: is the ink rule the foundation; is the Ruscha/Kirby split real or too tidy; big sky or page of panels on the phone; does B become the list.
- Unproven: whether a shader fed with real scanned strokes can pass as a hand. This is the biggest risk in the look and wants a second sketch once we have real marks.
- Unknown: three.js cost on older phones with shadows on; what the no-WebGL fallback looks like (likely the plain list on paper with one still print of the station).

## Next

- Read the director's steering in `jam.md` and `notes/director.md`.
- Open the remaining inspiration images.
- If the ink rule goes forward: recompose the phone arrival by hand, and sketch one Kirby event (a Call) over the still scene to test the stillness/event split.
