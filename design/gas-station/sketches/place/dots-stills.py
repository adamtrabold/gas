# python3 dots-stills.py -> concepts/stills/dots-*.png. Saves each frame in out/ as it was drawn, in 8 shades (ink, paper and the paper's grey; about 0.5 MB a frame instead of 3 to 4). Nothing is composed or lettered.
import os
from PIL import Image
here = os.path.dirname(os.path.abspath(__file__)); out = os.path.join(here, 'out'); dst = os.path.join(here, '..', '..', 'concepts', 'stills')
TRIM = {'together-day': 300, 'together-night': 300, 'together-night-reversed': 300, 'your-shadow': 380}   # rows of empty sky taken off the top
for f in sorted(os.listdir(out)):
    if not f.endswith('.png'): continue
    im = Image.open(os.path.join(out, f)).convert('RGB'); t = TRIM.get(f[:-4], 0)
    if t: im = im.crop((0, t, im.width, im.height))
    im.quantize(8, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE).save(os.path.join(dst, 'dots-' + f), optimize=True); print(f, im.size, round(os.path.getsize(os.path.join(dst, 'dots-' + f)) / 1024), 'KB')
