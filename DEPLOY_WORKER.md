# Deploying this project as a Cloudflare Pages project

This deploys the built `dist/client` folder as a Cloudflare Pages project with SSR support.

Requirements:
- Cloudflare account and `CF_ACCOUNT_ID`
- Cloudflare API token with `Account.Cloudflare Pages` (Edit) permission
- GitHub repo with Actions enabled

Setup:
1. Add GitHub secrets in repository Settings → Secrets & variables → Actions:
   - `CF_API_TOKEN` — Cloudflare API token
   - `CF_ACCOUNT_ID` — Cloudflare account ID

2. Push to `main` or run the `Deploy to Cloudflare Worker` workflow manually.

What the workflow does:
- Runs `npm ci` and `npm run build`.
- Runs `npx wrangler@3 pages deploy dist/client --project-name=akshatxportfolio` to deploy the pages project.

Local deploy (optional):

```powershell
npm run build
npx wrangler@3 pages deploy dist/client --project-name=akshatxportfolio
```

Notes:
- The build outputs client assets to `dist/client/` and server functions to `dist/server/`.
- The `wrangler.jsonc` config at the project root sets `pages_build_output_dir: "dist"`.
