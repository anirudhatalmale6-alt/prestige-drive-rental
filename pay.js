/* pay.js — payment step for the Prime Deals Rental booking flow.
   Options: place the 30% deposit hold (auth-only, captured at pickup), pay in full
   now, send a secure pay-link to the customer's phone, or pay in person at pickup.

   DEMO MODE (PAY_CONFIG.mode='demo'): shows a Converge-style secure card window and
   simulates approval so the whole flow is clickable with no backend.

   LIVE MODE (PAY_CONFIG.mode='live'): loads Elavon Converge Checkout.js, asks your
   backend for a one-time session token (ssl_txn_auth_token) generated from your
   Converge credentials (ssl_merchant_id / ssl_user_id / ssl_pin) with the right
   transaction type (ccsale = charge, ccauthonly = hold), then opens the real
   Converge Lightbox. Merchant credentials stay server-side, never in the browser.
   See /converge/ for the backend reference.

   window.Pay.open({ total, deposit, currency, booking:{ref,vehicle,dates,name,email,phone},
                     onComplete(payment) })  */
(function () {
  window.PAY_CONFIG = window.PAY_CONFIG || {
    mode: 'demo',                 // 'demo' | 'live'
    depositType: 'hold',          // 'hold' (30% auth-only, captured at pickup) | 'charge' (capture now)
    depositLabel: '30%',          // shown in the UI
    tokenEndpoint: '/api/converge/token',   // your backend (live mode)
    checkoutJs: 'https://api.convergepay.com/hosted-payments/Checkout.js'
  };

  function esc(s){ return String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }
  function money(n){ return '$' + Number(n||0).toLocaleString('en-US'); }
  function digits(s){ return (s||'').replace(/\D/g,''); }
  function luhn(num){ let s=0,alt=false; for(let i=num.length-1;i>=0;i--){ let d=+num[i]; if(alt){ d*=2; if(d>9)d-=9; } s+=d; alt=!alt; } return s%10===0; }
  function brandOf(num){ if(/^4/.test(num))return 'visa'; if(/^5[1-5]/.test(num)||/^2[2-7]/.test(num))return 'mc'; if(/^3[47]/.test(num))return 'amex'; if(/^6/.test(num))return 'disc'; return ''; }
  function refCode(seed){ let h=0; const s=(seed||'')+'pdrpay'; for(let i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))%100000000; return String(10000000+h).slice(0,8); }

  let S = null;

  function overlay(){
    let o=document.getElementById('pay-overlay');
    if(o) return o;
    o=document.createElement('div'); o.className='pay-overlay'; o.id='pay-overlay';
    document.body.appendChild(o); return o;
  }
  function close(){ const o=document.getElementById('pay-overlay'); if(o) o.classList.remove('show'); document.body.style.overflow=''; }

  function open(opts){
    S = { opts, amountType:'deposit' };  // deposit | full
    const o=overlay();
    o.innerHTML = shell(opts);
    o.classList.add('show');
    document.body.style.overflow='hidden';
    renderChoose();
    o.querySelector('#pay-x').onclick=close;
  }

  function shell(opts){
    const b=opts.booking||{};
    return `
      <div class="pay-modal">
        <div class="pay-head">
          <h3>Payment</h3>
          <button class="pay-x" id="pay-x" title="Close">✕</button>
        </div>
        <div class="pay-body">
          <div class="pay-sum">
            <div class="veh">${esc(b.vehicle||'')}</div>
            ${b.dates?`<div class="row"><span>Dates</span><span>${esc(b.dates)}</span></div>`:''}
            <div class="row"><span>Rental total</span><b>${money(opts.total)}</b></div>
            <div class="row"><span>${PAY_CONFIG.depositLabel} deposit${PAY_CONFIG.depositType==='hold'?' (hold)':''}</span><b>${money(opts.deposit)}</b></div>
          </div>
          <div id="pay-stage"></div>
        </div>
      </div>`;
  }

  function amountNow(){ return S.amountType==='deposit' ? S.opts.deposit : S.opts.total; }
  function isHoldNow(){ return S.amountType==='deposit' && PAY_CONFIG.depositType==='hold'; }

  // ---------- stage 1: choose amount + method ----------
  function renderChoose(){
    const o=document.getElementById('pay-overlay');
    const dep=S.opts.deposit, full=S.opts.total;
    o.querySelector('#pay-stage').innerHTML = `
      <div class="pay-amt-toggle">
        <button class="pay-amt ${S.amountType==='deposit'?'on':''}" data-amt="deposit">
          <span class="lbl">Deposit (${PAY_CONFIG.depositLabel}${PAY_CONFIG.depositType==='hold'?' hold':''})</span><span class="val">${money(dep)}</span></button>
        <button class="pay-amt ${S.amountType==='full'?'on':''}" data-amt="full">
          <span class="lbl">Pay in full</span><span class="val">${money(full)}</span></button>
      </div>
      <div class="pay-methods">
        <button class="pay-method" data-method="card">
          <span class="ic">💳</span>
          <span><span class="m-title">${isHoldNow()?'Authorize card (hold)':'Pay now by card'}</span><span class="m-sub">${isHoldNow()
              ? `Secure card window — place a <b id="m-amt">${money(amountNow())}</b> hold, captured at pickup`
              : `Secure card window — pay your ${S.amountType==='deposit'?'deposit':'balance'} of <b id="m-amt">${money(amountNow())}</b> online`}</span></span>
        </button>
        <button class="pay-method" data-method="link">
          <span class="ic">📲</span>
          <span><span class="m-title">Send me a secure pay-link</span><span class="m-sub">We text a payment link to ${esc(S.opts.booking&&S.opts.booking.phone||'your phone')}</span></span>
        </button>
        <button class="pay-method" data-method="person">
          <span class="ic">🏢</span>
          <span><span class="m-title">Pay in person at pickup</span><span class="m-sub">Reserve now, pay when you collect the vehicle</span></span>
        </button>
      </div>`;
    o.querySelectorAll('.pay-amt').forEach(btn=>btn.onclick=()=>{
      S.amountType=btn.dataset.amt; renderChoose();
    });
    o.querySelectorAll('.pay-method').forEach(btn=>btn.onclick=()=>{
      const m=btn.dataset.method;
      if(m==='card') renderCard();
      else if(m==='link') completeLink();
      else completePerson();
    });
  }

  // ---------- stage 2: Converge-style card window ----------
  function renderCard(){
    const o=document.getElementById('pay-overlay');
    o.querySelector('#pay-stage').innerHTML = `
      <div class="pay-card">
        <div class="pc-brandbar">
          <span class="sec">🔒 Secure payment</span>
          <span class="pwr">Powered by Elavon Converge</span>
        </div>
        <div class="pc-fields">
          <div class="pc-field">
            <label>Card number</label>
            <input id="pc-num" inputmode="numeric" autocomplete="cc-number" placeholder="1234 5678 9012 3456" maxlength="23">
            <div class="pc-brands" style="margin-top:8px">
              <span class="pc-visa" data-b="visa">VISA</span>
              <span class="pc-mc" data-b="mc">MC</span>
              <span class="pc-amex" data-b="amex">AMEX</span>
              <span class="pc-disc" data-b="disc">DISC</span>
            </div>
          </div>
          <div class="pc-row">
            <div class="pc-field"><label>Expiry (MM/YY)</label><input id="pc-exp" inputmode="numeric" placeholder="MM/YY" maxlength="5"></div>
            <div class="pc-field"><label>CVV</label><input id="pc-cvv" inputmode="numeric" placeholder="123" maxlength="4"></div>
            <div class="pc-field"><label>ZIP</label><input id="pc-zip" inputmode="numeric" placeholder="60634" maxlength="10"></div>
          </div>
          <div class="pc-field"><label>Name on card</label><input id="pc-name" placeholder="Full name" value="${esc(S.opts.booking&&S.opts.booking.name||'')}"></div>
          <button class="btn btn-gold btn-block pay-btn" id="pc-pay">${isHoldNow()?('Authorize '+money(amountNow())+' hold'):('Pay '+money(amountNow()))}</button>
          <div class="pay-err" id="pc-err"></div>
          <div class="pay-note"><span>🔒</span><span>Your card details are entered in a secure window and are never stored on our servers. ${PAY_CONFIG.depositType==='hold'&&S.amountType==='deposit'?'A hold is placed now and captured at pickup.':'Your card is charged now.'}</span></div>
          ${PAY_CONFIG.mode==='demo'?`<div class="pay-demo-hint">Demo mode — use test card <code>4111 1111 1111 1111</code>, any future expiry &amp; any CVV. (Card <code>4000 0000 0000 0002</code> simulates a decline.)</div>`:''}
        </div>
        <button class="pay-back" id="pc-back">← Back to payment options</button>
      </div>`;

    const num=o.querySelector('#pc-num'), exp=o.querySelector('#pc-exp'), err=o.querySelector('#pc-err');
    num.addEventListener('input',()=>{
      const d=digits(num.value).slice(0,19);
      num.value=d.replace(/(.{4})/g,'$1 ').trim();
      const b=brandOf(d);
      o.querySelectorAll('.pc-brands span').forEach(s=>s.classList.toggle('on', s.dataset.b===b));
    });
    exp.addEventListener('input',()=>{
      let d=digits(exp.value).slice(0,4);
      if(d.length>=3) d=d.slice(0,2)+'/'+d.slice(2);
      exp.value=d;
    });
    o.querySelector('#pc-back').onclick=renderChoose;
    o.querySelector('#pc-pay').onclick=()=>{
      err.style.display='none';
      if(PAY_CONFIG.mode==='live'){ return payLive(err); }
      // demo validation
      const d=digits(num.value);
      const [mm,yy]=(exp.value||'').split('/');
      const cvv=digits(o.querySelector('#pc-cvv').value);
      if(d.length<15 || !luhn(d)){ return fail(err,'Please enter a valid card number.'); }
      if(!mm||!yy||+mm<1||+mm>12){ return fail(err,'Please enter a valid expiry date.'); }
      const exeed=new Date(2000+ +yy, +mm, 1) <= new Date(); if(exeed){ return fail(err,'That card has expired.'); }
      if(cvv.length<3){ return fail(err,'Please enter the CVV.'); }
      if(d==='4000000000000002'){ return fail(err,'Card declined by issuer. Please try another card.'); }
      // simulate approval
      const brand=brandOf(d), last4=d.slice(-4);
      completeCard({ brand, last4 });
    };
  }
  function fail(err,msg){ err.textContent=msg; err.style.display='block'; }

  // LIVE: real Converge Checkout.js flow (runs on real hosting with a backend)
  function payLive(err){
    function launch(){
      const b=S.opts.booking||{};
      fetch(PAY_CONFIG.tokenEndpoint, {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          amount: amountNow(),
          transactionType: (S.amountType==='deposit' && PAY_CONFIG.depositType==='hold') ? 'ccauthonly' : 'ccsale',
          ref: b.ref, email: b.email
        })
      }).then(r=>r.json()).then(data=>{
        if(!data || !data.ssl_txn_auth_token){ return fail(err,'Could not start secure payment. Please try again.'); }
        window.ConvergeEmbeddedPayment.pay({ ssl_txn_auth_token: data.ssl_txn_auth_token }, {
          onError:()=>fail(err,'Payment error. Please try again.'),
          onCancelled:()=>{},
          onDeclined:(res)=>fail(err,'Card declined ('+(res.ssl_result_message||'')+').'),
          onApproval:(res)=>completeCard({ brand:(res.ssl_card_short_description||'').toLowerCase(), last4:(res.ssl_card_number||'').slice(-4), txnId:res.ssl_txn_id })
        });
      }).catch(()=>fail(err,'Network error starting payment.'));
    }
    if(window.ConvergeEmbeddedPayment) return launch();
    const s=document.createElement('script'); s.src=PAY_CONFIG.checkoutJs; s.onload=launch;
    s.onerror=()=>fail(err,'Could not load the secure payment library.'); document.head.appendChild(s);
  }

  // ---------- completion ----------
  function completeCard(card){
    const isHold = (S.amountType==='deposit' && PAY_CONFIG.depositType==='hold');
    finish({
      method:'card',
      amountType:S.amountType,
      amount:amountNow(),
      status: isHold ? 'authorized' : 'paid',
      brand:card.brand||'', last4:card.last4||'', txnId:card.txnId||('DEMO-'+refCode((card.last4||'')+S.opts.booking.ref)),
      capturedAt: new Date().toISOString()
    }, successCardHTML(isHold));
  }
  function completeLink(){
    finish({
      method:'paylink', amountType:S.amountType, amount:amountNow(),
      status:'link_sent', sentTo:(S.opts.booking&&S.opts.booking.phone)||'', at:new Date().toISOString()
    }, `<div class="pay-success"><div class="chk">📲</div><h4>Pay-link sent</h4>
        <p>A secure payment link for ${money(amountNow())} has been texted to ${esc((S.opts.booking&&S.opts.booking.phone)||'your phone')}. Your reservation is held.</p></div>`);
  }
  function completePerson(){
    finish({
      method:'in_person', amountType:S.amountType, amount:0, dueAtPickup:amountNow(),
      status:'due_at_pickup', at:new Date().toISOString()
    }, `<div class="pay-success"><div class="chk">🏢</div><h4>Reserved — pay at pickup</h4>
        <p>No payment taken now. Please bring your card; ${money(amountNow())} (${S.amountType==='deposit'?'deposit':'full amount'}) is due when you collect the vehicle.</p></div>`);
  }
  function successCardHTML(isHold){
    return `<div class="pay-success"><div class="chk">✓</div>
      <h4>${isHold?'Card authorized':'Payment approved'}</h4>
      <p>${isHold?'A hold for':'We charged'} ${money(amountNow())} ${isHold?'has been placed on your card. It will be captured at pickup.':'to your card.'}</p></div>`;
  }

  function finish(payment, successHTML){
    const o=document.getElementById('pay-overlay');
    o.querySelector('#pay-stage').innerHTML = successHTML +
      `<button class="btn btn-gold btn-block" id="pay-done" style="margin-top:8px">Continue</button>`;
    o.querySelector('#pay-done').onclick=()=>{
      close();
      if(typeof S.opts.onComplete==='function') S.opts.onComplete(payment);
    };
  }

  // Short label for admin / account displays
  function label(payment){
    if(!payment) return 'No payment';
    const amt=money(payment.amount||payment.dueAtPickup||0);
    switch(payment.method){
      case 'card': return (payment.status==='authorized'?'Card hold ':'Paid ')+amt+(payment.last4?(' ·••'+payment.last4):'');
      case 'paylink': return 'Pay-link sent ('+amt+')';
      case 'in_person': return 'Pay at pickup ('+money(payment.dueAtPickup||0)+')';
      default: return amt;
    }
  }

  window.Pay = { open, close, label };
})();
