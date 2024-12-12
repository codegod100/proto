import { Signal, useSignal } from "@preact/signals";
import { getSession } from "../lib/util.ts";
import { configureOAuth, OAuthUserAgent } from "@atcute/oauth-browser-client";
import { IS_BROWSER } from "$fresh/runtime.ts";

async function checkAgent() {
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
  });
  res = await res.json();
  if (res.status === "ok") {
    globalThis.location.href = "/lookup";
  }
}

export default function Login() {
  if (!IS_BROWSER) return;
  const handle = useSignal("");
  checkAgent();
  return (
    <div>
      <div>Enter your handle</div>
      <div>
        <input
          class="input"
          type="text"
          placeholder="handle"
          onChange={(e) => {
            handle.value = e.target.value;
          }}
        />
      </div>
      <div>
        <button
          class="flex gap-8 py-6"
          onClick={() => {
            window.location = `/oauth/${handle}`;
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}
