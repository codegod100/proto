#!/usr/bin/env -S deno run -A --watch=static/,routes/

import dev from "$fresh/dev.ts";
import config from "./fresh.config.ts";

import "$std/dotenv/load.ts";
import { Jetstream } from "@skyware/jetstream";
const jetstream = new Jetstream({
  wantedCollections: ["social.psky.chat.message"],
});
jetstream.start();
jetstream.onCreate("social.psky.chat.message", async (event) => {
  console.log("New message", event);
});
console.log("Server started");
await dev(import.meta.url, "./main.ts", config);
