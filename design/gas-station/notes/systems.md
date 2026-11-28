# Systems notes — gas station portfolio

Handover. Rewritten 2026-11-28 by the second systems designer (the first retired at heavy context). Read `owner.md` first, all of it; his words win. He wants **one question per message**, short, plain.

## Where things stand

One concept: **Left on** (`concepts/05-left-on.md`, how-it-works half is mine; `concepts/00-shared.md` for the place). Scored 9 by the director in round 3, sent back by the owner **on the look**, never on the idea. Since then the work has been element by element (`elements.md`, drawings by the visual designer, now shown in the prototype not as sheets), and in the last day the owner changed three things that are mine:

1. **Controls** (`owner.md` 24, 27): no press-and-hold; swipe turns; pinch out goes in, pinch in backs up, "like photos"; phone gyro turns the camera. → `concepts/controls.md` (the spec), `sketches/controls-test/` (a working copy on boxes).
2. **The lamp is out** (26, 28): "The light that follows where I look". Director's ruling: `concepts/steer-5.md`, Left on stands. Applied.
3. **"Lighting should work as in the real world"** (30) and **"we need to establish proper scene lights"** (31). → THE rule for light in both concept files; `lights.md` (every light, positions, reach, states).

Also done this turn: the sign's entry in `elements.md` rewritten from his three photos (29) and the article; element 10 struck; `jobs.md` flows reworded (no job changed); a dated note at the top of `concepts/coverage-05.md` (not re-run line by line).

I did not touch: the look-and-feel halves, the drawing-needs slots, `sketches/place/` (the visual designer implements the controls there after their current turn).

## Controls: what was decided and why

**One finger turns, two fingers move, a tap goes there or uses the thing; holding does nothing.**

- **A pinch moves you; it never narrows the view.** Anchor = what is under the midpoint of the two fingers when the second lands. You travel the level line toward it: forward `D(1 − 1/s^1.5)`, back `D(1/s − 1)` capped 30 m, `D` = anchor distance held to 3–40 m, `s` = spread ratio. Stop 0.9 m short of a thing or wall; ground has no stop. Live and reversible under the fingers, no coasting. Never turns or tilts.
  - Why: moving straight toward a point keeps it at the same place left-to-right on the screen, and its size grows with the fingers. That is the photo feel, and it gets you everywhere. Multiplicative, so far is quick and near is fine.
  - Power 1.5 on the way in is a guess to cut the pinch count (road to door: 3). 1 is exactly a photo. First number to tune on his phone.
