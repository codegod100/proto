import { FreshContext } from "$fresh/server.ts";
import { getMetadata, State } from "../lib/util.ts";

export async function handler(req: Request, ctx: FreshContext<State>) {
  ctx.state.metadata = getMetadata();
  const resp = await ctx.next();
  return resp;
}
