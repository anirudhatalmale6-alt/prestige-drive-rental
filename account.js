/* account.js — customer accounts (register / login / 2FA / dashboard) — demo. */
function $(id){ return document.getElementById(id); }
function money(n){ return '$' + Number(n||0).toLocaleString('en-US'); }
function fmtDate(iso){ if(!iso) return ''; const [y,m,d]=iso.split('-'); return `${m}/${d}/${y}`; }
function toast(msg){ const t=$('toast'); t.textContent=msg; t.classList.add('show'); clearTimeout(t._t); t._t=setTimeout(()=>t.classList.remove('show'),2200); }
function closeModal(id){ $(id).classList.remove('show'); }

let pendingEmail = null;

function showForm(which){
  ['login','register','twofa'].forEach(f=>$(f+'-form').style.display = (f===which)?'block':'none');
  ['login-err','reg-err','tf-err'].forEach(e=>{ if($(e)) $(e).style.display='none'; });
}

/* ---- register ---- */
function doRegister(){
  const name=$('r-name').value.trim(), email=$('r-email').value.trim(), phone=$('r-phone').value.trim(), pass=$('r-pass').value;
  const err=$('reg-err');
  if(!name||!email||!pass){ err.style.display='block'; err.textContent='Please fill in name, email and password.'; return; }
  const res = Store.registerCustomer({name,email,phone,password:pass});
  if(res.error){ err.style.display='block'; err.textContent=res.error; return; }
  pendingEmail = email;
  goTo2FA();
}

/* ---- login ---- */
function doCustomerLogin(){
  const email=$('l-email').value.trim(), pass=$('l-pass').value;
  const err=$('login-err');
  const c = Store.authCustomer(email, pass);
  if(!c){ err.style.display='block'; err.textContent='No account found with that email and password.'; return; }
  pendingEmail = email;
  goTo2FA();
}

/* ---- 2FA ---- */
function goTo2FA(){
  showForm('twofa');
  const code = Store.twoFactorCode(pendingEmail);
  $('twofa-demo').innerHTML = `Preview: your code is <b>${code}</b><br><span style="font-size:12px">(the live site emails/texts this instead of showing it)</span>`;
  $('tf-code').value=''; $('tf-code').focus();
}
function verify2FA(){
  const entered = $('tf-code').value.trim();
  const err=$('tf-err');
  if(entered !== Store.twoFactorCode(pendingEmail)){ err.style.display='block'; err.textContent='Incorrect code. Please try again.'; return; }
  Store.startSession(pendingEmail);
  showAccount();
}

/* ---- logout ---- */
function doCustomerLogout(){ Store.endSession(); location.reload(); }

/* ---- account dashboard ---- */
function showAccount(){
  const c = Store.currentCustomer();
  if(!c){ $('auth').style.display='grid'; $('account').style.display='none'; return; }
  $('auth').style.display='none'; $('account').style.display='block';
  $('acc-greeting').textContent = `Welcome back, ${c.name.split(' ')[0]}.`;
  $('p-name').value=c.name; $('p-phone').value=c.phone||''; $('p-email').value=c.email;
  renderVerify(c);
  renderInsurance(c);
  renderDrivers(c);
  renderAccBookings(c);
}
function renderVerify(c){
  $('verify-status').innerHTML = c.verified
    ? '<span class="pill green">✓ Verified</span> <span style="color:var(--muted);font-size:13px">You\'re cleared to pick up.</span>'
    : '<span class="pill gold">Not verified yet</span>';
  $('verify-btn').style.display = c.verified ? 'none' : 'inline-flex';
}

/* ---- insurance card ---- */
function renderInsurance(c){
  const ins = c.insurance;
  if(ins && ins.verified){
    $('ins-status').innerHTML = `<span class="pill green">✓ On file</span> <span style="color:var(--muted);font-size:13px">Valid through ${ins.expiry?fmtDate(ins.expiry):'—'}.</span>`;
    $('ins-btn').textContent = 'Replace insurance card';
  } else {
    $('ins-status').innerHTML = '<span class="pill gold">No insurance card on file</span>';
    $('ins-btn').textContent = 'Upload insurance card';
  }
  $('ins-btn').style.display = 'inline-flex';
}
function startInsurance(){ $('ins-msg').style.display='none'; $('ins-file').value=''; $('ins-exp').value=''; $('insurance-modal').classList.add('show'); }
function submitInsurance(){
  const file=$('ins-file').files[0], exp=$('ins-exp').value;
  const msg=$('ins-msg');
  if(!file){ msg.style.display='block'; msg.className='notice err'; msg.textContent='Please upload a photo of your insurance card.'; return; }
  if(!exp){ msg.style.display='block'; msg.className='notice err'; msg.textContent='Please enter the policy expiration date.'; return; }
  const today = new Date().toISOString().slice(0,10);
  if(exp < today){ msg.style.display='block'; msg.className='notice err'; msg.textContent='That policy has expired. Please upload a current, valid insurance card.'; return; }
  const c = Store.currentCustomer();
  // Demo: accept + mark valid. Live version validates policy details with the insurer / OCR.
  Store.updateCustomer(c.email, { insurance:{ fileName:file.name, expiry:exp, verified:true, uploadedAt:new Date().toISOString() } });
  closeModal('insurance-modal');
  toast('Insurance card saved ✓');
  showAccount();
}

