import { FreshContext } from "$fresh/server.ts";
import {
  configureOAuth,
  OAuthUserAgent,
  resolveFromIdentity,
} from "@atcute/oauth-browser-client";
import { XRPC } from "@atcute/client";

export const handler = {
  async POST(req: Request, ctx: FreshContext) {
    // form: handle, session, method, params
    const form = await req.json();
    const { identity, metadata } = await resolveFromIdentity(form.handle);
    configureOAuth({ metadata });
    const session = form.session;
    const agent = new OAuthUserAgent(session);
    const rpc = new XRPC({ handler: agent });
    const res = await rpc.get(
      form.method,
      form.params,
    );
    console.log({ res });
    return new Response(JSON.stringify({ status: "ok" }));
  },
};
