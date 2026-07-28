/* admin.js — Prime Deals Rental admin dashboard (interactive preview). */

/* ---------- helpers ---------- */
function $(id){ return document.getElementById(id); }
function money(n){ return '$' + Number(n||0).toLocaleString('en-US'); }
function toast(msg){ const t=$('toast'); t.textContent=msg; t.classList.add('show'); clearTimeout(t._t); t._t=setTimeout(()=>t.classList.remove('show'),2200); }
function slug(s){ return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''); }
function todayISO(){ return new Date().toISOString().split('T')[0]; }
function fmtDate(iso){ if(!iso) return ''; const [y,m,d]=iso.split('-'); return `${m}/${d}/${y}`; }
function eachDay(startISO, endISO, cb){
  let d = startISO;
  let guard = 0;
  while(d <= endISO && guard < 400){ cb(d); d = addDays(d,1); guard++; }
}
function addDays(iso, n){
  const [y,m,d] = iso.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m-1, d + n));
  return dt.toISOString().split('T')[0];
}
function closeModal(id){ $(id).classList.remove('show'); }

/* ---------- auth ---------- */
function doLogin(){
  const ok = Store.login($('pw').value);
  if(ok){ $('login').style.display='none'; $('shell').style.display='grid'; boot(); }
  else { const e=$('login-err'); e.style.display='block'; e.textContent='Incorrect password. Try again.'; }
}
function doLogout(){ Store.logout(); location.reload(); }
function resetDemo(){
  if(confirm('Reset all demo data (vehicles, bookings, blocks, promos) back to defaults?')){
    localStorage.removeItem(Store.KEYS.fleet);
    localStorage.removeItem(Store.KEYS.bookings);
    localStorage.removeItem(Store.KEYS.promos);
    Store.getFleet();
    toast('Demo data reset');
    boot();
  }
}

/* ---------- navigation ---------- */
function initNav(){
  document.querySelectorAll('.nav-item').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('.nav-item').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const v = btn.dataset.view;
      document.querySelectorAll('.view').forEach(s=>s.classList.remove('active'));
      $('view-'+v).classList.add('active');
      if(v==='block') renderBlock();
    });
  });
}

/* ---------- dashboard ---------- */
function renderDashboard(){
  const fleet = Store.getFleet();
  const bookings = Store.getBookings();
  const pending = bookings.filter(b=>b.status==='pending').length;
  const confirmed = bookings.filter(b=>b.status==='confirmed').length;
  const blocks = fleet.reduce((n,v)=>n+(v.blocks||[]).length,0);
  const cards = [
    {n:fleet.length, l:'Vehicles', gold:true},
    {n:fleet.filter(v=>v.available!==false).length, l:'Available'},
    {n:pending, l:'Pending bookings'},
    {n:confirmed, l:'Confirmed bookings'}
  ];
  $('stat-cards').innerHTML = cards.map(c=>`<div class="stat ${c.gold?'gold':''}"><div class="n">${c.n}</div><div class="l">${c.l}</div></div>`).join('');
  const recent = bookings.slice(0,6);
  $('recent-bookings').innerHTML = recent.length
    ? `<table class="tbl"><thead><tr><th>Ref</th><th>Customer</th><th>Vehicle</th><th>Dates</th><th>Status</th></tr></thead><tbody>${
        recent.map(b=>`<tr><td>${b.id}</td><td>${b.customer?.name||'—'}</td><td>${b.vehicle}</td><td>${fmtDate(b.start)} → ${fmtDate(b.end)}</td><td>${statusPill(b.status)}</td></tr>`).join('')
      }</tbody></table>`
    : `<div class="empty-state">No bookings yet. Reservations made on your website will appear here.<br><a class="abtn sm" style="margin-top:14px" href="index.html" target="_blank">Try booking on the public site ↗</a></div>`;
}
function statusPill(s){
  const map={pending:'gold',confirmed:'green',cancelled:'red'};
  return `<span class="pill ${map[s]||'grey'}">${s}</span>`;
}

