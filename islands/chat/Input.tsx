import { OAuthUserAgent, Session } from "@atcute/oauth-browser-client";
import { XRPC } from "@atcute/client";
import * as TID from "@atcute/tid";
async function post(message: string, session: Session) {
  const agent = new OAuthUserAgent(session);
  const rpc = new XRPC({ handler: agent });
  const room =
    "at://did:plc:b3pn34agqqchkaf75v7h43dk/social.psky.chat.room/3lat3axu4bk2k";
  return await rpc.call(
    "com.atproto.repo.putRecord",
    {
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
    },
  );
}

export default function ({ session }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const message = document.getElementById("message")!.value;
        console.log({ message });
        post(message, session.value);
        document.getElementById("message")!.value = "";
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
