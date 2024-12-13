import {
  configureOAuth,
  finalizeAuthorization,
} from "@atcute/oauth-browser-client";
import { IS_BROWSER } from "$fresh/runtime.ts";

async function authorize(params) {
  console.log({ params });
  console.log("finalizing authorization");
  const session = await finalizeAuthorization(params);
  console.log({ session });
  const headers = new Headers();

  await fetch("/store", {
    method: "POST",
    headers,
    body: JSON.stringify(session),
  });
  globalThis.window.location.href = "/";
}

export default function ({ publicUrl, url }) {
  const enc = encodeURIComponent;
  if (IS_BROWSER) {
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
    console.log(location.hash.slice(1));
    const params = new URLSearchParams(location.hash.slice(1));
    authorize(params);
  }
  return <div>Processing...</div>;
}
