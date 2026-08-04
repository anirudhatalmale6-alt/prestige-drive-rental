# Prime Deals Rental — Converge (Elavon) Payments

This folder is the small secure backend that powers **live** card payments. The
website itself stays static; this server is the only place your Converge
credentials live.

## Why a backend is required
Elavon Converge (and every real card gateway) requires your merchant credentials
to sit **server-side**. The browser must never see your Merchant ID / User ID /
PIN. So the flow is:

```
Customer signs agreement
      │
      ▼
Browser (pay.js)  ──POST amount+type──►  This server  ──►  Converge
      │                                        │
      │   ◄──── ssl_txn_auth_token ────────────┘
      ▼
Converge Checkout.js Lightbox opens with the token
      │
      ▼
Card entered in Converge's secure window → approved → booking marked paid
```

Your card data goes straight from the customer to Converge's PCI-compliant
window — it never touches our server or the website. 

## What you need from your Converge account
When you're ready to go live, send me these three values (I'll put them in the
server's `.env`, never in the site):

- **Merchant ID** (`ssl_merchant_id`) — your Converge Account ID
- **User ID** (`ssl_user_id`) — a hosted-payments / API user on your account
- **PIN** (`ssl_pin`) — that user's PIN / API key

(These come from Converge → **Terminal set-up / User management**. If you're not
sure where to find them, your Elavon rep can point you to the hosted-payments
API user; I can walk you through it too.)

## Deposit: charge now vs hold at pickup
In `pay.js`, `PAY_CONFIG.depositType` controls the deposit behaviour:
- `'charge'` — the 25% deposit is charged immediately (`ccsale`).
- `'hold'`   — a hold/authorization is placed now (`ccauthonly`) and captured at
  pickup via `/api/converge/capture` (`cccomplete`).

Full-payment and paying the balance always use `ccsale`.

## Run it
```bash
cd converge
cp .env.example .env      # then fill in your credentials
npm install express cors dotenv node-fetch@2
node server.js
```
Deploy anywhere that runs Node (Render, Railway, Fly, a small VPS, Firebase
Functions...). Then in `pay.js`:
```js
window.PAY_CONFIG = {
  mode: 'live',
  depositType: 'charge',                    // or 'hold'
  tokenEndpoint: 'https://YOUR-BACKEND/api/converge/token',
  checkoutJs: 'https://api.convergepay.com/hosted-payments/Checkout.js'
};
```

## Endpoints
- `POST /api/converge/token` → `{ ssl_txn_auth_token }` — starts a secure payment.
- `POST /api/converge/capture` → captures a prior `ccauthonly` hold (deposit-at-pickup only).

Until credentials + hosting are in place, the site runs in **demo mode** with a
Converge-styled card window so the full flow is clickable end to end.
