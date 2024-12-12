import { type PageProps } from "$fresh/server.ts";
import { Jetstream } from "@skyware/jetstream";
console.log("loading jetstream");
// const jetstream = new Jetstream({
//   wantedCollections: ["social.psky.chat.message"],
// });
// jetstream.start();
// jetstream.onCreate("social.psky.chat.message", async (event) => {
//   console.log("New message", event);
// });
export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>proto</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body class="p-2">
        <Component />
      </body>
    </html>
  );
}
