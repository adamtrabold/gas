// Throwaway 2D ink engine for concept stills. Hand-rolled projection, real sun, no outlines:
// every shadow is laid as brush strokes in the direction the light travels. Not three.js.
const W=600,H=1300,PAPER='#ece7db',INK='#141312',RAD=Math.PI/180,LAT=35*RAD;
let seed=7;const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647,rr=(a,b)=>a+(b-a)*rnd();
const add=(a,b,k=1)=>[a[0]+b[0]*k,a[1]+b[1]*k,a[2]+b[2]*k],dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2],norm=a=>{const l=Math.hypot(...a)||1;return a.map(v=>v/l)};
function sunAt(hour,decl){const d=decl*RAD,h=(hour-12)*15*RAD;return [-Math.cos(d)*Math.sin(h),Math.cos(LAT)*Math.sin(d)-Math.sin(LAT)*Math.cos(d)*Math.cos(h),Math.sin(LAT)*Math.sin(d)+Math.cos(LAT)*Math.cos(d)*Math.cos(h)]}
function hitBox(o,d,b){let t0=1e-4,t1=1e9;for(let i=0;i<3;i++){const lo=b[i*2],hi=b[i*2+1];if(Math.abs(d[i])<1e-9){if(o[i]<lo||o[i]>hi)return false}else{let a=(lo-o[i])/d[i],c=(hi-o[i])/d[i];if(a>c)[a,c]=[c,a];t0=Math.max(t0,a);t1=Math.min(t1,c);if(t0>t1)return false}}return true}

