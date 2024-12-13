import { getSession as _getSession } from "@atcute/oauth-browser-client";

import { FreshContext } from "$fresh/server.ts";
import {
  configureOAuth,
  OAuthUserAgent,
  resolveFromIdentity,
} from "@atcute/oauth-browser-client";
import { XRPC } from "@atcute/client";

export async function getSession(handle: string) {
  const { identity, metadata } = await resolveFromIdentity(handle);
  console.log({ identity, metadata });
  const session = await _getSession(identity.id, {
    allowStale: true,
  });
  return session;
}

export async function checkAuth(form) {
  // form: handle, session, method, params
  const { identity, metadata } = await resolveFromIdentity(form.handle);
  configureOAuth({ metadata });
  const session = form.session;
  const agent = new OAuthUserAgent(session);
  const rpc = new XRPC({ handler: agent });
  const res = await rpc.get(
    form.method,
    form.params,
  ).catch((e) => {
    console.log(e);
    return null;
  });

  console.log({ res });
  if (!res) return false;
  return true;
}
