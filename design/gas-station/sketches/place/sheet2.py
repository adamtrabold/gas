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
y+=lines(44,y,['A TEST OF HOW THINGS AND LIGHT ARE DRAWN, NOT A FINISHED PICTURE.','IN YOUR PICKS: THE SHORT PUMP, DOTS, DRAWN ONCE, A PAPER ON EACH PART.','EVERY DRAWING IS A FRAME OF THE PLACE YOU CAN WALK.  ABANDONED, POWER ON.'],monor(21),27)+30

# ---- 1. together, from the road
text(40,y,'1.  Together, from the road',head(40)); y+=58
y+=lines(M+8,y,["How the link opens: the phone's own lens, standing in front of the pumps."])+10
h=piece(M+70,y,piece_of('w-together-day',None,470,None,.03)); piece(M+570,y,piece_of('w-together-night',None,470,None,.03)); y+=h+6
text(M+78,y,'BY DAY, EARLY AFTERNOON',mono(20)); text(M+578,y,'AT NIGHT, THE ONE LAMP',mono(20)); y+=40
h=piece(0,y,piece_of('w-together-day',(0,880,1170,1300),1170,exact=True,fade=0)); y+=h+8
text(M+8,y,'A PIECE OF THE DAY FRAME AT THE ACTUAL PIXELS OF AN iPHONE 14',mono(20)); y+=52

# ---- 2. the pump
text(40,y,'2.  The pump, as you picked it',head(40)); y+=58
h1=piece(M,y,piece_of('s-pump',(150,30,1110,1950),370))
h2=piece(470,y+6,piece_of('s-nozzle',(60,150,1170,1560),330))
tx=830
lines(tx,y+10,['','[Route 66] it leaves','the side high up,','hangs in one loop;','the nozzle hangs by','its spout in a boot.','Rubber perished.'],None,24); text(tx,y+10,'HOSE AND NOZZLE',mono(20))
lines(tx,y+200,['','LLANO is a stand-in.','Your brand names go','here.'],None,24); text(tx,y+200,'THE NAME',mono(20))
lines(tx,y+318,['','NO SMOKING / STOP','MOTOR / CONTAINS','LEAD, and the price:','ours. PROPOSED.'],None,24); text(tx,y+318,'THE NOTICE',mono(20))
y+=max(h1,h2+6)+4; text(M+8,y,'SHORT, FLAT-TOPPED, IN DOTS.',mono(20)); text(M+380,y+1,'Its shading is its own, the same at every hour.',monor(18)); y+=44
h=piece(M,y,piece_of('s-two',(430,175,1820,830),1110)); y+=h+6
text(M+8,y,'TWO ON THE ISLAND: A QUESTION',mono(21)); y+=28
y+=lines(M+8,y,['What we would do, after your Route 66 photo: the same short pump twice, mirror','images, both facing the road with their hoses toward each other. HI-TEST on','one, REGULAR on the other, one globe cracked. Or do you want two different pumps?'])+30

# ---- 3. the slab and island
text(40,y,'3.  The slab and the island',head(40)); y+=58
h=piece(M,y,piece_of('s-slab',(0,290,2250,1000),1110)); y+=h+4
text(M+8,y,'THE FORECOURT, WHOLE, PUMPS LIFTED OFF',mono(21)); y+=28
y+=lines(M+8,y,['[1934] [Route 66] concrete, joints, a raised island with a kerb. ACCEPTED: the','bell line. It has no shading of its own; the light writes on it.'])+14
ha=piece(M,y,piece_of('s-slab',(1150,480,2250,1020),545)); hb=piece(M+565,y,piece_of('f-4',(0,1050,1170,1992),545,None,.08)); 
text(M+8,y+ha+6,'BROKEN EDGE  [Abandoned]',mono(19)); text(M+573,y+hb+6,'YOUR SHADOW ON IT  [concept]',mono(19)); y+=max(ha,hb)+40
y+=lines(M+8,y,['WORN: cracked, broken at the edges, scrub in the joints, sand against the','kerb and the wall, old stains.  STILL WORKS: the bell line rings.'])+30

