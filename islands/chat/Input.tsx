import {
  configureOAuth,
  getSession,
  OAuthUserAgent,
  resolveFromIdentity,
  Session,
} from "@atcute/oauth-browser-client";
import { XRPC } from "@atcute/client";
import * as TID from "@atcute/tid";
import { getFieldValue, setFieldValue } from "../../lib/util.ts";

async function post(message: string) {
  const { identity } = await resolveFromIdentity(localStorage["handle"]);
  const session = await getSession(identity.id, {
    allowStale: true,
  });
  const agent = new OAuthUserAgent(session);
  const rpc = new XRPC({ handler: agent });
  const room =
    "at://did:plc:b3pn34agqqchkaf75v7h43dk/social.psky.chat.room/3lat3axu4bk2k";
  return await rpc.call("com.atproto.repo.putRecord", {
    data: {
      repo: session.info.sub,
      collection: "social.psky.chat.message",
      rkey: TID.now(),
      record: {
        $type: "social.psky.chat.message",
        content: message,
        room,
      },
      validate: false,
    },
  });
}

export default function ({ metadata }) {
  configureOAuth({ metadata });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const message = getFieldValue("message");
        post(message);
        setFieldValue("message", "");
      }}
    >
      <input
        id="message"
        autofocus={true}
        autocomplete="off"
        name="message"
        class="input mt-1"
        type="text"
        placeholder="enter message..."
      />
    </form>
  );
}
