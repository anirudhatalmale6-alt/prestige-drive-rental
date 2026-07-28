/* ---------- Shared helpers ---------- */
function money(n){ return "$" + n.toLocaleString("en-US"); }

/* Elegant SVG placeholder — stylised car on a gradient. Client's real photos replace these. */
function carSVG(car, opts){
  opts = opts || {};
  const a = car.accent || "#1c1f26";
  const gid = "g_" + car.id + (opts.suffix||"");
  const isSUV = /SUV|Escalade|Terrain|Bentayga|CX-90|GLC|X6/i.test(car.className + car.model);
  // two body silhouettes
  const body = isSUV
    ? `<path d="M70 250 q10 -70 70 -80 q40 -34 120 -34 q90 0 130 40 q60 6 96 34 q40 6 44 40 l0 40 l-560 0 l0 -40 q0 -30 20 -40 z" fill="url(#${gid})"/>`
    : `<path d="M60 258 q14 -46 78 -58 q60 -60 150 -60 q96 0 150 58 q78 10 96 60 q26 6 26 40 l0 22 l-546 0 l0 -22 q0 -30 46 -40 z" fill="url(#${gid})"/>`;
  const roofLine = isSUV
    ? `<path d="M150 175 q40 -30 110 -30 q80 0 118 34" fill="none" stroke="rgba(255,255,255,.10)" stroke-width="2"/>`
    : `<path d="M150 200 q54 -56 138 -56 q86 0 138 56" fill="none" stroke="rgba(255,255,255,.10)" stroke-width="2"/>`;
  return `
  <svg viewBox="0 0 600 360" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${lighten(a,26)}"/>
        <stop offset="1" stop-color="${a}"/>
      </linearGradient>
      <radialGradient id="bg_${gid}" cx="50%" cy="30%" r="80%">
        <stop offset="0" stop-color="${lighten(a,14)}"/>
        <stop offset="1" stop-color="${darken(a,10)}"/>
      </radialGradient>
    </defs>
    <rect width="600" height="360" fill="url(#bg_${gid})"/>
    <circle cx="300" cy="150" r="150" fill="rgba(201,162,75,.05)"/>
    ${roofLine}
    ${body}
    <ellipse cx="180" cy="298" rx="46" ry="46" fill="#0c0d0f"/>
    <ellipse cx="180" cy="298" rx="26" ry="26" fill="${lighten(a,8)}"/>
    <ellipse cx="180" cy="298" rx="10" ry="10" fill="#c9a24b" opacity=".5"/>
    <ellipse cx="420" cy="298" rx="46" ry="46" fill="#0c0d0f"/>
    <ellipse cx="420" cy="298" rx="26" ry="26" fill="${lighten(a,8)}"/>
    <ellipse cx="420" cy="298" rx="10" ry="10" fill="#c9a24b" opacity=".5"/>
    <rect x="470" y="222" width="34" height="16" rx="4" fill="rgba(201,162,75,.55)"/>
    <text x="300" y="70" text-anchor="middle" fill="rgba(255,255,255,.9)" font-family="Cormorant Garamond, serif" font-size="30" font-weight="700">${car.make}</text>
    <text x="300" y="100" text-anchor="middle" fill="rgba(201,162,75,.9)" font-family="Inter, sans-serif" font-size="15" letter-spacing="3">${(car.model+" · "+car.year).toUpperCase()}</text>
  </svg>`;
}
/* Returns a real photo when the car has one, otherwise the SVG placeholder. */
function carMedia(car, opts){
  opts = opts || {};
  if(car.photo) return `<img class="car-img" src="${car.photo}" alt="${car.make} ${car.model}" loading="lazy">`;
  return carSVG(car, opts);
}
function hexToRgb(h){h=h.replace('#','');return [parseInt(h.substr(0,2),16),parseInt(h.substr(2,2),16),parseInt(h.substr(4,2),16)];}
function clamp(v){return Math.max(0,Math.min(255,v));}
function lighten(h,amt){const[r,g,b]=hexToRgb(h);return `rgb(${clamp(r+amt)},${clamp(g+amt)},${clamp(b+amt)})`;}
function darken(h,amt){return lighten(h,-amt);}

/* ---------- Availability logic ---------- */
function overlaps(aStart,aEnd,bStart,bEnd){ return aStart <= bEnd && bStart <= aEnd; }
function isBookedBetween(car, start, end){
  return (car.booked||[]).some(([bs,be]) => overlaps(start,end,bs,be));
}
function daysBetween(start,end){
  const ms = new Date(end) - new Date(start);
  return Math.max(1, Math.round(ms/86400000));
}

/* ---------- Mobile menu ---------- */
function initMenu(){
  const t = document.querySelector('.menu-toggle');
  const l = document.querySelector('.nav-links');
  if(t&&l) t.addEventListener('click',()=>l.classList.toggle('open'));
}

