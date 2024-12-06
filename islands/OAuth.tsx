import {
  OAuthUserAgent,
  finalizeAuthorization,
  configureOAuth,
  createAuthorizationUrl,
  resolveFromIdentity,
} from "@atcute/oauth-browser-client";
import { IS_BROWSER } from "$fresh/runtime.ts";
async function authorize(did) {
  const { identity, metadata } = await resolveFromIdentity(did);
  const authUrl = await createAuthorizationUrl({
    metadata: metadata,
    identity: identity,
    scope: "atproto transition:generic",
  });
  console.log({ authUrl });
  location.href = authUrl.toString();
}

export default function OAuth({ did, publicUrl, url }) {
  localStorage["did"] = did;
  const enc = encodeURIComponent;
  //   const publicUrl = Deno.env.get("PUBLIC_URL");
  //   const url = publicUrl || `http://127.0.0.1:${Deno.env.get("PORT")}`;
  if (!IS_BROWSER) return;
  configureOAuth({
    metadata: {
      client_id: publicUrl
        ? `${url}/client-metadata.json`
        : `http://localhost?redirect_uri=${enc(
            `${url}/oauth/callback`
          )}&scope=${enc("atproto transition:generic")}`,
      redirect_uri: `${url}/oauth/callback`,
    },
  });
  authorize(did);
  return <div>test</div>;
  //   return <a href={authUrl}>{authUrl}</a>;
}
