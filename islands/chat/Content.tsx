import { IS_BROWSER } from "$fresh/runtime.ts";
import { format } from "timeago.js";
import PocketBase from "pocketbase";
import { useEffect } from "preact/hooks";

import { Signal, useSignal } from "@preact/signals";
import { JSX } from "preact/jsx-runtime";
import getItems from "../../lib/getItems.ts";
let initialLoad = false;

async function updateItems(pb: PocketBase, items, room) {
  const results = await getItems(pb, room);
  const divs = results.map((result, key) => {
    return (
      <div key={key}>
        ({format(result.created)}) {result.handle}: {result.content}
      </div>
    );
  });
  items.value = divs;
}
export default function (
  { pocketUrl, initialItems, room },
) {
  // console.log({ initialItems });
  // console.log("loading content island");
  // const pb = new PocketBase(pocketUrl);
  if (!initialLoad) {
    const pb = new PocketBase(pocketUrl);
    pb.collection("messages").subscribe("*", function (e) {
      updateItems(pb, items, room);
    });
  }
  initialLoad = true;

  const items = useSignal([]);
  const divs = initialItems && initialItems.map((result, key) => {
    return (
      <div key={key}>
        ({format(result.created)}) {result.handle}: {result.content}
      </div>
    );
  });
  let results;
  if (items.value.length === 0) {
    results = divs;
  } else {
    results = items.value;
  }
  return (
    <div id="scroller">
      {results}
    </div>
  );
}
