export const config = {
  runtime: "edge",
};

import serverModule from "../dist/client/server/server.js";

export default async function handler(request: Request) {
  const response = await serverModule.default.fetch(request);
  return response;
}
