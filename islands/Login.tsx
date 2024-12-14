import { useSignal } from "@preact/signals";
import { configureOAuth } from "@atcute/oauth-browser-client";
import { getSession } from "../lib/util.ts";
import { IS_BROWSER } from "$fresh/src/runtime/utils.ts";

async function setSession(session, metadata) {
  session.value = await getSession(localStorage["handle"], metadata);
  console.log({ inside: session.value });
}

let initial = true;
export default function Login({ session, metadata }) {
  const handle = useSignal("");
  if (initial && IS_BROWSER) setSession(session, metadata);
  initial = false;
  if (session.value) {
    return (
      <div>
        <button
          onClick={() => {
            session.value = null;
          }}
        >
          Logout
        </button>
      </div>
    );
  }
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          globalThis.window.location.href = `/oauth/${handle}`;
        }}
      >
        <div>
          <input
            name="handle"
            class="input"
            type="text"
            placeholder="Enter handle to login"
            onChange={(e) => {
              handle.value = e.target.value;
            }}
          />
        </div>
        <div>
          <button class="flex gap-8 py-6">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
