// @ts-nocheck
import { C, N } from './content'
import { media } from './media'
export function init() {
// ==================================
const $=s=>document.querySelector(s),rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
let found=false,letterOpen=false;
// opening: exactly three clicks
const op=$('#open'),b=$('#b'),hints=["The sigil stirs.","The light answers.","The doors open."];let n=0,busy=false;
b.onclick=()=>{if(busy)return;n++;op.dataset.s=n;$('#hint').textContent=hints[n-1];
 if(n===3){busy=true;b.disabled=true;$('#w').classList.add('on');op.classList.add('go');
  setTimeout(()=>{op.remove();document.body.classList.remove('lock');$('#topl').hidden=false;scrollTo(0,0)},rm?300:2500)}};
// dust + hall candles
for(let i=0;i<26;i++){const d=document.createElement('i');d.className='d';d.style.cssText=`left:${Math.random()*100}%;width:${1+Math.random()*2.5}px;height:${1+Math.random()*2.5}px;animation-duration:${14+Math.random()*16}s;animation-delay:-${Math.random()*20}s`;$('#dust').append(d)}
for(let i=0;i<9;i++){const c=document.createElement('div');c.className='fc';c.style.cssText=`left:${6+i*11}%;top:${6+(i%3)*9}%;animation-delay:-${i}s;animation-duration:${5+i%3}s`;$('#fcs').append(c)}
// letters
const P=a=>a.map(p=>`<p class="rv">${p}</p>`).join('');
$('#l1').innerHTML=P(C.summons).replace('<p class="rv">Dear','<p class="rv"><em>Dear').replace('Kuki,</p>','Kuki,</em></p>');
$('#l2').innerHTML=P(C.friend)+`<p class="sg rv">${C.sign}</p>`;
$('#seal').onclick=()=>{$('#ev').classList.add('open');letterOpen=true;setTimeout(()=>$('#l1').scrollIntoView({behavior:rm?'auto':'smooth',block:'center'}),900)};
// hall
let lit=0;for(let i=1;i<=9;i++){const c=document.createElement('button');c.className='cd';c.setAttribute('aria-pressed','false');c.setAttribute('aria-label','Light candle '+i);c.innerHTML='<i></i>';c.onclick=()=>{if(c.getAttribute('aria-pressed')==='true')return;c.setAttribute('aria-pressed','true');chime();if(++lit===9){const n=$('#note');n.textContent=C.hallNote;n.hidden=false}};$('#cds').append(c)}
// memories
$('#mw').innerHTML=C.memories.map((m,i)=>`<button class="fl rv" aria-pressed="false" aria-label="Memory ${i+1}: ${m.t}. Tap to turn over."><span class="fi"><span class="fa">${m.img?`<img src="${m.img}" alt="${m.t}">`:'<svg width="42" height="42" viewBox="0 0 42 42" aria-hidden="true"><path d="M21 3l4 14 14 4-14 4-4 14-4-14-14-4 14-4z" fill="#c9a24b"/></svg>'}<b>${m.t}</b>${m.l}${m.d?`<small>${m.d}</small>`:''}</span><span class="fa bk">${m.n}</span></span></button>`).join('');
document.querySelectorAll('.fl').forEach(f=>f.onclick=()=>f.setAttribute('aria-pressed',f.getAttribute('aria-pressed')!=='true'));
// map
const M=[[80,50,'The Summons','top','r'],[250,110,'The Letter','letter','l'],[110,190,'The Great Hall','hall','r'],[250,270,'Memory Charms','mem','l'],[100,350,'Restricted Section','lib','r'],[250,420,'Her Favourite Idiot','fl','l'],[140,480,'The Final Spell','fin','r']];
$('#mks').innerHTML=M.map((m,i)=>`<a class="mk" href="#${m[3]}" aria-label="${m[2]}"><circle cx="${m[0]}" cy="${m[1]}" r="14"/><text class="n" x="${m[0]}" y="${m[1]+5}">${i+1}</text><text class="l" x="${m[0]+(m[4]=='r'?22:-22)}" y="${m[1]+5}" text-anchor="${m[4]=='r'?'start':'end'}">${m[2]}</text></a>`).join('');
// library
const cols=['#4a1822','#10241b','#2b1d10','#3a2a4a','#5a3a12','#6b6a2a','#14303a','#3a1010'];
$('#sh').innerHTML=C.books.map((k,i)=>`<button class="bk" style="height:${110+(i*37%80)}px;background:${i==5?'#8a7a30':cols[i%8]}" aria-label="${k[0]}">${k[0].slice(0,14)}</button>`).join('');
document.querySelectorAll('.bk').forEach((bk,i)=>bk.onclick=()=>{document.querySelectorAll('.bk').forEach(x=>x.classList.remove('on'));bk.classList.add('on');const k=C.books[i];if(k[1]==='JOKE'){$('#bm').textContent='This one is slightly greasy. Something slid out…';joke()}else $('#bm').textContent=k[1]});
function joke(){if(found)return;found=true;chime();const w=$('#jkw');w.innerHTML=`<div id="jk"></div>`;$('#jk').textContent=C.joke;for(let i=0;i<14;i++){const s=document.createElement('i');s.className='s';s.style.setProperty('--a',i*26+'deg');$('#jk').append(s)}}
const sm=$('#smudge');sm.onclick=()=>{joke();$('#lib').scrollIntoView({behavior:rm?'auto':'smooth'})};sm.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();sm.onclick()}};
// finale
$('#spell').onclick=function(){this.disabled=true;this.textContent='…';setTimeout(()=>{$('#fc').hidden=true;$('#fh').hidden=true;const f=$('#fm');f.innerHTML='<h2></h2><p></p><a class="btn" href="#fl">Read the letter again</a> <button class="btn" id="again">Begin again</button>';f.querySelector('h2').textContent=C.final;f.querySelector('p').textContent=C.close;$('#again').onclick=()=>location.reload()},rm?200:2600)};
// last secret
$('#lb').onclick=function(){this.hidden=true;const l=$('#ln');l.hidden=false;l.textContent=found?'P.S. You found the greasy book. Of course you did. Some secrets are best kept a little buttery. ✦ Made by Debasish':'P.S. There is one more secret hidden in the library. Not on the best-lit shelf. ✦ Made by Debasish'};
// keeper (local, scripted; swap ask() for a real API call later)
const Q=[["Where should I go next?",()=>letterOpen?["Try the candles in the Great Hall, then the memories.","#hall"]:["Start with the wax seal on the letter.","#letter"]],["What is hidden in the library?",()=>["Eight books. Seven are well behaved. One is greasy. Also, some ink in that room seems to be listening.","#lib"]],["How do I return to the letter?",()=>["Right this way.","#fl"]],["Is there another secret here?",()=>[found?"You already found the big one. Chapter Nine has a quiet note.":"The map has a smudge, and the library has a strange book.",found?"#last":"#map"]]];
const ask=i=>Q[i][1]();
$('#kq').innerHTML=Q.map((q,i)=>`<button data-i="${i}">${q[0]}</button>`).join('');
$('#kq').onclick=e=>{const i=e.target.dataset.i;if(i==null)return;const [t,h]=ask(+i);$('#ka').innerHTML='';const s=document.createElement('span');s.textContent=t+' ';const a=document.createElement('a');a.href=h;a.textContent='Take me there';a.style.color='var(--amb)';a.onclick=()=>{$('#kpn').hidden=true;$('#kp').setAttribute('aria-expanded','false')};$('#ka').append(s,a)};
$('#kp').onclick=()=>{const p=$('#kpn');p.hidden=!p.hidden;$('#kp').setAttribute('aria-expanded',!p.hidden)};
addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('#kpn').hidden)$('#kp').click()});
// personal media
const fill=(u,a,n)=>u?`<img src="${u}" alt="${a}" loading="lazy">`:`<div class="ph">A photograph will appear here.<small>${n}</small></div>`;
[['shT',N.shadowTitle],['shG',N.shadowTag],['prom',N.promise],['spT',N.spiderTitle],['spL',N.spiderLine],['spX',N.spiderText],['sgT',N.songTitle],['vdT',N.videoTitle],['scT',N.secretTitle],['scC',N.secretCaption]].forEach(([i,t])=>$('#'+i).textContent=t);
$('#p1').innerHTML=fill(media.p1,'A shadow worth keeping','Photos/photo1.png');
$('#p2').innerHTML=fill(media.p2,'The Spider-Man handshake','Photos/photo2.png');
$('#au').innerHTML=media.song?`<audio controls preload="none" src="${media.song}" aria-label="${N.songTitle}"></audio>`:`<div class="ph">Her song will play here.<small>Music/favorite-song.mp3</small></div>`;
$('#vd').innerHTML=media.video?`<video controls playsinline preload="metadata" src="${media.video}" aria-label="${N.videoTitle}"></video>`:`<div class="ph">The handshake video will play here.<small>Videos/spiderman-handshake.mp4</small></div>`;
const pm=document.querySelectorAll('#spider audio,#spider video');pm.forEach(m=>m.onplay=()=>pm.forEach(o=>o!==m&&o.pause()));
// the inkwell secret (photo 3 is only loaded after discovery)
let ik=0,ib=false;const sc=$('#secret');
$('#ink').onclick=function(){if(ib)return;if(!sc.hidden){sc.scrollIntoView();return}
 if(ik++<1){$('#bm').textContent='The ink ripples, as if something underneath is listening…';return}
 ib=true;chime();const r=this.getBoundingClientRect(),sp=$('#spill');sp.style.setProperty('--x',r.left+r.width/2+'px');sp.style.setProperty('--y',r.top+r.height/2+'px');sp.classList.add('go');
 setTimeout(()=>{if(media.p3){const i=new Image();i.src=media.p3;i.alt='A secret photograph';$('#p3').replaceChildren(i)}else $('#p3').innerHTML=fill('','','Photos/photo3.png');sc.hidden=false;sc.scrollIntoView({behavior:'auto'})},rm?60:760);
 setTimeout(()=>{sp.classList.remove('go');ib=false},rm?200:1450)};
