/* Solid State Atlas — client features. Update AGENTS.md before editing behavior. */
(() => {
  'use strict';
  const notes = Array.isArray(window.SEMI_NOTES) ? window.SEMI_NOTES : [];
  const chapters = ['全部筆記','材料與能帶','載子與傳輸','元件與接面','寬能隙材料'];
  const $ = id => document.getElementById(id);
  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const readJSON = (key,fallback) => { try {let v=localStorage.getItem(key);return v===null?fallback:JSON.parse(v);}catch{return fallback;}};
  const saveJSON = (key,v) => {try{localStorage.setItem(key,JSON.stringify(v));}catch{}};
  const ids = key => new Set((Array.isArray(readJSON(key,[]))?readJSON(key,[]):[]).filter(s=>typeof s==='string'));
  const state = {query:'',chapter:'全部筆記',onlySaved:false,saved:ids('ssa-saved-v1'),read:ids('ssa-read-v1')};
  function stats(){
    $('totalNoteCount').textContent=String(notes.length).padStart(2,'0');
    $('chapterCount').textContent=String(chapters.length-1).padStart(2,'0');
    $('readCount').textContent=String(notes.filter(n=>state.read.has(n.id)).length).padStart(2,'0');
    $('notesRange').textContent='NO. 001—'+String(notes.length).padStart(3,'0');
  }
  function filters(){
    const box=$('filterRow');box.replaceChildren();
    chapters.forEach(ch=>{
      const b=document.createElement('button');b.type='button';b.className='filter-chip';b.dataset.chapter=ch;
      b.textContent=ch;b.setAttribute('aria-pressed',String(state.chapter===ch));box.append(b);
    });
  }
  function matches(n) {
    const searchable=[n.title,n.subtitle,n.summary,n.chapter,...n.tags].join(' ').toLocaleLowerCase('zh-Hant');
    return (!state.query || searchable.includes(state.query.toLocaleLowerCase('zh-Hant')))
      && (state.chapter==='全部筆記'||state.chapter===n.chapter)
      && (!state.onlySaved||state.saved.has(n.id));
  }
  function render(){
    filters();
    $('savedFilter').setAttribute('aria-pressed',String(state.onlySaved));
    const found=notes.filter(matches);$('resultSummary').textContent='顯示 '+String(found.length).padStart(2,'0')+' / '+String(notes.length).padStart(2,'0')+' 篇筆記';
    const grid=$('notesGrid');grid.replaceChildren();
    found.forEach(n=>{
      const num=String(notes.indexOf(n)+1).padStart(3,'0'),saved=state.saved.has(n.id),done=state.read.has(n.id);
      const article=document.createElement('article');article.className='note-card';
      article.innerHTML='<div class="note-top"><span class="note-number">NOTE / '+num+'</span><button class="bookmark" type="button" data-bookmark="'+escapeHTML(n.id)+'" aria-label="'+(saved?'取消收藏：':'收藏：')+escapeHTML(n.title)+'" aria-pressed="'+saved+'">'+(saved?'★':'☆')+'</button></div>'
      +'<a class="note-content" href="#/note/'+encodeURIComponent(n.id)+'"><h3>'+escapeHTML(n.title)+'</h3><p>'+escapeHTML(n.summary)+'</p></a>'
      +'<div class="note-footer"><span class="note-meta">'+escapeHTML(n.chapter)+'　·　'+escapeHTML(n.minutes)+' MIN '+(done?'<span class="read-tag">✓ 已讀</span>':'')+'</span><a class="note-arrow" href="#/note/'+encodeURIComponent(n.id)+'" aria-label="閱讀'+escapeHTML(n.title)+'">↗</a></div>';
      grid.append(article);
    });
    $('emptyState').hidden=found.length>0;
    stats();
  }
  function toggle(id,type){
    if(!notes.some(n=>n.id===id))return;
    const set=type==='saved'?state.saved:state.read;
    set.has(id)?set.delete(id):set.add(id);
    saveJSON(type==='saved'?'ssa-saved-v1':'ssa-read-v1',[...set]);
    render();if(location.hash.startsWith('#/note/'))detail();
  }
  const articleBlock=(num,title,body)=>'<section class="article-block"><h2><span>'+num+' /</span>'+title+'</h2>'+body+'</section>';
  function detail(){
    let id='';try{id=decodeURIComponent(location.hash.slice(7).split('?')[0]);}catch{}
    const n=notes.find(x=>x.id===id);
    if(!n){$('detailContent').innerHTML='<div class="content-error"><h2>找不到這篇筆記</h2><p>請返回首頁。</p><a href="#/">返回首頁</a></div>';return;}
    const num=notes.indexOf(n)+1,next=notes[num%notes.length],saved=state.saved.has(id),done=state.read.has(id);
    const points='<ul>'+n.points.map(p=>'<li>'+escapeHTML(p)+'</li>').join('')+'</ul>';
    const formulas=n.formulas.map(f=>'<div class="formula-card"><strong>'+escapeHTML(f.text)+'</strong><p>'+escapeHTML(f.explanation)+'</p></div>').join('');
    const pitfalls='<div class="misconception"><strong>⚠ 常見迷思</strong><p>'+escapeHTML(n.pitfall)+'</p></div>';
    const quiz='<div class="quiz-box"><h3>CHECK YOUR UNDERSTANDING / Q.01</h3><p>'+escapeHTML(n.check.question)+'</p><button type="button" id="revealAnswer" aria-expanded="false" aria-controls="quizAnswer">查看參考答案 ↗</button><div id="quizAnswer" class="quiz-answer" hidden>'+escapeHTML(n.check.answer)+'</div></div>';
    $('detailContent').innerHTML='<div class="detail-hero"><span class="detail-category">NOTE '+String(num).padStart(3,'0')+' / '+escapeHTML(n.chapter)+'</span><h1 id="detailTitle">'+escapeHTML(n.title)+'</h1><p class="detail-lead">'+escapeHTML(n.summary)+'</p><div class="detail-actions"><button type="button" id="detailSave" class="'+(saved?'active':'')+'" aria-pressed="'+saved+'">'+(saved?'★ 已收藏':'☆ 加入收藏')+'</button><button type="button" id="detailRead" class="'+(done?'active':'')+'" aria-pressed="'+done+'">'+(done?'✓ 已完成閱讀':'○ 標記為已讀')+'</button></div></div>'
    +'<div class="detail-layout"><div class="detail-article">'
    +articleBlock('01','核心觀念',points)+articleBlock('02','關鍵公式',formulas)+articleBlock('03','容易搞混的觀念',pitfalls)+articleBlock('04','自我檢核',quiz)
    +'</div><aside class="detail-sidebar" aria-label="筆記資訊"><h3>NOTE INFORMATION</h3><dl><div><dt>英文名稱</dt><dd>'+escapeHTML(n.subtitle)+'</dd></div><div><dt>章節</dt><dd>'+escapeHTML(n.chapter)+'</dd></div><div><dt>學習層級</dt><dd>'+escapeHTML(n.level)+'</dd></div><div><dt>預估閱讀</dt><dd>'+escapeHTML(n.minutes)+' 分鐘</dd></div></dl><div class="sidebar-divider"></div><p>本網站以學習理解為目標，公式適用條件以筆記文字為準；實際工程設計請查閱專業教材與技術文件。</p></aside></div>'
    +'<div class="next-note"><div><small>UP NEXT / 下一篇</small><strong>'+escapeHTML(next.title)+'</strong></div><a href="#/note/'+encodeURIComponent(next.id)+'">繼續閱讀 ↗</a></div>';
    $('detailSave').onclick=()=>toggle(id,'saved');
    $('detailRead').onclick=()=>toggle(id,'read');
    $('revealAnswer').onclick=()=>{const a=$('quizAnswer'),b=$('revealAnswer');a.hidden=!a.hidden;b.setAttribute('aria-expanded',String(!a.hidden));b.textContent=a.hidden?'查看參考答案 ↗':'收起參考答案 ↑';};
    document.title=n.title+'｜Solid State Atlas';
  }
  function route(){
    const isDetail=location.hash.startsWith('#/note/');
    $('homeView').hidden=isDetail;$('detailView').hidden=!isDetail;
    if(isDetail){detail();window.scrollTo(0,0);}
    else{document.title='Solid State Atlas｜半導體概念圖鑑';const h=location.hash.slice(1);if(h && h!=='/'&&!h.startsWith('/'))requestAnimationFrame(() => $(h)?.scrollIntoView());else if(h==='/')window.scrollTo(0,0);}
  }
  function init(){
    const theme=readJSON('ssa-theme-v1',null);
    document.documentElement.dataset.theme=theme==='dark'||theme==='light'?theme:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
    $('themeToggle').onclick=()=>{const next=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=next;saveJSON('ssa-theme-v1',next);};
    $('searchInput').oninput=e=>{state.query=e.target.value.trim();render();};
    $('filterRow').onclick=e=>{const btn=e.target.closest('button[data-chapter]');if(btn){state.chapter=btn.dataset.chapter;render();}};
    $('savedFilter').onclick=()=>{state.onlySaved=!state.onlySaved;render();};
    $('notesGrid').onclick=e=>{const b=e.target.closest('button[data-bookmark]');if(b)toggle(b.dataset.bookmark,'saved');};
    $('resetFilters').onclick=()=>{state.query='';state.chapter='全部筆記';state.onlySaved=false;$('searchInput').value='';render();};
    document.addEventListener('keydown',e=>{if(e.key==='/'&&!['INPUT','TEXTAREA'].includes(document.activeElement?.tagName)&&!$('homeView').hidden){e.preventDefault();$('searchInput').focus();}});
    window.addEventListener('hashchange',route);render();route();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();