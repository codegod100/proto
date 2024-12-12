import {
  configureOAuth,
  getSession as _getSession,
  OAuthUserAgent,
  resolveFromIdentity,
} from "@atcute/oauth-browser-client";
import { XRPC } from "@atcute/client";

export async function getSession(handle: string) {
  // const handle = localStorage["handle"];
  const { identity, metadata } = await resolveFromIdentity(handle);
  const session = await _getSession(identity.id, {
    allowStale: true,
  });
  return session;
}
