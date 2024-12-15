import { Post } from "../../lib/schemas.ts";
import { OAuthUserAgent } from "@atcute/oauth-browser-client";
import { XRPC } from "@atcute/client";
import * as TID from "@atcute/tid";
import { getMetadata, getSession, State } from "../../lib/util.ts";

async function submitPost(post: Post, metadata: State["metadata"]) {
  const session = await getSession(localStorage["handle"], metadata);
  const agent = new OAuthUserAgent(session);
  const rpc = new XRPC({ handler: agent });
  return await rpc.call(
    "com.atproto.repo.putRecord",
    {
      data: {
        repo: session.info.sub,
        collection: "nandi.schemas.post",
        rkey: TID.now(),
        record: {
          $type: "nandi.schemas.post",
          title: post.title,
          content: post.content,
        },
        validate: false,
      },
    },
  );
}
export default function (
  { did, metadata }: { did: string; metadata: State["metadata"] },
) {
  return (
    <button
      onClick={async () => {
        // alert("Submitted!");
        const title = getFieldValue("title");
        const content = getFieldValue("content");
        console.log(title, content);
        const post: Post = { title, content, author: did };
        console.log(post);
        const res = await submitPost(post, metadata);
        console.log(res);
      }}
    >
      Submit
    </button>
  );
}
