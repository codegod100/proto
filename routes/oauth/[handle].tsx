import { FreshContext, PageProps } from "$fresh/server.ts";
import {
  configureOAuth,
  createAuthorizationUrl,
  resolveFromIdentity,
} from "@atcute/oauth-browser-client";
import { auth } from "../../lib/oauth.ts";
import OAuth from "../../islands/OAuth.tsx";

export default async function Page(_req, props: PageProps) {
  const publicUrl = Deno.env.get("PUBLIC_URL");
  const url = publicUrl || `http://127.0.0.1:${Deno.env.get("PORT")}`;

  return <OAuth publicUrl={publicUrl} url={url} handle={props.params.handle} />;
}
