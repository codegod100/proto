import { resolveFromIdentity } from "@atcute/oauth-browser-client";
import { OAuthUserAgent, getSession } from "@atcute/oauth-browser-client";
import Lookup from "../islands/Lookup.tsx";
export default async function () {
  const publicUrl = Deno.env.get("PUBLIC_URL");
  // console.log({ publicUrl });
  const url = publicUrl || `http://127.0.0.1:${Deno.env.get("PORT")}`;
  return <Lookup publicUrl={publicUrl} url={url} />;
}
