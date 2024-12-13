import { Cookie, getCookies, setCookie } from "@std/http/cookie";
import { checkAuth } from "../lib/util.ts";
import { configureOAuth, OAuthServerAgent } from "@atcute/oauth-browser-client";
export async function handler(
  req: Request,
  ctx: FreshContext<State>,
) {
  const paths = ["/"];
  const urls = req.url;
  // console.log(urls);
  // console.log({ req })
  const url = new URL(urls);
  // console.log({ url });
  const cookies = getCookies(req.headers);
  const matched = paths.includes(url.pathname);
  // console.log(url.pathname);
  ctx.state.loggedIn = true;
  if (matched && req.method === "GET") {
    console.log("route matched");
    if (!cookies.session) {
      console.log("no session");
      ctx.state.loggedIn = false;
      return ctx.next();
    }
    const session = JSON.parse(atob(cookies.session));
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
    console.log({ server });
    let refresh;
    try {
      refresh = await server.refresh({
        sub: session.info.sub,
        token: session.token,
      });
    } catch (e) {
      console.log("oops", e);
      ctx.state.loggedIn = false;
      return await ctx.next();
    }
    session.token = refresh;
    const cookie = { name: "session", value: btoa(JSON.stringify(session)) };
    const resp = await ctx.next();
    setCookie(
      resp.headers,
      cookie,
    );
    console.log({ resp });
    return resp;
  }
  // console.log("normal");
  return await ctx.next();
}
