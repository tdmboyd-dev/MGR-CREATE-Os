import {digest} from './brain.mjs';
const escape=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function text(v,max=12000){if(typeof v!=='string'||!v.trim()||v.length>max)throw Error('Bounded nonempty plain text required');return escape(v);}
function action(a,ids){
  if(!a||typeof a.href!=='string')throw Error('Action required');
  const label=text(a.label,160),href=a.href;
  if(href.startsWith('#')){if(!ids.has(href.slice(1)))throw Error('Action references missing section');}
  else if(/^mailto:[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(href)){}
  else{const u=new URL(href);if(u.protocol!=='https:'||u.username||u.password||/[\u0000-\u0020]/u.test(href))throw Error('Unsupported action URL');}
  return `<a class="cta" href="${escape(href)}">${label}<span aria-hidden="true"> ↗</span></a>`;
}
export function buildSite(spec){
  if(!spec||!['dark','light'].includes(spec.theme)||!['copper','lime','blue'].includes(spec.accent))throw Error('Explicit theme/accent required');
  if(!Array.isArray(spec.sections)||!spec.sections.length||spec.sections.length>30)throw Error('Site needs 1–30 sections');
  const ids=new Set();
  for(const s of spec.sections){if(!s||!/^[a-z][a-z0-9-]{0,60}$/.test(s.id)||ids.has(s.id)||['main','top'].includes(s.id))throw Error('Invalid or duplicate section ID');ids.add(s.id);}
  const title=text(spec.title,160),description=text(spec.description,320),hero=text(spec.hero,320),eyebrow=text(spec.eyebrow,160),cta=action(spec.cta,ids);
  const sections=spec.sections.map((s,i)=>{
    if(s.cards!==undefined&&(!Array.isArray(s.cards)||s.cards.length>50))throw Error('Invalid cards');
    if(s.faqs!==undefined&&(!Array.isArray(s.faqs)||s.faqs.length>50))throw Error('Invalid FAQs');
    return `<section id="${s.id}" aria-labelledby="heading-${s.id}"><div class="section-head"><span class="index">${String(i+1).padStart(2,'0')}</span><h2 id="heading-${s.id}">${text(s.title,320)}</h2></div><p class="body">${text(s.body)}</p>${s.cards?.length?`<div class="cards">${s.cards.map(c=>`<article><h3>${text(c.title,320)}</h3><p>${text(c.body)}</p></article>`).join('')}</div>`:''}${s.faqs?.map(f=>`<details><summary>${text(f.question,500)}</summary><p>${text(f.answer)}</p></details>`).join('')??''}</section>`;
  }).join('');
  const palette=spec.theme==='dark'?['#101313','#f2f1e9','#b6bdb9','#202626']:['#f4f1e9','#182020','#45514c','#e4e7de'];
  const accent={copper:spec.theme==='dark'?'#efad85':'#813b17',lime:spec.theme==='dark'?'#cbf58c':'#355b05',blue:spec.theme==='dark'?'#a3caff':'#164d92'}[spec.accent];
  const html=`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="${description}"><title>${title}</title>
<style>
:root{color-scheme:${spec.theme};--bg:${palette[0]};--fg:${palette[1]};--muted:${palette[2]};--panel:${palette[3]};--accent:${accent};font-family:Arial,Helvetica,sans-serif}*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--fg);line-height:1.6}a{color:inherit;text-underline-offset:.25em}a:focus-visible,summary:focus-visible{outline:3px solid var(--accent);outline-offset:6px}.skip{position:absolute;top:-8rem;left:1rem;padding:.6rem;background:var(--fg);color:var(--bg);z-index:5}.skip:focus{top:1rem}header,main,footer{width:min(1200px,calc(100% - 3rem));margin:auto}header{display:flex;justify-content:space-between;gap:2rem;align-items:center;padding:1.7rem 0;border-bottom:1px solid var(--muted)}.brand{font-size:1rem;letter-spacing:.07em;text-transform:uppercase;font-weight:700;overflow-wrap:anywhere}nav{display:flex;flex-wrap:wrap;gap:1rem;font-size:.88rem}nav a{text-decoration:none}h1,h2,h3,p{overflow-wrap:anywhere}h1{font-size:clamp(2.8rem,7.5vw,6.8rem);line-height:1.02;letter-spacing:-.055em;font-weight:500;max-width:1050px;margin:1rem 0 2rem}h2{font-size:clamp(2rem,4vw,3.7rem);line-height:1.1;letter-spacing:-.035em;font-weight:500;margin:0}h3{line-height:1.2;font-size:1.4rem}.hero{padding:clamp(4rem,10vw,9rem) 0}.eyebrow,.index{font-size:.8rem;letter-spacing:.12em;text-transform:uppercase;color:var(--accent)}.intro,.body{color:var(--muted);max-width:760px;font-size:1.15rem;white-space:pre-line}.cta{display:inline-flex;align-items:center;gap:2rem;border:1px solid var(--accent);padding:.9rem 1.5rem;margin-top:1.5rem;text-decoration:none;color:var(--accent);border-radius:3rem;font-weight:700}.cta:hover{background:var(--panel)}section{padding:4rem 0 5rem;border-top:1px solid var(--muted);scroll-margin-top:2rem}.section-head{display:grid;grid-template-columns:3rem 1fr;align-items:start;gap:1rem}.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:1rem;margin-top:2.5rem}.cards article{background:var(--panel);padding:1.8rem;border-radius:.4rem}.cards p,details p{color:var(--muted);white-space:pre-line}details{border-bottom:1px solid var(--muted);padding:1.2rem 0}summary{cursor:pointer;font-weight:700}footer{padding:2rem 0 3rem;display:flex;gap:1rem;justify-content:space-between;color:var(--muted);font-size:.85rem}@media(max-width:640px){header{align-items:flex-start;flex-direction:column;gap:1rem}header,main,footer{width:calc(100% - 2rem)}.hero{padding:4rem 0}.section-head{grid-template-columns:1fr;gap:.7rem}section{padding:3rem 0}footer{flex-direction:column}}@media(prefers-reduced-motion:reduce){*{scroll-behavior:auto!important}}
</style></head><body id="top"><a class="skip" href="#main">Skip to content</a><header><a class="brand" href="#top">${title}</a><nav aria-label="Main navigation">${spec.sections.map(s=>`<a href="#${s.id}">${text(s.title,320)}</a>`).join('')}</nav></header><main id="main"><div class="hero"><p class="eyebrow">${eyebrow}</p><h1>${hero}</h1><p class="intro">${description}</p>${cta}</div>${sections}</main><footer><span>${title}</span><a href="#top">Back to top ↑</a></footer>
<script>
(()=>{const preference=matchMedia('(prefers-reduced-motion: reduce)');const active=new Set();function stop(){for(const animation of active)animation.cancel();active.clear()}if(!preference.matches&&typeof Element.prototype.animate==='function'){for(const [i,element] of [...document.querySelectorAll('.hero>*')].entries()){const animation=element.animate([{opacity:.65,transform:'translateY(10px)'},{opacity:1,transform:'translateY(0)'}],{duration:420,delay:i*60,easing:'ease-out'});active.add(animation);animation.onfinish=()=>active.delete(animation)}}preference.addEventListener('change',event=>{if(event.matches)stop()});document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()})})();
</script></body></html>`;
  if(Buffer.byteLength(html)>1024*1024)throw Error('Generated site exceeds 1 MiB');
  return {html,receipt:{schemaVersion:1,inputDigest:digest(spec),outputDigest:digest(html),sections:spec.sections.length,kind:'single-page-content-site',browserVerified:false,externalDependencies:0}};
}
