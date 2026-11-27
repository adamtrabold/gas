# Shared by every concept — how it works

Systems turn 1 of the concept phase. Four concepts follow (01–04). This file holds what they have in common, so each concept file only says what is different.

## The four, and how they differ in kind

| | The idea lives in | What the hour does | What you are |
|---|---|---|---|
| 01 Nobody's here | The door and the room behind it | Changes light, sound and odd things. Nothing else | The one who turned up |
| 02 The Arrow | The sign and the ground | Chooses which thing in the place is awake | Someone reading a clock without knowing it |
| 03 Your light | Your own hand | Decides whether you are a shadow or a lamp | The only light that moves |
| 04 The makeover | The months, not the hours | Changes light and sound only | A caller at a place being worked on |

01 and 02 are the two answers to the owner's one open question (does the hour do something, or only change the look). 03 and 04 come from his answers, not from the jam. I think 04 may be a layer on another concept, not a concept; I say so in its file.

## The director's closing directions, against the owner's answers

The director wrote them before the answers in `owner.md` sections 2–5. The owner's words win.

**Kept**
- Ink is where the light isn't. Mass before line. The light says where and which way; the hand says how. ("pure ink for now")
- Five gestures: Look, Cross, Pick up, Call, Wait. A latch at the door, never a puzzle.
- The real hour is the hour. Only the wall clock moves it, and it says so.
- Evidence, never the creature. ("it should feel liminal not funny"; alien confirmed)
- Nothing needed is hidden behind a time, a wait or a secret.

**Changed**
- *Which station.* The director split it: streamlined for The Instrument, plain box for Nobody's here. The owner answered: "Route 66 but there's gotta be a googie arrow sign and it should have some elements of that era in places." So every concept is a plain Route 66 station with one Googie thing, the arrow sign, carrying his name ("Me"). The raking beam survives only as the arrow itself (02).
- *The five moments.* Were: arriving, crossing the door, inside with the work lit, one piece held, the list. The work is parked ("let's not worry about the work right now I just want to nail the world"), so they are now: **arriving; crossing the door; inside; doing nothing; another hour.**
- *Who it's for.* The jam designed for someone hiring. The owner: "mainly it's for me." So each concept has to say how Adam keeps making it into something.