function Frame(cfg){
  seed=cfg.seed||7;
  const cv=document.createElement('canvas');cv.width=W;cv.height=H;const g=cv.getContext('2d');
  const F={cv,g,cfg,night:!!cfg.night,boxes:[],occ:[]};
  F.S=cfg.night?null:sunAt(cfg.hour,cfg.decl??-21);
  const yaw=(cfg.yaw||0)*RAD,pit=(cfg.pitch||0)*RAD,C=cfg.cam,FL=(H/2)/Math.tan((cfg.vfov||68)*RAD/2);F.C=C;
  const f=[Math.sin(yaw)*Math.cos(pit),Math.cos(yaw)*Math.cos(pit),Math.sin(pit)],r=[Math.cos(yaw),-Math.sin(yaw),0],u=[-Math.sin(yaw)*Math.sin(pit),-Math.cos(yaw)*Math.sin(pit),Math.cos(pit)];
  F.pj=p=>{const d=add(p,C,-1),z=dot(d,f);if(z<0.35)return null;return [W/2+dot(d,r)/z*FL,H/2-dot(d,u)/z*FL]};
  F.pjd=d=>{const z=dot(d,f);if(z<0.05)return null;return [W/2+dot(d,r)/z*FL,H/2-dot(d,u)/z*FL]};
  F.px=(p,m)=>{const d=add(p,C,-1),z=dot(d,f);return z<0.35?0:m/z*FL};          // metres -> pixels at p
  F.bg=cfg.night||cfg.dark?INK:PAPER;F.fg=F.bg===INK?PAPER:INK;g.fillStyle=F.bg;g.fillRect(0,0,W,H);
  F.shade=p=>{const S=F.S;if(!S||S[2]<=0)return true;const o=add(p,S,.03);return F.boxes.some(b=>hitBox(o,S,b))||F.occ.some(fn=>fn(o,S))};
  F.gsh=(p)=>{const S=F.S;return [p[0]-S[0]/S[2]*p[2],p[1]-S[1]/S[2]*p[2],0]};
  // one brush stroke on a plane. readable, not precise, not always whole
  F.stroke=(A,B,hw,perp,col=INK,o={})=>{const n=o.n||16,L=[],R=[],dir=add(B,A,-1),len=Math.hypot(...dir)||1e-6;
    const e0=o.e0??rr(.02,.25)/Math.max(len,.6),e1=o.e1??rr(.05,.5)/Math.max(len,.6),sk=rr(.75,1.25),ph=rnd()*9;
    for(let i=0;i<=n;i++){const t=i/n,tt=-e0+t*(1+e0+e1),P=add(A,dir,tt);
      let w=o.flat?hw*(t<.02||t>.98?.6:1)*(1+.05*Math.sin(t*37+ph)):o.blunt?hw*Math.pow(Math.max(0,Math.sin(Math.PI*t)),.22)*(1+.1*Math.sin(t*23+ph)):Math.pow(Math.max(0,Math.sin(Math.PI*Math.pow(t,sk))),.55)*hw*(1+.16*Math.sin(t*19+ph)+.09*Math.sin(t*53+ph*3));
      const a=F.pj(add(P,perp,w)),b=F.pj(add(P,perp,-w));if(!a||!b)continue;L.push(a);R.push(b)}
    if(L.length<3)return;g.fillStyle=col;g.beginPath();L.forEach((p,i)=>i?g.lineTo(...p):g.moveTo(...p));R.slice().reverse().forEach(p=>g.lineTo(...p));g.closePath();g.fill();
    // dry brush: the bristles part toward the end of a long stroke
    const sl=Math.hypot(L[0][0]-L[L.length-1][0],L[0][1]-L[L.length-1][1]),sw=Math.hypot(L[n>>1]?.[0]-R[n>>1]?.[0]||0,L[n>>1]?.[1]-R[n>>1]?.[1]||0);
    if(!o.flat&&!o.whole&&sl>70&&sw>5){const k=1+Math.floor(rnd()*3);g.fillStyle=col===INK?PAPER:INK;if(o.dryCol)g.fillStyle=o.dryCol;
      for(let j=0;j<k;j++){const off=rr(-.7,.7),t0=rr(.35,.7),t1=Math.min(1,t0+rr(.2,.5)),i0=Math.floor(t0*L.length),i1=Math.floor(t1*L.length);g.beginPath();
        for(let i=i0;i<i1;i++){const m=[(L[i][0]+R[i][0])/2,(L[i][1]+R[i][1])/2],h2=[(L[i][0]-R[i][0])/2,(L[i][1]-R[i][1])/2],tw=Math.sin((i-i0)/(i1-i0)*Math.PI)*.09;
          const p=[m[0]+h2[0]*(off+tw),m[1]+h2[1]*(off+tw)];i===i0?g.moveTo(...p):g.lineTo(...p)}
        for(let i=i1-1;i>=i0;i--){const m=[(L[i][0]+R[i][0])/2,(L[i][1]+R[i][1])/2],h2=[(L[i][0]-R[i][0])/2,(L[i][1]-R[i][1])/2],tw=Math.sin((i-i0)/(i1-i0)*Math.PI)*.09;g.lineTo(m[0]+h2[0]*(off-tw),m[1]+h2[1]*(off-tw))}
        g.fill()}}};
  // fill part of a plane with strokes that run the way `dir` runs (default: the way the sunlight runs)
  F.fill=(O,a,b,ar,br,sp,test,col=INK,dir,o={})=>{const SS=dir||F.S;let d2=[-dot(SS,a),-dot(SS,b)];const l=Math.hypot(...d2);d2=l<1e-3?[1,0]:d2.map(v=>v/l);const p2=[-d2[1],d2[0]];
    const pt=(uu,vv)=>add(add(O,a,uu*d2[0]+vv*p2[0]),b,uu*d2[1]+vv*p2[1]);
    const R=Math.hypot(Math.max(Math.abs(ar[0]),Math.abs(ar[1])),Math.max(Math.abs(br[0]),Math.abs(br[1])));
    const perW=add(add([0,0,0],a,p2[0]),b,p2[1]),st=o.step||.12,tst=test||F.shade,ml=o.maxlen||[5,11];
    for(let v=-R;v<R;v+=sp*rr(.8,1.2)){let run=null,lim=rr(...ml);
      for(let uu=-R;uu<=R+st;uu+=st){const ca=uu*d2[0]+v*p2[0],cb=uu*d2[1]+v*p2[1];
        const sh=ca>=ar[0]&&ca<=ar[1]&&cb>=br[0]&&cb<=br[1]&&tst(pt(uu,v));
        if(sh&&run===null)run=uu;
        if(run!==null&&(!sh||uu-run>lim)){if(uu-run>st*1.5&&rnd()>(o.drop??.04))F.stroke(pt(run,v),pt(uu,v),sp*rr(.5,.75)*(o.w||1),perW,col,o.so||{});run=sh?uu-st*3:null;lim=rr(...ml)}}}};
  F.quad=(pts,col=PAPER)=>{const q=pts.map(F.pj);if(q.some(x=>!x))return;g.fillStyle=col;g.beginPath();q.forEach((p,i)=>i?g.lineTo(...p):g.moveTo(...p));g.closePath();g.fill()};
  F.dot=(P,rm,col=INK)=>{const p=F.pj(P);if(!p)return;g.fillStyle=col;g.beginPath();g.arc(p[0],p[1],Math.max(.8,F.px(P,rm)),0,7);g.fill()};
  F.text=(P,str,hm,col=INK,font='bold',fam='"DejaVu Sans"',align='center',skew=0)=>{const p=F.pj(P);if(!p)return;const s=F.px(P,hm);g.save();g.translate(p[0],p[1]);if(skew)g.transform(1,skew,0,1,0,0);g.fillStyle=col;g.font=`${font} ${s}px ${fam}`;g.textAlign=align;g.textBaseline='middle';g.fillText(str,0,0);g.restore()};
  // a word that lands (Ruscha, HONK): paper letters known only by the ink they throw
  F.word=(P,str,hm)=>{const p=F.pj(P);if(!p)return;const s=F.px(P,hm);g.save();g.translate(p[0],p[1]);g.transform(1,-.2,0,1,0,0);g.font=`bold ${s}px "DejaVu Serif"`;g.textAlign='center';g.textBaseline='middle';
    g.fillStyle=F.fg;for(let i=s*.5;i>0;i-=1)g.fillText(str,i*.9,i*.55);g.fillStyle=F.bg;g.fillText(str,0,0);g.restore()};
  // screen-space tapered stroke through points
  F.sstroke=(pts,w0,col=INK,taper=1.5)=>{if(pts.length<3)return;const L=[],R=[],n=pts.length-1;pts.forEach((p,i)=>{const q=pts[Math.min(i+1,n)],o=pts[Math.max(i-1,0)],nx=-(q[1]-o[1]),ny=q[0]-o[0],l=Math.hypot(nx,ny)||1,t=i/n,w=w0*Math.pow(1-t,taper)*(1+.15*Math.sin(i*1.7))+.3;L.push([p[0]+nx/l*w,p[1]+ny/l*w]);R.push([p[0]-nx/l*w,p[1]-ny/l*w])});
    g.fillStyle=col;g.beginPath();L.forEach((p,i)=>i?g.lineTo(...p):g.moveTo(...p));R.reverse().forEach(p=>g.lineTo(...p));g.fill()};
  // night sky: strokes laid round the still point. tail length = how old the night is
  F.stars=(n,hoursSinceDusk,opts={})=>{const pole=[0,Math.cos(LAT),Math.sin(LAT)],e2=[0,-Math.sin(LAT),Math.cos(LAT)],tail=hoursSinceDusk*15;
    const sd=(rho,psi)=>add(add([0,0,0],pole,Math.cos(rho*RAD)),add(add([0,0,0],e2,Math.cos(psi*RAD)),[1,0,0],Math.sin(psi*RAD)),Math.sin(rho*RAD));
    for(let i=0;i<n;i++){const rho=rr(4,60),psi=rr(0,360),pts=[];for(let k=0;k<=40;k++){const d=sd(rho,psi+tail*k/40);if(d[2]<.04)break;const p=F.pjd(d);if(!p)break;pts.push(p)}
      if(pts.length<4)continue;const w=rr(2.2,4.4)*(opts.w||1);F.sstroke(pts,w,PAPER);g.beginPath();g.arc(pts[0][0],pts[0][1],w*1.2,0,7);g.fill()}
    const ps=F.pjd(pole);if(ps){g.fillStyle=PAPER;g.beginPath();g.arc(ps[0],ps[1],2,0,7);g.fill()}};
  return F}

