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
    auth: 'pdr_auth_v1'
  };

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
    login, isAuthed, logout, DEMO_PASSWORD
  };
})();