$('#reseal').onclick=()=>{sc.hidden=true;$('#p3').replaceChildren();ik=1;$('#lib').scrollIntoView()};
// sound (Web Audio, user-initiated only) + chapter candlelight
let ac,mg,on=false;const snd=$('#snd');
snd.onclick=()=>{if(!ac){ac=new AudioContext();mg=ac.createGain();mg.gain.value=0;const f=ac.createBiquadFilter();f.type='lowpass';f.frequency.value=320;[55,82.4,110.6].forEach(fr=>{const o=ac.createOscillator();o.frequency.value=fr;o.connect(f);o.start()});f.connect(mg);mg.connect(ac.destination)}
 on=!on;ac.resume();mg.gain.setTargetAtTime(on?.05:0,ac.currentTime,.8);snd.setAttribute('aria-pressed',String(on));snd.textContent=on?'Sound on':'Sound off'};
function chime(){if(!on||!ac)return;const o=ac.createOscillator(),g=ac.createGain();o.frequency.value=880;g.gain.setValueAtTime(.06,ac.currentTime);g.gain.exponentialRampToValueAtTime(.0001,ac.currentTime+1.2);o.connect(g);g.connect(ac.destination);o.start();o.stop(ac.currentTime+1.2)}
const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('lit')}),{threshold:.25});document.querySelectorAll('section').forEach(s=>so.observe(s));
// reveal on scroll
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll('.rv').forEach((e,i)=>{e.style.transitionDelay=(i%6)*80+'ms';io.observe(e)});

}
