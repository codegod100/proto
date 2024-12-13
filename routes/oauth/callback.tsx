import Callback from "../../islands/Callback.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    // const resp = await ctx.render();
    // console.log({ req });
    // resp.headers.set("X-Custom-Header", "Hello");
    // return resp;
    return ctx.render(req);
  },
};
export default function Page(props: PageProps<Request>) {
  console.log("race");
  // console.log(`backend: ${location.hash}`);
  const publicUrl = Deno.env.get("PUBLIC_URL");
  const url = publicUrl || `http://127.0.0.1:${Deno.env.get("PORT")}`;
  return <Callback publicUrl={publicUrl} url={url} />;
}
