import { DidResolver } from "@atproto/identity";
import PocketBase from "pocketbase";
import dotenv from "dotenv";
dotenv.config();
const url = Deno.env.get("POCKETBASE_URL")!;
console.log({ url });
const pb = new PocketBase(url);
const didres = new DidResolver({});

const socket = new WebSocket(
  "wss://jetstream2.us-west.bsky.network/subscribe?wantedCollections=nandi.schemas.post",
);
export default function () {
  socket.addEventListener("message", async (_event) => {
    const event = JSON.parse(_event.data);
    if (event.kind !== "commit") return;
    console.log({ event });

    const doc = await didres.resolveAtprotoData(event.did);
    const did = event.did;
    const collection = event.commit.collection;
    const rkey = event.commit.rkey;
    const uri = `at://${did}/${collection}/${rkey}`;
    const handle = doc.handle;
    const title = event.commit.record.title;
    const content = event.commit.record.content;

    const data = {
      title,
      content,
      uri,
      handle,
      created: new Date(event.time_us).toISOString(),
    };

    const record = await pb
      .collection("posts")
      .create(data)
      .catch((e) => console.log({ e }));
    console.log({ record });
  });
}