// ---------------------------------------------------------------- the place
// layout A: symmetric box, door in the middle, canopy centred (01, 03, 04). layout B: door left in the open, canopy over the pumps to the right (02)
function layout(k){return k==='B'?{bx:[-12.5,8],door:[-4.6,-3.4],wins:[[-2.4,2.6]],garage:[3.6,7.2],can:[-1.2,7.6],posts:[-0.6,7],lamps:[],pumps:[1.6,4.6],ice:-10.4,phone:9.6}
                               :{bx:[-8,8],door:[-.6,.6],wins:[[1.4,4.4],[-3.0,-1.4]],garage:[-7.3,-4.2],can:null,posts:[],lamps:[-4.4,4.4],pumps:[-1.5,1.5],ice:5.6,phone:7.2}}
const BH=3.8,FY=16,CZ=3.6;
function occluders(F,L){F.boxes.push([L.bx[0],L.bx[1],FY,FY+6,0,BH]);if(L.can)F.boxes.push([L.can[0],L.can[1],10,FY,CZ,CZ+.35]);L.pumps.forEach(x=>F.boxes.push([x-.3,x+.3,11.15,11.65,0,1.55]));
  F.boxes.push([L.ice-.6,L.ice+.6,15.2,15.9,0,1.05],[L.phone-.45,L.phone+.45,12,12.9,0,2.3])}
