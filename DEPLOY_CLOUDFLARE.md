# Deploying this project to Cloudflare Pages

Prerequisites:
- A Cloudflare account
- A GitHub repo connected to this project

Steps:

1. Create a Cloudflare API token:
   - Go to the Cloudflare dashboard → My Profile → API Tokens → Create Token.
   - Use the "Edit Cloudflare Pages" template or grant these permissions:
     - Account:Pages (Edit)
     - Account:Account Settings (Read)
   - Save the token.

2. Add GitHub secrets to your repository (Settings → Secrets & variables → Actions):
   - `CF_API_TOKEN` = the API token you created
   - `CF_ACCOUNT_ID` = your Cloudflare account ID (found on the Cloudflare dashboard)

3. Push to `main` (or run the workflow manually):
   - The workflow at `.github/workflows/deploy-cloudflare-pages.yml` runs on push to `main`.

4. Optional: deploy from your machine:

```powershell
npm run deploy:cloudflare
```

Notes:
- The workflow uses `npx wrangler pages publish ./dist --project-name akshatxportfolio`.
- Ensure the build output is `dist` (Vite default); change `pages_build_output_dir` in `wrangler.jsonc` if needed.
