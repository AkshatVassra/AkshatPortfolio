# Deploying this project to Cloudflare via Cloudflare Pages

Prerequisites:
- A Cloudflare account
- A GitHub repo connected to this project

Steps:

1. Create a Cloudflare API token:
   - Go to the Cloudflare dashboard → My Profile → API Tokens → Create Token.
   - Use a token with these permissions:
     - Account:Cloudflare Pages (Edit)
     - Account:Account Settings (Read)
   - Save the token.

2. Add GitHub secrets to your repository (Settings → Secrets & variables → Actions):
   - `CF_API_TOKEN` = the API token you created
   - `CF_ACCOUNT_ID` = your Cloudflare account ID (found on the Cloudflare dashboard)

3. Push to `main` (or run the workflow manually):
   - The workflow at `.github/workflows/deploy-cloudflare-worker.yml` runs on push to `main`.

4. Optional: deploy from your machine:

```powershell
npm run build
npx wrangler@3 pages deploy dist/client --project-name=akshatxportfolio
```

Notes:
- The workflow deploys the built `dist/client` directory as a Cloudflare Pages project.
- The project name is `akshatxportfolio` (matching `wrangler.jsonc`).
