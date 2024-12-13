import { Cookie, getCookies, setCookie } from "@std/http/cookie";
import { FreshContext } from "$fresh/server.ts";

export const handler = {
  async POST(req: Request, ctx: FreshContext) {
    const resp = await ctx.render();
    const session = await req.text();
    const cookie: Cookie = {
      name: "session",
      value: btoa(session),
      expires: new Date("2025-12-31"),
    };
    setCookie(resp.headers, cookie);
    return resp;
  },
};

export default function Page() {
  return <div></div>;
}
