import { FreshContext, PageProps } from "$fresh/server.ts";
import {
  configureOAuth,
  createAuthorizationUrl,
  resolveFromIdentity,
} from "@atcute/oauth-browser-client";
import { auth } from "../../lib/oauth.ts";
import OAuth from "../../islands/OAuth.tsx";
// const enc = encodeURIComponent;
// const publicUrl = Deno.env.get("PUBLIC_URL");
// const url = publicUrl || `http://127.0.0.1:${Deno.env.get("PORT")}`;
// configureOAuth({
//   metadata: {
//     client_id: publicUrl
//       ? `${url}/client-metadata.json`
//       : `http://localhost?redirect_uri=${enc(
//           `${url}/oauth/callback`
//         )}&scope=${enc("atproto transition:generic")}`,
//     redirect_uri: `${url}/oauth/callback`,
//   },
// });

// export const handler = async (
//   _req: Request,
//   { params }: FreshContext
// ): Promise<Response> => {
//   const { identity, metadata } = await resolveFromIdentity(params.did);
//   const authUrl = await createAuthorizationUrl({
//     metadata: metadata,
//     identity: identity,
//     scope: "atproto transition:generic",
//   });
//   // const url = await auth(params.did);
//   // return Response.redirect(authUrl, 307);
//   return <OAuth />;
// };

export default async function Page(_req, props: PageProps) {
  // console.log({ props });
  // const params = new URLSearchParams(location.hash.slice(1));
  // console.log({ params });
  // const publicUrl = Deno.env.get("PUBLIC_URL");
  // const url = publicUrl || `http://127.0.0.1:${Deno.env.get("PORT")}`;
  const publicUrl = Deno.env.get("PUBLIC_URL");
  // console.log({ publicUrl });
  const url = publicUrl || `http://127.0.0.1:${Deno.env.get("PORT")}`;

  // const url = authUrl.toString();
  return <OAuth publicUrl={publicUrl} url={url} did={props.params.did} />;
  // return Response.redirect(authUrl, 307);
}
