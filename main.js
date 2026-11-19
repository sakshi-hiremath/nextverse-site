(function(){
var rm=matchMedia('(prefers-reduced-motion:reduce)').matches,fine=matchMedia('(hover:hover) and (pointer:fine)').matches,$=function(s){return document.querySelector(s)},$$=function(s){return Array.prototype.slice.call(document.querySelectorAll(s))},cl=function(v){return Math.max(0,Math.min(1,v))};
/* smooth inertial scroll */
var cur=scrollY,tar=scrollY,last=scrollY,mxs=function(){return document.documentElement.scrollHeight-innerHeight};
if(fine&&!rm){addEventListener('wheel',function(e){if(e.ctrlKey||e.defaultPrevented)return;e.preventDefault();tar=Math.max(0,Math.min(mxs(),tar+e.deltaY*(e.deltaMode?30:1)))},{passive:false});
(function sl(){if(Math.abs(scrollY-last)>2){cur=tar=scrollY}cur+=(tar-cur)*.09;if(Math.abs(tar-cur)<.15)cur=tar;if(Math.round(cur)!==Math.round(scrollY)){scrollTo(0,cur)}last=scrollY;requestAnimationFrame(sl)})()}
/* reveals, tilt, cursor */
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
$$('.rv').forEach(function(el){el.style.setProperty('--d',(Array.prototype.indexOf.call(el.parentNode.children,el)%3)*.09+'s');io.observe(el)});
if(!rm)$$('.tilt').forEach(function(c){c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform='perspective(800px) rotateX('+(-y*10)+'deg) rotateY('+(x*10)+'deg) translateZ(14px)';c.style.setProperty('--gx',(x+.5)*100+'%');c.style.setProperty('--gy',(y+.5)*100+'%')});c.addEventListener('pointerleave',function(){c.style.transform=''})});
var mx=0,my=0;addEventListener('pointermove',function(e){mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});
/* pinned laptop scene (scroll-driven) */
var sec=$('.show');
if(sec){var lap=$('.lap'),lid=$('.lid'),st=$('.strip'),sc=$('.scr'),sx=0;
(function t(){var r=sec.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight){var p=cl(-r.top/(sec.offsetHeight-innerHeight)),sp=cl((p-.22)/.74);sx+=(mx-sx)*.07;var o=cl(p/.24);
lid.style.setProperty('--a',(-88+96*(1-Math.pow(1-o,3)))+'deg');
lap.style.transform='translateY('+(-p*24)+'px) rotateX('+(-22+17*cl(p/.5))+'deg) rotateY('+(sx*12)+'deg) scale('+(1+.12*p)+')';
st.style.transform='translateY('+(-sp*Math.max(0,st.offsetHeight-sc.clientHeight))+'px)'}requestAnimationFrame(t)})()}
$$('.scene').forEach(function(s){var d=s.querySelector('.dev'),dir=+s.dataset.dir,ry=0,rx=0,px=0,py=0;
if(!rm){s.addEventListener('pointermove',function(e){var r=s.getBoundingClientRect();px=(e.clientX-r.left)/r.width-.5;py=(e.clientY-r.top)/r.height-.5;d.style.setProperty('--gx',(px+.5)*100+'%');d.style.setProperty('--gy',(py+.5)*100+'%')});s.addEventListener('pointerleave',function(){px=py=0});
(function t(){var r=s.getBoundingClientRect();if(r.bottom>-100&&r.top<innerHeight+100){var p=Math.max(-1,Math.min(1,(r.top+r.height/2-innerHeight/2)/innerHeight));ry+=(dir*(-26*p)+px*16-ry)*.09;rx+=(12*p-py*12-rx)*.09;d.style.transform='rotateX('+rx.toFixed(2)+'deg) rotateY('+ry.toFixed(2)+'deg)'}requestAnimationFrame(t)})()}});
/* hero: big 3D logo */
/* footer 3D wordmark */
var fs=$('.fscene');if(fs&&!rm){var wd=$('.word'),fx=0,fy=0;(function t(){var r=fs.getBoundingClientRect();if(r.top<innerHeight){var p=cl((innerHeight-r.top)/(r.height+70)),e=1-Math.pow(1-p,3);fx+=(mx-fx)*.07;fy+=(my-fy)*.07;wd.style.transform='translateY('+((1-e)*50)+'px) rotateX('+((1-e)*62-fy*8)+'deg) rotateY('+(fx*18)+'deg)'}requestAnimationFrame(t)})()}
var hero=$('.hero');if(!hero)return;
function dbg(m){var d=document.createElement('div');d.className='dbg';d.textContent='3D debug: '+m;document.body.appendChild(d)}
addEventListener('load',function(){try{if(!window.THREE){dbg('3D library did not load');return}
var T=THREE,cv=$('#gl'),R;try{R=new T.WebGLRenderer({canvas:cv,alpha:true,antialias:true})}catch(e){dbg('WebGL not available: '+e.message);return}
R.setPixelRatio(Math.min(devicePixelRatio,2));
var S=new T.Scene(),C=new T.PerspectiveCamera(40,1,.1,200);C.position.z=14;
S.add(new T.AmbientLight(0xffffff,.45));
var L1=new T.PointLight(0x9d86d6,2.6,70);L1.position.set(-8,6,10);S.add(L1);
var L2=new T.PointLight(0x654ba6,2.4,70);L2.position.set(9,-5,8);S.add(L2);
var D=new T.DirectionalLight(0xffffff,.9);D.position.set(2,4,8);S.add(D);
var P=["411.8 16.0 327.5 15.8 269.8 60.0 245.2 80.0 240.0 83.5 233.2 86.8 224.5 88.8 156.5 88.8 155.8 89.8 155.8 137.8 157.0 138.8 224.2 139.0 234.2 138.2 248.8 135.5 259.0 131.5 264.5 128.8 273.2 123.0 407.8 19.8","261.2 16.5 260.5 15.8 181.2 15.8 172.0 17.0 159.0 20.8 151.0 25.2 132.5 39.5 24.0 126.0 9.5 138.2 10.2 138.8 89.2 138.8 172.0 71.8 177.2 68.5 188.8 64.2 199.8 62.2 260.5 62.0 261.2 61.2"],G=new T.Group(),IN=new T.Group();G.add(IN);S.add(G);
P.forEach(function(s){var n=s.trim().split(/\s+/).map(Number),sh=new T.Shape();for(var k=0;k<n.length;k+=2){var x=n[k]-210,y=-(n[k+1]-78);k?sh.lineTo(x,y):sh.moveTo(x,y)}
var g=new T.ExtrudeGeometry(sh,{depth:50,bevelEnabled:true,bevelThickness:7,bevelSize:5,bevelSegments:3});g.translate(0,0,-25);
IN.add(new T.Mesh(g,new T.MeshStandardMaterial({color:0xf2eeff,metalness:.55,roughness:.28,emissive:0x2a1c52,emissiveIntensity:.55})))});
document.documentElement.classList.add('gl-on');
var W,H,pp,sx=0,sy=0,t0=performance.now()+250,hl=$('.hl'),hv=$('.hv'),cue=$('.cue');
function size(){W=cv.clientWidth;H=cv.clientHeight;R.setSize(W,H,false);C.aspect=W/H;C.updateProjectionMatrix();pp=H/(2*Math.tan(C.fov*Math.PI/360)*C.position.z)}
size();addEventListener('resize',size);
function frame(now){var tt=now*.001,o=rm?1:cl((now-t0)/1600),eo=1-Math.pow(1-o,4),p=cl(scrollY/(hero.offsetHeight-innerHeight));
var kw=Math.min(W*.6,780)/pp/402,fade=p>.5?cl(1-(p-.5)/.22):1;
G.visible=fade>.01&&o>0;G.scale.setScalar(kw*eo*(1+.5*p)*fade);
G.position.set(0,(H*.5-H*.38)/pp+p*3+Math.sin(tt*1.2)*.12,0);
sx+=(mx-sx)*.06;sy+=(my-sy)*.06;
IN.rotation.y=(1-eo)*-2.4+Math.sin(tt*.7)*.5+sx*1.1+p*Math.PI*.9;IN.rotation.x=sy*.5+Math.sin(tt*.5)*.12;
L1.position.x=-8+sx*14;L2.position.y=-5-sy*10;
var hh=cl((p-.5)/.25);hl.style.opacity=hh;hl.style.transform='translate(-50%,'+(-40+(1-hh)*12)+'%)';
hv.style.opacity=1-cl(p/.3);hv.style.transform='translateY('+(-p*90)+'px)';cue.style.opacity=1-cl(p/.15);
R.render(S,C)}
if(rm){frame(2000)}else{(function loop(t){if(!document.hidden)frame(t);requestAnimationFrame(loop)})(performance.now())}
}catch(err){dbg('error: '+err.message)}});
})();
