import { Signal, useSignal } from "@preact/signals";
export default function Login() {
  const handle = useSignal("");
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
