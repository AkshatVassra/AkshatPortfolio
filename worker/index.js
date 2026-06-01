import { getAssetFromKV } from '@cloudflare/kv-asset-handler'

addEventListener('fetch', event => {
    event.respondWith(handleEvent(event))
})

async function handleEvent(event) {
    try {
        // Try to serve asset from the uploaded `dist` site
        return await getAssetFromKV(event)
    } catch (e) {
        // SPA fallback: serve index.html for navigation requests
        const request = event.request
        if (request.method === 'GET' && request.headers.get('accept') ? .includes('text/html')) {
            const indexReq = new Request(new URL('/index.html', request.url).toString(), request)
            return await getAssetFromKV({ request: indexReq })
        }
        return new Response('Not found', { status: 404 })
    }
}