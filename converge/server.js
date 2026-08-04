/*
 * Prime Deals Rental — Converge (Elavon) payment backend (reference)
 * -----------------------------------------------------------------
 * This tiny server is what powers LIVE card payments. The static site never
 * sees your Converge credentials — the browser calls THIS endpoint, this server
 * asks Converge for a one-time session token, and the Converge Checkout.js
 * Lightbox in the browser uses that token to take the card securely.
 *
 * Go live in 3 steps:
 *   1. Put your Converge credentials in a .env file (see .env.example).
 *   2. Deploy this (Render, Railway, a small VPS, Firebase Functions, etc.).
 *   3. In pay.js set PAY_CONFIG.mode='live' and PAY_CONFIG.tokenEndpoint to this
 *      server's /api/converge/token URL.
 *
 *   npm install express cors dotenv node-fetch@2
 *   node server.js
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || '*' }));
app.use(express.json());

// Converge endpoints — demo vs production. Set CONVERGE_ENV=production when live.
const HOST = process.env.CONVERGE_ENV === 'production'
  ? 'https://api.convergepay.com'
  : 'https://api.demo.convergepay.com';
const TOKEN_URL = HOST + '/hosted-payments/transaction_token';

/*
 * POST /api/converge/token
 * body: { amount: number, transactionType: 'ccsale'|'ccauthonly', ref: string, email: string }
 * returns: { ssl_txn_auth_token: "..." }
 *
 * transactionType:
 *   ccsale     -> charge the card now (full payment, or capture the deposit now)
 *   ccauthonly -> place a hold/authorization now, capture later at pickup (see /capture)
 */
app.post('/api/converge/token', async (req, res) => {
  try {
    const { amount, transactionType, ref, email } = req.body || {};
    if (!amount || amount <= 0) return res.status(400).json({ error: 'Invalid amount' });

    const params = new URLSearchParams({
      ssl_merchant_id: process.env.CONVERGE_MERCHANT_ID,   // your Converge Account ID
      ssl_user_id:     process.env.CONVERGE_USER_ID,       // an API/hosted-payments user
      ssl_pin:         process.env.CONVERGE_PIN,           // that user's PIN / API key
      ssl_transaction_type: transactionType === 'ccauthonly' ? 'ccauthonly' : 'ccsale',
      ssl_amount: Number(amount).toFixed(2),
      ssl_invoice_number: (ref || '').slice(0, 25),
      ssl_email: email || '',
      ssl_get_token: 'Y',
      ssl_add_token: 'N'
    });

    const r = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    });
    const token = (await r.text()).trim();

    // Converge returns the raw token string on success, or an "Error..." message.
    if (!token || /error/i.test(token)) {
      console.error('Converge token error:', token);
      return res.status(502).json({ error: 'Converge token request failed', detail: token });
    }
    res.json({ ssl_txn_auth_token: token });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

/*
 * POST /api/converge/capture   (only needed if you use ccauthonly / deposit holds)
 * body: { ssl_txn_id: string, amount: number }
 * Captures a previously authorized hold at pickup.
 */
app.post('/api/converge/capture', async (req, res) => {
  try {
    const { ssl_txn_id, amount } = req.body || {};
    const params = new URLSearchParams({
      ssl_merchant_id: process.env.CONVERGE_MERCHANT_ID,
      ssl_user_id:     process.env.CONVERGE_USER_ID,
      ssl_pin:         process.env.CONVERGE_PIN,
      ssl_transaction_type: 'cccomplete',
      ssl_txn_id,
      ssl_amount: Number(amount).toFixed(2)
    });
    const r = await fetch(HOST + '/hosted-payments/process.do', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    });
    res.type('text').send(await r.text());
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log('Converge payment backend on :' + PORT + ' (' + HOST + ')'));