/* ---------- Homepage rendering ---------- */
function renderFleet(filter){
  const grid = document.getElementById('fleet-grid');
  if(!grid) return;
  const cars = (filter && filter!=='all')
    ? FLEET.filter(c => catOf(c) === filter)
    : FLEET;
  grid.innerHTML = cars.map(cardHTML).join('');
}
function catOf(c){
  if(/Sedan|Coupe/i.test(c.className)) return 'sedan';
  if(/SUV/i.test(c.className)) return 'suv';
  return 'other';
}
function cardHTML(c){
  const spec = `
    <div class="spec-row">
      <span>👤 ${c.seats} seats</span>
      <span>⚙️ ${c.transmission}</span>
      <span>🚗 ${c.drive}</span>
    </div>`;
  return `
  <a class="card" href="vehicle.html?id=${c.id}">
    <div class="car-photo">
      ${carMedia(c)}
      <div class="badge avail">Available</div>
    </div>
    <div class="card-body">
      <h3>${c.make} ${c.model}</h3>
      <div class="sub">${c.year} · ${c.className}</div>
      ${spec}
      <div class="card-foot">
        <div class="price"><span class="amt">${money(c.price)}</span><span class="per"> / day</span></div>
        <span class="btn btn-gold">View & Book</span>
      </div>
    </div>
  </a>`;
}
function initHome(){
  renderFleet('all');
  document.querySelectorAll('.chip').forEach(chip=>{
    chip.addEventListener('click',()=>{
      document.querySelectorAll('.chip').forEach(x=>x.classList.remove('active'));
      chip.classList.add('active');
      renderFleet(chip.dataset.cat);
    });
  });
}

/* ---------- Vehicle detail rendering ---------- */
function getParam(k){ return new URLSearchParams(location.search).get(k); }
function initDetail(){
  const car = FLEET.find(c => c.id === getParam('id')) || FLEET[0];
  document.title = `${car.make} ${car.model} — Prime Deals Rental`;
  const el = id => document.getElementById(id);
  el('main-photo').innerHTML = carMedia(car,{suffix:'m'});
  if(car.photo){
    el('thumbs').innerHTML = `<div class="thumb">${carMedia(car,{suffix:'t'})}</div>`;
    el('thumbs').style.gridTemplateColumns = 'repeat(4,1fr)';
  } else {
    el('thumbs').innerHTML = [1,2,3,4].map(i=>`<div class="thumb">${carSVG(car,{suffix:'t'+i})}</div>`).join('');
  }
  el('v-class').textContent = car.className;
  el('v-title').textContent = `${car.make} ${car.model}`;
  el('v-lead').textContent = car.desc;
  el('v-specs').innerHTML = [
    ['Year',car.year],['Class',car.className],['Seats',car.seats],
    ['Doors',car.doors],['Transmission',car.transmission],['Drivetrain',car.drive]
  ].map(([k,v])=>`<div class="item"><div class="k">${k}</div><div class="v">${v}</div></div>`).join('');
  el('v-features').innerHTML = car.features.map(f=>`<li>${f}</li>`).join('');
  el('v-price').textContent = money(car.price);

  // booking
  const start = el('pickup'), end = el('return'), out = el('summary'), notice = el('notice');
  const today = new Date().toISOString().split('T')[0];
  start.min = today; end.min = today;
  function recompute(){
    notice.className='notice'; notice.textContent='';
    if(!start.value || !end.value){ out.classList.remove('show'); return; }
    if(new Date(end.value) <= new Date(start.value)){
      out.classList.remove('show');
      notice.className='notice err'; notice.textContent='Return date must be after pickup date.';
      return;
    }
    if(isBookedBetween(car, start.value, end.value)){
      out.classList.remove('show');
      notice.className='notice err';
      notice.textContent='Sorry — this vehicle is already booked for part of those dates. Please try different dates.';
      return;
    }
    const days = daysBetween(start.value, end.value);
    const subtotal = days * car.price;
    const deposit = Math.round(subtotal * 0.25);
    el('s-days').textContent = `${money(car.price)} × ${days} day${days>1?'s':''}`;
    el('s-subtotal').textContent = money(subtotal);
    el('s-deposit').textContent = money(deposit);
    el('s-total').textContent = money(subtotal);
    out.classList.add('show');
    notice.className='notice ok'; notice.textContent='Available for your dates ✓';
  }
  start.addEventListener('change',()=>{ if(start.value) end.min = start.value; recompute(); });
  end.addEventListener('change', recompute);

  el('book-btn').addEventListener('click',()=>{
    if(!start.value || !end.value || !out.classList.contains('show')){
      notice.className='notice err'; notice.textContent='Please choose valid available dates first.';
      return;
    }
    const ref = 'PDR-' + car.id.split('-')[0].toUpperCase().slice(0,3) + '-' + String(1000 + (car.model.length*37 + daysBetween(start.value,end.value)*13)).slice(0,4);
    document.getElementById('m-ref').textContent = ref;
    document.getElementById('m-dates').textContent = `${start.value} → ${end.value}`;
    document.getElementById('modal').classList.add('show');
  });
  document.getElementById('modal-close').addEventListener('click',()=>document.getElementById('modal').classList.remove('show'));
  document.getElementById('modal').addEventListener('click',e=>{ if(e.target.id==='modal') e.currentTarget.classList.remove('show'); });
}

document.addEventListener('DOMContentLoaded',()=>{
  initMenu();
  if(document.getElementById('fleet-grid')) initHome();
  if(document.getElementById('v-title')) initDetail();
});
