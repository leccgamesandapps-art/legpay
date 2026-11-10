# LEGpay

Buy mobile load using GCash — **no website convenience fee**.

## Features (Demo)

- Select network: Globe, TM, Smart, TNT, DITO, GOMO
- Enter mobile number
- Browse Recommended / Regular / Promos / Data
- Pay via GCash (Direct or QR)
- Clean mobile-first UI

## Important Notes

This is a **frontend demo only**.

- No real GCash integration
- No real load delivery
- No backend / payment gateway

To make it production-ready you need:

1. A licensed payment gateway that supports GCash (PayMongo, HitPay, etc.)
2. A load/reseller API (or your own retailer account)
3. Proper webhooks + reconciliation
4. Business registration & compliance

## Deploy

Connect this repo to Vercel and set the project name to `legpay`.

Target domain: **legpay.vercel.app**
