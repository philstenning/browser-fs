import { db, fsaState } from "../../";

export default async function saveState(state: fsaState) {
  try {
    delete state.id;
    const id = await db.state.add(state);
    const newState: fsaState = { ...state, id };
    return newState;
  } catch (e) {
    console.error(`Error saving state ${e}`);
  }
  return false;
}
