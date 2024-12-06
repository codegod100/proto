import { resolveFromIdentity } from "@atcute/oauth-browser-client";
import { XRPC } from "@atcute/client";
import {
  OAuthUserAgent,
  getSession,
  configureOAuth,
} from "@atcute/oauth-browser-client";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";

async function lookup(didSignal) {
  const did = localStorage["did"];
  const { identity, metadata } = await resolveFromIdentity(did);
  console.log({ identity });
  const session = await getSession(identity.id, {
    allowStale: true,
  });
  console.log({ session });
  const agent = new OAuthUserAgent(session);
  const rpc = new XRPC({ handler: agent });
  const { data } = await rpc.get("com.atproto.identity.resolveHandle", {
    params: {
      handle: "mary.my.id",
    },
  });
  console.log({ data });
  didSignal.value = data.did;
}

export default function ({ url, publicUrl }) {
  if (!IS_BROWSER) return;
  const did = useSignal("...loading...");
  const enc = encodeURIComponent;
  configureOAuth({
    metadata: {
      client_id: publicUrl
        ? `${url}/client-metadata.json`
        : `http://localhost?redirect_uri=${enc(
            `${url}/oauth/callback`,
          )}&scope=${enc("atproto transition:generic")}`,
      redirect_uri: `${url}/oauth/callback`,
    },
  });
  lookup(did);
  return <div>{did}</div>;
}
