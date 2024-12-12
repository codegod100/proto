import {
  configureOAuth,
  resolveFromIdentity,
} from "@atcute/oauth-browser-client";
import { OAuthUserAgent } from "@atcute/oauth-browser-client";
import Lookup from "../islands/Lookup.tsx";
import { FreshContext } from "$fresh/server.ts";
import { XRPC } from "@atcute/client";
import * as TID from "@atcute/tid";
export const handler = {
  async POST(req: Request, ctx: FreshContext) {
    configureOAuth({ metadata: {} });
    const form = await req.json();
    const { identity, metadata } = await resolveFromIdentity(form.handle);
    const session = form.session;
    const agent = new OAuthUserAgent(session);
    const rpc = new XRPC({ handler: agent });
    const room =
      "at://did:plc:b3pn34agqqchkaf75v7h43dk/social.psky.chat.room/3lat3axu4bk2k";
    const res = await rpc.call(
      "com.atproto.repo.putRecord",
      {
        data: {
          repo: identity.id,
          collection: "social.psky.chat.message",
          rkey: TID.now(),
          record: {
            $type: "social.psky.chat.message",
            content: form.message,
            room,
          },
          validate: false,
        },
      },
    );
    console.log({ res });
    return ctx.render(Lookup, {});
  },
};
export default async function () {
  const publicUrl = Deno.env.get("PUBLIC_URL") || "";
  const url = publicUrl || `http://127.0.0.1:${Deno.env.get("PORT")}`;
  const pocketUrl = Deno.env.get("POCKETBASE_URL");
  if (!pocketUrl) return <div>No pocketbase url</div>;
  return <Lookup publicUrl={publicUrl} url={url} pocketUrl={pocketUrl} />;
}
