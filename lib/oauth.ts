import { createClient } from "../lib/auth/client.ts";

export async function auth(handle: string) {
  const oauthClient = await createClient();
  const url = oauthClient.authorize(handle, {
    scope: "atproto transition:generic",
  });
  return url;
}
