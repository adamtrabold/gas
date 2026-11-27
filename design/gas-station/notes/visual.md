# Notes — product designer (visual)

Last updated: jam pass 2, turn 2 (after the director's pass 1 and systems' pass 2; the director goes next).

## Where things stand

- Jam, pass 2. My turns in `jam.md`: `## Pass 1 — visual`, `## Pass 2 — visual`. No concepts, no scores yet. Nothing is decided; the owner has answered no questions since "I'm thinking threejs".
- The direction everyone is building on: "ink is where the light isn't" (mine, pass 1), accepted by the director as the physics of the world with conditions; the station as a sundial (director); the dial laid out with real sun geometry and the list as a timetable (systems).

## What applies (owner's words and direction)

- Portfolio for Adam Trabold (designer, musician, design director). Vintage gas station in the desert.
- "monocolor black and white brush strokes"; "Ed Ruscha meets Jack Kirby's sketches"; "a bit of a liminal world - you start out of the gas station and can go in"; Easter eggs "alike stuff" (probably alien, unconfirmed) and "time of day stuff"; "every interaction has some artistic meaning".
- "I'm thinking threejs" (a lean).
- All 18 inspiration images now opened.
- No project rules, brand or design system. Website, desktop and phone; the director says design the tall phone first.

## The director's steering so far (pass 1)

- Ink rule is the foundation, with conditions: mass before line (lit edges may be lost; outlines only on near things and events); shadows laid as strokes in the light's direction; ink is also time.
- Ruscha/Kirby split kept, with a second axis: outside is Ruscha, inside is Kirby density. Words always land deadpan. Warned against comic-book bursts.
- Phone first; big sky for arrival; panels only as "a gutter is time" (four hours of the same station).
- B (the strip) becomes the list. Stepped, composed views. Deadpan test. Nothing responds except by ink. The work is the lit thing. Evidence, never the creature.
- The lap does not change the hour. A latch at the door, never a puzzle.
- Asked of me: one frame as mass with no outlines; two tall arrivals side by side; one interior as Kirby density with the work lit. **The interior is still not drawn.**

## What I found in pass 2 (sketch: `sketches/dial-on-a-phone/`)

1. From the road at eye height the dial does not read by day. The camera needs about 7 m.
2. Lifted, the painted hour lines read as a dial immediately.
3. A thin pole makes a hairline hand; upright letters cast almost nothing at midday.
4. Geometry correction: for an upright pole only the tip of the shadow lands on fixed hour lines, and those lines fan from a point 14.3 m south of the pole (10 m pole, 35°N), which is on the road where the visitor stands.
5. Two ways to give the hand mass: (a) a flat stencil sign whose shadow is the same size at every hour; (b) a raking beam aimed at the pole star, whose shadow is a full hand lying on the hour line in every season. With (b) noon in June has a 16 m hand, so no length floor is needed. My lean: (b), with (a) as its head.
6. Costs: the stencil is mirrored from underneath and the name is not legible inside the block at phone size from the arrival view; the beam covers its own shadow from dead centre at noon, and it pushes the station toward the streamlined kind.
7. The arrival camera rides the hour: high and looking down at midday, on the road and tipped up at night, level at twilight. Morning and evening it turns about 12° toward the head.
8. Night reads as an instrument if: one mark per piece and no other stars; every star has a tail as long as the night is old; exactly one is captioned.
9. The light source sets the stroke: parallel for sun, outward for lamps, round the pole for stars. Shadow is brushed and moves; paint is flat, stencilled and still.
10. Painted words want Ruscha's straight-stroke stencil letters (05, 06); the slab stays for landed words (04).

## Decisions I'd defend, and why

- Strictly two values, toned paper (pass 1). Not yet confirmed by the owner; the director has asked him about grey.
- No length floor at midday: the geometry can be honest if the hand has a head or the sign is a beam.
- Stars as strokes with tails, krackle as tail-less clustered dots: keeps "dots mean not from here".

## Sketches

- `sketches/ink-is-shadow/` (pass 1): three.js, two-value shader, the day/night and inside/outside 2x2. Outline-heavy; the director prefers the frames where ink is mass.
- `sketches/dial-on-a-phone/` (pass 2): canvas 2D with its own projection and a ray test against a few boxes; `index.html`, `render.js`, `sheet.png`. Ten frames. Not three.js. Strokes are generated and comb into even hatching on walls. Throwaway; don't build on the code.

## Dropped

Pass 1: constant line wobble; plain invert as night; halftone for grey; free first-person walking.
Pass 2: length floor; cast name from upright letters; reading the dial at eye height by day; flat type in the sky; the quick back-lot frame.

## Open questions

- Owner: raking beam in place of an upright pole? First view from above head height by day? Plus everything in `owner.md` (what goes in, who it's for, "alike", colour for the work, music, will Adam draw the strokes, station name, grey, which brush, which station, how straight-faced, place or work first, whose name).
- Director: stencil, beam or both; does the camera riding the hour count as a composed view; twilight pointing at nothing.
- Unproven: a real hand (scanned strokes) driving the shadows; laying strokes in real time in three.js; how the timetable meets the fan of hour lines on a phone; forty captioned marks in the night sky; the lamp printing the name at night.
- Owed: an interior as Kirby density with the work as the lit thing; a composed back-lot stop (the station as a silhouette, as in 10).

## Next

- Read the director's pass 2 steering.
- Draw the interior. Draw the phone arrival with the margin and the timetable in place.
- If the beam goes forward, compose the off-centre arrival stop and the view from the beam's foot by hand.
