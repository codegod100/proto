import { Jetstream } from "@skyware/jetstream";
import { DidResolver } from "@atproto/identity";
import PocketBase from "pocketbase";
import dotenv from "dotenv";
dotenv.config();
const url = process.env.POCKETBASE_URL;
console.log({ url });
const pb = new PocketBase(url);
console.log("loading jetstream");
const didres = new DidResolver({});
const jetstream = new Jetstream({
  wantedCollections: ["nandi.schemas.post"],
});
jetstream.start();
jetstream.onCreate("nandi.schemas.post", async (event) => {
  console.log("New message", event);
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