/* ---- additional authorized drivers ---- */
function renderDrivers(c){
  const list = c.drivers || [];
  $('drivers-list').innerHTML = list.length ? list.map(d=>`
    <div class="drv">
      <div class="drv-info">
        <div class="drv-name">${d.name}</div>
        <div class="bk-meta">${d.email||''} · ${d.verified?'<span class="pill green">✓ Verified</span>':'<span class="pill gold">Verification pending</span>'}</div>
      </div>
      <button class="abtn sm" onclick="removeDriver('${d.id}')">Remove</button>
    </div>`).join('') : `<div class="empty-state">No additional drivers yet. Only the account holder is authorized to drive unless you add one here.</div>`;
}
function startDriver(){
  ['d-name','d-email'].forEach(id=>$(id).value='');
  ['d-license','d-selfie'].forEach(id=>$(id).value='');
  $('d-msg').style.display='none';
  $('driver-modal').classList.add('show');
}
function submitDriver(){
  const name=$('d-name').value.trim(), email=$('d-email').value.trim();
  const lic=$('d-license').files[0], self=$('d-selfie').files[0];
  const msg=$('d-msg');
  if(!name){ msg.style.display='block'; msg.className='notice err'; msg.textContent='Please enter the driver\'s full name.'; return; }
  if(!lic || !self){ msg.style.display='block'; msg.className='notice err'; msg.textContent='Please upload the driver\'s license and a selfie.'; return; }
  const c = Store.currentCustomer();
  // Demo: same verification flow as the account holder — auto-approve here.
  Store.addDriver(c.email, { name, email, licenseFile:lic.name, selfieFile:self.name, verified:true, verifiedAt:new Date().toISOString() });
  closeModal('driver-modal');
  toast('Authorized driver added & verified ✓');
  showAccount();
}
function removeDriver(id){
  const c = Store.currentCustomer();
  Store.removeDriver(c.email, id);
  toast('Driver removed');
  showAccount();
}
function renderAccBookings(c){
  const list = Store.customerBookings(c.email);
  $('acc-bookings').innerHTML = list.length ? list.map(b=>`
    <div class="bk">
      <div class="bk-top">
        <div>
          <div class="bk-veh">${b.vehicle}</div>
          <div class="bk-meta">Ref ${b.id} · ${statusPill(b.status)}</div>
        </div>
        <div class="bk-total">${money(b.total)}</div>
      </div>
      <div class="bk-meta">
        ${fmtDate(b.start)} → ${fmtDate(b.end)} (${b.days} day${b.days>1?'s':''})<br>
        ${b.location||''}${b.deliveryAddress?(' · '+b.deliveryAddress):''}${b.delivery?(' · delivery '+money(b.delivery)):''}
      </div>
      ${b.agreement
        ? `<div class="bk-meta" style="margin-top:8px"><span class="pill green">✓ Agreement signed</span> <a href="#" onclick="viewAgreement('${b.id}');return false;" style="color:var(--gold);margin-left:8px">View agreement</a></div>`
        : `<div class="bk-meta" style="margin-top:8px"><span class="pill gold">Agreement not signed</span></div>`}
    </div>`).join('') : `<div class="empty-state">No bookings yet.<br><a class="abtn sm" style="margin-top:14px" href="index.html#fleet">Browse the fleet →</a></div>`;
}
function viewAgreement(id){
  const b = Store.getBookings().find(x=>x.id===id);
  if(!b || !b.agreement){ toast('No signed agreement on file'); return; }
  $('agree-body').innerHTML = window.Esign ? Esign.renderSigned(b.agreement) : '<p>Agreement on file.</p>';
  $('agree-modal').classList.add('show');
}
function statusPill(s){ const m={pending:'gold',confirmed:'green',cancelled:'red'}; return `<span class="pill ${m[s]||'grey'}">${s}</span>`; }

function saveProfile(){
  const c = Store.currentCustomer();
  Store.updateCustomer(c.email, { name:$('p-name').value.trim(), phone:$('p-phone').value.trim() });
  toast('Profile saved');
  showAccount();
}

/* ---- identity verification (simulated) ---- */
function startVerify(){ $('vf-msg').style.display='none'; $('vf-license').value=''; $('vf-selfie').value=''; $('verify-modal').classList.add('show'); }
function submitVerify(){
  const lic=$('vf-license').files[0], self=$('vf-selfie').files[0];
  const msg=$('vf-msg');
  if(!lic || !self){ msg.style.display='block'; msg.className='notice err'; msg.textContent='Please upload both your license and a selfie.'; return; }
  const c = Store.currentCustomer();
  // Demo: auto-approve. Live version runs selfie↔license match via the verification provider.
  Store.updateCustomer(c.email, { verified:true, verifiedAt:new Date().toISOString() });
  closeModal('verify-modal');
  toast('Identity verified ✓');
  showAccount();
}

/* ---- boot ---- */
document.addEventListener('DOMContentLoaded',()=>{
  const t=document.querySelector('.menu-toggle'), l=document.querySelector('.nav-links');
  if(t&&l) t.addEventListener('click',()=>l.classList.toggle('open'));
  document.querySelectorAll('.amodal').forEach(m=>m.addEventListener('click',e=>{ if(e.target===m) m.classList.remove('show'); }));
  if(Store.currentCustomer()) showAccount();
  else showForm('login');
});
