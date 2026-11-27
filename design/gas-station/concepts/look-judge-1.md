# Look judge 1 — design director

Not a concept score. A judgement of the look test (`look-test.md`, `stills/look-test.png`, the `look-*` stills, and the prototype at `sketches/place/index.html`) against the nine outcomes in `steer-3.md`, his pictures, and what he has said since (`owner.md` 9 to 12).

## Verdict: fix first, then send the pump only

A short fix list on the pump and on what the link opens to. Not another round. Then it goes to him as a decision question, labelled as a test.

Why not send now: the first thing he said last time was "pixellated", and there are stepped edges in this build that he would see in the first ten seconds. And half of the pump, the lit half, is nearly blank, which is the thing he has now asked for three times in different words. Sending it as it is would spend his look on finding those two things again.

Why not hold it longer: the direction is right, it's a real change, and which of the three ways to draw is a choice only he can make. He asked for elements one at a time. One element, honestly labelled, is what he asked to see.

## How I checked

- Read `look-test.md` and `owner.md` 10 to 12.
- Looked at `look-test.png` and the single stills.
- **Opened the prototype myself** in Playwright's iPhone 14 emulation, nothing overridden: 3 dots per point, canvas 1170 × 1992 confirmed from the page. Eight routes (`#pump-pen`, `#pump-brush`, `#pump-paper`, `#lot-brush`, `#lot-pen`, `#lot-brush-night`, `#brush`, `#brush-night`), a frame on arrival and another after holding to walk for 2.5 seconds. Looked at the captures at full size.
- Limits, the same as before and they matter more now: software rendering, stills, no real touch. I can't see the long-press callout, shimmer in motion, or frame rate. Only his phone can.

## What is really better

I want this said plainly, because it is a different drawing from round 3.

- Shade is made of lines now, and a shadow ends where its lines end. The pump's cast shadow feathering along the ground is the first shadow in this project that looks drawn.
- There is a contour with weight, heavier on the shadow side.
- The pump is a thing: dial with numerals, counter, rivets, seams, hose, globe on a neck. At arm's length there is something to look at.
- The globe in pen is hatched round and reads as a ball.
- It draws at the screen's own density. The cause of the blockiness (a cap of 2 on a 3-dot screen, and my own fallback with no floor) is found and removed.
- Neither option looks like a photograph reduced to two levels any more.

## Against the nine outcomes, harder than the designer's own read

| Outcome | Designer says | What I see |
|---|---|---|
| 1 Four or more darknesses, made of marks | Yes in the together frames | **On the pump alone, no.** The body has two: a lit face that is nearly bare and a shaded face that is heavy. Brush especially: big black slabs with slivers of paper. That is still two zones with a border, which is his word "posterized". The globe in pen is the one place tone turns gradually |
| 2 A shadow's edge is its lines stopping | Yes on surfaces | Yes on the ground. On the pump body the lit and shaded faces meet at a ruled vertical edge |
| 3 Solid black last | Yes by day | Roughly. Under the canopy in brush (`#lot-brush`) the strokes are so broad that it reads as black with paper stripes, not paper with ink strokes |
| 4 Marks follow the form | Mostly | Ground and globe yes. The body's hatching is one diagonal across a face, the same lean everywhere. It doesn't describe the round shoulder |
| 5 A texture per material | Eight | **On lit faces almost none shows**, except in paper. In pen and brush, steel in sun is blank with two or three faint streaks. "Detail via texturing" was his clarification. In paper the steel has a brushed grain and the pump is a far richer object |
| 6 Line with weight | Yes, less bold than Kirby | Agreed. It is the right kind of line |
| 7 More the closer you get | Yes on the pump | Yes for things to find. The lit face at arm's length is thin, as the designer says |
| 8 His other words | Kept | Pen's crosshatch is a regular grid: it reads as window panes on a tower, mechanical, not "a hand". Brush is nearer a hand. "Liminal": `#lot-brush` by day is loud |
| 9 Smooth at the pixel | Yes in capture | **Not everywhere.** At full size in my captures: a stepped notch on the pump's shoulder where the shade crosses it; stair-stepped silhouettes on the oil rack and the pump plinths in `#lot-brush`; shadow stripes on the slab with stepped sides; and in the arrival view (`#brush`) the station's outlines are broken double dashes and the mesas are blocky. Some of these are 15 to 20 points across. He will see them |

## Beside 16, 17 and 13

