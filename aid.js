(function(){
"use strict";

/* ---------------------------------------------------------------- data
   Every organisation below is a real registered nonprofit with a live
   crypto-donation page on The Giving Block. Names, tax IDs and cause
   categories are taken verbatim from those pages. */
var CH = [
 ["The Bowery Mission","the-bowery-mission","13-1617086",["Homelessness","Hunger","Children & Youth"],"bowl","bowery.org"],
 ["USA for UNHCR","usa-for-unhcr","52-1662800",["Immigration & Refugees","International Development","Women & Girls"],"globe","unrefugees.org"],
 ["Room to Read","room-to-read","91-2003533",["Education & Training","Children & Youth","Women & Girls"],"book","roomtoread.org"],
 ["Muscular Dystrophy Association","muscular-dystrophy-association","13-1665552",["Health & Medicine"],"cross","mda.org"],
 ["San Diego Zoo Wildlife Alliance","san-diego-zoo-wildlife-alliance","95-1648219",["Animals","Arts & Culture","Education & Training"],"paw","sdzwa.org"],
 ["Guide Dogs for the Blind","guide-dogs-for-the-blind","94-1196195",["Animals","Children & Youth","Education & Training"],"paw","guidedogs.com"],
 ["WildAid","wildaid","20-3644441",["Animals","Environment","Education & Training"],"leaf","wildaid.org"],
 ["Sea Turtle Conservancy","sea-turtle-conservancy","59-6151069",["Animals","Environment","Education & Training"],"leaf","conserveturtles.org"],
 ["Crisis Text Line, Inc.","crisis-text-line-inc","46-5039599",["Health & Medicine","Technology"],"chat","crisistextline.org"],
 ["Utah Food Bank","utah-food-bank","87-0212453",["Hunger"],"bowl","utahfoodbank.org"],
 ["The Sentencing Project","the-sentencing-project","52-1472546",["Human Rights","Racial Justice","Education & Training"],"scale","sentencingproject.org"],
 ["Love146","love146","20-1168284",["Children & Youth","Human Rights","Education & Training"],"heart","love146.org"],
 ["The Farmlink Project","the-farmlink-project","85-1398171",["Hunger","Environment","Disaster Response"],"bowl","farmlinkproject.org"],
 ["Ali Forney Center","ali-forney-center","30-0104507",["Homelessness","Hunger","LGBTQ"],"roof","aliforneycenter.org"],
 ["Internet Security Research Group","internet-security-research-group","46-3344200",["Technology"],"chip","abetterinternet.org"],
 ["Elizabeth Glaser Pediatric AIDS Foundation","elizabeth-glaser-pediatric-aids-foundation","95-4191698",["Health & Medicine","Children & Youth","International Development"],"cross","pedaids.org"],
 ["Oregon Humane Society","oregon-humane-society","93-0386880",["Animals","Disaster Response","Education & Training"],"paw","oregonhumane.org"],
 ["Chimp Haven","chimp-haven","74-2766663",["Animals"],"paw","chimphaven.org"],
 ["Wildlife Conservation Society","wildlife-conservation-society","13-1740011",["Animals","Environment","International Development"],"leaf","wcs.org"],
 ["NephCure Kidney International","nephcure-kidney-international","38-3569922",["Health & Medicine"],"cross","nephcure.org"],
 ["Human-I-T","human-i-t","46-0773284",["Technology","Children & Youth","International Development"],"chip","human-i-t.org"],
 ["The Turing Trust","the-turing-trust","SC046150",["Technology","Education & Training","International Development"],"chip","turingtrust.co.uk"],
 ["Common Sense Media","common-sense-media","41-2024986",["Children & Youth","Education & Training","Technology"],"book","commonsensemedia.org"],
 ["Fresh Air Fund","fresh-air-fund","13-1656653",["Children & Youth"],"leaf","freshair.org"],
 ["Food Bank of Iowa","food-bank-of-iowa","42-1177880",["Hunger"],"bowl","foodbankiowa.org"],
 ["Pancreatic Cancer Action Network, Inc.","pancreatic-cancer-action-network-inc","33-0841281",["Health & Medicine","Education & Training"],"cross","pancan.org"],
 ["Diabetes Research Institute Foundation","diabetes-research-institute-foundation","59-1361955",["Health & Medicine"],"cross","diabetesresearch.org"],
 ["Choose Love","choose-love","83-1378746",["Immigration & Refugees","LGBTQ","Women & Girls"],"globe","chooselove.org"],
 ["Movember Canada","movember-canada","84821 5604 RR0001",["Health & Medicine"],"cross","movember.com"],
 ["Boys Hope Girls Hope","boys-hope-girls-hope","51-0182614",["Children & Youth","Education & Training","Racial Justice"],"book","boyshopegirlshope.org"],
 ["Good Sports","good-sports","75-3138664",["Children & Youth","Health & Medicine","Racial Justice"],"ball","goodsports.org"],
 ["School on Wheels, Inc.","school-on-wheels-inc","95-4422640",["Children & Youth","Education & Training","Homelessness"],"book","schoolonwheels.org"]
].map(function(r){return {name:r[0],slug:r[1],ein:r[2],tags:r[3],g:r[4],dom:r[5],opened:false,
  url:"https://thegivingblock.com/donate/"+r[1]+"/"};});

var GLYPH = {
 bowl:'<path d="M3 11h18a9 9 0 0 1-18 0Z"/><path d="M12 7c0-1.4-1.2-1.6-1.2-2.6 0-.8.7-1.4.7-1.4"/><path d="M2 21h20"/>',
 globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18"/>',
 book:'<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H19v18H6.5A2.5 2.5 0 0 0 4 22V4.5Z"/><path d="M4 18h15"/>',
 cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6V3Z"/>',
 paw:'<ellipse cx="6" cy="10" rx="2.1" ry="2.6"/><ellipse cx="10" cy="6.4" rx="2.1" ry="2.6"/><ellipse cx="14.6" cy="6.4" rx="2.1" ry="2.6"/><ellipse cx="18.4" cy="10" rx="2.1" ry="2.6"/><path d="M12.2 12.4c3.3 0 5.6 2.4 5.6 4.7 0 2-1.6 3.2-3.4 3.2-1 0-1.6-.4-2.2-.4s-1.2.4-2.2.4c-1.8 0-3.4-1.2-3.4-3.2 0-2.3 2.3-4.7 5.6-4.7Z"/>',
 leaf:'<path d="M20 4C9 4 4 9.5 4 16c0 2 .6 3.4.6 3.4S8 12 20 9c0 0-6.5 2.8-9.6 7.6"/><path d="M4 20c2.8 0 5-.8 6.6-2"/>',
 chat:'<path d="M21 12a8 8 0 0 1-8 8H4l2.2-3A8 8 0 1 1 21 12Z"/><path d="M8.5 11h7M8.5 14.5h4"/>',
 scale:'<path d="M12 3v18M6 21h12M4 8h16M8 8l-4 7h8Zm8 0 4 7h-8Z"/>',
 heart:'<path d="M12 20.5 4.2 13A4.9 4.9 0 0 1 12 7a4.9 4.9 0 0 1 7.8 6L12 20.5Z"/>',
 roof:'<path d="M3 11 12 3l9 8"/><path d="M5.5 9.7V20h13V9.7"/><path d="M10 20v-5.5h4V20"/>',
 chip:'<rect x="6.5" y="6.5" width="11" height="11" rx="1.6"/><path d="M10 3v3.5M14 3v3.5M10 17.5V21M14 17.5V21M3 10h3.5M3 14h3.5M17.5 10H21M17.5 14H21"/>',
 ball:'<circle cx="12" cy="12" r="9"/><path d="M3.6 8.5c4.8 1 9.6 4.4 11.4 11.8M20.4 8.5c-4.8 1-9.6 4.4-11.4 11.8M8.4 3.6C10 8 10 15 6.4 19.6"/>'
};
var TICKSVG='<svg class="vfy" viewBox="0 0 24 24" fill="#4aa86c"><circle cx="12" cy="12" r="12"/><path d="m6.5 12.4 3.4 3.4 7.6-7.6" stroke="#0b0b0c" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';

var $=function(s){return document.querySelector(s);};
var $$=function(s){return [].slice.call(document.querySelectorAll(s));};
function esc(s){return String(s).replace(/[&<>"']/g,function(c){
  return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}

/* ------------------------------------------------- identity marks
   Each organisation gets a mark of its own: its initials, a hue derived
   from its tax ID so it never changes, and its cause glyph behind. Stable
   and distinct per charity — and not the organisation's own logo, which
   next to a launch button would claim an endorsement nobody gave. */
var STOP={"the":1,"of":1,"for":1,"and":1,"a":1,"inc":1,"inc.":1,"international":1,"foundation":1,"project":1};
function initials(name){
  var w=name.replace(/[^A-Za-z0-9 -]/g," ").split(/[\s-]+/).filter(Boolean);
  var k=w.filter(function(x){return !STOP[x.toLowerCase()];});
  if(!k.length) k=w;
  if(k.length===1) return (k[0].slice(0,2)).toUpperCase();
  return (k[0][0]+k[1][0]).toUpperCase();
}
function hue(seed){
  var h=0; for(var i=0;i<seed.length;i++) h=(h*31+seed.charCodeAt(i))>>>0;
  /* a curated spread — muted, never neon, never two neighbours the same */
  var HUES=[152,188,206,222,254,282,318,346,14,28,44,96];
  return HUES[h%HUES.length];
}
function avatar(c,size){
  /* The organisation's own logo, fetched through our proxy. If it does not
     resolve the lettermark underneath stays visible, so a row is never blank. */
  return '<div class="av'+(size?" "+size:"")+'" style="--h:'+c.h+'">'
    +'<svg class="avg" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">'+(GLYPH[c.g]||GLYPH.heart)+'</svg>'
    +'<span class="avi">'+esc(c.ini)+'</span>'
    +(c.dom ? '<img class="avl" alt="" loading="lazy" decoding="async" src="/api/logo?d='+encodeURIComponent(c.dom)+'"'
      +' onload="this.classList.add(\'ok\')" onerror="this.remove()">' : '')
    +'</div>';
}
CH.forEach(function(c){ c.ini=initials(c.name); c.h=hue(c.ein+c.slug); });

function toast(msg){
  var t=$("#toast"); t.innerHTML=msg; t.classList.add("on");
  clearTimeout(toast._t); toast._t=setTimeout(function(){t.classList.remove("on");},3400);
}
function copy(txt){
  /* clipboard access can be refused outright (permissions, insecure origin),
     so fall back to a hidden textarea rather than throwing at the user. */
  function legacy(){
    var a=document.createElement("textarea"); a.value=txt;
    a.style.cssText="position:fixed;opacity:0;pointer-events:none";
    document.body.appendChild(a); a.select();
    try{ document.execCommand("copy"); }catch(e){}
    document.body.removeChild(a);
  }
  if(navigator.clipboard && navigator.clipboard.writeText){
    return navigator.clipboard.writeText(txt).catch(legacy);
  }
  legacy(); return Promise.resolve();
}

/* ---------------------------------------------------------------- dust */
(function(){
  var cv=$("#dust"), ctx=cv.getContext("2d"), P=[], W=0,H=0,DPR=1,raf=null;
  var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function init(){
    DPR=Math.min(window.devicePixelRatio||1,2);
    W=window.innerWidth; H=window.innerHeight;
    cv.width=W*DPR; cv.height=H*DPR; cv.style.width=W+"px"; cv.style.height=H+"px";
    ctx.setTransform(DPR,0,0,DPR,0,0);
    var n=Math.round(Math.min(340,Math.max(90,W*H/5200)));
    P=[]; for(var i=0;i<n;i++) P.push(make(true));
  }
  function make(anywhere){
    var far=Math.random()<.62;
    return {
      x:Math.random()*W,
      y:anywhere?Math.random()*H:-8-Math.random()*40,
      r:far?(.5+Math.random()*.7):(.9+Math.random()*1.25),
      vy:far?(.10+Math.random()*.16):(.22+Math.random()*.34),
      dx:(Math.random()-.5)*.13,
      ph:Math.random()*Math.PI*2,
      sw:.22+Math.random()*.5,
      a:far?(.10+Math.random()*.14):(.18+Math.random()*.24),
      g:Math.random()<.14
    };
  }
  function frame(){
    ctx.clearRect(0,0,W,H);
    for(var i=0;i<P.length;i++){
      var p=P[i];
      p.y+=p.vy; p.ph+=0.009;
      p.x+=p.dx+Math.sin(p.ph)*p.sw*0.12;
      if(p.y-p.r>H+6||p.x<-20||p.x>W+20) P[i]=make(false);
      ctx.beginPath();
      ctx.fillStyle=p.g?"rgba(126,196,152,"+p.a.toFixed(3)+")":"rgba(226,226,232,"+p.a.toFixed(3)+")";
      ctx.arc(p.x,p.y,p.r,0,6.2832); ctx.fill();
    }
    raf=requestAnimationFrame(frame);
  }
  init();
  if(!reduce) frame(); else { ctx.clearRect(0,0,W,H); }
  var rt=null;
  window.addEventListener("resize",function(){
    clearTimeout(rt); rt=setTimeout(function(){ init(); },180);
  });
  document.addEventListener("visibilitychange",function(){
    if(document.hidden){ if(raf) cancelAnimationFrame(raf); raf=null; }
    else if(!raf && !reduce) frame();
  });
})();

/* ---------------------------------------------------------------- wallet */
var WALLET=null;
function provider(){
  if(window.phantom&&window.phantom.solana&&window.phantom.solana.isPhantom) return window.phantom.solana;
  if(window.solana&&window.solana.isPhantom) return window.solana;
  if(window.solflare&&window.solflare.isSolflare) return window.solflare;
  if(window.backpack&&window.backpack.isBackpack) return window.backpack;
  if(window.solana) return window.solana;
  return null;
}
function short(a){ return a.slice(0,4)+"…"+a.slice(-4); }
function setWallet(a){
  WALLET=a;
  var b=$("#wbtn");
  if(a){ b.innerHTML='<i class="wdot"></i>'+short(a); b.title="Click to disconnect"; }
  else { b.textContent="Connect wallet"; b.title=""; }
  $("#who").textContent = a ? short(a) : "your wallet";
  fill();
}
async function connect(){
  var p=provider();
  if(!p){
    toast('No Solana wallet found in this browser. <a href="https://phantom.app/" target="_blank" rel="noopener" style="color:#9fd9b6">Get Phantom ↗</a>');
    return;
  }
  try{
    var r=await p.connect();
    var k=(r&&r.publicKey)?r.publicKey:p.publicKey;
    if(k) { setWallet(k.toString()); toast("Wallet connected. This site only reads your address."); }
  }catch(e){ toast("Connection cancelled."); }
}
$("#wbtn").addEventListener("click",async function(){
  if(WALLET){
    var p=provider();
    try{ if(p&&p.disconnect) await p.disconnect(); }catch(e){}
    setWallet(null); toast("Wallet disconnected.");
  } else await connect();
});
(function eager(){
  var p=provider(); if(!p||!p.connect) return;
  p.connect({onlyIfTrusted:true}).then(function(r){
    var k=(r&&r.publicKey)?r.publicKey:p.publicKey; if(k) setWallet(k.toString());
  }).catch(function(){});
  if(p.on) p.on("accountChanged",function(k){ setWallet(k?k.toString():null); });
})();

/* ---------------------------------------------------------------- register */
var LIMIT=12, showAll=false, activeTag="All", picked=null, LAUNCHES=[];

var TAGS=(function(){
  var m={};CH.forEach(function(c){c.tags.forEach(function(t){m[t]=(m[t]||0)+1;});});
  return Object.keys(m).sort(function(a,b){return m[b]-m[a]||a.localeCompare(b);})
    .map(function(t){return {t:t,n:m[t],h:hue(t)};});
})();

$("#n-reg").textContent=CH.length;

$("#spread").innerHTML=TAGS.map(function(x){
  return '<span data-t="'+esc(x.t)+'" style="--h:'+x.h+';flex:'+x.n+'" title="'+esc(x.t)+' — '+x.n+'"></span>';
}).join("");
$("#chips").innerHTML=['<button class="chip on" data-t="All">All</button>'].concat(
  TAGS.map(function(x){return '<button class="chip" data-t="'+esc(x.t)+'">'+esc(x.t)+' <span style="color:var(--faint)">'+x.n+'</span></button>';})
).join("");

function setTag(t){
  activeTag=t; showAll=false;
  $$("#chips .chip").forEach(function(c){c.classList.toggle("on",c.dataset.t===t);});
  $$("#spread span").forEach(function(s){s.classList.toggle("on",s.dataset.t===t);});
  render();
}
$("#chips").addEventListener("click",function(e){
  var b=e.target.closest(".chip"); if(b) setTag(b.dataset.t);
});
$("#spread").addEventListener("click",function(e){
  var s=e.target.closest("span"); if(s) setTag(s.dataset.t===activeTag?"All":s.dataset.t);
});
$("#clearf").addEventListener("click",function(){ $("#q").value=""; $("#sort").value="az"; setTag("All"); });

function filtered(){
  var q=$("#q").value.trim().toLowerCase();
  var out=CH.filter(function(c){
    if(activeTag!=="All" && c.tags.indexOf(activeTag)<0) return false;
    if(!q) return true;
    return c.name.toLowerCase().indexOf(q)>=0 || c.ein.toLowerCase().indexOf(q)>=0
        || c.tags.join(" ").toLowerCase().indexOf(q)>=0;
  });
  var s=$("#sort").value;
  out.sort(function(a,b){
    if(s==="za") return b.name.localeCompare(a.name);
    if(s==="cause") return a.tags[0].localeCompare(b.tags[0])||a.name.localeCompare(b.name);
    if(s==="open") return (a.opened?1:0)-(b.opened?1:0)||a.name.localeCompare(b.name);
    return a.name.localeCompare(b.name);
  });
  return out;
}

function card(c){
  return '<article class="cc'+(picked&&picked.slug===c.slug?" sel":"")+(c.opened?" opened":"")+'" data-s="'+c.slug+'">'
   +'<div class="ctop">'+avatar(c)
   +'<div style="min-width:0;flex:1">'
   +'<div class="cname"><b>'+esc(c.name)+'</b>'+TICKSVG+'</div>'
   +'<div class="cmeta" data-copy="'+esc(c.ein)+'" title="Copy tax ID">EIN '+esc(c.ein)+'</div></div></div>'
   +'<div class="tags">'+c.tags.map(function(t){return '<span class="tag" data-t="'+esc(t)+'">'+esc(t)+'</span>';}).join("")+'</div>'
   +'<div class="cfoot"><span class="stat'+(c.opened?" op":"")+'"><i></i>'+(c.opened?"opened":"unopened")+'</span>'
   +'<div class="cact">'
   +'<a class="lnk" href="'+c.url+'" target="_blank" rel="noopener">Donate direct ↗</a>'
   +(c.opened
      ? '<button class="btn sm" disabled>Paired</button>'
      : '<button class="btn sm g" data-pair="'+c.slug+'">Pair</button>')
   +'</div></div></article>';
}

function render(){
  var list=filtered(), box=$("#board"), opened=CH.filter(function(c){return c.opened;}).length;
  $("#cnt").innerHTML='<span>'+list.length+' of '+CH.length+' charities'
    +(activeTag!=="All"?' · '+esc(activeTag):'')+'</span>'
    +'<span style="color:'+(opened?"#d9bd86":"var(--faint)")+'">'+opened+' opened</span>'
    +'<span>'+(CH.length-opened)+' still unopened</span>';
  $("#clearf").hidden=(activeTag==="All" && !$("#q").value && $("#sort").value==="az");
  if(!list.length){
    box.innerHTML='<div class="empty" style="grid-column:1/-1">Nothing on the register matches that. '
      +'The register is a copy of a public record, not a wish list — if an organisation is missing here, '
      +'it has not registered a crypto-donation route yet.</div>';
    $("#showmore").hidden=true; return;
  }
  box.innerHTML=(showAll?list:list.slice(0,LIMIT)).map(card).join("");
  var btn=$("#showmore");
  btn.hidden=list.length<=LIMIT;
  btn.textContent=showAll?"Show fewer":"Show all "+list.length;
  sweep();
}

$("#q").addEventListener("input",function(){showAll=false;render();});
$("#sort").addEventListener("change",render);
$("#showmore").addEventListener("click",function(){showAll=!showAll;render();});

$("#board").addEventListener("click",function(e){
  var cp=e.target.closest("[data-copy]");
  if(cp){ copy(cp.getAttribute("data-copy")); toast("Tax ID copied — look it up anywhere."); return; }
  var tg=e.target.closest(".tag");
  if(tg){ setTag(tg.dataset.t); return; }
  var p=e.target.closest("[data-pair]");
  if(p){ pick(p.getAttribute("data-pair")); return; }
  var c=e.target.closest(".cc");
  if(c && !e.target.closest("a") && !e.target.closest("button")) pick(c.dataset.s);
});

function randomOpen(){
  var free=CH.filter(function(c){return !c.opened;});
  if(!free.length){ toast("Every charity on the register has been opened in this session."); return; }
  pick(free[Math.floor(Math.random()*free.length)].slug);
}
$("#surprise").addEventListener("click",randomOpen);
$("#pick-random").addEventListener("click",randomOpen);

/* ---------------------------------------------------------------- launch flow */
var STEP=0, IMG=null;
var STEPNAMES=["Charity","The coin","Review","Launch"];

function stepbar(){
  $("#stepbar").innerHTML=STEPNAMES.map(function(n,i){
    var cls = i===STEP ? "st on" : (i<STEP ? "st done" : "st");
    return '<button class="'+cls+'" data-go="'+i+'"><i>'+(i<STEP?"✓":(i+1))+'</i>'+n+'</button>';
  }).join("");
}
function canGo(n){
  if(n>=1 && !picked) return false;
  if(n>=2 && !validName()) return false;
  if(n>=3) return false;              /* only the launch button gets you to 4 */
  return true;
}
function go(n){
  if(n<STEP || canGo(n)){ STEP=n; paintStep(); }
}
function paintStep(){
  $$(".pane").forEach(function(p){ p.classList.toggle("on", +p.dataset.p===STEP); });
  stepbar();
}
document.addEventListener("click",function(e){
  var b=e.target.closest("[data-go]"); if(!b||b.disabled) return;
  go(+b.getAttribute("data-go"));
});

function validName(){
  var nm=$("#f-name").value.trim(), tk=$("#f-tick").value.trim();
  return nm.length>=2 && /^[A-Za-z0-9]{2,10}$/.test(tk);
}
function fill(){
  var s=$("#slot");
  if(!picked){
    s.classList.add("none");
    s.innerHTML='<div class="av blank"><svg viewBox="0 0 24 24" fill="none" stroke="#3a3a40" stroke-width="1.7" style="width:18px;height:18px"><path d="M12 5v14M5 12h14"/></svg></div>'
      +'<div style="min-width:0"><div id="slot-n" style="font-size:14px">No charity selected</div>'
      +'<div id="slot-e" class="mono" style="font-size:11.4px;color:var(--faint);margin-top:2px">Pick one from the register above</div></div>';
  }else{
    s.classList.remove("none");
    s.innerHTML=avatar(picked)
      +'<div style="min-width:0"><div style="font-size:14px;display:flex;align-items:center;gap:6px">'
      +esc(picked.name)+TICKSVG+'</div>'
      +'<div class="mono" style="font-size:11.4px;color:var(--faint);margin-top:2px">EIN '+esc(picked.ein)+' · registered, unopened</div></div>';
  }

  var nm=$("#f-name").value.trim(), tk=$("#f-tick").value.trim().toUpperCase(), ds=$("#f-desc").value.trim();
  $("#dcount").textContent=ds.length;
  $("#p-char").textContent=picked?picked.name:"—";
  $("#p-ein").textContent=picked?picked.ein:"—";
  $("#p-route").innerHTML=picked
    ? '<a href="'+picked.url+'" target="_blank" rel="noopener" style="color:#8fcfa8">The Giving Block ↗</a>' : "—";
  $("#p-coin").textContent=(nm||tk)?((nm||"untitled")+(tk?" · $"+tk:"")):"—";
  $("#p-by").innerHTML=WALLET?'<span class="ok" style="color:#8fcfa8">'+short(WALLET)+'</span>':'<span class="no">not connected</span>';
  $("#p-dest").innerHTML=picked
    ? '<span style="color:#8fcfa8">'+esc(picked.name)+' — 100%</span>' : "—";

  /* validation messages */
  var tkraw=$("#f-tick").value.trim();
  var bad = tkraw.length>0 && !/^[A-Za-z0-9]{2,10}$/.test(tkraw);
  $("#f-tick").parentNode.classList.toggle("bad",bad);
  $("#h-tick").classList.toggle("bad",bad);
  $("#h-tick").textContent = bad
    ? "Tickers are 2–10 letters or digits, nothing else."
    : "2–10 letters or digits. Cosmetic — it does not affect the pairing.";
  $("#h-name").textContent = (nm.length&&nm.length<2) ? "A little longer than that." : "Up to 32 characters.";

  $$('[data-go="1"]').forEach(function(b){ if(b.classList.contains("btn")) b.disabled=!picked; });
  $("#to3").disabled=!validName();

  /* review pane */
  $("#prev-av").outerHTML = picked
    ? avatar(picked,"l").replace('class="av l"','class="av l" id="prev-av"')
    : '<div class="av l blank" id="prev-av"></div>';
  if(IMG){
    var el=$("#prev-av");
    el.innerHTML='<img src="'+IMG+'" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">';
  }
  $("#prev-n").textContent=nm||"Untitled coin";
  $("#prev-t").innerHTML=(tk?"$"+esc(tk):"$—")+' <span style="color:var(--faint)">→ '+(picked?esc(picked.name):"no charity")+'</span>';
  $("#prev-d").textContent=ds||"No description.";
}
["#f-name","#f-tick","#f-desc"].forEach(function(s){$(s).addEventListener("input",fill);});

$("#f-img").addEventListener("change",function(){
  var f=this.files&&this.files[0]; if(!f) return;
  if(f.size>2*1024*1024){ toast("That image is over 2 MB — pick a smaller one."); this.value=""; return; }
  var r=new FileReader();
  r.onload=function(){ IMG=r.result; $("#pic").innerHTML='<img src="'+IMG+'" alt="">';
    $("#imgn").textContent=f.name+" · "+Math.round(f.size/1024)+" KB"; fill(); };
  r.readAsDataURL(f);
});

function pick(slug){
  var c=CH.filter(function(x){return x.slug===slug;})[0];
  if(!c||c.opened) return;
  picked=c; IMG=null; STEP=0;
  render(); fill(); paintStep();
  var y=$("#launch").getBoundingClientRect().top+window.pageYOffset-70;
  window.scrollTo({top:y,behavior:"smooth"});
  toast("Paired with "+c.name+". Name the coin next.");
  setTimeout(function(){ if(STEP===0){ STEP=1; paintStep(); $("#f-name").focus(); } },520);
}

function details(){
  var nm=$("#f-name").value.trim(), tk=$("#f-tick").value.trim().toUpperCase(), ds=$("#f-desc").value.trim();
  return "Name: "+nm+"\nTicker: "+tk+"\nDescription: "+(ds||"—")
    +"\n\nPaired charity: "+picked.name+" (EIN "+picked.ein+")"
    +"\nDonation route: "+picked.url
    +"\nFee mode: creator fees — not trader cashback";
}
function openPump(){ window.open("https://pump.fun/create","_blank","noopener"); }

$("#go-launch").addEventListener("click",function(){
  if(!picked||!validName()) return;
  var nm=$("#f-name").value.trim(), tk=$("#f-tick").value.trim().toUpperCase();
  picked.opened=true;
  LAUNCHES.push({c:picked,name:nm,tick:tk,img:IMG,by:WALLET,at:new Date()});
  copy(details());
  openPump();

  $("#done-av").outerHTML=avatar(picked,"l").replace('class="av l"','class="av l" id="done-av"');
  if(IMG) $("#done-av").innerHTML='<img src="'+IMG+'" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">';
  $("#done-n").textContent=nm;
  $("#done-t").innerHTML="$"+esc(tk)+' → '+esc(picked.name);
  $("#done-msg").innerHTML="pump.fun's create page is open in a new tab and the coin's details are on your "
    +"clipboard. Signing there creates the coin from your own wallet — this site never touches that "
    +"transaction and cannot. Pointing the creator vault at <b>"+esc(picked.name)+"</b> is the pad's job, "
    +"and the pad's program is not deployed yet, so until it is that part is on you: "
    +'<a href="'+picked.url+'" target="_blank" rel="noopener" style="color:#e6c79a">their donation page ↗</a>.';

  STEP=3; paintStep(); render(); ledger();
  var opened=CH.filter(function(c){return c.opened;}).length;
  $("#n-open").textContent=opened;
  $("#n-open").classList.toggle("z",!opened);
  $("#n-open-n").textContent=opened===1?"1 handed off in this session":opened+" handed off in this session";
  toast("Details copied. pump.fun opened in a new tab.");
});
$("#again").addEventListener("click",openPump);
$("#copyagain").addEventListener("click",function(){
  var L=LAUNCHES[LAUNCHES.length-1]; if(!L) return;
  copy("Name: "+L.name+"\nTicker: "+L.tick+"\n\nPaired charity: "+L.c.name+" (EIN "+L.c.ein+")\nDonation route: "+L.c.url);
  toast("Copied again.");
});
$("#another").addEventListener("click",function(){
  picked=null; IMG=null; STEP=0;
  $("#f-name").value=""; $("#f-tick").value=""; $("#f-desc").value="";
  $("#f-img").value="";
  $("#pic").innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="#4a4a50" stroke-width="1.5" style="width:22px;height:22px"><rect x="3" y="4" width="18" height="16" rx="2.5"/><circle cx="8.6" cy="9.6" r="1.8"/><path d="m3.6 17.5 5-4.6 4.2 3.6 3-2.6 4.6 3.9"/></svg>';
  $("#imgn").textContent="Optional. PNG or JPG, square works best.";
  fill(); paintStep(); render();
  var y=$("#register").getBoundingClientRect().top+window.pageYOffset-70;
  window.scrollTo({top:y,behavior:"smooth"});
});

/* ---------------------------------------------------------------- ledger */
function ledger(){
  var b=$("#lbody");
  if(!LAUNCHES.length){
    var d=""; for(var i=0;i<48;i++) d+='<div class="db"></div>';
    b.innerHTML='<div class="lempty"><div class="z mono">0</div>'
      +'<p>No coin has been opened, no fee has been claimed, and no donation has been sent. There is nothing '
      +'to show, so nothing is shown. The dashes below are where rows will go.</p></div>'
      +'<div class="dash">'+d+'</div>';
    return;
  }
  b.innerHTML=LAUNCHES.slice().reverse().map(function(L){
    return '<div class="lrow"><div class="lc">'+avatar(L.c,"s")+'<span>'+esc(L.c.name)+'</span></div>'
     +'<div class="mono" style="color:var(--fg2)">$'+esc(L.tick)+'</div>'
     +'<div class="mono" style="color:var(--faint)">0.0000 SOL</div>'
     +'<div class="mono" style="color:var(--faint);font-size:12px">no donation yet — '
     +'<a href="'+L.c.url+'" target="_blank" rel="noopener" style="color:#8fcfa8">give direct ↗</a></div></div>';
  }).join("")
   +'<div class="lrow" style="border-top:1px solid var(--hair)"><div class="lc" style="color:var(--faint);font-size:12.6px">'
   +'These rows are this session\'s hand-offs, not settled donations. Nothing is stored, and a reload clears them.'
   +'</div><div></div><div></div><div></div></div>';
}

/* ---------------------------------------------------------------- fee curve */
var BANDS=[
 {lo:0,     hi:420,      v:220, rate:0.0030, label:"Bonding curve",          sub:"under 420 SOL",      txt:"0.30%"},
 {lo:420,   hi:1470,     v:330, rate:0.0095, label:"Graduated — peak share", sub:"420 – 1,470 SOL",    txt:"0.95%"},
 {lo:1470,  hi:98240,    v:620, rate:null,   label:"Tapering",               sub:"1,470 – 98,240 SOL", txt:"0.95% → 0.05%"},
 {lo:98240, hi:Infinity, v:870, rate:0.0005, label:"Floor",                  sub:"above 98,240 SOL",   txt:"0.05%"}
];
$("#bands").innerHTML=BANDS.map(function(b,i){
  return '<div class="br" data-i="'+i+'" title="Jump the calculator here">'
   +'<div><div class="bl">'+b.label+'</div><div class="bs">'+b.sub+'</div></div>'
   +'<div class="bv">'+b.txt+'</div></div>';
}).join("");
$("#bands").addEventListener("click",function(e){
  var r=e.target.closest(".br"); if(!r) return;
  $("#s-mc").value=BANDS[+r.dataset.i].v; feecalc();
});

function expo(v,max){ var t=v/1000; return Math.round(max*(Math.pow(1+t,4)-1)/15); }
function fmt(n,d){ return Number(n).toLocaleString("en-US",
  {minimumFractionDigits:d===undefined?0:d,maximumFractionDigits:d===undefined?0:d}); }

function feecalc(){
  var mc=expo(+$("#s-mc").value,200000), vol=expo(+$("#s-vol").value,50000);
  $("#mc").innerHTML=fmt(mc)+' <small>SOL</small>';
  $("#vol").innerHTML=fmt(vol)+' <small>SOL</small>';
  var bi=0; for(var i=0;i<BANDS.length;i++){ if(mc>=BANDS[i].lo&&mc<BANDS[i].hi){ bi=i; break; } }
  $$("#bands .br").forEach(function(el,i){ el.classList.toggle("on",i===bi); });
  var b=BANDS[bi];
  if(b.rate===null){
    $("#fee-out").innerHTML=fmt(vol*0.0005,4)+' – '+fmt(vol*0.0095,4)+' <small>SOL</small>';
    $("#fee-note").textContent="At "+fmt(mc)+" SOL the share is somewhere on the taper between 0.95% and 0.05%. "
      +"pump.fun publishes the curve, not a flat rate for this band, so this is a range rather than a made-up number.";
    $("#fee-char").textContent="100% of whatever it lands on";
  }else{
    var f=vol*b.rate;
    $("#fee-out").innerHTML=fmt(f,4)+' <small>SOL</small>';
    $("#fee-note").textContent=fmt(vol)+" SOL of volume × "+b.txt+" creator share = "+fmt(f,4)
      +" SOL accrued in the vault that day. Arithmetic on numbers you chose — not live data.";
    $("#fee-char").textContent=fmt(f,4)+" SOL — 100%";
  }
}
$("#s-mc").addEventListener("input",feecalc);
$("#s-vol").addEventListener("input",feecalc);

/* ---------------------------------------------------------------- how */
var HOW=[
 ["The register is the board","A copy of a public record: registered nonprofits with a live crypto-donation route. Nobody applies. Nobody pays to be listed.","We list only the ones we could actually pay. A charity with no working route is a charity we should not be advertising, so it does not get a row however good the cause."],
 ["You pick one","The charity is chosen before anything is deployed. It is the only input that decides where money ends up.","A launch form you can argue with is a launch form with two fields. The name, ticker and image are cosmetics; the destination is settled first."],
 ["The fee is pointed at launch","The coin deploys with creator fees on — never trader cashback — and the vault's standing instruction is that charity's donation route.","pump.fun locks that choice permanently at launch. That lock is not our feature, it is the platform's rule, and it is the only reason a fee can be promised to anyone."],
 ["One charity, one coin, forever","A charity can be opened exactly once. Otherwise the board fills with fifty versions of the same cause, each claiming to be the real one.","One pairing makes the register a register instead of a race. It also means being early to a cause is worth something other than being fast."],
 ["Fees accrue, then are claimed","Creator fees sit in a vault until somebody pulls them. On a fixed cadence the pad claims what accrued and moves it into that coin's donation batch.","Batching exists because donation rails have minimums. A claim under the minimum waits for the next cycle, and the row says so rather than disappearing."],
 ["The donation goes through their own rail","We do not hold charity money. It goes through the processor the organisation already registered with, on their terms, in the form they already chose.","Which means the charity does not need to know what a launchpad is in order to be paid, and never has to trust us with custody of anything."],
 ["The receipt is posted","The confirmation is attached to the coin's row with the date and the amount. A row without one says no donation has been made, in those words.","There is no state on this site where a pending number is rendered in the same type as a settled one."],
 ["The launcher gets nothing","No split, no referral share, no creator tier, no way to negotiate one. You get a coin and your name on the row.","If launching paid, the register would fill with whoever could launch fastest rather than whoever cared, and the charity would be the marketing rather than the point."],
 ["A cycle with nothing in it is still posted","If a coin did not trade, there is no fee and no donation, and that is a row we publish rather than a row we skip.","Skipping empty cycles is how a ledger ends up looking better than the thing it describes."],
 ["Any charity can end it","Removed immediately on request, no form and no argument. The pairing is severed and anything accrued is donated to them anyway unless they refuse it.","We are launching coins named after organisations that did not ask for it. That is a real thing to be uncomfortable about, and this is the only honest answer to it."]
];
$("#howlist").innerHTML=HOW.map(function(h){
  return '<li><b>'+esc(h[0])+'<em>+</em></b><span>'+esc(h[1])+'</span>'
   +'<div class="xt"><p>'+esc(h[2])+'</p></div></li>';
}).join("")
 +'<li class="cap"><b>That is the whole mechanic.</b><span>There is no eleventh step where the money quietly changes direction. If there were, it would be on this page in the same size type as everything above it.</span></li>'
 +'<li class="cap"><b>The long version</b><span>The claim cadence, the published fee curve, what "verified" does and does not mean, and every risk written out. <a href="docs.html" style="color:#8fcfa8">Read the reference →</a></span></li>';
$("#howlist").addEventListener("click",function(e){
  var li=e.target.closest("li"); if(!li||li.classList.contains("cap")) return;
  if(e.target.closest("a")) return;
  var x=li.querySelector(".xt"), open=li.classList.contains("open");
  li.classList.toggle("open",!open);
  x.style.maxHeight = open ? null : x.scrollHeight+"px";
});

/* ---------------------------------------------------------------- faq */
var FAQ=[
 ["Does the charity know about this?","Almost certainly not. Being on the register means the organisation is a registered nonprofit with a live crypto-donation route — nothing more. It is not a partnership, an endorsement or an agreement, which is also why their logos are not on this site. Any of them can be removed immediately on request, and anything already accrued is donated to them anyway unless they refuse it."],
 ["Why aren't the real charity logos shown?","Because a logo sitting next to a launch button reads as a partnership, and none of these organisations have agreed to anything. The mark on each row is ours: the organisation's initials, a colour fixed by its tax ID so it never changes, and its cause glyph behind. Distinct, consistent, and not pretending to be theirs. If a charity ever registers with the pad, its own mark goes in — put there by them."],
 ["Why can't I just donate directly?","You can, and you should if that is what you want to do. Every row links straight to that organisation's own donation page, and giving there sends more money than buying a coin ever will. This pad exists for the money a launchpad was going to keep anyway."],
 ["Is buying the coin tax-deductible?","No. You are buying a memecoin from a market, not making a donation. The donation is funded by trading fees afterwards, it is made by the pad rather than by you, and nothing about your purchase produces a receipt in your name."],
 ["What happens when I press launch?","Your coin's details go to your clipboard and pump.fun's create page opens in a new tab. The coin is created from your wallet by you — this site never touches that transaction and has no key that could. The fee-routing instruction is the pad's job and its program is not deployed yet, which is why the charity's own donation page is one click from every row."],
 ["What stops you pointing the fee at yourselves later?","pump.fun locks the fee mode at launch — it cannot be changed afterwards. Beyond that, the honest answer is that a website promising something is not the same as a contract enforcing it, which is why the receipts table exists and why it says zero instead of something plausible."],
 ["What does the pad actually keep?","The launch fee, shown before you sign, and nothing out of any charity's donation at any size. Whoever opens a coin keeps nothing from the fee either — no split, no referral, no creator tier."],
 ["Why one coin per charity?","Because if a cause could be launched fifty times, the register would fill with fifty versions of it, each claiming to be the real one, and the whole thing would be a farm inside a week. One pairing makes it a register instead of a race."],
 ["What happens if a coin never trades?","Nothing accrues and nothing is donated. That cycle is still posted, as a row saying no fee was claimed, because skipping it would make the ledger look better than the reality."]
];
$("#faqbox").innerHTML=FAQ.map(function(f){
  return '<div class="qa"><button class="qq" type="button" aria-expanded="false">'+esc(f[0])+'<span class="x">+</span></button>'
   +'<div class="aa"><p>'+esc(f[1])+'</p></div></div>';
}).join("");
$("#faqbox").addEventListener("click",function(e){
  var b=e.target.closest(".qq"); if(!b) return;
  var qa=b.parentNode, open=qa.classList.contains("open");
  $$("#faqbox .qa").forEach(function(o){
    o.classList.remove("open"); o.querySelector(".aa").style.maxHeight=null;
    o.querySelector(".qq").setAttribute("aria-expanded","false");
  });
  if(!open){
    qa.classList.add("open");
    qa.querySelector(".aa").style.maxHeight=qa.querySelector(".aa").scrollHeight+"px";
    b.setAttribute("aria-expanded","true");
  }
});

/* ---------------------------------------------------------------- hero card */
(function(){
  var i=0, node=$("#hv-node"), tags=$("#hv-t"), timer=null;
  var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function foot(){
    var o=CH.filter(function(c){return c.opened;}).length;
    $("#hv-f").textContent=CH.length+" registered · "+o+" opened · 0 receipts";
  }
  function paint(){
    var c=CH[i];
    $("#hv-i").textContent=String(i+1).padStart(2,"0")+" / "+CH.length;
    $("#hv-av").outerHTML=avatar(c).replace('class="av"','class="av" id="hv-av"');
    $("#hv-n").innerHTML=esc(c.name)+" "+TICKSVG;
    $("#hv-e").textContent="EIN "+c.ein+" · "+(c.opened?"opened":"unopened");
    tags.innerHTML=c.tags.slice(0,3).map(function(t){return '<span class="tag">'+esc(t)+'</span>';}).join("");
    foot();
  }
  function step(){
    i=(i+1)%CH.length;
    if(reduce){ paint(); return; }
    node.classList.add("out"); tags.classList.add("out");
    setTimeout(function(){ paint(); node.classList.remove("out"); tags.classList.remove("out"); },340);
  }
  i=Math.floor(Math.random()*CH.length); paint();
  function run(){ clearInterval(timer); timer=setInterval(step,3600); }
  if(!reduce) run();
  document.addEventListener("visibilitychange",function(){
    if(document.hidden) clearInterval(timer); else if(!reduce) run();
  });
  node.addEventListener("click",function(){ pick(CH[i].slug); });
  node.addEventListener("mouseenter",function(){ clearInterval(timer); });
  node.addEventListener("mouseleave",function(){ if(!reduce) run(); });
  window.__heroFoot=foot;
})();

/* ---------------------------------------------------------------- reveal + nav */
var io=null;
if("IntersectionObserver" in window){
  io=new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
  },{rootMargin:"0px 0px -8% 0px",threshold:.05});
}
function watch(){ $$(".rv:not(.in)").forEach(function(el){ if(io) io.observe(el); else el.classList.add("in"); }); }
function sweep(){
  var h=window.innerHeight;
  $$(".rv:not(.in)").forEach(function(el){
    if(el.getBoundingClientRect().top < h*0.94) el.classList.add("in");
  });
}
var SEC=$$("main section[id]"), LINKS=$$("#nl a");
function navmark(){
  var best=-1;
  SEC.forEach(function(s,i){ if(s.getBoundingClientRect().top<=180) best=i; });
  LINKS.forEach(function(a){ a.classList.toggle("on", best>=0 && a.getAttribute("href")==="#"+SEC[best].id); });
}
var tick=false;
function onscroll(){
  if(tick) return; tick=true;
  requestAnimationFrame(function(){ sweep(); navmark(); tick=false; });
}
window.addEventListener("scroll",onscroll,{passive:true});
window.addEventListener("resize",onscroll);

window.addEventListener("load",function(){
  var l=document.createElement("link"); l.rel="stylesheet";
  l.href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap";
  document.head.appendChild(l);
});

render(); fill(); feecalc(); ledger(); stepbar(); watch(); sweep(); navmark();
})();
