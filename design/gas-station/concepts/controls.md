# Controls — how you move and look

*Systems. Written from `owner.md` sections 24, 27, 28 and 30. This is the spec to change the prototype from. A working copy of every rule below, on crude boxes, is `sketches/controls-test/index.html` (serve `sketches/`, open `controls-test/`); take the code from it. It replaces "drag to look, hold to walk".*

His words:

> "I dislike press and hold. It should do pinch to zoom in and out and swiping should rotate camera"
> "Pinch out zooms in pinch in backs up like photos"
> "It would be cool for phone gyro to move me around camera wise"

## The whole of it

**One finger turns you. Two fingers move you. A tap goes there, or uses the thing. Holding a finger down does nothing.**

- **Swipe:** you look the way you swipe. You turn; you never move.
- **Pinch:** you move along a straight line toward whatever was between your fingers when they landed, or back away from it. You never turn.
- **Tap:** a thing you're standing at answers. Anything further off, you're taken there.
- **Tilt (phones):** turning the phone turns the view by the same angle.

There is no walking speed on a touch screen any more. You are moved as far as your fingers say, while they say it.

## Pinch

What it is: **moving you, not narrowing the view.** The thing between your fingers grows as your fingers part, the way a photo does, because you are getting closer to it. The lens never changes.

**The anchor.** When the second finger lands, take the point halfway between the two fingers and find what is under it:

| Under the point | Anchor distance `d` | You stop |
|---|---|---|
| A thing, a wall, a door | Level distance from you to that point on it | 0.9 m short of it |
| The ground, within 100 m | Level distance to that spot | Nowhere: you can stand on it |
| Sky, horizon, or ground further than 100 m | 40 m, straight out in that direction | Nowhere |

The line you move on is the level line from where you stood to the anchor. It is fixed for the whole pinch. The anchor does not change if the fingers drift.

**How far.** `s` = finger spread now ÷ finger spread when the pinch began. `D` = `d` held between 3 m and 40 m.

- Pinch out (`s` > 1): forward by `D × (1 − 1/s^1.5)`.
- Pinch in (`s` < 1): back by `D × (1/s − 1)`, never more than 30 m.
- Worked from the fingers' start each frame, so it is live and reversible: part them and close them again and you are back where you were.

In hand: an easy pinch out (fingers 120 px apart to 330 px) covers about three quarters of the way to the thing. A small one covers a third. Far things come fast and the last metre is slow, as zooming a photo is. Pinching in on a thing 5 m away puts it about 14 m away.

**Feel.**
- Nothing happens until the spread has changed by 4%; then it counts from there, with no jump.
- If the fingers land less than 60 px apart, treat the start as 60 px.
- The view follows the fingers with a very short lag (it closes two thirds of the gap every 60 ms). No coasting after the fingers lift. You stop when they stop.
- The view does not turn or tilt during a pinch. The phone's tilt is ignored for as long as two fingers are down.
- When one of the two fingers lifts, the other does nothing until it lifts too.

**What stops you.**
- The thing you pinched on, 0.9 m short. Keep spreading and the view leans in up to 25 cm more and comes back when you let go. That is the end of it, like a photo at full size.
- Anything else in the way going forward: you slide round it as walking does now; if you can't, you stop.
- Anything behind you going back: you stop dead. No sliding backward.
- A doorway on the line: you stop at it, 0.9 m short, whatever you pinched on. See the door.

**Chained.** Each new pinch takes a new anchor from wherever the fingers land. Measured on the test page, with easy pinches: road to the door, 3 pinches and one more to go in. A pump from 15 m, 2. The 28 m aisle, 3. Out into the desert, over the edge and back to the station, 8.

**Rejected**
- **Narrowing the view** (a true zoom, standing still). It is the literal photo, and you could never get through the door.
- **A mix** (move, and narrow a little). Two things changing at once; the dots are sized to the screen, so the drawing would re-dot every pinch.
- **Moving along the centre of the view.** A photo zooms on your fingers, not on its middle. You would have to turn to face a thing before every pinch.
- **A fixed distance per pinch.** Six pinches to the door and forty to walk off and back.
- **Stepping between set spots.** He said "walk around".
- **Two fingers also turning.** Nearly every pinch is lopsided (a still thumb, a moving finger), so the midpoint moves and you'd turn by accident.
- **Tilting to keep the thing under your fingers.** Pinch on the ground and you would arrive staring at your feet.

## Swipe

