import {
  getSession as _getSession,
  resolveFromIdentity,
} from "@atcute/oauth-browser-client";

export async function getSession(handle: string) {
  const { identity, metadata } = await resolveFromIdentity(handle);
  console.log({ identity, metadata });
  const session = await _getSession(identity.id, {
    allowStale: true,
  });
  return session;
}
