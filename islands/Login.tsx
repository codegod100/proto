import { Signal, useSignal } from "@preact/signals";
import { getSession } from "../lib/util.ts";
import { configureOAuth, OAuthUserAgent } from "@atcute/oauth-browser-client";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { XRPC } from "@atcute/client";

async function checkAgent() {
  console.log("getting session");
  configureOAuth({ metadata: {} });
  console.log("still good");
  const session = await getSession(localStorage["handle"]);
  console.log({ session });
  // const agent = new OAuthUserAgent(session);
  // console.log({ agent });
  // console.log(agent.sub);
  // const rpc = new XRPC({ handler: agent });
  // console.log({ rpc });
  // const res = await rpc.get("chat.bsky.convo.getLog", { params: {} });
  // console.log({ res });
  globalThis.window.location.href = "/lookup";
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