- One finger. Starts after 10 px of travel; counts from there.
- **You look the way you swipe.** Swipe right and you turn right; swipe up and you look up. He tried the first version of this spec, where the picture followed the finger, and said: "Swiping is backwards." Left and right now match the first walkable prototype, which he called fluid.
- **Up and down is the one unsure part.** That first prototype had finger-down-looks-up, the opposite sense to its own left and right, and he has not spoken about up and down by itself. The spec uses one sense for both. Switches on the test page: `turn=follow` (picture follows the finger both ways, the version he called backwards) and `updown=follow` (only up and down follow the finger, as the first prototype did).
- **A swipe the full width of the screen turns you a quarter turn (90°). A swipe the full height tilts you 60°.**
- Tilt limits: 75° up (the top of the sign from its foot), 60° down (your feet). No limit round.
- **Let go while moving and the turn carries on briefly:** it starts at the finger's speed and halves every 0.12 s. Any touch stops it.
- **The view stays where you leave it.** It does not level itself. (This removes "stop, and the view levels"; see contradictions.)

## Tap

- A tap is one finger down and up within half a second, having moved less than 10 px. A finger held longer, then lifted, is nothing.
- **On a thing within 2.5 m:** use it.
- **On a thing further off, up to 40 m:** you're taken to 0.9 m short of it, along the straight line, sliding round what's in the way. (In the real build: to its standing spot, turned to face it.)
- **On the ground within 40 m:** you're taken to that spot.
- **On the sky, or anything past 40 m:** nothing.
- The move takes distance ÷ 10 seconds, never under 0.3 s or over 2.5 s, starting and ending gently. Any touch stops it where you are.
- Tapping is the one-handed way to move. Pinch needs two fingers; nobody should need two hands.

## The door

"Keep walking into it for a second" had a hold behind it. Now:

1. **Anything that would carry you through a doorway stops at it,** 0.9 m short: a pinch, a tap, a key held down. You are at the door.
2. **The next thing you do toward it takes you through:** a new pinch out (as soon as it passes ×1.15), a tap on the door, Enter, or the forward key held for half a second.
3. The stroke crosses the screen (about a third of a second), and you are put 1.5 m inside, facing as you were. Going out is the same.

- One pinch never goes through. A pinch that stopped at the door has to be let go first. (So a trackpad's coasting scroll can't blow through it either.)
- **At midday the door is off the latch:** rule 1 is skipped and a pinch or a tap carries straight through, stroke and all.
- Pinching in never takes you backward through a doorway. You stop with your back to it.
- The opening into the aisle has no door and no stop.
- Each crossing adds one step to the browser's history. Back, and Escape, put you 1.5 m outside the last door you came through, facing out.

## Tilt: the phone turns the view

- Turn the phone left or right and the view turns by the same angle. Tip its top toward or away from you and the view tilts by the same angle. Rolling it does nothing; the horizon stays level.
- **It agrees with the swipe:** turn the phone right, or swipe right, and you look right; tip it up, or swipe up, and you look up.
- **It is added to the swipe; neither wins.** There is one direction you face, and both push it. It is relative: wherever the phone points when tilt starts is where you were already looking. So a swipe is how you re-centre: turn the view with a finger and the phone's "ahead" has moved with it. Nothing to reset.
- **Slack:** the view ignores the phone until it has turned 0.75° from where the view last followed it, then follows exactly. A hand's tremor does nothing; a slow drift in the sensor does nothing you'd see.
- Same limits as the swipe. At a limit, tipping further does nothing, and tipping back answers at once.
- Ignored while two fingers are down, and re-based when they lift, so a pinch can't jerk the view.
- **Lying down, on a train, walking round a room:** it still works, because nothing is measured against north or level. Your steps don't move you; only turning counts. If the phone points nearly straight up or down (within 10°) tilt waits until it doesn't.

**Asking.** An iPhone will not give a page the motion sensor until the visitor taps and says yes.

