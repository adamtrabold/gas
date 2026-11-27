# python3 sheet1.py -> ../../concepts/stills/sheet-1-pump.png. Sheet 1, the pump: a flash sheet assembled from frames of the walkable prototype (out/, made by look.js).
# Every drawing on it is a real frame of the three.js pump, taken with a long lens from its best side, cut out and printed on one generated sheet of aged paper.
# What this script adds that the prototype does not have: the sheet's paper, the captions, the soft cut-out round each piece, and a little dropout over everything.
import numpy as np, sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter
O='out/'; OUT='../../concepts/stills/sheet-1-pump.png'; W=1170; rng=np.random.default_rng(4)
FD='/usr/share/fonts/truetype/'
mono=lambda s:ImageFont.truetype(FD+'liberation/LiberationMono-Bold.ttf',s); monor=lambda s:ImageFont.truetype(FD+'liberation/LiberationMono-Regular.ttf',s); head=lambda s:ImageFont.truetype(FD+'dejavu/DejaVuSerif-Bold.ttf',s)
def ink_of(name, box, w, h, fade=.16, grey=False):
    im=Image.open(O+name+'.png').convert('L').crop(box).resize((w,h),Image.LANCZOS); a=np.asarray(im,np.float32)/255.
    k=np.clip((.895-a)/(.895-.075),0,1)                     # 0 paper, 1 ink (paper and ink values of the prototype)
    if grey: k=np.clip((.93-a)/(.93-.075),0,1)
    yy,xx=np.mgrid[0:h,0:w]; d=np.minimum(np.minimum(xx,w-1-xx)/(w*fade),np.minimum(yy,h-1-yy)/(h*fade*.6)); n=np.asarray(Image.effect_noise((w,h),90).filter(ImageFilter.GaussianBlur(5)),np.float32)/255.
    return k*((d+(n-.5)*1.6)>.5)                           # each piece ends raggedly on the sheet, in its own ground marks
items=[]; H=[0]
def text(x,y,s,f,fill=1.): items.append(('t',x,y,s,f,fill))
def piece(x,y,arr): items.append(('p',x,y,arr))
y=40; text(40,y,'No. 1',mono(26)); text(40,y+34,'The Pump',head(84)); text(44,y+140,'ONE ELEMENT, DRAWN BY ITSELF. EVERY DRAWING HERE IS A FRAME OF THE',monor(21)); text(44,y+166,'PUMP YOU CAN WALK ROUND, SEEN THROUGH A LONG LENS.  ABANDONED.',monor(21)); y+=230
text(40,y,'A.  Which pump?',head(40)); y+=60
piece(40,y,ink_of('s-short-cut',(150,30,1110,1950),530,1060)); piece(600,y,ink_of('s-tall-cut',(150,30,1110,1950),530,1060)); y+=1065
for x,a,b in [(40,'A1  SHORT, FLAT-TOPPED','after your Route 66 photo'),(600,'A2  TALL, STEPPED TOP','loosely after your 1934 photo')]: text(x,y,a,mono(22)); text(x,y+28,b,monor(20))
y+=90; text(40,y,'B.  Which hand?',head(40)); y+=58
for i,(n,a,b,c) in enumerate([('brush','B1  BRUSH','fat dry dabs on a','slant, black spotted in'),('cut','B2  CUT','an even line, short','hatching, no black'),('dot','B3  DOT','stipple, packed','closer for dark')]):
    x=30+i*375; piece(x,y,ink_of('s-short-'+n,(190,30,1070,1950),360,786,.12)); text(x+8,y+792,a,mono(22)); text(x+8,y+820,b,monor(19)); text(x+8,y+844,c,monor(19))
y+=900; text(40,y,'C.  Its parts',head(40)); text(420,y+16,'each tagged to the list',monor(19)); y+=60
P=[('s-globe',(0,230,1170,1730),'C1 GLOBE, cracked','[you] lit at night: power is on'),('s-window',(40,830,940,1950),'C2 NUMBER WINDOW','[you] [Route 66] dusty'),('s-window',(0,0,1170,330),'C3 GRADE PLATE, knob','[Route 66] wording PROPOSED'),
   ('s-badge',(150,520,1050,1520),'C4 BADGE','[1934] name PROPOSED'),('',None,'C5 HOSE AND NOZZLE','not drawn yet [Route 66] [1934]'),('s-short-brush',(230,1330,1070,1930),'C6 DARK BASE, rust','[Route 66] rust [Abandoned]')]