# ---- 4. the canopy
text(40,y,'4.  The canopy',head(40)); y+=58
h=piece(M,y,piece_of('s-canopy',(330,80,2250,1000),1110)); y+=h+4
text(M+8,y,'THE CANOPY, WHOLE, JOINED TO THE BUILDING',mono(21)); y+=28
y+=lines(M+8,y,['[you] joined. [Abandoned] a flat slab, a fascia, two thin posts. Drawn once, in','dots: dark underneath because it is an underside, not because of the hour. The','wall behind is not drawn yet: an outline that takes the shade.'])+14
h=piece(M,y,piece_of('s-lamps',(0,0,2250,1020),400,None,.08)); piece(M+410,y,piece_of('s-lamps-night',(0,0,2250,1020),400,None,.08))
lines(850,y+4,['','One works, one is','dead, one is gone:','PROPOSED. An enamel','dome, after the lamp','posts in your Route','66 photo.'],None,24); text(850,y+4,'LAMPS UNDERNEATH',mono(20))
y+=max(h,180)+14
y+=lines(M+8,y,['WORN: stripes faded to almost nothing, posts rusted, underside stained.','STILL WORKS: by day the biggest shade on the lot; by night one lamp.'])+30

# ---- 5. the light
text(40,y,'5.  How shade is drawn: your call',head(40)); y+=58
y+=lines(M+8,y,['You said the light should not redraw a thing. So each thing is drawn once, in','dots. But the ground and the walls have no shading of their own, and the place','is about light: by day you are a shadow, by night a lamp. Three ways to draw','shade, from the same spot at the same hour:'])+14
for i,(n,a1,ls) in enumerate([('w-light-lines','LINES FOR SHADE',['Things in dots. Shade, your','shadow and the dark in lines.','The link opens like this.']),('w-light-dots','DOTS FOR SHADE',['Everything in one hand.','Shade is more dots, on the','ground and the wall.']),('w-light-none','NOTHING CHANGES',['The ground drawn once too.','No shade, no shadow of','yours, no hour.'])]):
    x=M+i*375; hh=piece(x,y,piece_of(n,(0,330,1170,1830),360,None,.05)); text(x+6,y+hh+6,a1,mono(20)); lines(x+6,y+hh+32,ls,monor(17),22)
y+=hh+112

notes=['PLAINLY:',
"- Section 1 and 5 are what you get walking. Sections 2 to 4 use a long lens and",
"  the thing's best side.",
"- The shade lines are still even and ruled, as if drawn with a straightedge, and",
"  your own shadow is upright stripes more than a figure. Both are being redrawn",
"  to swell, taper and break like a hand's. Judge where the lines go, not how",
"  they are drawn.",
'- You picked dots. With lines for shade, most of the ink in the day frame is',
'  line. That is the thing we are asking you about.',
'- With dots for shade the pumps still hold, by outline and their white plates.',
'  What goes is the shade: on the wall it reads as dirt, not as a shadow.',
'- Not seen moving, and not on a real phone. Measured in an emulated one: one',
'  frame of walking changes 1 to 2 % of the pump\'s ink; close up, half what the',
'  Sheet 1 stipple did. Still or shimmer, only your phone can say.',
'- From 6 m the dots clump; from 13 m they are speckle and the outline carries',
'  the pump. On the canopy they can read as a speckled ceiling.',
'- At night the plates and number windows show white in the dark, as well as the',
'  globes. Seen from below, the lit lamp is a ring with a bright centre.',
'- Posts are round; in your abandoned-station photo they look square.',
'- Left off this sheet because they do not read yet: the fascia stripes, the',
'  post, joints, stains, the bell line up close. Cracks and stains are generated.',
'- Lettering is set type. The papers are stand-ins for your scans. The wall,',
'  door and windows are outline only. No sign, no desert.']
for i,s_ in enumerate(notes): text(40,y+i*27,s_,monor(19) if i else mono(20))
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