function poleShadow(F,x,y,h,w){if(F.night)return;const t=F.gsh([x,y,h]),d=norm([t[0]-x,t[1]-y,0]);F.stroke([x,y,0],t,w,[-d[1],d[0],0],INK,{e0:0,e1:.01})}

function desert(F,o={}){const g=F.g;
  if(!F.night){const S=F.S;
    [[-190,420,16,70,30],[-60,520,11,120,60],[150,460,19,60,24],[260,400,9,50,20]].forEach(([x,y,h,w,top])=>{const side=S[0]>0?-1:1;if(Math.abs(S[0])<.2)return;   // buttes: only their shade side exists
      for(let i=0;i<9;i++){const k=i/9;F.stroke([x+side*(top/2+k*(w-top)/2*.3),y,h*(1-.05*k)],[x+side*(top/2+(w-top)/2*(.3+k*.7)),y,.5],h*.045,[1,0,0],INK)}
      F.stroke([x-top/2,y,h],[x+top/2,y,h],.5,[0,0,1],INK,{flat:1,e0:0,e1:0})});
    for(let x=-700;x<700;x+=rr(25,70))if(rnd()>.4)F.stroke([x,500,0],[x+rr(15,45),500,0],.5,[0,0,1],INK,{flat:1,e0:0,e1:0});
    // scrub: small flat marks, none on the concrete
    for(let i=0;i<260;i++){const x=rr(-90,90),y=rr(-10,170);if(Math.abs(x)<(o.pad||15)&&y<FY+8&&y>-6)continue;const s=rr(.25,.7);F.stroke([x,y,0],[x+s*2,y,0],s*.35,[0,1,0],INK,{whole:1,n:6})}
  }}