for i,(n,bx,a,b) in enumerate(P):
    x=30+(i%3)*375; yy=y+(i//3)*450; w=360
    if bx: h=min(350,int(w*(bx[3]-bx[1])/(bx[2]-bx[0]))); piece(x,yy+(350-h)//2,ink_of(n,bx,w,h,.1))
    else: text(x+60,yy+150,'(not drawn yet)',monor(22))
    text(x+8,yy+358,a,mono(20)); text(x+8,yy+384,b,monor(17))
y+=910; text(40,y,'D.  Does the light redraw it?',head(40)); y+=58
for i,(n,a,b) in enumerate([('look-pump-day-brush','D1 DRAWN ONCE','morning (as the link opens)'),('look-pump-night-brush','','night'),('look-pump-day-lit','D2 LIT BY THE HOUR','morning'),('look-pump-night-lit','','night, your lamp')]):
    x=30+i*282; piece(x,y,ink_of(n,(120,330,1050,1910),272,462,.06)); text(x+6,y+468,a,mono(19)); text(x+6,y+494,b,monor(18))
y+=545; text(40,y,'D1: the pump keeps its own shading at every hour, as on this sheet; night and',monor(19)); text(40,y+25,'shadows are only added. D2: sun, your shadow and your lamp make all of it.',monor(19)); y+=80
text(40,y,'E.  One paper, or a paper each?',head(40)); y+=58
piece(40,y,ink_of('s-short-brush',(330,560,930,1000),540,396,.08)); items.append(('g',600,y,ink_of('s-short-paper',(330,560,930,1000),540,396,.08,True)))
text(48,y+402,'E1 ONE OLD SHEET; EACH MATERIAL\'S',mono(19)); text(48,y+427,'grain only breaks the ink (two values)',monor(18)); text(608,y+402,'E2 A SCANNED PAPER ON EACH PART',mono(19)); text(608,y+427,'real grey in the steel, as you described',monor(18)); y+=480
text(40,y,'F.  Its name?',head(40)); text(380,y+16,'PROPOSED. pick one, or give us yours',monor(19)); y+=64
for k,nm in enumerate(['LLANO','CALICHE','BAJADA','TULAROSA']):
    x=30+k*282; items.append(('o',x+6,y,x+266,y+150)); items.append(('c',x+136,y+62,nm,head(36 if len(nm)<8 else 30))); items.append(('c',x+136,y+104,'GASOLINE',mono(17)))
y+=190
notes=['PLAINLY:','- Every drawing above uses the pump\'s own light (D1). That is how the','  walkable pump opens, so the two match. D2 is one tap away.','- This sheet still flatters it: a long lens, its best side, old paper.',"  Walked, on a phone's wide lens, it is smaller and plainer.",'- Lettering is set type standing in for a sign painter\'s hand.','- The four names: two web searches found no fuel brand called any of','  them. That is not a trademark check.','- The hose and nozzle (C5) are not drawn yet.','- The paper of this sheet is generated; yours would replace it.','- Dots: if B3 is the hand, bulbs stay a ruled row of round lamps and the','  alien marks become open rings, so dots still mean something.']
for i,s in enumerate(notes): text(40,y+i*27,s,monor(19) if i else mono(20))
y+=len(notes)*27+50; Ht=y
# the sheet of paper
def blur_noise(sig,rad): return np.asarray(Image.effect_noise((W,Ht),sig).filter(ImageFilter.GaussianBlur(rad)),np.float32)/255.-.5
base=np.array([226,213,186],np.float32); pap=np.ones((Ht,W,3),np.float32)*base
m=blur_noise(120,60)*1.6+blur_noise(90,9)*.5+blur_noise(60,1.2)*.35; pap*=(1+m*.22)[...,None]
yy,xx=np.mgrid[0:Ht,0:W]; ed=np.minimum(np.minimum(xx,W-1-xx),np.minimum(yy,Ht-1-yy)); pap*=(.86+.14*np.clip(ed/90.,0,1))[...,None]
fox=(blur_noise(150,7)>.2); pap[fox]*=np.array([.93,.88,.78]); fl=rng.random((Ht,W)); pap[fl>.9985]*=.72; pap[fl<.0012]*=1.07
ink=np.zeros((Ht,W),np.float32); can=Image.new('L',(W,Ht),0); d=ImageDraw.Draw(can); grey=None
for it in items:
    if it[0]=='t': d.text((it[1],it[2]),it[3],font=it[4],fill=235)
    if it[0]=='c': d.text((it[1],it[2]),it[3],font=it[4],fill=235,anchor='mm')
    if it[0]=='o': d.ellipse(it[1:5],outline=235,width=7); d.ellipse((it[1]+12,it[2]+12,it[3]-12,it[4]-12),outline=235,width=2)
ink=np.asarray(can,np.float32)/255.
for it in items:
    if it[0] in 'pg': a=it[3]; h,w=a.shape; ink[it[2]:it[2]+h,it[1]:it[1]+w]=np.maximum(ink[it[2]:it[2]+h,it[1]:it[1]+w],a if it[0]=='p' else (a>.82)*a)
    if it[0]=='g': a=it[3]; h,w=a.shape; pap[it[2]:it[2]+h,it[1]:it[1]+w]*=(1-np.where(a>.82,0,a)*1.6)[...,None]      # E2: the real grey of the scanned-paper option, kept as grey
drop=(blur_noise(160,1.1)+blur_noise(120,14)*.6)>.27; ink=ink*(1-drop*.85)                                              # worn print
out=pap*(1-ink[...,None])+np.array([30,27,25],np.float32)*ink[...,None]
Image.fromarray(np.clip(out,0,255).astype(np.uint8)).save('/tmp/sheet1-full.png'); im=Image.fromarray(np.clip(out,0,255).astype(np.uint8)); print(im.size)
im.convert('RGB').quantize(96,method=Image.MEDIANCUT,dither=Image.NONE).save(OUT,optimize=True)
