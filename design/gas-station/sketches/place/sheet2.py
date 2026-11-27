# python3 sheet2.py -> ../../concepts/stills/sheet-2-island-canopy.png. Sheet 2: the pump settled in the owner's picks, the slab and island, the canopy, and the three together.
# A flash sheet assembled from frames of the walkable prototype (out/, made by `SHOTS=./sheet2-shots.js node look.js`). Nothing is drawn or retouched here.
# What this script adds that the prototype does not have: the sheet's own aged paper, captions, a ragged cut-out round each piece. Unlike sheet1.py the frames are laid on by
# multiplying (his method: "made them greyscale and multiplied onto the vintage color"), so the real grey of each part's paper survives onto the sheet.
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter
O='out/'; OUT='../../concepts/stills/sheet-2-island-canopy.png'; W=1170; rng=np.random.default_rng(7)
FD='/usr/share/fonts/truetype/'
mono=lambda s:ImageFont.truetype(FD+'liberation/LiberationMono-Bold.ttf',s); monor=lambda s:ImageFont.truetype(FD+'liberation/LiberationMono-Regular.ttf',s); head=lambda s:ImageFont.truetype(FD+'dejavu/DejaVuSerif-Bold.ttf',s)
def piece_of(name, box, w, h=None, fade=.1, exact=False):
    im=Image.open(O+name+'.png').convert('L')
    if box: im=im.crop(box)
    if h is None: h=round(w*im.height/im.width)
    if not exact: im=im.resize((w,h),Image.LANCZOS)
    a=np.asarray(im,np.float32)/255.; h,w=a.shape
    k=np.clip((a-.075)/(.905-.075),0,1.08)                  # 1 = the prototype's bare paper, 0 = its ink; between is the grey of a part's own paper
    yy,xx=np.mgrid[0:h,0:w]; d=np.minimum(np.minimum(xx,w-1-xx)/(w*fade),np.minimum(yy,h-1-yy)/(h*fade*.6)); n=np.asarray(Image.effect_noise((w,h),90).filter(ImageFilter.GaussianBlur(5)),np.float32)/255.
    m=((d+(n-.5)*1.6)>.5) if fade>0 else np.ones_like(a,bool)
    return np.where(m,k,1.)
items=[]
def text(x,y,s,f): items.append(('t',x,y,s,f))
def piece(x,y,arr): items.append(('p',x,y,arr)); return arr.shape[0]
def lines(x,y,ls,f=None,lh=25):
    for i,s in enumerate(ls): text(x,y+i*lh,s,f or monor(19))
    return len(ls)*lh
M=30
y=40; text(40,y,'No. 2',mono(26)); text(40,y+34,'The Slab, the Island',head(64)); text(40,y+112,'and the Canopy',head(64)); y+=206
y+=lines(44,y,['IN YOUR PICKS: THE SHORT PUMP, DOTS, DRAWN ONCE, A PAPER ON EACH PART.','EVERY DRAWING IS A FRAME OF THE PLACE YOU CAN WALK, SEEN THROUGH A LONG','LENS.  ABANDONED, AND THE POWER NEVER WENT OFF.'],monor(21),27)+34

# ---- A. the pump
text(40,y,'A.  The pump, as you picked it',head(40)); y+=62
h1=piece(M,y,piece_of('s-pump',(150,30,1110,1950),425))
h2=piece(560,y+6,piece_of('s-nozzle',(60,150,1170,1560),440))
lines(568,y+h2+12,['','[Route 66] the hose leaves the side','high up, hangs in one loop, and the','nozzle hangs by its spout in a boot.','Rubber perished: cracks across it.'],None,25); text(568,y+h2+12,'A2  HOSE AND NOZZLE  (new)',mono(21))
ya=y+h2+12+172
lines(568,ya,['LLANO is a stand-in. Your brand','names go here when you have them.'],None,25); text(568,ya-30,'THE NAME',mono(21))
y+=h1+6; text(M+8,y,'A1  SHORT, FLAT-TOPPED, IN DOTS',mono(21)); text(M+8,y+27,'its shading is its own, the same at every hour.',monor(19)); text(M+8,y+52,'Steel and rubber each have their own paper under the ink.',monor(19)); y+=98
h=piece(M,y,piece_of('s-two',(430,175,1820,830),1110)); y+=h+6
text(M+8,y,'A3  TWO ON THE ISLAND: A QUESTION',mono(21)); y+=28
y+=lines(M+8,y,['What we would do, after your Route 66 photo: the same pump twice, turned to','face each other, hoses inward. HI-TEST on one, REGULAR on the other, one','globe cracked. Or would you rather have one of each shape?'])+26
a=[Image.open(O+'w-dist-%s.png'%k) for k in 'abc']
h=piece(M,y,piece_of('w-dist-a',(335,640,835,1090),500,exact=True,fade=.06)); piece(M+520,y+60,piece_of('w-dist-b',(435,750,735,1210),300,exact=True,fade=.08)); piece(M+850,y+220,piece_of('w-dist-c',(480,830,690,1150),210,exact=True,fade=.1)); y+=h+6
text(M+8,y,'A4  WALKED, FROM 3 m, 6 m AND 13 m',mono(21)); y+=28
y+=lines(M+8,y,["The phone's own lens, its actual pixels (zoom in). Dots are sized by the",'screen, so far off there are fewer of them and the outline does the work.'])+26

