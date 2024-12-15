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
import PocketBase from "pocketbase";
export async function getSession(
  handle: string,
  metadata,
) {
  configureOAuth({
    metadata,
  });
  const { identity, _metadata } = await resolveFromIdentity(handle);
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

export function getMetadata() {
  const publicUrl = Deno.env.get("PUBLIC_URL");
  const url = publicUrl || `http://127.0.0.1:${Deno.env.get("PORT")}`;
  const enc = encodeURIComponent;
  const metadata = {
    client_id: publicUrl
      ? `${url}/client-metadata.json`
      : `http://localhost?redirect_uri=${
        enc(
          `${url}/oauth/callback`,
        )
      }&scope=${enc("atproto transition:generic")}`,
    redirect_uri: `${url}/oauth/callback`,
  };
  return metadata;
}

export type State = {
  metadata: { client_id: string; redirect_uri: string };
  pb: PocketBase;
};

export function getFieldValue(name: string): string {
  const field: HTMLInputElement = document.getElementById(
    name,
  ) as HTMLInputElement;
  return field.value;
}

export function setFieldValue(name: string, value: string) {
  const field: HTMLInputElement = document.getElementById(
    name,
  ) as HTMLInputElement;
  field.value = value;
}