function stationDay(F,L,o={}){const S=F.S,g=F.g;
  F.fill([0,0,0],[1,0,0],[0,1,0],[-40,40],[F.gy0||-14,FY-.03],o.gsp||.3);                                         // every shadow on the ground
  // front wall: paper, lost against the sky. it exists by its paint, its openings and the shadow on it
  F.fill([0,FY-.03,0],[1,0,0],[0,0,1],L.bx,[0,BH],.3);
  [[L.bx[0],L.bx[1],BH-.55,.11],[L.bx[0],L.bx[1],BH-.95,.07]].forEach(([x0,x1,z,w])=>F.stroke([x0,FY-.04,z],[x1,FY-.04,z],w,[0,0,1],INK,{flat:1,e0:0,e1:0}));   // painted stripes (02)
  const open=(x0,x1,z0,z1)=>{for(let x=x0+.14;x<x1;x+=.3)F.stroke([x,FY-.05,z1],[x,FY-.05,z0],.2,[1,0,0],INK,{e0:0,e1:.02,whole:rnd()>.3})};
  open(L.door[0],L.door[1],0,2.25);L.wins.forEach(w=>open(w[0],w[1],.9,2.5));open(L.garage[0],L.garage[1],0,3.0);
  L.wins.forEach(w=>{for(let x=w[0]+1.1;x<w[1]-.3;x+=1.15)F.stroke([x,FY-.06,.9],[x,FY-.06,2.5],.035,[1,0,0],PAPER,{flat:1,e0:0,e1:0})});        // mullions
  if(L.can&&F.C[2]<CZ)for(let y=10.15;y<FY;y+=.36)F.stroke([L.can[0],y,CZ],[L.can[1],y,CZ],.25,[0,1,0],INK,{e0:.005,e1:.02});                              // canopy underside
  L.posts.forEach(x=>{if(!F.shade([x,10.3,2]))F.stroke([x,10.3,0],[x,10.3,CZ],.09,[1,0,0],PAPER,{flat:1,e0:0,e1:0})});
  if(L.can)F.stroke([L.can[0],9.98,CZ+.17],[L.can[1],9.98,CZ+.17],.04,[0,0,1],INK,{flat:1,e0:0,e1:0});
  (L.lamps||[]).forEach(x=>{poleShadow(F,x,11,4.3,.07);F.stroke([x,11,0],[x,11,4.3],.045,[1,0,0],INK,{flat:1,e0:0,e1:0});F.quad([[x-.42,11,4.3],[x+.42,11,4.3],[x+.12,11,4.62],[x-.12,11,4.62]],INK)});
}
// an upright thing facing the road. lit: paper with its shade side in ink. in shade: lost, unless near (then a paper line)
function thing(F,x,y,w,h,o={}){const S=F.S,lit=F.night?false:!F.shade([x,y-.05,h*.6]),side=S&&S[0]>0?-1:1;
  if(o.awake){for(let xx=x-w/2+.07;xx<x+w/2;xx+=.15)F.stroke([xx,y,0],[xx,y,h],.1,[1,0,0],INK,{e0:0,e1:.02,whole:1});}
  else if(lit){F.quad([[x-w/2,y,0],[x+w/2,y,0],[x+w/2,y,h],[x-w/2,y,h]],PAPER);F.stroke([x+side*w*.36,y,0],[x+side*w*.36,y,h],w*.16,[1,0,0],INK,{e0:0,e1:.01,whole:1})}
  else if(o.near){[[x-w/2,0,x-w/2,h],[x+w/2,0,x+w/2,h],[x-w/2,h,x+w/2,h]].forEach(([a,b,c,d])=>F.stroke([a,y,b],[c,y,d],.025,a===c?[1,0,0]:[0,0,1],PAPER,{flat:1,e0:0,e1:0}))}
  return lit}
function pump(F,x,o={}){const y=11.4,lit=thing(F,x,y,.6,1.55,o),c=o.awake?PAPER:INK;
  if(lit||o.awake||o.near){F.dot([x,y,1.85],.27,o.awake?INK:(lit?PAPER:PAPER));if(lit&&!o.awake){const p=F.pj([x,y,1.85]);F.g.strokeStyle=INK;F.g.lineWidth=1.2;F.g.beginPath();F.g.arc(p[0],p[1],F.px([x,y,1.85],.27),.3,2.4);F.g.stroke()}
    F.quad([[x-.2,y-.01,.95],[x+.2,y-.01,.95],[x+.2,y-.01,1.3],[x-.2,y-.01,1.3]],c)}}

