import { resolveFromIdentity } from "@atcute/oauth-browser-client";
import { XRPC } from "@atcute/client";
import { format } from "timeago.js";
// import { DidResolver } from "@atproto/identity";
import { configureOAuth, OAuthUserAgent } from "@atcute/oauth-browser-client";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { Signal, useSignal } from "@preact/signals";
import PocketBase from "pocketbase";
import { JSX } from "preact/jsx-runtime";
import { getRpc, getSession } from "../lib/util.ts";
import { useEffect } from "preact/hooks";

async function pocket(pb, items) {
  const divs = [];
  const room =
    "at://did:plc:b3pn34agqqchkaf75v7h43dk/social.psky.chat.room/3lat3axu4bk2k";
  const resultList = await pb
    .collection("messages")
    .getList(1, 10, { sort: "-created", filter: `room="${room}"` });
  const results = resultList.items.reverse();
  // const didres = new DidResolver({});

  for (const result of results) {
    // const doc = await didres.resolveAtprotoData(result.did);
    // const handle = doc.handle;
    // const { data } = await rpc.get("app.bsky.actor.getProfile", {
    //   params: {
    //     actor: result.did,
    //   },
    // });
    // console.log({ data });
    divs.push(
      <div>
        ({format(result.created)}) {result.handle}: {result.content}
      </div>,
    );
  }
  items.value = divs;
  // console.log({ results });
}

// async function lookup(didSignal) {
//   const handle = localStorage["handle"];
//   const { identity, metadata } = await resolveFromIdentity(handle);
//   console.log({ identity });
//   const session = await getSession(identity.id, {
//     allowStale: true,
//   });
//   console.log({ session });
//   const agent = new OAuthUserAgent(session);
//   const rpc = new XRPC({ handler: agent });
//   const { data } = await rpc.get("com.atproto.identity.resolveHandle", {
//     params: {
//       handle: "mary.my.id",
//     },
//   });
//   console.log({ data });
//   didSignal.value = data.did;
// }
// function scrollToBottom() {
//   console.log("scrollin");
//   scroller.scroll({ top: scroller.scrollHeight, behavior: "auto" });
// }

type Props = {
  url: string;
  publicUrl: string;
  pocketUrl: string;
};

async function setSession(session: Signal) {
  const _session = await getSession(localStorage["handle"]);
  session.value = _session;
}
export default function ({ url, publicUrl, pocketUrl }: Props) {
  if (!IS_BROWSER) return;
  const did = useSignal("...loading...");
  const items = useSignal([]);
  const session = useSignal({});
  const message = useSignal("");
  setSession(session);
  // const enc = encodeURIComponent;
  // configureOAuth({
  //   metadata: {
  //     client_id: publicUrl
  //       ? `${url}/client-metadata.json`
  //       : `http://localhost?redirect_uri=${enc(
  //           `${url}/oauth/callback`,
  //         )}&scope=${enc("atproto transition:generic")}`,
  //     redirect_uri: `${url}/oauth/callback`,
  //   },
  // });
  configureOAuth({ metadata: {} });
  const pb = new PocketBase(pocketUrl);
  pb.collection("messages").subscribe("*", function (e) {
    pocket(pb, items);
  });
  pocket(pb, items);
  // lookup(did);
  // const session = await getSession(localStorage["handle"]);
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
          type="hidden"
          name="session"
          value={JSON.stringify(session.value)}
        />
        <input type="hidden" name="handle" value={localStorage["handle"]} />
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
          // value={message.value}
          placeholder="enter message..."
        />
      </form>
    </div>
  );
}