/* ---------- vehicles ---------- */
function renderVehicles(){
  const fleet = Store.getFleet();
  $('veh-rows').innerHTML = fleet.map(v=>`
    <tr>
      <td><div class="veh"><img src="${v.photo||''}" alt=""><div><b>${v.make} ${v.model}</b><span>${v.year}</span></div></div></td>
      <td>${v.className||''}</td>
      <td>${money(v.price)}</td>
      <td>${v.available===false?'<span class="pill red">Unavailable</span>':'<span class="pill green">Available</span>'}</td>
      <td><div class="row-actions">
        <button class="abtn sm" onclick="openVehicle('${v.id}')">Edit</button>
        <button class="abtn sm danger" onclick="deleteVehicle('${v.id}')">Delete</button>
      </div></td>
    </tr>`).join('');
}
let photoData = '';
function onPhotoFile(e){
  const f = e.target.files[0]; if(!f) return;
  if(f.size > 1600000){ toast('Image is large — it may not save. Try a smaller one.'); }
  const r = new FileReader();
  r.onload = ()=>{ photoData = r.result; previewPhoto(photoData); $('v-photo').value=''; };
  r.readAsDataURL(f);
}
function previewPhoto(src){ photoData = src || photoData; $('v-photo-prev').src = src || photoData || ''; }
function openVehicle(id){
  photoData='';
  const f = ['v-make','v-model','v-year','v-class','v-price','v-seats','v-doors','v-trans','v-drive','v-fuel','v-features','v-desc','v-photo'];
  f.forEach(x=>$(x).value='');
  $('v-photo-prev').src=''; $('v-photo-file').value=''; $('v-available').checked=true;
  if(id){
    const v = Store.getVehicle(id);
    $('veh-modal-title').textContent = 'Edit Vehicle';
    $('v-id').value=v.id;
    $('v-make').value=v.make; $('v-model').value=v.model; $('v-year').value=v.year;
    $('v-class').value=v.className; $('v-price').value=v.price; $('v-seats').value=v.seats;
    $('v-doors').value=v.doors; $('v-trans').value=v.transmission; $('v-drive').value=v.drive;
    $('v-fuel').value=v.fuel; $('v-features').value=(v.features||[]).join(', ');
    $('v-desc').value=v.desc; $('v-photo').value=v.photo||''; photoData=v.photo||'';
    $('v-photo-prev').src=v.photo||''; $('v-available').checked=v.available!==false;
  } else {
    $('veh-modal-title').textContent = 'Add Vehicle';
    $('v-id').value='';
  }
  $('veh-modal').classList.add('show');
}
function saveVehicle(){
  const make=$('v-make').value.trim(), model=$('v-model').value.trim();
  if(!make||!model){ toast('Make and model are required'); return; }
  const id = $('v-id').value || (slug(make+'-'+model+'-'+($('v-year').value||'')) || 'car-'+Date.now());
  const existing = $('v-id').value ? Store.getVehicle(id) : null;
  const photo = $('v-photo').value.trim() || photoData || (existing?existing.photo:'');
  const v = {
    id,
    make, model,
    year: Number($('v-year').value)||'',
    className: $('v-class').value.trim(),
    photo,
    price: Number($('v-price').value)||0,
    seats: Number($('v-seats').value)||0,
    doors: Number($('v-doors').value)||0,
    transmission: $('v-trans').value.trim()||'Automatic',
    drive: $('v-drive').value.trim()||'',
    fuel: $('v-fuel').value.trim()||'Petrol',
    features: $('v-features').value.split(',').map(s=>s.trim()).filter(Boolean),
    desc: $('v-desc').value.trim(),
    accent: existing?existing.accent:'#1c1f26',
    available: $('v-available').checked,
    blocks: existing?existing.blocks||[]:[],
    booked: existing?existing.booked||[]:[]
  };
  Store.upsertVehicle(v);
  closeModal('veh-modal');
  toast($('v-id').value?'Vehicle updated':'Vehicle added');
  renderVehicles(); renderDashboard(); fillBlockVehicles();
}
function deleteVehicle(id){
  const v = Store.getVehicle(id);
  if(confirm(`Delete ${v.make} ${v.model}? This can't be undone.`)){
    Store.deleteVehicle(id);
    toast('Vehicle deleted');
    renderVehicles(); renderDashboard(); fillBlockVehicles();
  }
}

