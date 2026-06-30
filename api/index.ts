export const config = {
  runtime: "nodejs",
};

import serverModule from "../dist/server/index.js";

const server = serverModule.default ?? serverModule;

export default async function handler(request: Request) {
  const response = await server.fetch(request);
  return response;
}