# ---- B. the slab and island
text(40,y,'B.  The slab and the island',head(40)); y+=62
h=piece(M,y,piece_of('s-slab',(0,290,2250,1000),1110)); y+=h+4
text(M+8,y,'B  THE FORECOURT, WHOLE, PUMPS LIFTED OFF',mono(21)); y+=28
y+=lines(M+8,y,['It has no shading of its own. Its drawing is what it is made of and what has','happened to it. The light writes on it (section D).'])+22
P=[('s-joint',(250,150,1650,1020),'B1 JOINTS, CRACKS, SCRUB','[1934] joints  [Abandoned] cracks,','scrub in the joints'),
   ('s-island',(150,60,1850,1020),'B2 ISLAND AND KERB','[Route 66] [1934] raised, a kerb;','[Abandoned] sand against it'),
   ('s-bell',(300,200,1900,1020),'B3 BELL LINE','ACCEPTED  a rubber hose across the','forecourt and in to the wall'),
   ('s-stain',(450,250,1850,1020),'B4 OLD STAINS','[list] where cars stood by the','island: closer dots'),
   ('s-slab',(1150,480,2250,1020),'B5 BROKEN EDGE','[Abandoned] giving way to dirt',''),
   ('w-you',(100,1000,1170,1992),'B6 YOUR SHADOW ON IT','[concept] it takes every shadow.','In lines: that is the light')]