function arrowPoly(a0,dir,per,s0,s1,s2,sw,hw){const P=(s,w)=>add(add(a0,dir,s),per,w);return [P(s0,-sw),P(s1,-sw),P(s1,-hw),P(s2,0),P(s1,hw),P(s1,sw),P(s0,sw),P(s0+.9,0)]}
// Googie arrow sign, upright version (01, 03, 04): a pylon by the road, the name in lit boxes stacked down it, a flat arrow through it aimed at the door, a starburst on top
const NAME='TRABOLD';
function arrowShape(s,w,s0,s1,s2,sw,hw){if(s<s0||s>s2)return false;if(s<s1)return Math.abs(w)<sw&&!(s<s0+1.1&&Math.abs(w)<(s0+1.1-s)*.42);return Math.abs(w)<hw*(s2-s)/(s2-s1)}
function signUpright(F,o={}){const X=-10.6,Y=4.5,TOP=11.6,g=F.g,night=F.night,sz=.74;
  const a0=[X-3.4,Y,7.2],dir=norm([1,0,-.52]),per=[dir[2],0,-dir[0]];                                                // arrow in the sign's own plane, raked down toward the door
  const test=P=>{const d=add(P,a0,-1);return arrowShape(dot(d,dir),dot(d,per),0,7.4,9.8,.42,1.25)};
  if(!o.onlyLights){
    if(!night)F.stroke([X,Y,0],[X,Y,TOP],.11,[1,0,0],INK,{flat:1,e0:0,e1:0});
    if(o.state==='rough'){}
    if(!night)F.fill(a0,dir,per,[0,9.8],[-1.3,1.3],.2,test,INK,[-dir[0],-dir[1],-dir[2]],{step:.08,maxlen:[9,11],drop:0,so:{e0:0,e1:.02}});
    for(let i=0;i<8;i++){const an=i*45*RAD,l=i%2?.55:1.0;F.stroke([X,Y,TOP+.35],[X+Math.cos(an)*l,Y,TOP+.35+Math.sin(an)*l],.035,[Math.sin(an),0,-Math.cos(an)],F.fg,{flat:1,e0:0,e1:0})}
  }
  // bulbs along the arrow: unlit by day (paper holes in the black), lit at night. a regular row, never a cluster
  for(let s=.5;s<9.6;s+=.62){const hwid=s<7.4?.42:1.25*(9.8-s)/2.4;[-1,1].forEach(k=>{if(s<1.1&&k)return;F.dot(add(add(a0,dir,s),per,k*Math.max(.05,hwid-.14)),night?.11:.07,PAPER)})}
  NAME.split('').forEach((ch,i)=>{const z=TOP-.55-i*sz*1.02,c=[X+.62,Y-.05,z];
    F.quad([[c[0]-sz/2,Y-.05,z-sz/2],[c[0]+sz/2,Y-.05,z-sz/2],[c[0]+sz/2,Y-.05,z+sz/2],[c[0]-sz/2,Y-.05,z+sz/2]],PAPER);
    if(!night){F.stroke([c[0]-sz/2,Y-.06,z-sz/2],[c[0]+sz/2,Y-.06,z-sz/2],.04,[0,0,1],INK,{flat:1,e0:0,e1:0});F.stroke([c[0]+sz/2*(F.S[0]>0?-1:1),Y-.06,z-sz/2],[c[0]+sz/2*(F.S[0]>0?-1:1),Y-.06,z+sz/2],.035,[1,0,0],INK,{flat:1,e0:0,e1:0})}
    F.text(c,ch,sz*.92,INK)});
  return {X,Y,TOP}}
// the box the pylon throws its shadow from
function signUprightOcc(F){F.boxes.push([-10.72,-10.5,4.45,4.55,0,11.6],[-10.35,-9.6,4.4,4.6,6.2,11.4]);
  const a0=[-14,4.5,7.2],dir=norm([1,0,-.52]),per=[dir[2],0,-dir[0]];F.occ.push((o,S)=>{if(Math.abs(S[1])<1e-6)return false;const t=(4.5-o[1])/S[1];if(t<=0)return false;const d=add(add(o,S,t),a0,-1);return arrowShape(dot(d,dir),dot(d,per),0,7.4,9.8,.42,1.25)})}