| Device | What happens |
|---|---|
| iPhone | The word **tilt** sits in the margin beside the other two words. Tapping it is the ask (the phone's own dialog). Yes: it is on, underlined. No: the word goes and does not come back this visit. Nothing is asked on arrival; the place comes first |
| Android phone | On from the first frame, if the sensor answers within a second. **tilt** sits in the margin, underlined, and a tap turns it off |
| No sensor, or a desktop | No word. Nothing is missing |
| Motion turned off on the device | Off to begin with, on any phone. The word is there if they want it |

On or off is remembered. The margin now holds four things: sound, the hour, the list of places, tilt (phones only).

## Standing still

The place acts when you've stopped, so "stopped" has to be exact, and a hand is never still.

- **Still = you are not being moved and you have not used anything.** Moved means a pinch, a tap that takes you somewhere, a walking key, a wheel.
- **Turning never counts,** by finger or by phone. So tremor, the slack, a glance round: none of it matters to the clock. This was already the rule ("turning to look does not restart it"); tilt makes it necessary.
- The clock starts the moment the move ends. There is no levelling to wait for.
- A pinch that goes nowhere (you're at the wall) still counts as moving. So does a tap on a thing.
- "Nothing moves while you're looking straight at it" is worked from where the view points, however it got there.

## Every other way in

| | Turn | Move | Use | Door |
|---|---|---|---|---|
| **Mouse** | Drag: you look the way you drag, same amounts | Wheel: each notch is a pinch of ×1.25, anchored on the pointer. A new anchor after a quarter second without scrolling | Click | Click it, or scroll again after stopping |
| **Trackpad** | Drag, or a two-finger sideways scroll | Pinch (anchored on the pointer), or two-finger scroll up and down | Click | The same |
| **Keyboard** | Left, right, A, D: 90° a second | Up, down, W, S: 4 m a second, held. Holding a key is not what he disliked | Tab steps through what you can see, nearest first. Enter goes to it; Enter again uses it | Enter, or hold forward half a second. Escape: outside |
| **Screen reader, no pointer, no 3D** | — | The list of places (`00-shared.md`). Unchanged | Buttons | "The door" is a place |

Gone: holding the mouse button to walk; turning by pushing the pointer to the edge.

**Motion turned off.** Nothing travels across the screen:
- A pinch is a cut. Past ×1.25 you are put half-way to the anchor (or at its stop if that is nearer); under ×0.8 you are put as far back again as the anchor is. One cut per pinch.
- A tap that takes you somewhere is a cut. The door is a cut with the stroke as one held frame.
- A swipe still turns under the finger, because it only moves while you do; it does not carry on after. Tilt starts off.

Every job in `jobs.md` can be done by each column: arriving, reading the sign, going in, walking round and out, using things, standing still, walking off and back.

## What the page takes over, and what it leaves alone

**On the picture (the canvas) only:**

| The browser would | The page |
|---|---|
| Pinch-zoom the page | Takes it. `touch-action: none` on the canvas, and `preventDefault()` on `touchstart`/`touchmove`/`touchend` there (not passive). Safari's `gesturestart`/`gesturechange`/`gestureend`: prevented |
| Double-tap to zoom | Takes it (the same two lines). The margin's words get `touch-action: manipulation` |
| Ctrl + wheel / trackpad pinch zoom | Takes it: `preventDefault()` on `wheel` over the canvas (not passive) |
| Pull to refresh; rubber-band scrolling | Takes it: `overscroll-behavior: none` on `html` and `body`; the page never scrolls |
| Long press: callout, selection, magnifier, context menu | Refused, as now. A long press does nothing at all |
| Two-finger sideways scroll going back (desktop) | Takes it over the canvas (it turns you) |

**Left alone, always:**

- **The edge swipe for back** (iPhone, Android gestures). A page can't stop it and shouldn't try. Instead: a touch that starts within 20 px of the left or right edge is not ours, so nothing half-turns. And back is safe by design: it puts you outside the last door, or leaves the site if you never went in. No fake history entries.
- The bottom edge (home bar). Nothing of ours within 40 px of it.
- Keyboard zoom (Ctrl/Cmd + − 0), and every other shortcut with Ctrl, Cmd or Alt.
- The phone's own accessibility zoom.
- **The list of places, the loading screen and the no-3D page take over nothing.** Pinch zooms the page there as anywhere. Do not set `user-scalable=no` or `maximum-scale`.
- Viewport: `width=device-width, initial-scale=1, viewport-fit=cover`.

**Fingers: touch events, not pointer events.** The first version read fingers from pointer events and counted downs and ups. Swipe worked on his iPhone (Safari); pinch did not. So:

- On a touch screen, work the gesture out **from `e.touches`, the whole list of fingers down, on every `touchstart`, `touchmove`, `touchend` and `touchcancel`.** Two or more in the list: pinch (start it there if it hasn't started). One: swipe. None: end. Never keep your own count. iOS Safari is known to swallow a second finger's start when it suspects a double tap, and to deliver pointer events in odd orders during a pinch (WebKit bugs 246313, 211521, 203237); a list that is re-read every event can't go stale.
- Pointer events are for the mouse and pen only (`pointerType !== 'touch'`).
- Safari's own `gesturestart` / `gesturechange` / `gestureend` are always prevented. They also carry the spread as `e.scale`: use it to drive the same pinch **only** when the touch list is not showing two fingers.
- **The page, not just the canvas, refuses the browser's zoom:** `touch-action: none` on `html` and `body` as well; a non-passive, capturing `touchmove` listener on `document` that prevents default; the same on `touchstart` when more than one finger is down; `dblclick` prevented. (The list of places and the no-3D page are other pages and keep their zoom.)
- A third finger is ignored. `touchcancel` ends the gesture as if the fingers lifted.
- **`#debug`** on the test page shows, top left: fingers the page sees, the gesture, the last events, page zoom, whether motion is reduced. One screenshot of it says why something failed. Keep it in the prototype.

## States

| State | What happens |
|---|---|
| **First arrival** | The place, and in the margin two words: **swipe · pinch** (and **tilt** on a phone). Each word goes when you've done it. A mouse sees **drag · scroll**; the first key press swaps them for **arrows · tab · enter**. Nobody is stuck without them: the first thing anyone tries is a tap or a drag, and both work. A tap on the station from the road takes you to the door |
| **At a wall or a thing** | The pinch ends 0.9 m short, leans, comes back. Pinch in to back off, swipe to turn |
| **At the door** | Above |
| **At the world's edge** | Nothing to see. A pinch that crosses 130 m carries on from the far side. Backing over it works too: you keep backing, and the station comes past you from behind |
| **Indoors** | The same. Things are nearer, so pinches are shorter by themselves |
| **In the dark** | The same. You can pinch or tap on something you can't see; you still stop at what is there |
| **Looking straight down or up** | A pinch moves you the way you face |
| **Two fingers, then a third** | Ignored |
| **The page is hidden mid-gesture** | The gesture ends; you stay where you were |

## What used to lean on the lamp

The lamp is out (`owner.md` 28, `steer-5.md`). **Nothing above depends on it.** For the record, what in the controls did:

- "Drag to look *and aim*": on a phone the lamp sat under the finger. A swipe now only turns.
- On a desktop the lamp followed the pointer. The pointer now does nothing until pressed.
- Keyboard: "the lamp is the focus". The focused thing needs its own mark now, at every hour (visual: a heavier outline; unsolved in the dark).
- Standing still: the lamp closing was the first sign. Stillness now shows only from the stars on.

What the controls do touch is **your shadow**, now cast by any real light (`lights.md`): it is worked from where you stand each frame, so it slides with a pinch and needs nothing from the controls. A swipe or a tilt doesn't move it on the ground; it moves in the picture as the picture turns.

## Numbers in one place

| | |
|---|---|
| Stop short of a thing | 0.9 m |
| Lean past the stop | up to 0.25 m |
| Anchor held between | 3 m and 40 m |
| Pinch out | `D × (1 − 1/s^1.5)` |
| Pinch in | `D × (1/s − 1)`, at most 30 m |
| Pinch dead zone; smallest start spread | 4%; 60 px |
| Follow lag | 60 ms |
| Swipe | width = 90°, height = 60°; starts at 10 px |
| Tilt limits | 75° up, 60° down |
| Carry-on after a swipe | halves every 0.12 s |
| Tap | under 0.5 s, under 10 px; use within 2.5 m; go within 40 m |
| Tap travel | 10 m/s, 0.3 s to 2.5 s |
| Door | stop 0.9 m short; ×1.15 on a new pinch; land 1.5 m in |
| Phone tilt | 1 : 1, slack 0.75° |
| Keys | 4 m/s; 90°/s; door after 0.5 s |
| Wheel | ×1.25 a notch; new anchor after 0.25 s |

**Tune first, on his phone, in this order:** the pinch-out power (1.5; 1 is exactly a photo and feels slower), the swipe amount (90° a width), up and down on a swipe. The test page takes `#k=1`, `#turn=follow` and `#updown=follow`.

## Not proven

- **Swipe has been in his hand** (iPhone, Safari): "Swiping works great l r and u d". **Pinch has not worked on his phone yet.** The first version failed there; the cause was not seen, only inferred (above). The rebuilt version was checked in desktop Chromium three ways: real multi-touch TouchEvents sent through the browser's debugging channel, with the two fingers landing one after the other; a second finger whose start never arrives (only moves listing two fingers); and Safari's gesture events alone with no touches. All three move you as the sums say. None of that is iOS Safari. Only his phone can confirm it, and say anything about how it feels.
- Tilt has not run on any phone. Emulation has no sensor.
- The test page leaves out: the 20 px edge rule, the mouse and keyboard hint words, standing spots and facings for taps, Tab, and everything that isn't moving. Its things are boxes and "use" just flips one black or white.
- How the drawing takes being crossed at this speed. A pinch covers 25 m in the time it takes to part two fingers, and can be rocked in and out. The dots that change with distance will all change in that time. Visual to judge.
- Footsteps: twenty metres in half a second can't be twenty-five steps. A sound question, not started.
