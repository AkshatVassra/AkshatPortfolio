# Deploying this project as a standalone Cloudflare Worker

This deploys the built static `dist` folder as a Worker that serves your static site.

Requirements:
- Cloudflare account and `CF_ACCOUNT_ID`
- Cloudflare API token with `Account.Workers` (Edit) and `Account. Workers KV` if using KV (not required here)
- GitHub repo with Actions enabled

Setup:
1. Add GitHub secrets in repository Settings → Secrets & variables → Actions:
   - `CF_API_TOKEN` — Cloudflare API token
   - `CF_ACCOUNT_ID` — Cloudflare account ID

2. Push to `main` or run the `Deploy to Cloudflare Worker` workflow manually.

What the workflow does:
- Runs `npm ci` and `npm run build`.
- Runs `npx wrangler publish ./dist --name akshatxportfolio-worker --account-id $CF_ACCOUNT_ID` to publish the worker along with static assets.

Local deploy (optional):

```powershell
npm run build
npx wrangler@3 publish ./dist --name akshatxportfolio-worker --account-id <YOUR_ACCOUNT_ID>
```

Notes:
- The worker name is `akshatxportfolio-worker` — change it in `.github/workflows/deploy-cloudflare-worker.yml` if you prefer a different name.
- If you need custom Worker code (e.g., request routing), we can add a `worker/` source with `wrangler.toml` and a JS/TS entrypoint.
