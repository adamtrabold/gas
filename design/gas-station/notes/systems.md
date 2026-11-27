# Systems notes — gas station portfolio

## Where things stand (latest first)

**Jam closed. Owner has answered. `jobs.md` written (2026-11-27).** Concepts not started — waiting for the owner's "wrong / missing" on the job list and for the director's steer, which was written before the owner's answers and needs re-reading against them.

### What the owner's answers did to the jobs

Source: `owner.md` (verbatim; overrides the jam).

- "let's not worry about the work right now I just want to nail the world" → jobs split into **world (now, 1–14)** and **work (later, 15–19, parked)**. The world only has to keep room for the work. Parked with it: the timetable, piece of the hour, turns by date, the receipt (old J14), work-in-colour.
- "mainly it's for me … always wanted to own an old gas station to make into something" → Adam is the first user. Two owner jobs: keep making it into something (13), swap generated strokes / stand-in shapes for his drawings and Blender models bit by bit (14).
- "we need sound effects at least" → hearing the place is job 6; every act answers in ink *and* sound. Music stays undecided.
- "definitely needs an arrow sign" / "Route 66 but there's gotta be a googie arrow sign" → job 2: the arrow sign pulls you to the door. Saved article (vacuum-formed signs, the "Superior arrow") is reference for visual.
- "liminal not funny"; alien confirmed; "pure ink for now"; brush "readable but not precise or always whole" (reading of a typo, unconfirmed).

### What this does to the directions (my view, not a ruling)

- The director's fork — does the hour choose the work (The Instrument) or only change light and odd things (Nobody's here) — can't be judged without work. For now the hour does light, sound and odd things. The dial can still exist as a clock; it just has nothing to point at yet.
- "Route 66 … googie arrow sign … elements of that era in places" answers "which station": a plain Route 66 box with one Googie element, the arrow sign. That fits Nobody's here better than the raking beam, though an arrow sign on a leaning pylon is not ruled out.
- New structural need from jobs 13–14: the world must be made of replaceable parts (each object has a stand-in and can take a drawn/modelled version; each odd event is an addable cue with an optional hour).

### Still open with the owner (listed in jobs.md)

What goes on the arrow sign; is it public while it's only the world (and should it say whose it is / how to reach him); free walking or composed views; does the place have its own sound at rest.

Dropped as no longer mattering: place first or work first; hour choosing work; office hours vs night; receipt; where exactly (Route 66 is enough); work in colour (parked).

### Next

- Owner's reaction to `jobs.md`.
- Then concepts in `concepts/` — my half is how each works: the stops, the door, what each act does in ink and sound, the hour's cue sheet, the alien log, the replaceable-parts model, every state. Each concept must show: arriving, crossing the door, inside, doing nothing, another hour. (The director's "one piece held" and "the list" moments are parked with the work unless the director says otherwise.)
- Before the owner sees concepts: coverage check of each against jobs 1–14, and that 15–19 have somewhere to go.

---

# Earlier record (jam passes 1–2), kept for reasons

## Where things stand

Jam pass 2, turn 1 done (2026-11-27). `jam.md` now has: Pass 1 systems, Pass 1 visual, Pass 1 director, Pass 2 systems (mine, latest). No `jobs.md`, no concepts, no scores yet.

Owner since the brief: "I'm thinking threejs" (a lean, in `owner.md`). No other answers.

## What the others established in pass 1 (that I'm building on)

- Visual: "ink is where the light isn't" — one rule gives day/night and outside/inside (sketch `sketches/ink-is-shadow/sheet.png`). Strictly two values. Controls live in the margin of an art board. Stepped, composed camera views. Work is two-value on the shelf, true colour when picked up. Found: inside by day the shelves go black, so work needs its own light.
- Director: accepts ink-is-shadow with mass before line; outside is Ruscha, inside is Kirby density; words land deadpan. Proposed **the station is a sundial** (sign pole = gnomon, lot = dial, shadow picks "the piece of the hour", wall clock inside turns the sun, eggs are alignments). Proposed **the visitor is the sighting**. Latch at the door, never a puzzle. Loop stays; a lap must not change the hour. B becomes the list. Phone is the main canvas.

## Jobs (now 14)

J1 arrive and know whose place; J2 go in; J3 find the work; J4 look at one piece; J5 who Adam is; J6 get in touch; J7 come across eggs; J8 come back at another hour and be shown different work (sharpened in pass 2); J9 get to the work without wandering; J10 link to one piece; J11 leave; J12 hear the music; J13 Adam adds work without redrawing; J14 send a few pieces at once (new, inferred, tied to the receipt — cut together if cut).

