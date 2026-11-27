# Notes — product designer (visual)

Last updated: concept phase, visual turn 1 (after systems' "how it works" for four concepts; the director goes next).

## Where things stand

- Concept phase. Four concepts in `concepts/` (01 Nobody's here, 02 The Arrow, 03 Your light, 04 The makeover) plus `00-shared.md`. Systems wrote "how it works"; I appended "how it looks and feels" to all five files this turn.
- No scores yet. The director has not ruled on the concepts.
- Stills are in `concepts/stills/` (one sheet per concept, plus single tall-phone frames).
- There is a walkable three.js prototype of the night forecourt in `sketches/your-light/`.

## The owner's words that govern the look (all in `owner.md`)

- "monocolor black and white brush strokes"; "Ed Ruscha meets Jack Kirby's sketches"; "liminal"; "every interaction has some artistic meaning".
- "I'm thinking threejs". "pure ink for now".
- Brush: "somewhere in the middle. I want them readable but note precise or always whole" (read as "not precise").
- "Route 66 but there's gotta be a googie arrow sign and it should have some elements of that era in places."
- "it should feel liminal not funny". "place first". Name on the sign: "Me".
- "draw but generate for now. I want to eventually export blender models and texture them."
- "let's not worry about the work right now I just want to nail the world." "mainly it's for me".
- "we need sound effects at least"; place's own sound: "yes but idk how to even begin there".
- **"walk around"** (arrived mid-turn; the concept files' structure predates it).
- Public with a note of whose it is: "yes but no" (read as public yes, note no).
- Still open: whether the time of day does something or only changes the look.

## What I decided or proposed this turn, and why

Shared (in `00-shared.md`):
- Two values only; a light that dims gets smaller, never fainter.
- Two blacks: shadow is brushed and moves; paint is flat and still (stripes, arrow, lettering).
- The light source sets the stroke (sun parallel, lamp outward, stars round the pole).
- In shade, near things get a paper line; far things are lost.
- The sign in every concept: pylon, name in lit boxes stacked down it, flat painted arrow with bulbs, starburst. The stacked name is what makes a tall phone work.
- Walking: masses hold from uncomposed spots (prototype); brushwork swims because it is attached to the screen; hidden for now by about twelve held pictures a second; real fix is strokes on surfaces, unbuilt. When you stop, the view should settle and level.
- Sound: every light has a sound and the bed is the sum of the lights that are on. Four recordings and a bell to begin.
- Job 14: his stroke sheet replaces generated strokes; untextured models already draw; a texture is paint.

Per concept:
- **01:** I removed the canopy (a canopy shades the whole front and hides the door; the owner's frontal reference has none). Night arrival holds. Proposed dropping Pick up for now. Aisle not drawn.
- **02:** The arrow can rake over the forecourt if the name stays upright on its own pylon and the arrow is a solid dart, not a flat board. From eye height the shadow reads as a band, not an arrow; "awake" must be carried by the thing's own blacks and sound. Proposed reshaping round "the shadow is a path you follow". Door must stand clear of the canopy. The inside still (`02d`) fails.
- **03:** Prototype built. Night arrival is not lost; aiming a light feels like touching; standing still brings the sky up. By day your shadow reads only when the sun is low and behind you, and it can't reach things from the road; with walking, you touch by standing next to a thing, and your reach is the hour. Proposed that the four may be one place, with 03 as what the visitor is.
- **04:** "Marked out" (dashed footprint and a handwritten word) works; "roughed in" is a wireframe and should go. Agree with systems: fold it; keep marked-out and the marks in another hand.

## Sketches and how to run them

- `sketches/concepts/`: 2D drawing engine (`engine.js`), the stills (`frames.js`), layout (`sheets.js`), `node render.js` writes `out/`. Stills were copied to `concepts/stills/` by hand; re-copy after re-rendering. `proto/` holds copies of the prototype stills so the sheets can include them.
- `sketches/your-light/`: three.js prototype. `node render.js` writes six stills to `out/` (arrive, aim, walk, wait, daywalk, dayroad). Open `index.html` through any static server to walk in it; `?day=1` for daylight.
- Older: `sketches/ink-is-shadow/` (jam pass 1), `sketches/dial-on-a-phone/` (jam pass 2).
- All throwaway. A stray `seen.png` sits in `sketches/concepts/out/`; ignore it.

## What is not proven

- A hand. Every stroke is generated.
- Brushwork that stays put while you walk.
- Any sound.
- Any desktop (wide) composition. Everything drawn is tall phone.
- The aisle (01), the inside of 02, switches indoors (03), doing nothing in 01 and 02.
- The sign against the owner's saved references: the article and Flickr hosts aren't reachable from this session.
- Performance on a real phone.

## Open questions

- Owner: canopy or no canopy; is an arrow that points up and over acceptable; should a visitor be able to tell which parts aren't his yet; a held tone that follows the sun as the place's sound; torch or lantern.
- Director: are these four one place; which to build first; whether 02 without an inside is a concept.
- Systems: rework stops into walked places in every file; 02's things-by-hour from real geometry; 03's day rules as "stand next to it"; where marked-out lives if 04 is folded.

## Next

- Read the director's scores and objections.
- If 03 goes forward: a remembered thing as a few of its own strokes in place of an outline; a lamp above eye height; the first switch indoors.
- If 02 goes forward: the path at three seasons from the forecourt; a second shadow.
- If 01 goes forward: the aisle, walked.
- For any: one wide desktop frame; one test with real scanned strokes if the owner supplies a sheet.
