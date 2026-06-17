# Deploying this project to Cloudflare via Cloudflare Workers (with Assets)

Prerequisites:
- A Cloudflare account
- A GitHub repo connected to this project

Steps:

1. Create a Cloudflare API token:
   - Go to the Cloudflare dashboard → My Profile → API Tokens → Create Token.
   - Use a token with these permissions:
     - Account: Workers (Edit)
     - Account: Account Settings (Read)
   - Save the token.

2. Add GitHub secrets to your repository (Settings → Secrets & variables → Actions):
   - `CF_API_TOKEN` = the API token you created
   - `CF_ACCOUNT_ID` = your Cloudflare account ID (found on the Cloudflare dashboard)

3. Push to `main` (or run the workflow manually):
   - The workflow at `.github/workflows/deploy-cloudflare-worker.yml` runs on push to `main`.

4. Optional: deploy from your machine:

```powershell
npm run build
npx wrangler deploy
```

Notes:
- The build outputs client assets to `dist/client/` and server functions to `dist/server/`.
- The `wrangler.jsonc` config at the project root is configured as a Worker with Assets (the modern standard for TanStack Start).
- Wrangler dynamically handles the build configuration and assets directory mapping.
