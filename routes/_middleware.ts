import { Cookie, getCookies, setCookie } from "@std/http/cookie";
import { checkAuth } from "../lib/util.ts";
export async function handler(
  req: Request,
  ctx: FreshContext<State>,
) {
  const resp = await ctx.next();
  const paths = ["/lookup"];
  const urls = req.url;
  const url = new URL(urls);
  // console.log({ url })
  const cookies = getCookies(req.headers);
  const matched = paths.includes(url.pathname);
  if (matched) {
    // console.log("cookies")
    // console.log(cookies)
    // console.log(atob(cookies.session))
    const session = JSON.parse(atob(cookies.session));
    console.log(session);
    // const session = await getSession(localStorage["handle"]);
    const a = await checkAuth({
      session,
      method: "com.atproto.server.checkAccountStatus",
      params: {},
    });
    console.log({ a });
    if (!a) {
      return Response.redirect("/", 307);
    }
  }
  return resp;
}
