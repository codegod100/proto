import { useSignal, Signal } from "@preact/signals";
import { JSX } from "preact/jsx-runtime";
import PocketBase, { RecordModel } from "pocketbase";
import { mapValues } from "../../routes/index.tsx";

function updateItems(
  items: Signal<JSX.HTMLAttributes<HTMLDivElement>[]>,
  results: RecordModel[]
) {
  const divs = mapValues(results);
  items.value = divs;
}

const records: RecordModel[] = [];
let received = false;
export default function ({ pb }: { pb: PocketBase }) {
  const items = useSignal<JSX.HTMLAttributes<HTMLDivElement>[]>([]);
  pb = new PocketBase(pb.baseURL);
  pb.collection("messages").subscribe("*", function (e) {
    received = true;
    records.push(e.record);
    updateItems(items, records);
  });

  return (
    <div>
      {received && <hr class="w-1/2" />}
      <div id="scroller">{items.value}</div>
    </div>
  );
}
