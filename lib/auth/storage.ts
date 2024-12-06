import type {
  NodeSavedSession,
  NodeSavedSessionStore,
  NodeSavedState,
  NodeSavedStateStore,
} from "@atproto/oauth-client-node";
import PocketBase from "pocketbase";
// import { PUBLIC_POCKET_BASE } from "$env/static/public";
const pb = new PocketBase(Deno.env.get("POCKETBASE_URL"));

export class StateStore implements NodeSavedStateStore {
  async get(key: string): Promise<NodeSavedState | undefined> {
    const record = await pb
      .collection("auth_state")
      .getFirstListItem(`key="${key}"`);
    return JSON.parse(record.state);
  }
  async set(key: string, val: NodeSavedState) {
    const state = JSON.stringify(val);
    await pb.collection("auth_state").create({ key, state });
  }
  async del(key: string) {
    const record = await pb
      .collection("auth_state")
      .getFirstListItem(`key="${key}"`);
    pb.collection("auth_state").delete(record.id);
  }
}

export class SessionStore implements NodeSavedSessionStore {
  async get(key: string): Promise<NodeSavedSession | undefined> {
    const record = await pb
      .collection("auth_session")
      .getFirstListItem(`key="${key}"`);
    return JSON.parse(record.session);
  }
  async set(key: string, val: NodeSavedSession) {
    const session = JSON.stringify(val);
    await pb.collection("auth_session").create({ key, session });
  }
  async del(key: string) {
    const record = await pb
      .collection("auth_session")
      .getFirstListItem(`key="${key}"`);
    pb.collection("auth_session").delete(record.id);
  }
}