/* ---------- bookings ---------- */
function renderBookings(){
  const b = Store.getBookings();
  $('book-rows').innerHTML = b.length ? b.map(x=>`
    <tr>
      <td><b>${x.id}</b></td>
      <td>${x.customer?.name||'—'}<br><span style="color:var(--muted);font-size:12px">${x.customer?.email||''}</span></td>
      <td>${x.vehicle}</td>
      <td>${fmtDate(x.start)} → ${fmtDate(x.end)}<br><span style="color:var(--muted);font-size:12px">${x.days} day(s)</span></td>
      <td>${money(x.total)}<br><span style="color:var(--muted);font-size:12px">${money(x.deposit)} deposit</span></td>
      <td>${statusPill(x.status)}</td>
      <td><div class="row-actions">
        ${x.status!=='confirmed'?`<button class="abtn sm" onclick="setBooking('${x.id}','confirmed')">Confirm</button>`:''}
        ${x.status!=='cancelled'?`<button class="abtn sm danger" onclick="setBooking('${x.id}','cancelled')">Cancel</button>`:''}
      </div></td>
    </tr>`).join('') : `<tr><td colspan="7"><div class="empty-state">No bookings yet.</div></td></tr>`;
}
function setBooking(id, status){
  Store.updateBooking(id, {status});
  toast('Booking '+status);
  renderBookings(); renderDashboard();
}

