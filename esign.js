/* esign.js — read / initial / sign / date the Prime Deals Rental agreement.
   The contract text (from CONTRACT in contract.js) renders read-only; only the
   blank initial / signature / date / info fields are fillable by the renter.
   Adopt a signature + initials once, then stamp each required spot.

   Authorized driver (Exhibit E): only enabled when the renter checked
   "Add an authorized driver" on the booking page (opts.addDriver). When enabled,
   the driver's own details are typed manually and the driver signs with their
   OWN adopted signature — "Apply to all remaining" fills the renter's fields but
   never the authorized driver's info or signature.

   window.Esign.open(opts) -> { car, name, email, phone, quote, start, end,
                                addDriver, onComplete(agreement) }
   window.Esign.renderSigned(agreement) -> HTML string of the completed agreement */
(function () {
  const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  function esc(s){ return String(s==null?'':s).replace(/[&<>"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }
  function todayLong(){ const d=new Date(); return MONTHS[d.getMonth()]+' '+d.getDate()+', '+d.getFullYear(); }
  function nowTime(){ const d=new Date(); let h=d.getHours(), m=d.getMinutes(); const ap=h>=12?'PM':'AM'; h=h%12||12; return h+':'+String(m).padStart(2,'0')+' '+ap; }
  function initialsFrom(name){ return (name||'').trim().split(/\s+/).map(w=>w[0]||'').join('').slice(0,4).toUpperCase(); }
  function exLetter(text){ const m=String(text).match(/EXHIBIT\s+([A-F])/i); return m?m[1].toUpperCase():null; }

  let S = null;                 // open-session state
  let _mainSignIndex = -1;

  function overlay(){
    let o = document.getElementById('esign-overlay');
    if(o) return o;
    o = document.createElement('div'); o.className='esign-overlay'; o.id='esign-overlay';
    document.body.appendChild(o); return o;
  }

  function open(opts){
    const name = opts.name || '';
    S = {
      opts, addDriver: !!opts.addDriver,
      adopted:false, sigType:'draw', sigData:null, initials:initialsFrom(name),
      drvAdopted:false, drvSigType:'draw', drvSigData:null,
      stamped:{}, fields:{}
    };
    const o = overlay();
    o.innerHTML = buildHTML(opts);
    o.classList.add('show');
    document.body.style.overflow='hidden';
    wire(opts);
  }
  function close(){ const o=document.getElementById('esign-overlay'); if(o) o.classList.remove('show'); document.body.style.overflow=''; }

  // ---------------- build overlay ----------------
  function buildHTML(opts){
    const C = window.CONTRACT;
    const veh = `${opts.car.year} ${opts.car.make} ${opts.car.model}`;
    const driverAdopt = S.addDriver ? `
        <div class="es-adopt es-adopt-driver">
          <h4>Authorized driver's signature <span style="text-transform:none;color:var(--muted);font-weight:500">— the second driver signs here (not covered by “apply to all”)</span></h4>
          <div class="es-adopt-grid">
            <div>
              <div class="es-tabs">
                <button class="es-tab on" data-dtab="draw">✍️ Draw</button>
                <button class="es-tab" data-dtab="type">⌨️ Type</button>
              </div>
              <div id="es-d-pad-draw" class="es-pad"><canvas class="es-canvas" id="es-d-canvas"></canvas><button class="es-clear" id="es-d-clear">Clear</button></div>
              <input id="es-d-type" class="es-type" style="display:none" placeholder="Authorized driver's full name">
              <div class="es-pad-lbl">Authorized driver's signature</div>
            </div>
            <div></div>
            <div><button class="btn btn-gold" id="es-d-adopt-btn" style="white-space:nowrap">Adopt driver</button></div>
          </div>
        </div>` : '';
    return `
      <div class="esign-modal">
        <div class="esign-head">
          <div>
            <h2>Rental Agreement</h2>
            <div class="sub">${esc(veh)} · ${esc(opts.start)} → ${esc(opts.end)} · Please read, initial, and sign.${S.addDriver?' · Authorized driver added.':''}</div>
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
            <div><button class="btn btn-gold" id="es-adopt-btn" style="white-space:nowrap">Adopt &amp; start</button></div>
          </div>
        </div>
        ${driverAdopt}

        <div class="esign-body">
          <div class="es-paper" id="es-paper">${renderBlocks(C, opts, false, null, S.addDriver)}</div>
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

  // ---------------- render contract ----------------
  function renderBlocks(C, opts, signed, ag, addDriver){
    let ex=null, sub=null, openE=false; const out=[];
    C.blocks.forEach((b,i)=>{
      if(b.t==='subhead') sub = b.text.trim();
      if(b.t==='exhibit'){
        const letter = exLetter(b.text);
        if(openE && letter!=='E'){ out.push('</div>'); openE=false; }
        ex = letter;
        if(letter==='E'){
          out.push(renderBlock(b,i,opts,signed,ag,ex,sub,addDriver)); // heading
          out.push(`<div class="es-ex-block ${addDriver?'':'es-ex-disabled'}" id="ex-e">`);
          out.push(`<div class="es-ex-note">${addDriver
            ? 'Authorized driver added — type the driver’s details below and have them sign at the Authorized Driver’s Signature line.'
            : 'No authorized driver added. To enable this form, check “Add an authorized driver” on the booking page.'}</div>`);
          openE=true;
          return;
        }
      }
      out.push(renderBlock(b,i,opts,signed,ag,ex,sub,addDriver));
    });
    if(openE) out.push('</div>');
    return out.join('');
  }

  function fillInputsInText(text, opts, driverInfo){
    let idx=0;
    return esc(text).replace(/_{3,}/g, () => {
      const key='fl_'+idx++; const low=text.toLowerCase(); let val='';
      if(!driverInfo){
        if(/full legal name|printed name/.test(low)) val = opts ? (opts.name||'') : '';
        else if(/phone/.test(low)) val = opts ? (opts.phone||'') : '';
      }
      const dattr = driverInfo ? ' data-driver="1"' : '';
      return `<input class="es-fill" data-fkey="${esc(key)}"${dattr} value="${esc(val)}">`;
    });
  }

  function renderBlock(b, i, opts, signed, ag, ex, sub, addDriver){
    const inE = (ex==='E');
    const driverInfo = inE && sub && /AUTHORIZED DRIVER INFORMATION/i.test(sub);
    switch(b.t){
      case 'title': return `<h1>${esc(b.text)}</h1>`;
      case 'subtitle': return `<div class="doc-sub">${esc(b.text)}</div>`;
      case 'part': return `<div class="part">${esc(b.text)}</div>`;
      case 'exhibit': return `<div class="exhibit">${esc(b.text)}</div>`;
      case 'section': return `<h3 class="sec">${esc(b.text)}</h3>`;
      case 'subhead': return `<h4 class="subhead">${esc(b.text)}</h4>`;
      case 'p': return `<p>${esc(b.text)}</p>`;
      case 'fieldline': return `<div class="fieldline">${fillInputsInText(b.text, signed?null:opts, driverInfo)}</div>`;
      case 'field': {
        let v='';
        if(b.key==='printedName') v = signed ? (ag&&ag.signerName) : (opts&&opts.name);
        else if(b.key==='date') v = signed ? (ag&&ag.dateText) : '';
        else if(b.key==='time') v = signed ? (ag&&ag.timeText) : '';
        return `<div class="es-meta">${esc(b.label)}: <b class="es-auto" data-auto="${b.key}">${esc(v||'')}</b></div>`;
      }
      case 'checkboxes':
        return `<div class="es-cbx-group">` + b.items.map(it=>
          `<label class="es-cbx"><input type="checkbox" ${signed||(inE&&!addDriver)?'disabled':''}> <span>${esc(it)}</span></label>`).join('') + `</div>`;
      case 'initial': {
        if(b.role!=='renter')
          return `<div class="es-slot"><div class="slot-lbl">${esc(b.label)}</div><div class="es-readonly">Prime Deals Rental (staff)</div></div>`;
        if(signed)
          return `<div class="es-slot"><div class="slot-lbl">${esc(b.label)}</div><div class="es-box initial filled"><span class="stamp-text">${esc(ag?ag.initials:'')}</span></div></div>`;
        return `<div class="es-slot"><div class="slot-lbl">${esc(b.label)}<span class="es-req">✱ required</span></div><div class="es-box initial" data-slot="${i}" data-kind="initial" data-role="renter"><span class="cue">Initial</span></div></div>`;
      }
      case 'sign': {
        if(b.role==='rep')
          return `<div class="es-slot"><div class="slot-lbl">${esc(b.label)}</div><div class="es-readonly">Prime Deals Rental representative</div></div>`;

        if(b.role==='driver'){
          if(signed){
            const dv = ag && ag.driver;
            if(dv && dv.sigData) return `<div class="es-slot"><div class="slot-lbl">${esc(b.label)}</div>${sigStamp(dv.sigType, dv.sigData)}</div>`;
            return `<div class="es-slot"><div class="slot-lbl">${esc(b.label)}</div><div class="es-readonly">No authorized driver added</div></div>`;
          }
          if(!addDriver)
            return `<div class="es-slot"><div class="slot-lbl">${esc(b.label)}</div><div class="es-readonly">Enable by adding an authorized driver</div></div>`;
          return `<div class="es-slot"><div class="slot-lbl">${esc(b.label)}<span class="es-req">✱ required</span></div><div class="es-box sign" data-slot="${i}" data-kind="sign" data-role="driver"><span class="cue">Driver signs here</span></div></div>`;
        }

        // renter signature
        const isMain = (i===mainSignIndex());
        const reqE = inE && addDriver;   // Exhibit E renter ack becomes required when a driver is added
        if(signed) return `<div class="es-slot"><div class="slot-lbl">${esc(b.label)}</div>${sigStamp(ag&&ag.sigType, ag&&ag.sigData)}</div>`;
        if(inE && !addDriver)
          return `<div class="es-slot"><div class="slot-lbl">${esc(b.label)}</div><div class="es-readonly">Enable by adding an authorized driver</div></div>`;
        const reqTag = (isMain||reqE) ? '<span class="es-req">✱ required</span>' : '';
        return `<div class="es-slot"><div class="slot-lbl">${esc(b.label)}${reqTag}</div><div class="es-box sign" data-slot="${i}" data-kind="sign" data-role="renter"><span class="cue">Click to sign</span></div></div>`;
      }
    }
    return '';
  }

  function sigStamp(type, data){
    if(!data) return `<div class="es-box sign filled"></div>`;
    const inner = type==='draw' ? `<img class="stamp-img" src="${data}">` : `<span class="stamp-text">${esc(data)}</span>`;
    return `<div class="es-box sign filled">${inner}</div>`;
  }

  function mainSignIndex(){
    if(_mainSignIndex>=0) return _mainSignIndex;
    const C=window.CONTRACT;
    for(let i=0;i<C.blocks.length;i++){ if(C.blocks[i].t==='sign'&&C.blocks[i].role==='renter'){ _mainSignIndex=i; break; } }
    return _mainSignIndex;
  }
  function requiredSlots(addDriver){
    const C=window.CONTRACT, out=[]; let ex=null;
    C.blocks.forEach((b,i)=>{
      if(b.t==='exhibit') ex=exLetter(b.text);
      if(b.t==='initial'&&b.role==='renter') out.push(i);
      if(b.t==='sign'&&b.role==='renter'&&i===mainSignIndex()) out.push(i);
      if(addDriver && ex==='E' && b.t==='sign' && (b.role==='driver'||b.role==='renter')) out.push(i);
    });
    return out;
  }

  // ---------------- signature pad helper ----------------
  function setupPad(canvas, clearBtn){
    const ctx=canvas.getContext('2d');
    function size(){ const r=canvas.getBoundingClientRect(); canvas.width=r.width; canvas.height=r.height; ctx.strokeStyle='#14243f'; ctx.lineWidth=2.4; ctx.lineCap='round'; ctx.lineJoin='round'; }
    setTimeout(size,30);
    let drawing=false, ink=false, lx=0, ly=0;
    function pos(e){ const r=canvas.getBoundingClientRect(); const p=e.touches?e.touches[0]:e; return {x:p.clientX-r.left,y:p.clientY-r.top}; }
    canvas.addEventListener('pointerdown',e=>{ drawing=true; const p=pos(e); lx=p.x; ly=p.y; e.preventDefault(); });
    canvas.addEventListener('pointermove',e=>{ if(!drawing) return; const p=pos(e); ctx.beginPath(); ctx.moveTo(lx,ly); ctx.lineTo(p.x,p.y); ctx.stroke(); lx=p.x; ly=p.y; ink=true; e.preventDefault(); });
    window.addEventListener('pointerup',()=>drawing=false);
    if(clearBtn) clearBtn.onclick=()=>{ ctx.clearRect(0,0,canvas.width,canvas.height); ink=false; };
    return { data:()=>canvas.toDataURL('image/png'), hasInk:()=>ink };
  }

  // ---------------- wiring ----------------
  function wire(opts){
    const o=document.getElementById('esign-overlay');
    o.querySelector('#es-close').onclick=close;

    // renter tabs + pad
    o.querySelectorAll('.es-tab[data-tab]').forEach(t=>t.onclick=()=>{
      const tab=t.dataset.tab; S.sigType=tab;
      o.querySelectorAll('.es-tab[data-tab]').forEach(x=>x.classList.toggle('on',x===t));
      o.querySelector('#es-pad-draw').style.display = tab==='draw'?'block':'none';
      o.querySelector('#es-type').style.display = tab==='type'?'block':'none';
    });
    const rpad = setupPad(o.querySelector('#es-canvas'), o.querySelector('#es-clear'));

    o.querySelector('#es-adopt-btn').onclick=()=>{
      const initials=(o.querySelector('#es-initials').value||'').trim().toUpperCase();
      if(!initials){ alert('Please enter your initials.'); return; }
      if(S.sigType==='draw'){ if(!rpad.hasInk()){ alert('Please draw your signature (or switch to Type).'); return; } S.sigData=rpad.data(); }
      else { const t=(o.querySelector('#es-type').value||'').trim(); if(!t){ alert('Please type your signature.'); return; } S.sigData=t; }
      S.initials=initials; S.adopted=true;
      o.querySelectorAll('.es-auto').forEach(el=>{
        const k=el.dataset.auto;
        if(k==='printedName') el.textContent=opts.name||'';
        if(k==='date') el.textContent=todayLong();
        if(k==='time') el.textContent=nowTime();
      });
      o.querySelector('#es-applyall').style.display='inline-flex';
      o.querySelector('.es-adopt').style.opacity='.6';
      updateProgress();
      o.querySelector('.esign-body').scrollTop=0;
    };

    // driver tabs + pad + adopt
    if(S.addDriver){
      o.querySelectorAll('.es-tab[data-dtab]').forEach(t=>t.onclick=()=>{
        const tab=t.dataset.dtab; S.drvSigType=tab;
        o.querySelectorAll('.es-tab[data-dtab]').forEach(x=>x.classList.toggle('on',x===t));
        o.querySelector('#es-d-pad-draw').style.display = tab==='draw'?'block':'none';
        o.querySelector('#es-d-type').style.display = tab==='type'?'block':'none';
      });
      const dpad = setupPad(o.querySelector('#es-d-canvas'), o.querySelector('#es-d-clear'));
      o.querySelector('#es-d-adopt-btn').onclick=()=>{
        if(S.drvSigType==='draw'){ if(!dpad.hasInk()){ alert("Please draw the authorized driver's signature (or switch to Type)."); return; } S.drvSigData=dpad.data(); }
        else { const t=(o.querySelector('#es-d-type').value||'').trim(); if(!t){ alert("Please type the authorized driver's signature."); return; } S.drvSigData=t; }
        S.drvAdopted=true;
        o.querySelector('.es-adopt-driver').style.opacity='.6';
        alert("Authorized driver signature adopted. Now click the “Driver signs here” line in Exhibit E.");
      };
    }

    // stamps
    o.querySelector('#es-paper').addEventListener('click',e=>{
      const box=e.target.closest('.es-box'); if(!box||box.classList.contains('filled')) return;
      const role=box.dataset.role;
      if(role==='driver'){
        if(!S.drvAdopted){ alert("First adopt the authorized driver's signature in the box above the contract."); return; }
        stampBox(box);
      } else {
        if(!S.adopted){ alert('First adopt your signature above, then click to sign/initial.'); return; }
        stampBox(box);
      }
    });

    // manual field capture
    o.querySelector('#es-paper').addEventListener('input',e=>{
      if(e.target.classList.contains('es-fill')) S.fields[e.target.dataset.fkey]=e.target.value;
    });

    // apply to all remaining renter fields (never the authorized driver's)
    o.querySelector('#es-applyall').onclick=()=>{
      if(!S.adopted) return;
      o.querySelectorAll('.es-box:not(.filled)').forEach(box=>{ if(box.dataset.role!=='driver') stampBox(box); });
    };

    o.querySelector('#es-finish').onclick=()=>finish(opts);
    updateProgress();
  }

  function stampBox(box){
    box.classList.add('filled');
    if(box.dataset.kind==='initial'){
      box.innerHTML=`<span class="stamp-text">${esc(S.initials)}</span>`;
    } else if(box.dataset.role==='driver'){
      box.innerHTML = S.drvSigType==='draw' ? `<img class="stamp-img" src="${S.drvSigData}">` : `<span class="stamp-text">${esc(S.drvSigData)}</span>`;
    } else {
      box.innerHTML = S.sigType==='draw' ? `<img class="stamp-img" src="${S.sigData}">` : `<span class="stamp-text">${esc(S.sigData)}</span>`;
    }
    S.stamped[box.dataset.slot]=true;
    updateProgress();
  }

  function updateProgress(){
    const o=document.getElementById('esign-overlay');
    const req=requiredSlots(S.addDriver);
    const done=req.filter(i=>S.stamped[i]).length;
    const prog=o.querySelector('#es-progress'), finish=o.querySelector('#es-finish');
    if(!S.adopted){ prog.innerHTML='Adopt your signature above to begin.'; finish.disabled=true; return; }
    const ok = done===req.length;
    prog.innerHTML = `Required: <b>${done} of ${req.length}</b> complete` + (ok?' ✓':' — click each ✱ spot to initial / sign.');
    finish.disabled = !ok;
  }

  function finish(opts){
    const req=requiredSlots(S.addDriver);
    if(req.some(i=>!S.stamped[i])){ alert('Please complete all required initials and signatures.'); return; }
    if(S.addDriver){
      const o=document.getElementById('esign-overlay');
      const need=[...o.querySelectorAll('#ex-e input.es-fill[data-driver]')];
      if(need.some(inp=>!inp.value.trim())){ alert("Please fill in the authorized driver's details in Exhibit E."); return; }
    }
    const agreement = {
      version: window.CONTRACT.version, title: window.CONTRACT.title,
      signerName: opts.name||'', signerEmail: opts.email||'',
      sigType: S.sigType, sigData: S.sigData, initials: S.initials,
      fields: S.fields, dateText: todayLong(), timeText: nowTime(),
      signedAt: new Date().toISOString(),
      vehicle: `${opts.car.year} ${opts.car.make} ${opts.car.model}`,
      addDriver: S.addDriver,
      driver: S.addDriver ? { sigType:S.drvSigType, sigData:S.drvSigData } : null,
      method: 'demo-esign'
    };
    close();
    if(typeof opts.onComplete==='function') opts.onComplete(agreement);
  }

  // ---------------- read-only signed render ----------------
  function renderSigned(agreement){
    const C=window.CONTRACT;
    const head=`<div class="es-meta" style="margin-bottom:14px"><b>Signed by:</b> ${esc(agreement.signerName)} &lt;${esc(agreement.signerEmail)}&gt; · <b>Date:</b> ${esc(agreement.dateText)} ${esc(agreement.timeText)} · <b>Version:</b> ${esc(agreement.version)}${agreement.addDriver?' · <b>Authorized driver added</b>':''}</div>`;
    return `<div class="es-paper" style="max-width:none">${head}` + renderBlocks(C, null, true, agreement, !!agreement.addDriver) + `</div>`;
  }

  window.Esign = { open, close, renderSigned };
})();
