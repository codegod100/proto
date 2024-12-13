// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $_middleware from "./routes/_middleware.ts";
import * as $client_metadata_json_index from "./routes/client-metadata.json/index.tsx";
import * as $index from "./routes/index.tsx";
import * as $lookup from "./routes/lookup.tsx";
import * as $oauth_handle_ from "./routes/oauth/[handle].tsx";
import * as $oauth_callback from "./routes/oauth/callback.tsx";
import * as $rpc from "./routes/rpc.ts";
import * as $store from "./routes/store.tsx";
import * as $Callback from "./islands/Callback.tsx";
import * as $Login from "./islands/Login.tsx";
import * as $OAuth from "./islands/OAuth.tsx";
import * as $chat_Content from "./islands/chat/Content.tsx";
import * as $chat_Input from "./islands/chat/Input.tsx";
import type { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/_middleware.ts": $_middleware,
    "./routes/client-metadata.json/index.tsx": $client_metadata_json_index,
    "./routes/index.tsx": $index,
    "./routes/lookup.tsx": $lookup,
    "./routes/oauth/[handle].tsx": $oauth_handle_,
    "./routes/oauth/callback.tsx": $oauth_callback,
    "./routes/rpc.ts": $rpc,
    "./routes/store.tsx": $store,
  },
  islands: {
    "./islands/Callback.tsx": $Callback,
    "./islands/Login.tsx": $Login,
    "./islands/OAuth.tsx": $OAuth,
    "./islands/chat/Content.tsx": $chat_Content,
    "./islands/chat/Input.tsx": $chat_Input,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
