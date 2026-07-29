/* store.js — shared client-side data layer for the Prime Deals Rental demo.
   In the live version this is replaced by a secure server API + database.
   For this interactive preview, data persists in the browser (localStorage),
   so admin changes (vehicles, prices, blocked dates, bookings) reflect on the
   public site within the same browser. */
(function () {
  const KEYS = {
    fleet: 'pdr_fleet_v1',
    bookings: 'pdr_bookings_v1',
    promos: 'pdr_promos_v1',
    auth: 'pdr_auth_v1',
    customers: 'pdr_customers_v1',
    session: 'pdr_customer_session_v1'
  };

  /* Delivery pricing (business rule) */
  const DELIVERY = { radiusMiles: 10, feeUnderMin: 120, freeMinDays: 3 };
  function deliveryFee(days) { return days >= DELIVERY.freeMinDays ? 0 : DELIVERY.feeUnderMin; }

  function read(key, fallback) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
    catch (e) { return fallback; }
  }
  function write(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { console.warn('storage full', e); }
  }

  /* ---- One-time migrations ---- */
  // Clear legacy demo "booked" seed ranges from existing browsers (real bookings
  // live in the bookings store, so vehicle.booked only ever held demo placeholders).
  function migrate() {
    if (localStorage.getItem('pdr_seed_cleared_v1')) return;
    const raw = localStorage.getItem(KEYS.fleet);
    if (raw) {
      try { const f = JSON.parse(raw); f.forEach(v => { v.booked = []; }); write(KEYS.fleet, f); } catch (e) {}
    }
    localStorage.setItem('pdr_seed_cleared_v1', '1');
  }
  migrate();

  /* ---- Fleet ---- */
  function defaultFleet() {
    return (window.FLEET || []).map(c => Object.assign({ available: true, blocks: [], booked: c.booked || [] }, c));
  }
  function getFleet() {
    let f = read(KEYS.fleet, null);
    if (!f) { f = defaultFleet(); write(KEYS.fleet, f); }
    return f;
  }
  function saveFleet(f) { write(KEYS.fleet, f); }
  function resetFleet() { localStorage.removeItem(KEYS.fleet); return getFleet(); }
  function getVehicle(id) { return getFleet().find(v => v.id === id); }
  function upsertVehicle(v) {
    const f = getFleet();
    const i = f.findIndex(x => x.id === v.id);
    if (i >= 0) f[i] = v; else f.push(v);
    saveFleet(f);
  }
  function deleteVehicle(id) { saveFleet(getFleet().filter(v => v.id !== id)); }

  /* ---- Bookings ---- */
  function getBookings() { return read(KEYS.bookings, []); }
  function saveBookings(b) { write(KEYS.bookings, b); }
  function addBooking(bk) { const b = getBookings(); b.unshift(bk); saveBookings(b); return bk; }
  function updateBooking(id, patch) {
    const b = getBookings();
    const i = b.findIndex(x => x.id === id);
    if (i >= 0) { b[i] = Object.assign({}, b[i], patch); saveBookings(b); }
  }

  /* ---- Promo codes ---- */
  function getPromos() { return read(KEYS.promos, []); }
  function savePromos(p) { write(KEYS.promos, p); }
  function findActivePromo(code) {
    if (!code) return null;
    const c = String(code).trim().toUpperCase();
    return getPromos().find(p => p.active && p.code.toUpperCase() === c) || null;
  }
  function applyPromo(promo, subtotal) {
    if (!promo) return 0;
    const d = promo.type === 'percent' ? Math.round(subtotal * promo.value / 100) : Number(promo.value);
    return Math.max(0, Math.min(subtotal, d));
  }

  /* ---- Availability ---- */
  function overlaps(aS, aE, bS, bE) { return aS <= bE && bS <= aE; }
  function rangesFor(vehicle) {
    const ranges = [];
    (vehicle.blocks || []).forEach(b => ranges.push({ s: b.start, e: b.end, reason: b.reason || 'Reserved by owner', type: 'block' }));
    (vehicle.booked || []).forEach(b => {
      if (Array.isArray(b)) ranges.push({ s: b[0], e: b[1], reason: 'Already booked', type: 'booked' });
      else ranges.push({ s: b.start, e: b.end, reason: 'Already booked', type: 'booked' });
    });
    getBookings().filter(bk => bk.vehicleId === vehicle.id && bk.status !== 'cancelled')
      .forEach(bk => ranges.push({ s: bk.start, e: bk.end, reason: 'Already booked', type: 'booked' }));
    return ranges;
  }
  function isUnavailable(vehicle, start, end) {
    if (vehicle.available === false) return { blocked: true, reason: 'This vehicle is currently not available for booking.' };
    const hit = rangesFor(vehicle).find(r => overlaps(start, end, r.s, r.e));
    if (!hit) return { blocked: false };
    return {
      blocked: true,
      reason: hit.type === 'booked'
        ? 'Sorry — this vehicle is already booked for part of those dates. Please try different dates.'
        : 'These dates are unavailable (' + hit.reason + '). Please try different dates.'
    };
  }

  /* ---- Customer accounts (demo) ---- */
  function getCustomers() { return read(KEYS.customers, []); }
  function saveCustomers(c) { write(KEYS.customers, c); }
  function findCustomer(email) {
    if (!email) return null;
    const e = email.trim().toLowerCase();
    return getCustomers().find(c => c.email.toLowerCase() === e) || null;
  }
  function registerCustomer(data) {
    if (findCustomer(data.email)) return { error: 'An account with that email already exists.' };
    const c = {
      id: 'cust-' + (getCustomers().length + 1) + '-' + data.email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, ''),
      name: data.name.trim(), email: data.email.trim(), phone: (data.phone || '').trim(),
      password: data.password, verified: false, createdAt: new Date().toISOString()
    };
    const list = getCustomers(); list.push(c); saveCustomers(list);
    return { customer: c };
  }
  function authCustomer(email, password) {
    const c = findCustomer(email);
    if (!c || c.password !== password) return null;
    return c;
  }
  function startSession(email) { sessionStorage.setItem(KEYS.session, email.trim().toLowerCase()); }
  function endSession() { sessionStorage.removeItem(KEYS.session); }
  function currentCustomer() {
    const e = sessionStorage.getItem(KEYS.session);
    return e ? findCustomer(e) : null;
  }
  function updateCustomer(email, patch) {
    const list = getCustomers();
    const i = list.findIndex(c => c.email.toLowerCase() === email.trim().toLowerCase());
    if (i >= 0) { list[i] = Object.assign({}, list[i], patch); saveCustomers(list); return list[i]; }
    return null;
  }
  function customerBookings(email) {
    if (!email) return [];
    const e = email.trim().toLowerCase();
    return getBookings().filter(b => (b.customer && b.customer.email || '').toLowerCase() === e);
  }
  // Simple id helper (no Math.random here — keep deterministic-ish per customer)
  function nextDriverId(cust) {
    const n = (cust.drivers ? cust.drivers.length : 0) + 1;
    return 'drv-' + n + '-' + (cust.id || 'c');
  }
  // ---- Additional authorized drivers ----
  // Each driver must complete the same ID + selfie verification. Only the
  // primary account holder (the person who books) may pick up / drop off.
  function addDriver(email, driver) {
    const c = findCustomer(email); if (!c) return null;
    const drivers = (c.drivers || []).slice();
    drivers.push(Object.assign({
      id: nextDriverId(c), verified: false, addedAt: new Date().toISOString()
    }, driver));
    return updateCustomer(email, { drivers });
  }
  function updateDriver(email, driverId, patch) {
    const c = findCustomer(email); if (!c) return null;
    const drivers = (c.drivers || []).map(d => d.id === driverId ? Object.assign({}, d, patch) : d);
    return updateCustomer(email, { drivers });
  }
  function removeDriver(email, driverId) {
    const c = findCustomer(email); if (!c) return null;
    const drivers = (c.drivers || []).filter(d => d.id !== driverId);
    return updateCustomer(email, { drivers });
  }
  // Demo 2FA: deterministic 6-digit code from email (no Math.random); real version emails/SMS a code.
  function twoFactorCode(email) {
    let h = 0; const s = (email || '') + 'pdr2fa';
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 1000000;
    return String(100000 + (h % 900000));
  }

  /* ---- Auth (demo only) ---- */
  const DEMO_PASSWORD = 'prime2026';
  function login(pw) { if (pw === DEMO_PASSWORD) { sessionStorage.setItem(KEYS.auth, '1'); return true; } return false; }
  function isAuthed() { return sessionStorage.getItem(KEYS.auth) === '1'; }
  function logout() { sessionStorage.removeItem(KEYS.auth); }

  window.Store = {
    KEYS, read, write,
    getFleet, saveFleet, resetFleet, getVehicle, upsertVehicle, deleteVehicle, defaultFleet,
    getBookings, saveBookings, addBooking, updateBooking,
    getPromos, savePromos, findActivePromo, applyPromo,
    overlaps, rangesFor, isUnavailable,
    login, isAuthed, logout, DEMO_PASSWORD,
    DELIVERY, deliveryFee,
    getCustomers, findCustomer, registerCustomer, authCustomer,
    startSession, endSession, currentCustomer, updateCustomer, customerBookings, twoFactorCode,
    addDriver, updateDriver, removeDriver
  };
})();
