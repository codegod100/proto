import Finalize from "../../islands/oauth/Finalize.tsx";

export default async function Callback() {
  console.log("in callback route");
  const publicUrl = Deno.env.get("PUBLIC_URL");
  const url = publicUrl || `http://127.0.0.1:${Deno.env.get("PORT")}`;
  return <Finalize url={url} publicUrl={publicUrl} />;
}
