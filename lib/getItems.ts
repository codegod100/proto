import { JSX } from "preact/jsx-runtime";
import { format } from "timeago.js";
import PocketBase from "pocketbase";

export default async function (pb: PocketBase, room: string) {
  const resultList = await pb
    .collection("messages")
    .getList(1, 20, { sort: "-created", filter: `room="${room}"` });
  const results = resultList.items.reverse();
  return results;
  // const divs = results.map((result, key) => {
  //   return (
  //     <div key={key}>
  //       ({format(result.created)}) {result.handle}: {result.content}
  //     </div>
  //   );
  // });

  // return divs;
}