From the owner's words: J1 (part), J2, J3, J7, J8. The rest inferred.

## Decisions and positions so far, with reasons

Standing from pass 1:
- The world may hide surprises, never the work.
- Every piece, About, Contact has its own address; a plain list of everything is one action away; name and station visible before anything moves; adding work never needs a new world drawing.
- Five gestures only: Look, Cross, Pick up, Call, Wait.
- Hour changes mood, eggs and what's recommended — never access.

Added in pass 2 (the sundial worked through with real sun geometry, ~35°N):
- **Orientation:** station faces south, road east–west on the south side, sign pole at the road edge, visitor arrives looking north. Because a shadow only falls north of a pole. Gives: day reads left to right; noon points at the door; front in sun all day; cast name reads correctly (needs standing letters, not a panel); pole star above the station at night. Cost: shadow recedes from the viewer and is foreshortened — arrival camera needs height. Contradicts the director's "shadow comes down the page toward you"; that view exists only from the back lot.
- **Marks are painted hour lines fanning from the pole, not objects.** Midday shadow is too short to reach objects (noon length ≈ 1.6h winter, 0.7h equinox, 0.2h summer).
- **Solstice alignment:** door at 1.6 pole-heights; the shadow tip touches the threshold at noon on the winter solstice only.
- **Clock rule:** visitor's clock hour = station sun hour; visitor's date = station date; fixed latitude; no time zones.
- **The list is a timetable.** Fixed order = day order. Piece of the hour is where "now" falls (an ink bar on its row), never moved to the top. Reordering by the clock was rejected: unlearnable, breaks returning visitors and screen readers.
- Piece of the hour is marked by: shadow on its line (lot), bar on its row (list), sun patch through the window (inside by day), lit window (night), one line of text (no picture).
- **List order is editorial:** office hours show the work he wants hiring for; night holds the rest.
- **Scale:** 0 = blank board, dial still works; 1 = always it; 2 = split at noon; ≤~12 = one stretch of day each; more = turns by date within each stretch (pure function of date + hour). At forty the dial is a pointer, not an index; the index is the timetable and the aisles.
- **Links:** a piece link never carries the hour; a station link shows whatever's showing; held piece doesn't change when the hour turns.
- **Receipt** = timetable with only the picked-up rows, hour-stamped, self-contained address. It is the thing people send (a shortlist). First thing to cut.
- **Breaks, worst first:** (1) midday in summer — hand nearly vanishes at peak visiting time; proposed a length floor plus the cast letters; (2) night — solved with a nocturnal: sky turns round the pole star above the station, the sign pole is the sight, the star over the sign picks the piece, the lit window shows it; (3) twilight — points at nothing, left that way on purpose; (4) indoors; (5) the same-hour visitor; (6) no 3D — reduces to one sentence; (7) stepped views.
- **Wall clock runs the timetable** — winding it browses every piece in turn. Marked as wound, lets go on leaving, alignments answer only to the real sun. Counts as Wait done by hand; no sixth gesture.
- **Stops** (camera places): road, door, counter, aisle, held piece, phone, back lot, timetable (margin), receipt. Addresses for all but the door and back lot.
- **Three.js rule:** the picture is a function of address, hour and date only; all reading text is page text; browser memory only adds marks.

## Dropped

Lap changes the hour; list reorders by hour; objects as dial marks; B as a world; links carrying the hour; (from pass 1) the two-colour swap having to mean only one of night/inside — visual showed it's both.

## Random draws used in pass 2 (real draw)

Fields: railway timetables (→ the list as a timetable, turns by date), weather stations (unused). Oblique: "Short circuit" (→ tested a link that carries the hour; dropped), "Use an old idea" (→ the nocturnal, a real star-clock instrument).

## Director's objections so far

None to my pass 1 directly. Corrections taken: the lap must not move time; Kirby must not become bursts; phone first.

## Open questions

For the owner (mine, all passes): what work and how much; who it's for; "alike" = alien?; work in colour; music as work or atmosphere; will Adam draw the strokes; station name; **does he want to choose what shows in office hours vs night; where is the station (a real place sets the sun); receipts or one piece per link.**

For the team: does a receding shadow read as a hand on a tall phone (visual); does the night sky read as an instrument (visual); stars-as-work vs dots-as-alien (visual); is the midday length floor an acceptable cheat, and may twilight point at nothing (director).

## Next

- Read the pass 2 turns from visual and director.
- After the jam: write `jobs.md` — J1–J14 with flows, including the timetable, the clock and the receipt if they survive.
- Then the "how it works" half of each concept in `concepts/`.
