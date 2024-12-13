import { IS_BROWSER } from "$fresh/runtime.ts";
import { format } from "timeago.js";
import PocketBase from "pocketbase";
import { useEffect } from "preact/hooks";
async function pocket(pb, items) {
  // console.log("pocket");
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

import { Signal, useSignal } from "@preact/signals";
let initialLoad = false;
export default function ({ pocketUrl }) {
  console.log("loading content island");
  const pb = new PocketBase(pocketUrl);
  if (!initialLoad) {
    pb.collection("messages").subscribe("*", function (e) {
      pocket(pb, items);
    });
  }
  initialLoad = true;

  const items = useSignal([]);

  if (items.value.length === 0) {
    pocket(pb, items);
  }
  // console.log({ pb });

  return <div id="scroller">{items.value}</div>;
}