// Googie arrow sign, raked version (02): the arrow lies along the sun's axis and goes over the forecourt. the name stays upright on its pylon
const AX=-4,AYC=-8,AD=[0,Math.cos(LAT),Math.sin(LAT)],AS0=2.6,AS1=16.2,AS2=19.6;
const rakeShape=(s,w)=>arrowShape(s,w,AS0,AS1,AS2,.5,1.7);
function rakeOcc(F){const T0=[AX,AYC,0],n=[0,Math.sin(LAT),-Math.cos(LAT)];F.occ.push((o,S)=>{const dn=dot(S,n);if(Math.abs(dn)<1e-6)return false;const t=dot(add(T0,o,-1),n)/dn;if(t<=0)return false;const Q=add(o,S,t),d=add(Q,T0,-1);return rakeShape(dot(d,AD),Q[0]-AX)});
  F.boxes.push([AX-.12,AX+.12,1.9,2.1,0,7])}
function signRaked(F){const T0=[AX,AYC,0],night=F.night,sz=.8;const mid=add(T0,AD,12),vw=norm(add(mid,F.C,-1)),PER=norm([AD[1]*vw[2]-AD[2]*vw[1],AD[2]*vw[0]-AD[0]*vw[2],AD[0]*vw[1]-AD[1]*vw[0]]);
  const at=s=>add(T0,AD,s);
  if(!night){F.stroke([AX,2,0],[AX,2,at((2-AYC)/Math.cos(LAT))[2]],.12,[1,0,0],INK,{flat:1,e0:0,e1:0});F.stroke([AX,-5.6,0],[AX,-5.6,at((-5.6-AYC)/Math.cos(LAT))[2]],.09,[1,0,0],INK,{flat:1,e0:0,e1:0});
    F.quad(arrowPoly(T0,AD,PER,AS0,AS1,AS2,.5,1.7),INK)}
  for(let s=AS0+.4;s<AS2-.3;s+=.7){const hw=s<AS1?.5:1.7*(AS2-s)/(AS2-AS1);[-1,1].forEach(k=>F.dot(add(at(s),PER,k*Math.max(.06,hw-.16)),night?.12:.07,PAPER))}
  NAME.split('').forEach((ch,i)=>{const z=6.3-i*sz*1.02,c=[AX+.7,1.9,z];
    F.quad([[c[0]-sz/2,1.9,z-sz/2],[c[0]+sz/2,1.9,z-sz/2],[c[0]+sz/2,1.9,z+sz/2],[c[0]-sz/2,1.9,z+sz/2]],PAPER);
    if(!night){F.stroke([c[0]-sz/2,1.89,z-sz/2],[c[0]+sz/2,1.89,z-sz/2],.04,[0,0,1],INK,{flat:1,e0:0,e1:0});F.stroke([c[0]+sz/2*(F.S[0]>0?-1:1),1.89,z-sz/2],[c[0]+sz/2*(F.S[0]>0?-1:1),1.89,z+sz/2],.035,[1,0,0],INK,{flat:1,e0:0,e1:0})}
    F.text(c,ch,sz*.92,INK)})}

// night: the brush paints light. strokes of paper laid away from each lamp
function pool(F,lamp,r0,r1,o={}){for(let a=0;a<360;a+=rr(2.4,4.4)){const d=[Math.cos(a*RAD),Math.sin(a*RAD)*(o.sq||.85),0];let rmax=rr(r0,r1);
    (o.block||[]).forEach(([bx,by])=>{const b=Math.atan2((by-lamp[1])/(o.sq||.85),bx-lamp[0])/RAD,da=Math.abs(((a-b+540)%360)-180);if(da<8)rmax=Math.min(rmax,Math.hypot(bx-lamp[0],by-lamp[1])*.92)});
    let B=add(lamp,d,rmax);if(o.ymax&&B[1]>o.ymax){const k=(o.ymax-lamp[1])/(B[1]-lamp[1]);B=add(lamp,d,rmax*k)}
    F.stroke(add(lamp,d,.25),B,.24,[-d[1],d[0],0],PAPER,{e0:0,e1:rr(0,.08)})}}
