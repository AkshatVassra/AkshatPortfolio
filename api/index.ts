export const config = {
  runtime: "edge",
};

let serverPromise: Promise<any> | undefined;

async function getServer() {
  if (!serverPromise) {
    serverPromise = import(new URL("../dist/client/server/server.js", import.meta.url));
  }
  return serverPromise;
}

export default async function handler(request: Request) {
  const serverModule = await getServer();
  const response = await serverModule.default.fetch(request);
  return response;
}
