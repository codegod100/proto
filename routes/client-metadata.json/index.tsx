import { createClient } from "../../lib/auth/client.ts";

export const handler = {
  async GET(_req, ctx) {
    const resp = await ctx.render();
    resp.headers.set("Content-Type", "application/json");
    return resp;
  },
};
export default async function ClientMetadata() {
  const oauthClient = await createClient();
  return new Response(JSON.stringify(oauthClient.clientMetadata));
}