- **Rejected:** narrowing the view (can't get through the door; the screen-sized dots would re-dot); a mix; moving along the view's centre (photos zoom on the fingers); fixed distance per pinch (40 pinches to walk off and back); stepping between set spots ("walk around"); two fingers also turning (pinches are lopsided, the midpoint drifts); tilting to keep the anchor under the fingers (you'd arrive staring at your feet).
- **THE RULE (settled, section 41): the picture follows the fingers; you drag the world.** One finger right → picture right → you turn LEFT. One finger down → picture down → you look UP. Two fingers right → picture right → you step LEFT. Pinch as before. Width = 90°, height = 60°; limits 75° up, 60° down; brief carry-on. Track is exact: the thing between the fingers stays between them (≈0.6 × D per phone width). **History, do not flip again:** v1 (follow both) → "Swiping is backwards" (33), which he later called answering wrong; v2 (right→right, up→up) and v3 (right→right, down→up, the station's sense) each tried; of v3: "Left and right are still backwards I think I answered wrong earlier as is the tracking but otherwise is great" (41). Final = v1's swipe + follow-tracking. The station prototype's left–right is wrong by this rule and must change when the visual designer puts the controls in. Tilt keeps the window sense (phone right = look right) on purpose; keys move you the way the key points. Compare hashes: `#leftright=against`, `#updown=against`, `#track=against`.
- **The curve (section 42: "controls feel great now. Tracking feels a little slow and I feel like all moves could have curves… if I swipe faster it should shift more in space").** Directions confirmed; do not change them. (1) Tracking base gain ×1.5 of exact following. (2) One speed curve for turn, track, pinch: ×1 under 300 px/s (so slow = picture follows fingers exactly), linear to ×2 at 1500 px/s, capped; speed measured over the last 80 ms (event-to-event was wildly noisy and inflated slow moves; fixed). Pinch applies it to the log of the spread ratio. (3) Carry-on after a flick for all three, halving every 0.12 s, capped (60° / 100 px / ×1.4), stops at things, walls and doorways; a flick cannot cross the door. Reduce Motion: none of it. `#curve=off` to compare. Measured slow/fast/flicked: turn 43.7° / 76.7° / 137.6°; track 13.2 / 16.8 / 28.2 m; pinch 12.3 / 14.0 / 16.8 m. Timed in-page TouchEvents, not a hand. The pinch is no longer strictly reversible (fast out, slow back ends short), as with any pointer acceleration.
- **Two-finger swipe = track sideways** (section 40: "two finger swipe should track left and right"). Fingers right → the picture goes right, you step LEFT, facing unchanged (flipped at his word, 41). Pinch or track is decided once per gesture in the first 12 px (gap change vs sideways move of the midpoint; a lopsided pinch moves its midpoint half as far as its gap, so stays a pinch); never both. Up/down with two fingers does nothing. Stops at walls, no doors. Trackpad two-finger sideways and A/D now track (they used to turn; arrows still turn). `#track=against` reverses it. CDP-tested; the flipped sense not yet back in his hand.
- **Tap:** use within 2.5 m; go within 40 m (10 m/s, 0.3–2.5 s); the one-handed way to move, and the keyboard/screen-reader backbone. Kept from the old "go to".
- **Door:** two beats. Anything that would carry you through stops 0.9 m short; the next pinch (×1.15), tap, Enter, or forward key for 0.5 s crosses, with the stroke, landing 1.5 m in. One pinch never carries through (also stops trackpad inertia). Midday: off the latch, straight through. Never backward through a door. Replaces "keep walking into it for a second".
- **Tilt (gyro):** relative, 1:1, added to swipe (one heading, both push it; a swipe is the re-centre). Slack 0.75° so tremor and drift do nothing. Frozen during a pinch. Roll ignored. iPhone: the word **tilt** in the margin is the ask (system dialog needs a tap); "no" removes the word for the visit. Android: on from the start, word is the off switch. Reduced motion: starts off.
- **Standing still:** still = not being moved, not using. Turning never counts (it never did; tilt makes that essential). Clock starts when you stop.
- **Other inputs:** mouse drag/wheel (anchored on pointer, ×1.25 a notch), trackpad pinch, keyboard arrows at 4 m/s (holding a key is fine; it was the finger he disliked), Tab/Enter/Escape, list of places unchanged. Reduced motion: pinch, tap, door are cuts.
- **Browser:** take pinch-zoom, double-tap, ctrl-wheel, pull-to-refresh, long-press on the canvas only. Leave edge-swipe back (20 px edge margin is not ours; back = outside last door), keyboard zoom, accessibility zoom, and all zoom on the list/no-3D pages. Never `user-scalable=no`.
- **Discovery:** margin words **swipe · pinch** (· **tilt**), each gone once done. Taps and drags work anyway, so nobody is stuck.

**Pinch on a real phone (section 34–35):** he tried the test page on iPhone Safari: swipe "works great l r and u d"; "pinching doesn't work yet". I could not reproduce (no iOS here). The first version drove touch from pointer events with capture and a count of fingers down. Likeliest cause: iOS Safari not delivering, or mis-ordering, the second finger's pointer events (WebKit bugs 246313, 211521, 203237 describe a swallowed second start and odd pinch ordering); not proven. Fix: touch gestures are now worked out from `e.touches` on every touch event (no counting), pointer events are mouse/pen only, Safari `gesture*` `e.scale` is a fallback pinch when the touch list shows fewer than two, the whole page refuses zoom, and `#debug` shows fingers / mode / last events for a screenshot. If it still fails, ask him for a screenshot with `#debug` while two fingers are down. Another thing to rule out then: Reduce Motion on his phone makes a pinch jump in cuts (the readout says so). He has still said nothing about how pinch feels.

**Tested how:** Playwright with emulated touches on the test page, 390×844. Sums check out (road → door in 3 pinches + 1; pump from 15 m in 2; desert loop in 8; tap, tap through the door; swipe signs). **Not a hand. Tilt untested (no sensor).** Test page omits: edge rule, mouse/keyboard hint words, standing spots, Tab.

## Where I went against the concept or the director

Listed in `05-left-on.md`, "Where this goes against the concept as written":
1. Walking is no longer a pace on touch. "Nine seconds to the door", "4 m/s", "half a minute out and back" now describe the keyboard only. Footsteps need rethinking.
2. **I removed "the view levels when you stop".** `steer-5.md` keeps it ("the list starts with the view levelling"). My reason: with swipe and tilt the view is where the hand put it; a picture that drifts isn't "like photos"; you lose the name you tilted up to read. Director may overrule.
3. "Nothing needs an interface" now has margin words and the tilt ask.
4. Looking does nothing any more.
5. Margin has a fourth item on phones.

## Light: what was decided

- One mark of you: **your shadow, from any real light** (sun, canopy lamp, lamp post, a lit window's spill, a room light you switched on). None in shade, twilight, dark. What you switch on stays on, and is what gives you a shadow indoors and at night. The owner's rule answered the director's A/B question as B-by-consequence.
- "Drawn once" (18) squared with real light: a thing's own marks are fixed; the shade and shadow on it are real.
- **Table of everything the lamp did and what does it now** is in `05-left-on.md`. Left with nothing: any sign of you in full dark; seeing unlit things (now the dark drawing's job, in the prototype); stillness showing before 10–15 s; a lit way to the first cord at night; a focus mark for keyboard in the dark.
- **Table checking every light-thing against the rule** is in `05-left-on.md`. Deliberate exceptions for the director: the alien material (patch with no lamp, the light at four minutes, one left on); lights lost past 100 m; dusk's letter-a-second; the wall clock turning the sun; star tails. Flagged for visual: "dims = smaller not fainter", light "arriving in strokes", "paper edge in shade" are drawing rules from the brush rounds and want restating.
- New PROPOSED things I added, all need a look or a yes: **the moon (settled by him, section 32: "Yes there's a moon and it's always epic… exaggerated"; phase following the real cycle is floated, not decided)** written as: up every night dusk to dawn on a full moon's real path (east, south at midnight, west), about 15× real size, bright enough for a faint shadow of you in the open, never over the station (it would break real light; his call), moonlight through the south-facing door gives the first cord a patch at night; phase options A always full / B real phase always up (my lean, build this) / C fully real (against "always epic"); look is visual's. Also: the arrow's bulbs as the strong night light on the forecourt (flashes throw your shadow toward the door and reach the floor inside, where the first cord hangs); a blank lit plastic reader board on the sign; no wall lamps; phone box dark; west pump globe lit, east dead; sunrise/sunset times at 35° N with the visitor's clock read as sun time.

## The sign (element 5), as rewritten

Neon letters in dark boxes, one per box, stacked down a pole (his diver MOTEL photo does exactly this, so neon-vs-boxes is settled); each letter painted under a double-line tube (reads by day; the glow on the box face is what reads at night); bulb arrow bolted on the other side, hooked in at the bottom; stone base PROPOSED; blank plastic board PROPOSED; starburst dropped; flicker rule kept (one letter, a blink, never in the first seconds; only inner or outer tube dead). Left out and said so: a neon picture (all three photos have one), small neon words, script. **Job 2 at night** now rests on the name being readable from 21 m at phone size in the new dark: test before promising.

## Employee of the month, and no more sheets (sections 36–39)

- **New element, his words:** a framed EMPLOYEE OF THE MONTH on the wall, a portrait of Art Bell, plaque reading "Art". Added under element 14 in `elements.md` (drawing-needs slot untouched), one line in the front room in `05-left-on.md`, one row in `lights.md` (no light of its own; lit by the counter tube). PROPOSED by me: behind the counter beside the clock and chart; heading on a card in the frame; brass plaque ART; nothing else written; dusty, off level. Portrait drawn fresh in the place's hand, never traced. Nothing built on it (the radio does not play him).
- **"Sheet" is not his word and not a plan** (37): no numbered pages; the look is judged in the prototypes; the site is for prototypes and the logic/systems. Removed "Sheet 3" and "pump sheet" from my halves and `elements.md`. Old sheet files and the visual half's "stroke sheet" (a different thing: the texture) are untouched. He also wants each element shown as an embedded 3D view he can rotate (38): the site's and visual's job; `elements.md` stays the list. Nav words: "try", "elements"; lights may fold into the elements page (unconfirmed).

## Still true from before

- The lot: sign at the road, door 16 m north of it, canopy and pumps west, bench east of door, phone box off the slab east; arrive 21 m south of the sign. Reason: where a 12 m sign's shadow falls.
- Inside bigger than outside: real 8 m front room, then a 28 m aisle (14 bays), payphone and back door at the end; the door stroke hides the join. Back/Escape = outside the last door. Links land on the road.
- World's edge: lost past ~100 m; at 130 m you're put on the far side keeping your heading; centre is the sign's foot. Ground marks must obey the join.
- Standing-still list: stars 10–15 s (night, outdoors), first small thing 15 s, 45 s, payphone 2 min, light across the forecourt 4 min. Nothing moves while looked at; each once a visit; moving or using stops everything.
- "Who isn't here" = Adam, squatting; out, not hiding (proposal he hasn't checked).
- Sound plan: bed = sum of lights; eleven generated sounds; named slots he replaces. Nothing audible yet.
- No-3D / screen reader: the named places as a list. The shadow has no version there.
- Jobs 1–14 world, 15–19 parked. Never rewrite `elements.md` wholesale; visual fills its slots.

## Open with the owner (one at a time; orchestrator holds the queue)

1. ~~Is there a moon?~~ Answered: yes, epic, exaggerated. Left for him when convenient: its shape, A/B/C in `lights.md` (we build B unless he says); and whether it may hang over the station in the arrival picture (we've kept it real: behind you).
2. ~~Swipe and track direction~~ settled: the picture follows the fingers.
3. The blank board on the sign: yes or no. A neon picture: want one?
4. His things as squatter; "out, not hiding".
5. Brand names (he supplies). Flash-sheet vibes confirmed? Time of day "does something" (the concept answers it).

## Open with the team

- **Director:** confirm the exceptions list; rule on levelling; is fifteen seconds with no sign of stillness acceptable now.
- **Visual:** implement `controls.md` in `sketches/place/` from the test page; check the dots when crossed at pinch speed and rocked; the dark as a walkable drawing; the name at night from the road; a focus mark; shadows from lamps (nearer lamp only, PROPOSED); whether the arrow's flash reads as light or lightning.
- **Nobody yet:** footsteps at pinch speed; all sound.

## Next

- His feel of the controls on his phone (the test page can go on the site as it is: it needs `sketches/ink-is-shadow/vendor/three.module.min.js` beside it).
- Tune: pinch power, swipe amount, direction.
- Re-run `coverage-05.md` properly once the lights and the sign are agreed.
- Handoff "How it works" once the look is approved: from `05-left-on.md`, `00-shared.md`, `controls.md`, `lights.md`.