for i,(n,bx,a1,b1,c1) in enumerate(P):
    x=M+(i%3)*375; yy=y+(i//3)*326; w=360; hh=min(250,int(w*(bx[3]-bx[1])/(bx[2]-bx[0]))); piece(x,yy+(250-hh)//2,piece_of(n,bx,w,hh,.1))
    text(x+8,yy+258,a1,mono(19)); text(x+8,yy+283,b1,monor(16)); text(x+8,yy+303,c1,monor(16))
y+=652+6
y+=lines(M+8,y,['WORN: cracked, broken at the edges, scrub in the joints, sand drifted against','the kerb and the wall, old stains.','STILL WORKS: the bell line rings. It takes every shadow: the canopy\'s, yours.'])+26

# ---- C. the canopy
text(40,y,'C.  The canopy',head(40)); y+=62
h=piece(M,y,piece_of('s-canopy',(330,80,2250,1000),1110)); y+=h+4
text(M+8,y,'C  THE CANOPY, WHOLE, JOINED TO THE BUILDING',mono(21)); y+=28
y+=lines(M+8,y,['[you] joined. A thing, so it is drawn once, in dots; dark underneath because','that is its own underside, not because of the hour. The wall behind is element 4,','not drawn yet: an outline, with only the shade the canopy lays on it.'])+22
P=[('s-fascia',(0,0,2250,1020),'C1 FASCIA, STRIPED','[Abandoned] [1934] two stripes, faded','almost to nothing; paint peeling'),
   ('s-post',(250,500,1010,1992),'C2 POST','[Abandoned] thin; rusted from the','base: PROPOSED'),
   ('s-lamps',(0,0,2250,1020),'C3 LAMP UNDERNEATH','[1934] the one that works. One dead,','one gone: PROPOSED. Underside stained'),]
for i,(n,bx,a1,b1,c1) in enumerate(P):
    x=M+(i%3)*375; w=360; hh=min(300,int(w*(bx[3]-bx[1])/(bx[2]-bx[0]))); ww=w if hh<300 else int(300*(bx[2]-bx[0])/(bx[3]-bx[1])); piece(x+(w-ww)//2,y+(300-hh)//2,piece_of(n,bx,ww,hh,.1))
    text(x+8,y+308,a1,mono(19)); text(x+8,y+333,b1,monor(16)); text(x+8,y+353,c1,monor(16))
y+=380
h=piece(M,y,piece_of('s-lamps-night',(0,0,2250,1020),540,None,.08));
lines(600,y+20,['','The power never went off. One lamp','lights the canopy from below, the','forecourt under it, and the pumps.','Their globes are lit too.','','WORN: stripes faded, paint peeling,','posts rusted, underside stained,','two lamps of three dead or gone.','STILL WORKS: by day the biggest','shade on the lot; by night one lamp.'],None,24); text(600,y+20,'C4  AT NIGHT',mono(21))
y+=max(h,270)+26

# ---- D. the light
text(40,y,'D.  What the light does now',head(40)); y+=58
y+=lines(M+8,y,['You said a thing is drawn once. Ground and walls have no shading of their own,','and the whole idea of the place is light: by day you are a shadow, by night a','lamp. If nothing may change with the hour, that idea has nothing left to show.','Three ways, from the same spot at the same hour:'])+16
for i,(n,a1,ls) in enumerate([('w-light-lines','D1 DOTS FOR THE THING,',['LINES FOR THE LIGHT','what we would do. The link','opens like this']),('w-light-dots','D2 SHADE AS MORE DOTS',['one hand for everything.','A pump in shade sinks into','the shade behind it']),('w-light-none','D3 NOTHING CHANGES',['everything drawn once, the','ground too. No shade, no','shadow of yours, no hour'])]):
    x=M+i*375; hh=piece(x,y,piece_of(n,(0,330,1170,1830),360,None,.05)); text(x+6,y+hh+6,a1,mono(19)); lines(x+6,y+hh+31,ls[1:] if i==0 else ls,monor(17),22) if i else (text(x+6,y+hh+31,ls[0],mono(19)),lines(x+6,y+hh+56,ls[1:],monor(17),22))
y+=hh+116
y+=lines(M+8,y,['In D1 a pump in the canopy\'s shade keeps its own drawing and takes a thin veil','of lines; the slab and the wall take the shade in full. Your shadow is lines','too (B6). At night the dark is black, and a lamp shows the drawing that was','always there (C4, and below).'])+26

# ---- E. together
text(40,y,'E.  Together, walked',head(40)); y+=58
y+=lines(M+8,y,["The phone's own lens, standing on the forecourt. No long lens, no chosen light."])+12
h=piece(M+80,y,piece_of('w-together-day',None,410,None,.03)); piece(M+570,y,piece_of('w-together-night',None,410,None,.03)); y+=h+6
text(M+88,y,'E1  EARLY AFTERNOON, SUMMER',mono(20)); text(M+578,y,'E2  NIGHT, THE ONE LAMP',mono(20)); y+=44
h=piece(0,y,piece_of('w-together-day',(0,930,1170,1420),1170,exact=True,fade=0)); y+=h+8
text(M+8,y,'E3  A PIECE OF E1 AT THE ACTUAL PIXELS OF AN iPHONE 14',mono(20)); y+=50

notes=['PLAINLY:',
'- Every drawing is the walkable place. Sections A to C use a long lens and the',
"  thing's best side; D and E are what you get walking.",
'- Not seen moving, and not on a real phone. Measured in an emulated one: walking',
'  one frame toward the pump, about 1 to 2 % of its ink changes, at any distance;',
'  close up that is half what the Sheet 1 stipple did. Whether the eye calls',
'  that still or crawling, only your phone can say.',
'- Far off (13 m) the dots turn to speckle. The outline carries the pump there.',
'- The veil of lines on a shaded pump is our guess at "shadows are added on top".',
'- The slab\'s cracks, stains and sand are generated. So are the papers; your',
'  scans replace them file for file.',
'- Lettering is set type. The wall, door and windows are outline only. No sign.',
'- Lamps: one working, one dead, one gone is PROPOSED. Rust on the posts and the',
'  stained underside are PROPOSED.',
'- Night beyond the lamp is flat black. Nothing of the desert is drawn yet.']
for i,s in enumerate(notes): text(40,y+i*27,s,monor(19) if i else mono(20))
y+=len(notes)*27+50; Ht=y
# the sheet of paper
def blur_noise(sig,rad): return np.asarray(Image.effect_noise((W,Ht),sig).filter(ImageFilter.GaussianBlur(rad)),np.float32)/255.-.5
base=np.array([226,213,186],np.float32); pap=np.ones((Ht,W,3),np.float32)*base
m=blur_noise(120,60)*1.6+blur_noise(90,9)*.5; pap*=(1+m*.22)[...,None]
yy,xx=np.mgrid[0:Ht,0:W]; ed=np.minimum(np.minimum(xx,W-1-xx),np.minimum(yy,Ht-1-yy)); pap*=(.86+.14*np.clip(ed/90.,0,1))[...,None]
fox=(blur_noise(150,7)>.2); pap[fox]*=np.array([.93,.88,.78]); fl=rng.random((Ht,W)); pap[fl>.9985]*=.72; pap[fl<.0012]*=1.07
can=Image.new('L',(W,Ht),0); d=ImageDraw.Draw(can)
for it in items:
    if it[0]=='t': d.text((it[1],it[2]),it[3],font=it[4],fill=235)
ink=np.asarray(can,np.float32)/255.; drop=(blur_noise(160,1.1)+blur_noise(120,14)*.6)>.27; ink=ink*(1-drop*.85)     # worn print, on the captions
mul=np.ones((Ht,W),np.float32)
for it in items:
    if it[0]=='p': a=it[3]; h,w=a.shape; x0=it[1]; y0=it[2]; mul[y0:y0+h,x0:x0+w]=np.minimum(mul[y0:y0+h,x0:x0+w],a[:,:W-x0])
black=np.array([30,27,25],np.float32)
out=black+(pap-black)*np.clip(mul,0,1.06)[...,None]; out=out*(1-ink[...,None])+black*ink[...,None]
im=Image.fromarray(np.clip(out,0,255).astype(np.uint8)); print(im.size)
im.convert('RGB').quantize(20,method=Image.MEDIANCUT,dither=Image.NONE).save(OUT,optimize=True)
