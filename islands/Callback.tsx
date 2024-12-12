import { IS_BROWSER } from "$fresh/runtime.ts";
import {
  configureOAuth,
  finalizeAuthorization,
  OAuthUserAgent,
} from "@atcute/oauth-browser-client";

async function authorize(params) {
  const session = await finalizeAuthorization(params);
  console.log({ session });
  const agent = new OAuthUserAgent(session);
  console.log({ agent });
  window.location.href = "/lookup";
}

export default function Callback({ publicUrl, url }) {
  if (!IS_BROWSER) return;
  const enc = encodeURIComponent;
  //   const publicUrl = Deno.env.get("PUBLIC_URL");
  //   const url = publicUrl || `http://127.0.0.1:${Deno.env.get("PORT")}`;
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
  //   console.log({ loc: window.location });

  // console.log({ foo: location.hash.slice(1) });
  const params = new URLSearchParams(location.hash.slice(1));
  authorize(params);
  //   console.log({ session });

  return (
    <div>
      processing...
    </div>
  );
}
