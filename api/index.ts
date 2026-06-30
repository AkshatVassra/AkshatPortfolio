export const config = {
  runtime: "nodejs",
};

import serverModule from "../dist/server/index.js";

const server = serverModule.default ?? serverModule;

export default async function handler(req: any, res: any) {
  // If Vercel passed a Web Request natively:
  if (req instanceof Request) {
    return server.fetch(req);
  }

  // Otherwise, it's a Node.js IncomingMessage (VercelRequest)
  // 1. Construct absolute URL
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const url = new URL(req.url || '/', `${protocol}://${host}`);

  // 2. Construct Web Headers
  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (Array.isArray(value)) {
      value.forEach(v => headers.append(key, v));
    } else if (value) {
      headers.set(key, value as string);
    }
  }

  // 3. Construct Web Request
  const init: RequestInit = {
    method: req.method,
    headers,
  };

  // Only attach body if it's not GET/HEAD
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    if (req.body) {
      // Vercel sometimes parses body already. We need to convert it back to a stream or string.
      init.body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    } else {
      // Stream the body if it hasn't been parsed
      const chunks: Buffer[] = [];
      for await (const chunk of req) {
        chunks.push(chunk);
      }
      if (chunks.length > 0) {
        init.body = Buffer.concat(chunks);
      }
    }
  }

  const webRequest = new Request(url.toString(), init);

  // 4. Call TanStack SSR Server
  const response = await server.fetch(webRequest);

  // 5. Send Response back to Node.js res
  res.statusCode = response.status;
  response.headers.forEach((value: string, key: string) => {
    res.setHeader(key, value);
  });

  if (response.body) {
    const reader = response.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(value);
    }
    res.end();
  } else {
    res.end();
  }
}
