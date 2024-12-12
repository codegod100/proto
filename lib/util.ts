import {
  getSession as _getSession,
  resolveFromIdentity,
} from "@atcute/oauth-browser-client";

export async function getSession(handle: string) {
  // const handle = localStorage["handle"];
  const { identity, metadata } = await resolveFromIdentity(handle);
  const session = await _getSession(identity.id, {
    allowStale: true,
  });
  return session;
}
