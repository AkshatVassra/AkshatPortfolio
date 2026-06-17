# Deploying this project as a Cloudflare Worker (with Assets)

This deploys the built project as a Cloudflare Worker that serves static client assets and handles SSR (Server-Side Rendering).

Requirements:
- Cloudflare account and `CF_ACCOUNT_ID`
- Cloudflare API token with `Account.Workers` (Edit) permission
- GitHub repo with Actions enabled

Setup:
1. Add GitHub secrets in repository Settings → Secrets & variables → Actions:
   - `CF_API_TOKEN` — Cloudflare API token
   - `CF_ACCOUNT_ID` — Cloudflare account ID

2. Push to `main` or run the `Deploy to Cloudflare Worker` workflow manually.

What the workflow does:
- Runs `npm ci` and `npm run build`.
- Runs `npx wrangler deploy` to publish the worker and the associated static assets.

Local deploy (optional):

```powershell
npm run build
npx wrangler deploy
```

Notes:
- The build outputs client assets to `dist/client/` and server functions to `dist/server/`.
- The `wrangler.jsonc` config at the project root maps the entry point `src/server.ts` and the static assets directory `dist/client`.
- During the Vite build, `@cloudflare/vite-plugin` compiles the code and generates the final configuration that Wrangler uses.
