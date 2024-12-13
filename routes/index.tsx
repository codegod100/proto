import {
  configureOAuth,
  resolveFromIdentity,
} from "@atcute/oauth-browser-client";
import { OAuthUserAgent } from "@atcute/oauth-browser-client";
import { Cookie, getCookies, setCookie } from "@std/http/cookie";
import { FreshContext } from "$fresh/server.ts";
import { XRPC } from "@atcute/client";
import * as TID from "@atcute/tid";
import Input from "../islands/chat/Input.tsx";
import Content from "../islands/chat/Content.tsx";
import { Signal, useSignal } from "@preact/signals";
import PocketBase from "pocketbase";
import Login from "../islands/Login.tsx";

export const handler = {
  async POST(req: Request, ctx: FreshContext) {
    configureOAuth({ metadata: {} });
    const form = await req.json();
    const { identity, metadata } = await resolveFromIdentity(form.handle);
    const cookies = getCookies(req.headers);
    const session = JSON.parse(atob(cookies.session));
    // const session = form.session;
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
    return ctx.render({});
  },
  GET(req: Request, ctx: FreshContext) {
    console.log({ state: ctx.state });
    return ctx.render(ctx);
  },
};

export default function (ctx) {
  console.log({ state: ctx.state });
  const pocketUrl = Deno.env.get("POCKETBASE_URL");
  if (!pocketUrl) return <div>No pocketbase url</div>;
  console.log("loading lookup server component");
  return (
    <div>
      {!ctx.state.loggedIn && <Login />}
      <Content pocketUrl={pocketUrl} />
      {ctx.state.loggedIn && <Input />}
    </div>
  );
}
