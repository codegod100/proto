import {
  getSession as _getSession,
  OAuthServerAgent,
} from "@atcute/oauth-browser-client";
import { Signal, useSignal } from "@preact/signals";
import { FreshContext } from "$fresh/server.ts";
import {
  configureOAuth,
  OAuthUserAgent,
  resolveFromIdentity,
} from "@atcute/oauth-browser-client";
import { XRPC } from "@atcute/client";

export async function getSession(handle: string) {
  configureOAuth({ metadata: {} });
  const { identity, metadata } = await resolveFromIdentity(handle);
  console.log({ identity, metadata });
  const session = await _getSession(identity.id, {
    allowStale: true,
  });
  return session;
}

export async function checkAuth(form) {
  // form: handle, session, method, params
  // const { identity, metadata } = await resolveFromIdentity(form.handle);
  // configureOAuth({ metadata: {} });

  const session = form.session;

  const agent = new OAuthUserAgent(session);
  const rpc = new XRPC({ handler: agent });
  const res = await rpc.get(
    form.method,
    form.params,
  );

  // console.log({ res });
  if (!res) return false;
  return true;
}