/* ---------- block dates ---------- */
function fillBlockVehicles(){
  const sel = $('block-vehicle');
  const cur = sel.value;
  sel.innerHTML = Store.getFleet().map(v=>`<option value="${v.id}">${v.year} ${v.make} ${v.model}</option>`).join('');
  if(cur && Store.getVehicle(cur)) sel.value = cur;
}
function dayStatus(vehicle, iso){
  const ranges = Store.rangesFor(vehicle);
  for(const r of ranges){
    if(iso >= r.s && iso <= r.e) return r.type; // 'block' or 'booked'
  }
  return 'free';
}
function renderCalendar(vehicle, baseISO){
  const [y,m] = baseISO.split('-').map(Number);
  const first = new Date(Date.UTC(y, m-1, 1));
  const monthName = first.toLocaleString('en-US',{month:'long',year:'numeric',timeZone:'UTC'});
  const startDow = first.getUTCDay();
  const daysInMonth = new Date(Date.UTC(y, m, 0)).getUTCDate();
  const today = todayISO();
  let cells = ['Su','Mo','Tu','We','Th','Fr','Sa'].map(d=>`<div class="dow">${d}</div>`);
  for(let i=0;i<startDow;i++) cells.push('<div class="cal-day empty"></div>');
  for(let d=1; d<=daysInMonth; d++){
    const iso = `${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    let cls='cal-day', click=`onclick="pickDay('${iso}')"`;
    if(iso < today){ cls+=' past'; click=''; }
    else {
      const st = dayStatus(vehicle, iso);
      if(st==='block') cls+=' blocked';
      else if(st==='booked'){ cls+=' booked'; click=''; }
    }
    cells.push(`<div class="${cls}" ${click} data-iso="${iso}">${d}</div>`);
  }
  return `<div class="cal"><h4>${monthName}</h4><div class="cal-grid">${cells.join('')}</div></div>`;
}
function pickDay(iso){
  const s=$('block-start'), e=$('block-end');
  if(!s.value || (s.value && e.value)){ s.value=iso; e.value=''; }
  else if(iso < s.value){ e.value=s.value; s.value=iso; }
  else e.value=iso;
  highlightSel();
}
function highlightSel(){
  const s=$('block-start').value, e=$('block-end').value;
  document.querySelectorAll('#block-cals .cal-day').forEach(el=>{
    const iso = el.dataset.iso;
    el.classList.toggle('sel', iso && s && ((e && iso>=s && iso<=e) || (!e && iso===s)));
  });
}
function renderBlock(){
  fillBlockVehicles();
  const v = Store.getVehicle($('block-vehicle').value);
  if(!v){ $('block-cals').innerHTML=''; $('blocks-list').innerHTML=''; return; }
  const base = todayISO().slice(0,7)+'-01';
  const next = addDays(base, 32).slice(0,7)+'-01';
  $('block-cals').innerHTML = renderCalendar(v, base) + renderCalendar(v, next);
  highlightSel();
  const blocks = (v.blocks||[]);
  $('blocks-list').innerHTML = '<h3 style="font-size:15px;margin:8px 0 12px">Current blocks for this vehicle</h3>' + (blocks.length
    ? blocks.map((b,i)=>`<div class="block-row"><div><div class="r-dates">${fmtDate(b.start)} → ${fmtDate(b.end)}</div><div class="r-reason">${b.reason||'Reserved by owner'}</div></div><button class="abtn sm danger" onclick="removeBlock(${i})">Remove</button></div>`).join('')
    : '<div class="empty-state">No blocked dates for this vehicle yet.</div>');
}
function addBlock(){
  const v = Store.getVehicle($('block-vehicle').value);
  const s = $('block-start').value, e = $('block-end').value || $('block-start').value;
  if(!s){ toast('Pick a start date (click the calendar or use the date fields)'); return; }
  const start = s<=e?s:e, end = s<=e?e:s;
  // reject if overlaps an existing customer booking
  const clash = Store.rangesFor(v).some(r=>r.type==='booked' && Store.overlaps(start,end,r.s,r.e));
  if(clash){ toast('Those dates overlap a customer booking — cancel that booking first.'); return; }
  v.blocks = v.blocks||[];
  v.blocks.push({ start, end, reason: $('block-reason').value.trim() || 'Reserved by owner' });
  Store.upsertVehicle(v);
  $('block-start').value=''; $('block-end').value=''; $('block-reason').value='';
  toast('Dates blocked');
  renderBlock(); renderDashboard();
}
function removeBlock(i){
  const v = Store.getVehicle($('block-vehicle').value);
  v.blocks.splice(i,1);
  Store.upsertVehicle(v);
  toast('Block removed');
  renderBlock(); renderDashboard();
}

/* ---------- promos ---------- */
function renderPromos(){
  const p = Store.getPromos();
  $('promo-rows').innerHTML = p.length ? p.map((c,i)=>`
    <tr>
      <td><b>${c.code}</b></td>
      <td>${c.type==='percent'? c.value+'% off' : money(c.value)+' off'}</td>
      <td>${c.active?'<span class="pill green">Active</span>':'<span class="pill grey">Off</span>'}</td>
      <td><div class="row-actions">
        <button class="abtn sm" onclick="togglePromo(${i})">${c.active?'Disable':'Enable'}</button>
        <button class="abtn sm danger" onclick="delPromo(${i})">Delete</button>
      </div></td>
    </tr>`).join('') : `<tr><td colspan="4"><div class="empty-state">No promo codes yet.</div></td></tr>`;
}
function openPromo(){ $('p-code').value=''; $('p-value').value=''; $('p-type').value='percent'; $('promo-modal').classList.add('show'); }
function savePromo(){
  const code = $('p-code').value.trim().toUpperCase();
  const value = Number($('p-value').value);
  if(!code || !value){ toast('Enter a code and value'); return; }
  const p = Store.getPromos();
  p.push({ code, type:$('p-type').value, value, active:true });
  Store.savePromos(p);
  closeModal('promo-modal'); toast('Promo code added'); renderPromos();
}
function togglePromo(i){ const p=Store.getPromos(); p[i].active=!p[i].active; Store.savePromos(p); renderPromos(); }
function delPromo(i){ const p=Store.getPromos(); p.splice(i,1); Store.savePromos(p); toast('Code deleted'); renderPromos(); }

/* ---------- boot ---------- */
function boot(){
  Store.getFleet();
  renderDashboard(); renderVehicles(); renderBookings(); renderPromos(); fillBlockVehicles();
  $('block-start').min = todayISO(); $('block-end').min = todayISO();
}
document.addEventListener('DOMContentLoaded',()=>{
  initNav();
  document.querySelectorAll('.amodal').forEach(m=>m.addEventListener('click',e=>{ if(e.target===m) m.classList.remove('show'); }));
  if(Store.isAuthed()){ $('login').style.display='none'; $('shell').style.display='grid'; boot(); }
});