**Dropped**
- The timetable, the piece of the hour, pieces taking turns by date. Parked with the work.
- The receipt and the office-hours ordering. Owner: "no" to both.
- A real latitude and place. Owner: "nowhere in particular." The sun is a generic desert sun.
- The board (director's optional third). It was there to show what "threejs" gives up; the owner has since said he wants to export Blender models. Its one live idea, showing the working, moved into 04.
- The streamlined station.

## Structure common to all

**The world is three kinds of part.** This is what makes jobs 13 and 14 possible, so it is the same everywhere.

- **Stops.** A small number of composed places the camera can be. Back always means the previous stop.
- **Things.** Everything you can act on. Each thing has: a stop it belongs to and a slot there; a shape; what it does for each gesture it accepts, as an ink mark and a sound; optionally, hours when it behaves differently.
- **Cues.** Anything that happens without you. Each has a *when* (an hour, a date, how long you've been still, an alignment) and a *what* (a light, a sound, an event).

Adam adds one thing or one cue and nothing else changes (job 13).

**Every thing says how finished it is** (job 14): a generated stand-in shape with generated strokes; his own drawn strokes on a stand-in shape; his own Blender model with his own strokes. One thing can move up a stage without touching another. One shared sheet of brush marks feeds every stroke in the world, so swapping that sheet for his own changes everything at once.

**One address for now.** The site opens on the road, outside (job 11, and "place first"). Going in does not change the address a person would share; the back button still steps you out. Addresses for the work come with the work.

**The margin.** Outside the picture, as production notes: sound on or off, the way out, the hour (and "wound" when the clock has been turned). Nothing else. No menu on the picture.

**Room for the work later** (jobs 15–19), so nothing has to be rebuilt: shelves inside take things you pick up; the counter takes who he is; the phone takes getting in touch; the blank slats of the price board take the list; the margin takes the fast way.

## Sound, common to all

The owner: "we need sound effects at least."

- Three layers: the **bed** (the place's own sound at this hour), **answers** (one per act), **events** (cues).
- Starts with your first touch, never before. One switch, in the margin. Off is visibly off.
- **Every answer sound has an ink twin.** A bell lands the word DING in the picture, flat, and it sits there a moment. So nothing depends on hearing, and the twin is the caption.
- Whether there is music is still "idk yet". The radio is a thing in the world either way; for now it gives static and a station fading in and out.

## States, common to all

| State | What you get |
|---|---|
| Loading | The sign and the name first, as page text and flat ink. The world arrives after. Nothing waits on it |
| No 3D | A still picture of the road stop at this hour (four are made ahead: dawn, day, dusk, night), and each stop described in a few plain lines with its things as ordinary buttons |
| Motion turned off | Cuts between stops. The light moves in steps |
| Sound blocked or off | Ink twins only |
| Keyboard | Tab goes through the things at a stop in a sensible order; Enter acts; Escape steps back |
| Screen reader | Each stop is a short description and a list of things. Cues are announced once, quietly, in words |
| Tall phone | The main canvas. Every stop is composed tall first |
| Wide desktop | The same stops, composed wide |
| First visit / nothing remembered | Complete. Memory only adds marks |
| Clock wound | Marked in the margin with the real time beside it. Lets go when you leave |

## What the browser remembers

Sound on or off, and the sightings chart. Concepts add to this where they say so. Clearing it loses nothing you need.

---

# Shared by every concept — how it looks and feels

*Visual turn 1 of the concept phase. Written after the owner's answers in `owner.md` sections 2–6, including the three that arrived mid-turn ("walk around"; sound "yes but idk how to even begin there"; public, "yes but no").*

## The pictures, and what they are

All in `concepts/stills/`. Tall phone first (300 × 650, saved at double size). One sheet per concept, plus each frame as its own file to look at on a phone.

| File | What it is | Made with |
|---|---|---|
| `sheet-01.png`, `01a`–`01d` | Nobody's here: arriving, the door, the counter, night | 2D drawing engine |
| `sheet-02.png`, `02a`–`02d` | The Arrow: forecourt in the morning, arriving at noon, night, inside | 2D drawing engine |
| `sheet-03.png`, `03a`, `03e`, `proto-arrive`, `proto-aim`, `proto-wait` | Your light: your shadow by day, three night frames, inside | 2D engine and the three.js prototype |
| `sheet-04.png`, `04a` | The makeover: three states of finish | 2D drawing engine |
| `sheet-walk.png`, `proto-dayroad`, `proto-daywalk`, `proto-walk` | Walking: views from spots nobody composed | three.js prototype |

Sources: `sketches/concepts/` (the 2D engine; `node render.js`) and `sketches/your-light/` (the prototype; serve the folder and open `index.html`, or `node render.js` for its stills). Both are throwaway.

**What these do and don't prove.**

- Every stroke is generated. The owner will draw them later ("draw but generate for now"). So the stills show where ink goes and how much of it, and they do not show a hand. Where strokes comb into even teeth (the door in `01b`, the jacket in `01c`, the shadow in `02a`) that is the generator, and it is the first thing his own marks would replace.
- The 2D stills are single composed views with real sun positions. They prove a picture can be made. They don't prove it survives walking.
- The prototype is real-time three.js with two values and no outlines. It proves the ink rule runs live, that you can walk in it, and that views from uncomposed spots hold. Its edges are frayed by noise in the screen, not laid as strokes on surfaces, so its brushwork is the weakest of anything here.
- Lettering is a system font standing in. No face is chosen.
- No sound exists in anything.
- Nothing is drawn wide. Every picture is a tall phone; desktop is undrawn.
- I could not open the owner's saved sign article or the Flickr pool (those hosts aren't reachable from this session). The sign is designed from the summary in `owner.md` and from what such signs generally were. It needs checking against his references by someone who can open them.

## The look, from his words

| His words | What it means on screen |
|---|---|
| "pure ink for now" | Two values. Every pixel is ink or paper. No grey, no fades. A light that dims gets smaller; it doesn't get fainter |
| "somewhere in the middle. I want them readable but note precise or always whole" | Strokes with a swell and a taper. The bristles part toward the end of a long stroke. A few strokes are simply missing. Shapes stay readable because masses are big, not because edges are clean. Never an outline drawn round a thing |
| "Route 66 but there's gotta be a googie arrow sign and it should have some elements of that era in places" | A plain stucco box with two painted stripes. One showpiece, the arrow sign. A few small period things: the starburst on the pylon, the lamp shades, the pump globes, the clock |
| "it should feel liminal not funny" | Nothing winks. Words land flat and sit there. Nothing of the alien is ever drawn except what it left |
| "place first" | The first picture is the road, the station, the sign. No title, no menu, no instruction |
| Whose name: "Me" | TRABOLD on the sign, one letter to a lit box, stacked down the pylon |
| "walk around" | See "Walking" below. It changes more than anything else here |
| "yes but no" | His name is on the sign and nowhere else. No credit line, no contact note |

## The rules of the drawing

1. **Ink is where the light isn't.** Shapes are made by shadow meeting light. A sunlit wall against a sunlit sky has no edge between them (`01a`, `proto-daywalk`): the station exists by its paint, its openings and its shadows.
2. **Two blacks.** *Shadow* is brushed, moves with the light, and is laid in the direction the light travels. *Paint* is flat and hard and never moves: the stripes, the arrow, the lettering, the door card. The eye can tell what a person made from what the sun made.
3. **The light source sets the stroke.** Sun: parallel strokes, all leaning one way. Lamp: strokes of paper laid away from the lamp. Stars: one stroke each, laid round the still point of the sky, as long as the night is old.
4. **In shade, near things get a paper line; far things are lost.** Losing things is allowed. It is most of the mood.
5. **Dots.** A regular row of dots is bulbs. A loose cluster is the alien material. Nothing else is made of dots.
6. **Words that land** (DING) are slab letters known only by the ink they throw, after the owner's HONK image. No burst, no exclamation mark (`01b`).

## The sign

In every concept: a pylon by the road, the name in separate lit boxes stacked down it, a flat painted arrow with a row of bulbs, a starburst on top. In 01, 03 and 04 the arrow dives at the door. In 02 it rakes up over the forecourt.

Stacking the name is what makes the place work on a tall phone. A low wide station is a stripe on a tall screen, however it's framed; the sign is the vertical. In `01a` the station takes about a tenth of the height and the picture still holds, because the sign carries the top two thirds and the lot carries the rest.

## Walking

The owner: "walk around". The concept files were written for a few composed views and need reworking by systems (noted in each file). What it means for the look:

- **It holds.** `proto-daywalk` and `proto-walk` are views from places I picked by walking, not by composing. Big flat masses and lost edges survive a bad angle better than detail does. This was my main worry and the prototype answers it for the masses. It doesn't answer it for brushwork.
- **A phone sees a narrow slice.** A tall screen shows about 34° of width. From the road a pump is 20 pixels wide. So on a phone, walking is how you frame things, and anything that matters has to be worth walking up to. Nothing can depend on being read from across the lot.
- **Brushwork swims when you move.** In the prototype the frayed edges are attached to the screen, so they slide over the world as you walk. Two things hide it for now: the picture is redrawn about twelve times a second and held, like drawn animation, and the edges re-settle only a few times a second. The real fix is strokes that belong to the surfaces, which is also what the owner's own textures on Blender models would be. Unbuilt. This is the biggest open risk in the look.
- **Composed pictures still exist, as places you come to rest.** Where you're put down on arrival is composed. The door is still one stroke across the screen. And when you stop walking, the view should settle and level over a second or so, so that standing still always gives a picture worth having. Standing still is already a gesture here (Wait); this gives it a look.
- **Moving on a phone:** drag to look, hold to walk toward where you're looking. In the prototype. Untested with real thumbs.
- **Eye height, always.** Nothing in any concept needs the camera above head height. My jam finding that the ground dial needs a high camera still stands; it is why 02 changed.

## Feel

- At rest nothing moves. No wobble, no boiling line. Stillness is the liminal part.
- Anything that happens is drawn in a few held frames, not eased.
- Crossing the door is one loaded stroke dragged across the screen with the other side behind it.
- With motion turned off, moves become cuts and the light moves in steps.

## Sound: a place to begin

The owner: "yes but idk how to even begin there." A way in that follows from the drawing, so it isn't a second design:

- **Every light has a sound, and the place's own sound is the sum of the lights that are on.** By day that is one light, the sun: wind, and heat ticking in metal. At night it is the lamps: the sign's buzz, a relay click as the bulbs run, a tube's hum. Under stars alone, almost nothing.
- So the bed needs four recordings to start: wind, a sign buzz, a tube hum, the click. Plus one bell.
- Sound follows ink the same way a landed word does: when a light comes on, its sound comes in; when it closes, the sound goes.
- He is a musician, so one option worth offering him: the bed is a single held tone whose pitch follows the height of the sun. Low at dawn and dusk, highest at noon, gone at night. It would make the hour audible. That's his call, and it can wait.

## Where his own drawings and models go in (job 14)

- **Strokes:** one sheet of his brush marks (about forty) replaces the generated stroke shapes everywhere at once.
- **Models:** masses come from light falling on shape, so an untextured Blender model already draws correctly. Nothing is lost while a model has no texture.
- **Textures:** in this world a texture is *paint*: stripes, lettering, labels, wear. Flat black on the model's surface, his to draw. That is the second black in rule 2, and it's the natural thing to export from Blender.

## Needs reworking by systems (all concepts)

- Stops become places you can walk between; "back always means the previous stop" no longer describes anything.
- Keyboard, screen reader and no-3D need a version of walking: probably the old stops, kept as named places you can jump to.
- "The margin" loses the way out; a walked world has a door.
- The public page carries no note of whose it is beyond the sign.
