import { resolveFromIdentity } from "@atcute/oauth-browser-client";
import { XRPC } from "@atcute/client";
import { format } from "timeago.js";
// import { DidResolver } from "@atproto/identity";
import {
  OAuthUserAgent,
  getSession,
  configureOAuth,
} from "@atcute/oauth-browser-client";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import PocketBase from "pocketbase";

async function pocket(pb, items) {
  const divs = [];
  const room =
    "at://did:plc:b3pn34agqqchkaf75v7h43dk/social.psky.chat.room/3lat3axu4bk2k";
  const resultList = await pb
    .collection("messages")
    .getList(1, 100, { sort: "-created", filter: `room="${room}"` });
  const results = resultList.items.reverse();
  // const didres = new DidResolver({});
  const rpc = await getRpc();

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

async function getRpc() {
  const did = localStorage["did"];
  console.log({ did });
  const { identity, metadata } = await resolveFromIdentity(did);
  const session = await getSession(identity.id, {
    allowStale: true,
  });
  console.log({ session });
  const agent = new OAuthUserAgent(session);
  return new XRPC({ handler: agent });
}
async function lookup(didSignal) {
  const did = localStorage["did"];
  const { identity, metadata } = await resolveFromIdentity(did);
  console.log({ identity });
  const session = await getSession(identity.id, {
    allowStale: true,
  });
  console.log({ session });
  const agent = new OAuthUserAgent(session);
  const rpc = new XRPC({ handler: agent });
  const { data } = await rpc.get("com.atproto.identity.resolveHandle", {
    params: {
      handle: "mary.my.id",
    },
  });
  console.log({ data });
  didSignal.value = data.did;
}
function scrollToBottom() {
  console.log("scrollin");
  scroller.scroll({ top: scroller.scrollHeight, behavior: "auto" });
}

export default function ({ url, publicUrl, pocketUrl }) {
  if (!IS_BROWSER) return;
  const did = useSignal("...loading...");
  const items = useSignal([]);
  const enc = encodeURIComponent;
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
  lookup(did);
  return <div id="scroller">{items}</div>;
}