- Beside **16 and 17**: I agree with the designer, and would go further. Kirby never leaves the lit side of a thing empty. A lit face in 17 carries its seams, its panel lines, a few feathered marks at the turn, and the texture of what it's made of. Ours carries a dial and rivets on blank paper. And Kirby's shade is short feathered strokes of many lengths coming off a contour; ours is one field of parallel lines corner to corner.
- Beside **13**: brush is the right family. 13's strokes curve, overlap, and vary from hairline to blot within a thumb's width. Ours are straight, parallel and one width.
- Beside his own description in section 11 (scanned papers, greyscale, multiplied, applied to each face): **paper is the only option that does what he described**, and on the pump it is the best of the three. On the open ground it shows a repeating pattern into the distance that looks like a rendering fault.

## One thing that got worse, and it matters

After round 2 he said things were "hard to really make out". In `#lot-brush` by day, the right-hand pump stands in shade in front of a shaded wall, and both are drawn in the same broad diagonal stripes. The pump disappears into the stripes behind it. That is his round-2 objection back again in a new form. It's a reason not to show the together views yet, and something the next element (canopy, wall) has to solve: a thing in shade in front of shade needs to differ from it in marks, not only by its outline.

## Fix first (all on the pump, or on the link)

1. **Texture on the lit faces**, in every option, not only paper. Steel in sun should still say steel: its grain, wear, a few marks where the form turns. No face of the pump blank at arm's length.
2. **Tone that turns.** On the pump body, at least three steps between the lit face and the core of the shade, arriving across the round shoulder, not flipping at a ruled edge. Marks on the body should follow its form the way they do on the globe.
3. **No steps.** Every stepped edge on the pump gone at 3 dots per point: the notch on the shoulder, the plinth, the contour where it meets the cast shadow. Check by zooming a real-density capture, not by eye at page size.
4. **The paper option without the pattern on the ground.** Build the mix the designer already recommends: grain on things; open ground and sky plain.
5. **The link opens on the pump and shows only the pump.** Not the arrival, which is still last round's look with blocky outlines, and not the lot, wall or ground. If those stay reachable, they sit behind a plain label saying they aren't redrawn yet. He should not be able to land on the old look by accident and judge the new one by it.

I don't need to see it again before it goes, provided the designer can show 1 to 4 in three real-density stills of the pump (one per option) and says so. If one of them can't be done quickly, send it anyway and tell him which.

## Answers to the designer's questions and disagreements

- **Flat paint staying flat** (lettering, the arrow, the hose): yes. Hard letters on a soft world is Ruscha, and it's in 04, 06 and 07. But the hose is not lettering. It is an object and should be drawn like one.
- **Is the open ground too empty by day?** For now, no. Quiet outside is right, and he hasn't said otherwise. The pepper of pebbles is a little even. Leave it until he's chosen a way to draw.
- **Stills and walkable together:** agreed, I was wrong to say stills first. Motion is where the next surprise is.
- **Keeping a fallback with a floor of 2:** agreed. "Fluid" is the one thing he has praised.
- **Following his elements over my one view:** correct. His word.

## What he should be told

- This is a test of how one thing is drawn. One pump, alone, on bare ground. It is not the station and not a candidate.
- The same pump is drawn three ways. He can switch between them, walk round it, and see it by day and at night in his lamp.
- Everything else in the place is still the old look and isn't in the link.
- Two faults he reported have been worked on and can only be confirmed on his phone: the blockiness, and press and hold bringing up copy and paste.

## What he should be asked

1. **Which way is closest: pen, brush, or paper?** Or a mix, for example brush with paper grain on things.
2. **On paper:** it puts real, gentle grey into the grain, which is what he described. Is that what he wants, or should grain only ever show as paper breaking through ink?
3. **Is this pump a pump he'd want standing there?** Shape, dial, globe.
4. **Is it enough detail now, at arm's length and from a few steps back?** If not, what's missing.
5. **Press and hold: does it only walk now? Is it still fluid? Any blockiness left?** And which browser or app did he open it in.
6. **Which element next?** I'd suggest the arrow sign, since it carries his name and is the first thing anyone sees.
7. **Would he scan three or four papers, and draw one pump himself?** Both drop straight in, and nothing we generate will be as close as his own.

## My own pick, and why

**Brush on paper: the brush strokes, with real paper grain on things and none on the open ground or the sky.** Pen's line kept for small hard detail only (dial, numerals, rivets, seams).

- It is the method he described in his own words.
- It is the only one of the three where a lit face has something on it, which is "detail via texturing".
- It is nearest "a black and white painting" and nearest 13.
- Pen's crosshatch reads as a grid drawn by a machine. Kirby's hatching is short, tapered and irregular; ours isn't that yet, and a regular grid is the thing most likely to shimmer on a phone when it moves.
- It will take his own scans and strokes most directly.

I've been wrong about his eye twice, so this is a pick to compare with his, not a recommendation to steer him. Don't tell him mine before he answers.
