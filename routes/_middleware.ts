import { Cookie, getCookies, setCookie } from "@std/http/cookie";
import { checkAuth } from "../lib/util.ts";
import { configureOAuth, OAuthServerAgent } from "@atcute/oauth-browser-client";
export async function handler(
  req: Request,
  ctx: FreshContext<State>,
) {
  const resp = await ctx.next();
  const paths = ["/lookup"];
  const urls = req.url;
  // console.log({ req })
  const url = new URL(urls);
  // console.log({ url })
  const cookies = getCookies(req.headers);
  const matched = paths.includes(url.pathname);
  if (matched && req.method === "GET") {
    console.log("route matched")
    // console.log("cookies")
    // console.log(cookies)
    if (!cookies.session) {
      return new Response("", {
        status: 307,
        headers: { Location: "/" },
      });
    }
    const session = JSON.parse(atob(cookies.session));
    // console.log(session);
    // const session = await getSession(localStorage["handle"]);
    const enc = encodeURIComponent;
    const publicUrl = Deno.env.get("PUBLIC_URL");
    const url = publicUrl || `http://127.0.0.1:${Deno.env.get("PORT")}`;
    configureOAuth({
      metadata: {
        client_id: publicUrl
          ? `${url}/client-metadata.json`
          : `http://localhost?redirect_uri=${enc(
            `${url}/oauth/callback`,
          )
          }&scope=${enc("atproto transition:generic")}`,
        redirect_uri: `${url}/oauth/callback`,
      },
    });
    const server = new OAuthServerAgent(session.info.server, session.dpopKey);
    let refresh
    try {
      refresh = await server.refresh({
        sub: session.info.sub,
        token: session.token,
      })
    } catch (e) {

      return new Response("", {
        status: 307,
        headers: { Location: "/" },
      });
    }
    // console.log({ refresh });
    session.token = refresh;
    const cookie = { name: "session", value: btoa(JSON.stringify(session)) };
    setCookie(
      resp.headers,
      cookie,
    );
    // const a = await checkAuth({
    //   session,
    //   method: "com.atproto.server.checkAccountStatus",
    //   params: {},
    // }).catch((e) => {
    //   console.log(e);
    //   return false;
    // });

    // console.log({ a });
    // if (!a) {
    //   // return new Response("", {
    //   //   status: 307,
    //   //   headers: { Location: "/" },
    //   // });
    // }
  }
  return resp;
}
