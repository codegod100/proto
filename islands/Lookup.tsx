import { format } from "timeago.js";
import { configureOAuth } from "@atcute/oauth-browser-client";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { Signal, useSignal } from "@preact/signals";
import PocketBase from "pocketbase";
import { checkAuth, getSession } from "../lib/util.ts";

async function pocket(pb, items) {
  console.log("calling pocket");
  const divs = [];
  const room =
    "at://did:plc:b3pn34agqqchkaf75v7h43dk/social.psky.chat.room/3lat3axu4bk2k";
  const resultList = await pb
    .collection("messages")
    .getList(1, 10, { sort: "-created", filter: `room="${room}"` });
  const results = resultList.items.reverse();
  // const didres = new DidResolver({});

  for (const result of results) {
    divs.push(
      <div>
        ({format(result.created)}) {result.handle}: {result.content}
      </div>,
    );
  }
  items.value = divs;
}

type Props = {
  url: string;
  publicUrl: string;
  pocketUrl: string;
};

async function setSession(session: Signal) {
  const _session = await getSession(localStorage["handle"]);
  session.value = _session;
}

async function checkAgent() {
  const session = await getSession(localStorage["handle"]);
  const a = await checkAuth({
    handle: localStorage["handle"],
    session,
    method: "com.atproto.server.checkAccountStatus",
    params: {},
  });
  console.log({ a });
  if (!a) globalThis.location.href = "/";
}

async function checkAgent2() {
  configureOAuth({ metadata: {} });
  const session = await getSession(localStorage["handle"]);
  console.log({ session });
  let res = await fetch("/rpc", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      session: session,
      handle: localStorage["handle"],
      method: "com.atproto.server.checkAccountStatus",
      params: {},
    }),
  }).catch((e) => {
    console.log(e);
    return null;
  });
  console.log({ ress: res });
  res = await res.json();
  if (res.status !== "ok") {
    // globalThis.location.href = "/";
  }
  return res;
}
export default function ({ url, publicUrl, pocketUrl }: Props) {
  const d = new Date();
  console.log(Date.now());
  if (!IS_BROWSER) return;
  checkAgent();
  const items = useSignal([]);
  const session = useSignal({});
  const message = useSignal("");
  setSession(session);

  configureOAuth({ metadata: {} });
  const pb = new PocketBase(pocketUrl);
  pb.collection("messages").subscribe("*", function (e) {
    pocket(pb, items);
  });
  pocket(pb, items);
  return (
    <div>
      <div id="scroller">{items}</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetch("/lookup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              session: session.value,
              handle: localStorage["handle"],
              message: message.value,
            }),
          });
          document.getElementById("message")!.value = "";
        }}
      >
        <input
          id="message"
          onChange={(e) => {
            message.value = e.target!.value;
          }}
          autofocus={true}
          autocomplete="off"
          name="message"
          class="input mt-1"
          type="text"
          placeholder="enter message..."
        />
      </form>
    </div>
  );
}
