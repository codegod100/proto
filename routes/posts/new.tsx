import SubmitButton from "../../islands/posts/SubmitButton.tsx";
import { resolveFromIdentity } from "@atcute/oauth-browser-client";
import { FreshContext, RouteContext } from "$fresh/server.ts";
import { State } from "../../lib/util.ts";
export default async function (req: Request, ctx: FreshContext<State>) {
  const path = ctx.url.pathname;
  console.log({ path });
  const metadata = ctx.state.metadata;
  const handle = localStorage.getItem("handle")!;
  const { identity } = await resolveFromIdentity(handle);
  const did: string = identity.id;
  return (
    <div>
      <div>Hello {localStorage.getItem("handle")}, create a new post!</div>
      <div>
        <input
          id="title"
          type="text"
          class="input shadow border w-1/2 mb-2"
          name="title"
          placeholder="Title"
        />
      </div>
      <div>
        <textarea
          id="content"
          class="input shadow border w-1/2 h-48"
          name="content"
          placeholder="Content"
        >
        </textarea>
      </div>
      <SubmitButton metadata={metadata} did={did} />
    </div>
  );
}
