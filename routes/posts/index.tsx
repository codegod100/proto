import { FreshContext, RouteContext } from "$fresh/server.ts";
import { State } from "../../lib/util.ts";

function splitUri(uri: string) {
  uri = uri.replace("at://", "");
  const [did, _, rkey] = uri.split("/");
  return { did, rkey };
}
export default async function (req, ctx: FreshContext<State>) {
  const pb = ctx.state.pb;
  const resultList = await pb.collection("posts").getList(1, 50, {});
  const posts = resultList.items.map((result, key) => {
    const { did, rkey } = splitUri(result.uri);
    return (
      <div key={key}>
        <a class="anchor link" href={`/posts/${did}/${rkey}`}>{result.title}</a>
        {" "}
        by {result.handle}
      </div>
    );
  });
  console.log({ resultList });
  return (
    <div>
      <div>Posts</div>
      <div>{posts}</div>
    </div>
  );
}
