# python3 sheet3.py -> concepts/stills/sheet-3/*.png. Sheet 3 is a web page (concepts/sheet-3.md): each drawing is one walked frame, saved as it was drawn. Nothing is composed, cut together or lettered here.
# All this does: take each frame from out/ (SHOTS=./sheet3-shots.js node look.js), trim empty sky off the top of the frames that have a lot of it (the pixels left are untouched), and save it in 8 shades
# (the drawing is ink, paper and the paper's grey; 8 shades keeps a frame near 0.5 MB instead of 3 to 4).
import os, sys
from PIL import Image
here = os.path.dirname(os.path.abspath(__file__)); out = os.path.join(here, 'out'); dst = os.path.join(here, '..', '..', 'concepts', 'stills', 'sheet-3'); os.makedirs(dst, exist_ok=True)
TRIM = {'together-day': 300, 'before-together-day': 300, 'together-night': 300, 'together-night-reversed': 300, 'before-together-night': 300, 'your-shadow': 380, 'before-your-shadow': 380}   # rows of blank sky taken off the top
for f in sorted(os.listdir(out)):
    if not f.endswith('.png'): continue
    im = Image.open(os.path.join(out, f)).convert('RGB'); t = TRIM.get(f[:-4], 0)
    if t: im = im.crop((0, t, im.width, im.height))
    im.quantize(8, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE).save(os.path.join(dst, f), optimize=True)
    print(f, im.size, round(os.path.getsize(os.path.join(dst, f)) / 1024), 'KB')
