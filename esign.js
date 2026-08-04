/* esign.js — read / initial / sign / date the Prime Deals Rental agreement.
   The contract text (from CONTRACT in contract.js) renders read-only; only the
   blank initial / signature / date / info fields are fillable by the renter.
   Adopt a signature + initials once, then stamp each required spot.

   window.Esign.open(opts)  -> opens the signing overlay
       opts: { car, name, email, phone, quote, start, end, onComplete(agreement) }
   window.Esign.renderSigned(agreement) -> HTML string of the completed agreement */
(function () {
  const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  function esc(s){ return String(s==null?'':s).replace(/[&<>"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }
  function todayLong(){ const d=new Date(); return MONTHS[d.getMonth()]+' '+d.getDate()+', '+d.getFullYear(); }
  function nowTime(){ const d=new Date(); let h=d.getHours(), m=d.getMinutes(); const ap=h>=12?'PM':'AM'; h=h%12||12; return h+':'+String(m).padStart(2,'0')+' '+ap; }
  function initialsFrom(name){ return (name||'').trim().split(/\s+/).map(w=>w[0]||'').join('').slice(0,4).toUpperCase(); }

  // ---- state for an open session ----
  let S = null;

  function overlay(){
    let o = document.getElementById('esign-overlay');
    if(o) return o;
    o = document.createElement('div');
    o.className = 'esign-overlay';
    o.id = 'esign-overlay';
    document.body.appendChild(o);
    return o;
  }

  function open(opts){
    const name = opts.name || '';
    S = {
      opts,
      adopted: false,
      sigType: 'draw',          // draw | type
      sigData: null,            // dataURL (draw) or text (type)
      initials: initialsFrom(name),
      stamped: {},              // blockIndex -> true for renter sign/initial slots
      fields: {},               // fieldline/info inputs
      required: [],             // list of required renter slot ids
    };
    const o = overlay();
    o.innerHTML = buildHTML(opts);
    o.classList.add('show');
    document.body.style.overflow = 'hidden';
    wire(opts);
  }

  function close(){
    const o = document.getElementById('esign-overlay');
    if(o) o.classList.remove('show');
    document.body.style.overflow = '';
  }

  // ---------- build the overlay markup ----------
  function buildHTML(opts){
    const C = window.CONTRACT;
    const veh = `${opts.car.year} ${opts.car.make} ${opts.car.model}`;
    return `
      <div class="esign-modal">
        <div class="esign-head">
          <div>
            <h2>Rental Agreement</h2>
            <div class="sub">${esc(veh)} · ${esc(opts.start)} → ${esc(opts.end)} · Please read, initial, and sign.</div>
          </div>
          <button class="esign-x" id="es-close" title="Close">✕</button>
        </div>

        <div class="es-adopt">
          <h4>Adopt your signature &amp; initials</h4>
          <div class="es-adopt-grid">
            <div>
              <div class="es-tabs">
                <button class="es-tab on" data-tab="draw">✍️ Draw</button>
                <button class="es-tab" data-tab="type">⌨️ Type</button>
              </div>
              <div id="es-pad-draw" class="es-pad"><canvas class="es-canvas" id="es-canvas"></canvas><button class="es-clear" id="es-clear">Clear</button></div>
              <input id="es-type" class="es-type" style="display:none" placeholder="Type your full name" value="${esc(opts.name||'')}">
              <div class="es-pad-lbl">Your signature</div>
            </div>
            <div>
              <input id="es-initials" class="es-initial-input" maxlength="5" value="${esc(S.initials)}">
              <div class="es-pad-lbl">Your initials</div>
            </div>
            <div>
              <button class="btn btn-gold" id="es-adopt-btn" style="white-space:nowrap">Adopt &amp; start</button>
            </div>
          </div>
        </div>

        <div class="esign-body">
          <div class="es-paper" id="es-paper">${renderBlocks(C, opts, false)}</div>
        </div>

        <div class="esign-foot">
          <div class="es-progress" id="es-progress">Adopt your signature to begin.</div>
          <div class="es-foot-actions">
            <button class="btn btn-ghost" id="es-applyall" style="display:none">Apply to all remaining</button>
            <button class="btn btn-gold" id="es-finish" disabled>Agree &amp; Sign</button>
          </div>
          <div class="es-note">Demo e-signature. On the live site this is legally captured with the signer's name, email, timestamp and IP under the E-SIGN / UETA acts.</div>
        </div>
      </div>`;
  }

  // ---------- render contract blocks ----------
  // mode signed=false -> interactive; signed=true -> read-only stamped (for admin/account view)
  function renderBlocks(C, opts, signed, agreement){
    return C.blocks.map((b, i) => renderBlock(b, i, opts, signed, agreement)).join('');
  }

  function fillInputsInText(text, opts){
    // replace runs of underscores with fillable inputs; prefill obvious ones
    let idx = 0;
    return esc(text).replace(/_{3,}/g, () => {
      const key = 'fl_' + idx++;
      let val = '';
      const low = text.toLowerCase();
      if(/full legal name|printed name/.test(low)) val = opts ? (opts.name||'') : '';
      else if(/phone/.test(low)) val = opts ? (opts.phone||'') : '';
      return `<input class="es-fill" data-fkey="${key}" value="${esc(val)}">`;
    });
  }

  function renderBlock(b, i, opts, signed, ag){
    switch(b.t){
      case 'title': return `<h1>${esc(b.text)}</h1>`;
      case 'subtitle': return `<div class="doc-sub">${esc(b.text)}</div>`;
      case 'part': return `<div class="part">${esc(b.text)}</div>`;
      case 'exhibit': return `<div class="exhibit">${esc(b.text)}</div>`;
      case 'section': return `<h3 class="sec">${esc(b.text)}</h3>`;
      case 'subhead': return `<h4 class="subhead">${esc(b.text)}</h4>`;
      case 'p': return `<p>${esc(b.text)}</p>`;
      case 'fieldline': return `<div class="fieldline">${fillInputsInText(b.text, signed?null:opts)}</div>`;
      case 'field': {
        let v = '';
        if(b.key==='printedName') v = signed ? (ag && ag.signerName) : (opts && opts.name);
        else if(b.key==='date') v = signed ? (ag && ag.dateText) : '';
        else if(b.key==='time') v = signed ? (ag && ag.timeText) : '';
        return `<div class="es-meta">${esc(b.label)}: <b class="es-auto" data-auto="${b.key}">${esc(v||'')}</b></div>`;
      }
      case 'checkboxes':
        return `<div class="es-cbx-group">` + b.items.map((it,j)=>
          `<label class="es-cbx"><input type="checkbox" ${signed?'disabled':''}> <span>${esc(it)}</span></label>`).join('') + `</div>`;
      case 'initial': {
        if(b.role!=='renter'){
          return `<div class="es-slot"><div class="slot-lbl">${esc(b.label)}</div><div class="es-readonly">Prime Deals Rental (staff)</div></div>`;
        }
        if(signed) return `<div class="es-slot"><div class="slot-lbl">${esc(b.label)}</div><div class="es-box initial filled"><span class="stamp-text">${esc(ag?ag.initials:'')}</span></div></div>`;
        return `<div class="es-slot"><div class="slot-lbl">${esc(b.label)}<span class="es-req">✱ required</span></div><div class="es-box initial" data-slot="${i}" data-kind="initial"><span class="cue">Initial</span></div></div>`;
      }
      case 'sign': {
        if(b.role==='rep'){
          return `<div class="es-slot"><div class="slot-lbl">${esc(b.label)}</div><div class="es-readonly">Prime Deals Rental representative</div></div>`;
        }
        if(b.role==='driver'){
          if(signed) return `<div class="es-slot"><div class="slot-lbl">${esc(b.label)} (if applicable)</div><div class="es-readonly">Separate authorized-driver signature</div></div>`;
          return `<div class="es-slot"><div class="slot-lbl">${esc(b.label)} (only if adding a second driver)</div><div class="es-readonly">Completed separately by the additional driver</div></div>`;
        }
        // renter signature
        const isMain = (i === mainSignIndex());
        if(signed) return `<div class="es-slot"><div class="slot-lbl">${esc(b.label)}</div>${stampHTML(ag)}</div>`;
        return `<div class="es-slot"><div class="slot-lbl">${esc(b.label)}${isMain?'<span class="es-req">✱ required</span>':''}</div><div class="es-box sign" data-slot="${i}" data-kind="sign" data-main="${isMain?1:0}"><span class="cue">Click to sign</span></div></div>`;
      }
    }
    return '';
  }

  function stampHTML(ag){
    if(!ag) return '<div class="es-box sign filled"></div>';
    const inner = ag.sigType==='draw'
      ? `<img class="stamp-img" src="${ag.sigData}">`
      : `<span class="stamp-text">${esc(ag.sigData)}</span>`;
    return `<div class="es-box sign filled">${inner}</div>`;
  }

  let _mainSignIndex = -1;
  function mainSignIndex(){
    if(_mainSignIndex>=0) return _mainSignIndex;
    const C = window.CONTRACT;
    for(let i=0;i<C.blocks.length;i++){ if(C.blocks[i].t==='sign' && C.blocks[i].role==='renter'){ _mainSignIndex=i; break; } }
    return _mainSignIndex;
  }
  function renterSlots(){
    const C = window.CONTRACT, out=[];
    C.blocks.forEach((b,i)=>{ if((b.t==='initial'&&b.role==='renter')||(b.t==='sign'&&b.role==='renter')) out.push({i,b}); });
    return out;
  }
  function requiredSlots(){
    const C = window.CONTRACT, out=[];
    C.blocks.forEach((b,i)=>{
      if(b.t==='initial'&&b.role==='renter') out.push(i);
      if(b.t==='sign'&&b.role==='renter'&&i===mainSignIndex()) out.push(i);
    });
    return out;
  }

  // ---------- wiring ----------
  function wire(opts){
    const o = document.getElementById('esign-overlay');
    o.querySelector('#es-close').onclick = close;

    // tabs
    let tab = 'draw';
    o.querySelectorAll('.es-tab').forEach(t=>t.onclick=()=>{
      tab = t.dataset.tab; S.sigType = tab;
      o.querySelectorAll('.es-tab').forEach(x=>x.classList.toggle('on', x===t));
      o.querySelector('#es-pad-draw').style.display = tab==='draw'?'block':'none';
      o.querySelector('#es-type').style.display = tab==='type'?'block':'none';
    });

    // canvas drawing
    const canvas = o.querySelector('#es-canvas');
    const ctx = canvas.getContext('2d');
    function sizeCanvas(){ const r=canvas.getBoundingClientRect(); canvas.width=r.width; canvas.height=r.height; ctx.strokeStyle='#14243f'; ctx.lineWidth=2.4; ctx.lineCap='round'; ctx.lineJoin='round'; }
    setTimeout(sizeCanvas, 30);
    let drawing=false, hasInk=false, lx=0, ly=0;
    function pos(e){ const r=canvas.getBoundingClientRect(); const p=e.touches?e.touches[0]:e; return {x:p.clientX-r.left, y:p.clientY-r.top}; }
    function down(e){ drawing=true; const p=pos(e); lx=p.x; ly=p.y; e.preventDefault(); }
    function move(e){ if(!drawing) return; const p=pos(e); ctx.beginPath(); ctx.moveTo(lx,ly); ctx.lineTo(p.x,p.y); ctx.stroke(); lx=p.x; ly=p.y; hasInk=true; e.preventDefault(); }
    function up(){ drawing=false; }
    canvas.addEventListener('pointerdown',down); canvas.addEventListener('pointermove',move);
    window.addEventListener('pointerup',up);
    o.querySelector('#es-clear').onclick=()=>{ ctx.clearRect(0,0,canvas.width,canvas.height); hasInk=false; };

    // adopt
    o.querySelector('#es-adopt-btn').onclick=()=>{
      const initials = (o.querySelector('#es-initials').value||'').trim().toUpperCase();
      if(!initials){ alert('Please enter your initials.'); return; }
      if(S.sigType==='draw'){
        if(!hasInk){ alert('Please draw your signature (or switch to Type).'); return; }
        S.sigData = canvas.toDataURL('image/png');
      } else {
        const t=(o.querySelector('#es-type').value||'').trim();
        if(!t){ alert('Please type your signature.'); return; }
        S.sigData = t;
      }
      S.initials = initials;
      S.adopted = true;
      // fill auto fields (printed name / date / time)
      o.querySelectorAll('.es-auto').forEach(el=>{
        const k=el.dataset.auto;
        if(k==='printedName') el.textContent = opts.name||'';
        if(k==='date') el.textContent = todayLong();
        if(k==='time') el.textContent = nowTime();
      });
      o.querySelector('#es-applyall').style.display='inline-flex';
      o.querySelector('.es-adopt').style.opacity='.6';
      updateProgress();
      // subtle scroll into the document
      o.querySelector('.esign-body').scrollTop = 0;
    };

    // click stamps
    o.querySelector('#es-paper').addEventListener('click', (e)=>{
      const box = e.target.closest('.es-box');
      if(!box || box.classList.contains('filled')) return;
      if(!S.adopted){ alert('First adopt your signature above, then click to sign/initial.'); return; }
      stampBox(box);
    });

    // fieldline inputs
    o.querySelector('#es-paper').addEventListener('input',(e)=>{
      if(e.target.classList.contains('es-fill')) S.fields[e.target.dataset.fkey]=e.target.value;
    });

    // apply to all remaining renter slots
    o.querySelector('#es-applyall').onclick=()=>{
      if(!S.adopted) return;
      o.querySelectorAll('.es-box:not(.filled)').forEach(stampBox);
    };

    // finish
    o.querySelector('#es-finish').onclick=()=>finish(opts);

    updateProgress();
  }

  function stampBox(box){
    const kind = box.dataset.kind;
    box.classList.add('filled');
    if(kind==='initial'){
      box.innerHTML = `<span class="stamp-text">${esc(S.initials)}</span>`;
    } else {
      box.innerHTML = S.sigType==='draw'
        ? `<img class="stamp-img" src="${S.sigData}">`
        : `<span class="stamp-text">${esc(S.sigData)}</span>`;
    }
    S.stamped[box.dataset.slot] = true;
    updateProgress();
  }

  function updateProgress(){
    const o = document.getElementById('esign-overlay');
    const req = requiredSlots();
    const done = req.filter(i=>S.stamped[i]).length;
    const prog = o.querySelector('#es-progress');
    const finish = o.querySelector('#es-finish');
    if(!S.adopted){ prog.innerHTML='Adopt your signature above to begin.'; finish.disabled=true; return; }
    const ok = done===req.length;
    prog.innerHTML = `Required: <b>${done} of ${req.length}</b> complete` + (ok?' ✓':' — click each ✱ spot to initial / sign.');
    finish.disabled = !ok;
  }

  function finish(opts){
    const req = requiredSlots();
    if(req.some(i=>!S.stamped[i])){ alert('Please complete all required initials and the signature.'); return; }
    const agreement = {
      version: window.CONTRACT.version,
      title: window.CONTRACT.title,
      signerName: opts.name || '',
      signerEmail: opts.email || '',
      sigType: S.sigType,
      sigData: S.sigData,
      initials: S.initials,
      fields: S.fields,
      dateText: todayLong(),
      timeText: nowTime(),
      signedAt: new Date().toISOString(),
      vehicle: `${opts.car.year} ${opts.car.make} ${opts.car.model}`,
      method: 'demo-esign'
    };
    close();
    if(typeof opts.onComplete==='function') opts.onComplete(agreement);
  }

  // ---------- read-only render of a completed agreement (admin / account) ----------
  function renderSigned(agreement){
    const C = window.CONTRACT;
    const head = `<div class="es-meta" style="margin-bottom:14px"><b>Signed by:</b> ${esc(agreement.signerName)} &lt;${esc(agreement.signerEmail)}&gt; · <b>Date:</b> ${esc(agreement.dateText)} ${esc(agreement.timeText)} · <b>Version:</b> ${esc(agreement.version)}</div>`;
    return `<div class="es-paper" style="max-width:none">${head}` + renderBlocks(C, null, true, agreement) + `</div>`;
  }

  window.Esign = { open, close, renderSigned };
})();
