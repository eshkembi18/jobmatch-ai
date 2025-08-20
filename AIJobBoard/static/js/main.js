// ===== mini debug HUD (remove later) =====
(function(){
  const bar = document.createElement('div');
  bar.id = 'jmai-debug';
  bar.style.cssText = 'position:fixed;bottom:8px;left:8px;background:#111;color:#fff;padding:6px 10px;border-radius:6px;font:12px/1.2 system-ui;z-index:99999;opacity:.85';
  bar.textContent = 'JS loaded ✓';
  document.addEventListener('DOMContentLoaded', ()=>document.body.appendChild(bar));
  window.addEventListener('error', e => { bar.textContent = 'JS error: ' + (e.message||'unknown'); bar.style.background = '#7a001f';});
  window.__jmaiDebug = (msg)=>{ bar.textContent = msg; };
})();
// ===== helpers =====
const $  = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
const byId = id => document.getElementById(id);
const toggle = (el, on) => el && el.classList.toggle('d-none', !on);
const debounce = (fn, d=500)=>{ let t; return (...a)=>{ clearTimeout(t); t=setTimeout(()=>fn(...a), d); }; };

// If there are duplicate IDs (q/loc in hero + advanced form), pick the one you typed in.
function pickInput(id){
  const els = $$(`[id="${id}"]`);
  if (!els.length) return null;
  const filled = els.find(el => (el.value || '').trim());
  return filled || els[0];
}

// ===== API =====
async function fetchJobs(q = "", loc = "") {
  const params = new URLSearchParams();
  if (q)   params.set("q", q);
  if (loc) params.set("loc", loc);
  const url = `/api/jobs?${params.toString()}`;
  const res = await fetch(url, { credentials:'include' });
  if (!res.ok) throw new Error(`GET ${url} -> ${res.status}`);
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

async function uploadResume(file){
  if (!file) return;
  const fd = new FormData();
  fd.append('resume', file); // backend expects 'resume'
  const res = await fetch('/api/upload-resume', { method:'POST', body: fd, credentials:'include' });
  const data = await res.json().catch(()=>({}));
  if (!res.ok) throw new Error(data.error || `Upload failed (${res.status})`);
  return data; // {message, filename, url}
}

// ===== render =====
function renderJobs(jobs){
  const box = byId('results');
  toggle(byId('searchSpinner'), false);
  if (!box) return;

  if (!jobs.length){
    box.innerHTML = `
      <div class="col-12">
        <div class="alert alert-warning mb-0">
          No jobs found. Try another search or seed at <code>/api/seed</code>.
        </div>
      </div>`;
    return;
  }

  box.innerHTML = jobs.map(j=>{
    const title = j.title || 'Untitled';
    const company = j.company || '';
    const loc = j.location ? ` · ${j.location}` : '';
    const desc = (j.description || '').slice(0, 240);
    const skills = Array.isArray(j.skills) ? j.skills
                 : (typeof j.skills === 'string' ? j.skills.split(',') : []);
    const chips = skills.slice(0,6).map(s=>`<span class="badge bg-light text-dark me-1 mb-1">${s.trim()}</span>`).join('');
    return `
      <div class="col-md-6 col-lg-4">
        <div class="card h-100 shadow-sm">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title mb-1">${title}</h5>
            <div class="text-muted small mb-2">${company}${loc}</div>
            <p class="card-text flex-grow-1">${desc}</p>
            <div class="mb-2">${chips}</div>
            ${j.salary ? `<div class="fw-bold mb-2">${j.salary}</div>` : ''}
            <div><button class="btn btn-primary btn-sm" type="button">Details</button></div>
          </div>
        </div>
      </div>`;
  }).join('');
}

function showUploadedResume({ filename, url }){
  const status = byId('uploadStatus');
  const link   = byId('resumeLink');
  const wrap   = byId('resumePreviewWrap');
  const frame  = byId('resumePreview');

  if (status && link){
    link.href = url;
    link.textContent = filename || 'resume';
    toggle(status, true);
  }
  if (wrap && frame){
    if ((filename || '').toLowerCase().endsWith('.pdf')) {
      frame.src = url; toggle(wrap, true);
    } else {
      frame.src = '';  toggle(wrap, false);
    }
  }
}

// ===== actions =====
async function doSearch(ev){
  if (ev) ev.preventDefault();
  toggle(byId('searchSpinner'), true);

  const qEl   = pickInput('q');
  const locEl = pickInput('loc');

  // Optional extra filters: fold into q for broader match; loc stays separate
  const type   = byId('jobTypeSelect')?.value || '';
  const remote = byId('remoteCheck')?.checked ? ' remote' : '';

  const q   = [qEl?.value || '', type, remote].filter(Boolean).join(' ').trim();
  const loc = (locEl?.value || '').trim();

  try {
    const jobs = await fetchJobs(q, loc);
    renderJobs(jobs);
  } catch (e) {
    toggle(byId('searchSpinner'), false);
    byId('results').innerHTML = `<div class="col-12"><div class="alert alert-danger">${e.message}</div></div>`;
  }
}
const doSearchDebounced = debounce(doSearch, 500);

function bindSearch(){
  // Buttons (handles duplicates/aliases)
  $$(`#searchBtn, [data-action="search"], .js-search-btn`).forEach(b => b.addEventListener('click', doSearch));
  byId('searchForm')?.addEventListener('submit', doSearch);

  // Type-to-search
  pickInput('q')?.addEventListener('input', doSearchDebounced);
  pickInput('loc')?.addEventListener('input', doSearchDebounced);
}

function bindChips(){
  $$('.chip').forEach(ch => ch.addEventListener('click', ()=>{
    const qEl = pickInput('q'); if (!qEl) return;
    qEl.value = ch.textContent.trim();
    doSearch();
  }));
}

function bindResume(){
  // Hidden inputs (hero + side)
  $$('#resume-hero-input, #resume-side-input, input[type="file"][name="resume"]').forEach(inp=>{
    inp.addEventListener('change', async (e)=>{
      const f = e.target.files?.[0]; if (!f) return;
      try { const data = await uploadResume(f); showUploadedResume(data); }
      catch(err){ alert(err.message || 'Upload failed'); }
    });
  });
  // Safety for visible button (label)
  byId('uploadResumeBtn')?.addEventListener('click',(e)=>{
    e.preventDefault();
    (byId('resume-hero-input') || byId('resume-side-input') || $('input[type="file"][name="resume"]'))?.click();
  });
}

// ===== init =====
document.addEventListener('DOMContentLoaded', async ()=>{
  bindSearch();
  bindChips();
  bindResume();

  // Initial load: show something right away (seed once if empty)
  toggle(byId('searchSpinner'), true);
  try {
    let jobs = await fetchJobs('', '');
    if (!jobs.length) { try { await fetch('/api/seed', { method:'POST' }); } catch {} jobs = await fetchJobs('', ''); }
    renderJobs(jobs);
  } catch (e) {
    toggle(byId('searchSpinner'), false);
    byId('results').innerHTML = `<div class="col-12"><div class="alert alert-danger">${e.message}</div></div>`;
  }
});
