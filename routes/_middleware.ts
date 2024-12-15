import { FreshContext } from "$fresh/server.ts";
import { getMetadata, State } from "../lib/util.ts";
import PocketBase from "pocketbase";

function getPb() {
  const pocketUrl = Deno.env.get("POCKETBASE_URL")!;
  const pb = new PocketBase(pocketUrl);
  return pb;
}
export async function handler(req: Request, ctx: FreshContext<State>) {
  ctx.state.pb = getPb()!;
  ctx.state.metadata = getMetadata();
  const resp = await ctx.next();
  return resp;
}
