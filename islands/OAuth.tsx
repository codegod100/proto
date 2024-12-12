import {
  configureOAuth,
  createAuthorizationUrl,
  finalizeAuthorization,
  OAuthUserAgent,
  resolveFromIdentity,
} from "@atcute/oauth-browser-client";
import { IS_BROWSER } from "$fresh/runtime.ts";
async function authorize(handle: string) {
  const { identity, metadata } = await resolveFromIdentity(handle);
  const authUrl = await createAuthorizationUrl({
    metadata: metadata,
    identity: identity,
    scope: "atproto transition:generic",
  });
  console.log({ authUrl });
  location.href = authUrl.toString();
}

export default function OAuth({ handle, publicUrl, url }) {
  localStorage["handle"] = handle;
  const enc = encodeURIComponent;
  //   const publicUrl = Deno.env.get("PUBLIC_URL");
  //   const url = publicUrl || `http://127.0.0.1:${Deno.env.get("PORT")}`;
  if (!IS_BROWSER) return;
  configureOAuth({
    metadata: {
      client_id: publicUrl
        ? `${url}/client-metadata.json`
        : `http://localhost?redirect_uri=${
          enc(
            `${url}/oauth/callback`,
          )
        }&scope=${enc("atproto transition:generic")}`,
      redirect_uri: `${url}/oauth/callback`,
    },
  });
  authorize(handle);
  return <div>test</div>;
  //   return <a href={authUrl}>{authUrl}</a>;
}
