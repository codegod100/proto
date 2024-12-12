import {} from "@atcute/oauth-browser-client";
import Callback from "../../islands/Callback.tsx";
import { PageProps } from "$fresh/server.ts";

export default function Page(props: PageProps) {
  const publicUrl = Deno.env.get("PUBLIC_URL");
  const url = publicUrl || `http://127.0.0.1:${Deno.env.get("PORT")}`;
  return <Callback publicUrl={publicUrl} url={url} />;
}
