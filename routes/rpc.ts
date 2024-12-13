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
    // console.log({ session });
    const agent = new OAuthUserAgent(session);
    // console.log({ agent });
    const rpc = new XRPC({ handler: agent });
    // console.log({ rpc });
    console.log("about to fail");
    const res = await rpc.get(
      form.method,
      form.params,
    ).catch((e) => {
      // console.log(e);
      return null;
    });
    console.log({ res });
    console.log("ok");
    if (!res) return new Response(JSON.stringify({ status: "error" }));
    return new Response(JSON.stringify({ status: "ok" }));
  },
};
