import { Signal, useSignal } from "@preact/signals";
import { getSession } from "../lib/util.ts";
import { configureOAuth, OAuthUserAgent } from "@atcute/oauth-browser-client";
import { IS_BROWSER } from "$fresh/runtime.ts";

export default function Login() {
  // if (!IS_BROWSER) return;
  const handle = useSignal("");
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          window.location = `/oauth/${handle}`;
        }}
      >
        <div>
          <input
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
