import { getFieldValue } from "../lib/util.ts";

export default function Login() {
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const handle = getFieldValue("handle");
          globalThis.window.location.href = `/oauth/${handle}`;
        }}
      >
        <div>
          <input
            id="handle"
            name="handle"
            class="input"
            type="text"
            placeholder="Enter handle to login"
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
