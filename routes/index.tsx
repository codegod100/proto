import { FreshContext } from "$fresh/server.ts";
import Input from "../islands/chat/Input.tsx";
import Login from "../islands/Login.tsx";
import { State } from "../lib/util.ts";
import { format } from "timeago.js";
import { Signal, signal, useSignal } from "@preact/signals";
import { JSX } from "preact/jsx-runtime";
import Content from "../islands/chat/Content.tsx";
import { configureOAuth } from "@atcute/oauth-browser-client";

export async function getItems(pb: PocketBase) {
  const room =
    "at://did:plc:b3pn34agqqchkaf75v7h43dk/social.psky.chat.room/3lat3axu4bk2k";

  console.log("updating value");
  const resultList = await pb
    .collection("messages")
    .getList(1, 20, { sort: "-created", filter: `room="${room}"` });
  const results = resultList.items.reverse();

  return results;
}

export function mapValues(results) {
  const divs: JSX.HTMLAttributes<HTMLDivElement>[] = results.map(
    (result, key) => {
      return (
        <div key={key}>
          ({format(result.created)}) {result.handle}: {result.content}
        </div>
      );
    }
  );
  return divs;
}
export default async function (req: Request, ctx: FreshContext<State>) {
  const pb: PocketBase = ctx.state.pb;
  const metadata = ctx.state.metadata;
  const initialItems = await getItems(pb);

  return (
    <div>
      {/* Room: {room} */}
      <Login />
      <div>{mapValues(initialItems)}</div>
      <Content pb={pb} />
      <Input metadata={metadata} />
    </div>
  );
}
