import {
  OAuthUserAgent,
  finalizeAuthorization,
} from "@atcute/oauth-browser-client";
import Callback from "../../islands/Callback.tsx";
import { PageProps } from "$fresh/server.ts";

export default function Page(props: PageProps) {
  // const params = new URLSearchParams(location.hash.slice(1));
  // console.log({ params });
  const publicUrl = Deno.env.get("PUBLIC_URL");
  // console.log({ publicUrl });
  const url = publicUrl || `http://127.0.0.1:${Deno.env.get("PORT")}`;
  console.log({ url });
  return <Callback publicUrl={publicUrl} url={url} />;
}
// export const handler = async (req: Request): Promise<Response> => {
//   console.log({ req });
//   const location = { hash: new URL(req.url).hash };
//   console.log({ location });
//   const params = new URLSearchParams(location.hash.slice(1));
//   const session = await finalizeAuthorization(params);
//   const agent = new OAuthUserAgent(session);
//   console.log({ agent });
// };
