import { Session } from "@atcute/oauth-browser-client";
import { FreshContext, PageProps } from "$fresh/server.ts";
import Input from "../islands/chat/Input.tsx";
import Content from "../islands/chat/Content.tsx";
import PocketBase from "pocketbase";
import Login from "../islands/Login.tsx";
import getItems from "../lib/getItems.ts";
import { useSignal } from "@preact/signals";

export const handler = {
  async GET(_req: Request, ctx: FreshContext) {
    const pocketUrl = Deno.env.get("POCKETBASE_URL");
    if (!pocketUrl) return <div>No pocketbase url</div>;
    const pb = new PocketBase(pocketUrl);
    const room =
      "at://did:plc:b3pn34agqqchkaf75v7h43dk/social.psky.chat.room/3lat3axu4bk2k";
    const initialItems = await getItems(pb, room);
    return ctx.render({
      pocketUrl,
      initialItems,
      room,
    });
  },
};

type Data = {
  pocketUrl: string;
  initialItems: [];
  room: string;
};

export default function (props: PageProps<Data>) {
  const { pocketUrl, room, initialItems } = props.data;
  let s: Session = {};
  const session = useSignal(s);
  // const results = await getItems(pb);

  return (
    <div>
      Room: {room}
      <Login session={session} />
      <Content room={room} initialItems={initialItems} pocketUrl={pocketUrl} />
      <Input session={session} />
    </div>
  );
}
