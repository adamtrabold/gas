# Notes — product designer (visual)

Last updated: concept phase, visual turn 2 (after `steer-1.md` and the systems designer's rewrite for walking; the director scores next).

## Where things stand

- Three concepts, one place: 01 Nobody's here, 02 The Arrow, 03 Your light. 04 is folded into `00-shared.md`.
- My look-and-feel halves of `00-shared.md`, 01, 02 and 03 were rewritten this turn. 04 has a note at the top of its visual half.
- All pictures are in `concepts/stills/` (38 files, under 2 MB): five sheets, the single frames, and `swim-test.png`.
- One prototype is live: `sketches/place/` (walked three.js, the whole lot, inside and aisle, day and night, the three concepts by `?c=`).
- Not READY last round. No scores yet.

## The owner's words that govern the look (all in `owner.md`)

"pure ink for now"; brush "somewhere in the middle. I want them readable but note precise or always whole"; "Route 66 but there's gotta be a googie arrow sign and it should have some elements of that era in places"; "it should feel liminal not funny"; "place first"; name on the sign "Me"; "draw but generate for now. I want to eventually export blender models and texture them"; "let's not worry about the work right now I just want to nail the world"; "mainly it's for me"; "we need sound effects at least"; own sound "yes but idk how to even begin there"; "walk around"; public with a note "yes but no".

Open with him: does the station have a canopy (drawn on, per the director); does the time of day do something.

## The director's steer (steer-1), and what I did with each item

1. Swim test first: done. Ink fixed to the world holds. Night: 0.4% of pixels changed turning, 1.2% walking, against 4.0% and 3.5% fixed to the screen. Day: 1.8% and 3.7% against 3.5% and 5.1%. Judged from frames and counts, not in the hand.
2. Camera at full rate, ink held: the prototype redraws every frame; with ink in the world nothing needs holding while walking.
3. Canopy back on, day arrival reading as a gas station: done, on systems' lot (canopy west of the door). I side with systems over the steer on where the canopy goes.
4. 01, the aisle walked, and the room after a minute: aisle drawn at both ends; the minute is answered in words (almost nothing changes, by design); the five-minute disc is drawn.
5. 02, the shadow at eye height and the awake thing: drawn at four hours plus winter noon. Pump and bench fail the kill condition, air post passes, door is always black. Inside: the doorway frames the shadow on winter middays; the window doesn't. I recommend folding. Systems would keep it as one rule on 01; I disagree and said so in the file.
6. 03, a shadow that isn't a figure: a plain round-topped upright shape. Day touching drawn at the air post. Lit-and-left keeps three strokes (built, small). A fourth light drawn.
7. One wide frame per concept: done.
8. Edge of the world: yes, two values hide the join; drawn at 86 m.
9. Sign details to check: six questions, in the look-and-feel half of `00-shared.md`.

## Decisions and why

- Ink fixed to the world: the pattern that breaks every light's edge is read at the world point each pixel shows, along fibres that run the way the light runs (parallel for sun, outward from lamps). Shadow-map grain is fixed to the lot, not to the player.
- Paint and light are told apart in the build: lit surfaces carry a faint tint; paint doesn't. Paint stays sharp, light edges break.
- Lamp above and beside the eye (systems asked; agreed).
- The visitor's shadow is a capsule fixed to the camera, never drawn itself.
- I added an east shop window with a low sill and a bench under it to systems' lot. Flagged for them and the director.
- Withdrew my own sentence "the shadow is the path the day has laid": it's a patch for most of the year.

## Sketches

- `sketches/place/`: `index.html` (prototype), `shots.js` (every still's position, heading, hour), `render.js` (stills to `out/`), `sheets.js` (copies stills to `concepts/stills/` and builds sheets), `swim.js` (the test), `review.js` (contact sheet). Serve `sketches/` to walk it; three.js is shared from `../ink-is-shadow/vendor`. `out/` is deleted after use; re-run `render.js`, then `swim.js`, then `sheets.js` to rebuild.
- `sketches/concepts/`: last round's 2D engine source, kept (60 KB). Its outputs are deleted. `concepts/stills/cross-2d.png` is the one frame kept from it.
- `sketches/ink-is-shadow/` (jam 1, holds the only copy of three.js), `sketches/dial-on-a-phone/` (jam 2).
- Deleted this turn: `sketches/your-light/` (superseded by `place`), all of last round's stills and sheets.

## What is not proven

- Real strokes (swell and taper) fixed to surfaces. Needs a sheet of his marks.
- Anything on a real phone in the hand, including performance.
- The paper line for near things in shade; so under the canopy things are lost.
- Crossing stroke and landed words in 3D; sound; twilight.
- The sign against his references.

## Open questions

- Owner: canopy; a round-topped shadow or a person's; the sign questions.
- Director: fold 02 or cut it to three things in the open; accept the east window and bench.
- Systems: the day-touch list in 03 is shorter than written because of the canopy; the look back down the aisle needs the front room darker than daylight; a light at the mouth of the aisle visible from the door.

## Next

- Read the scores and objections.
- If a sheet of the owner's strokes arrives: lay them along the fibres and repeat the swim test.
- Build the paper line for near things in shade.
- Draw twilight (the sky inked in, letters coming on).
- Crossing stroke in the prototype.
