# Awards voting starter

## Run it
1. Open this folder in VS Code.
2. Copy `.env.example` to `.env.local`, then add your Supabase and Paystack test keys. `500` pesewas is GH₵5.00.
3. In Supabase SQL Editor, run `database.sql`.
4. Run `npm install`, then `npm run dev`.
5. Open `http://localhost:3000`.

## Before going live
- Replace the hard-coded candidate list in `app/vote/page.tsx` with approved `candidates` from Supabase.
- Add Supabase Auth or your school SSO. The current starter accepts an email but does not verify student identity.
- Configure a Paystack webhook, then repeat the verification logic in the webhook. This is more reliable than relying only on the browser callback.
- Enable Mobile Money in the Paystack dashboard to show Ghana's supported networks at checkout. Custom USSD voting requires Paystack approval and its separate USSD integration documentation.
- Never commit `.env.local` or expose `SUPABASE_SERVICE_ROLE_KEY` / `PAYSTACK_SECRET_KEY`.
