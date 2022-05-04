import { saveState, getCurrentStateWithOutId } from "./";

export async function setCurrentDirectoryId(id = "null") {
  if (id.length < 3) id = "null";
  const state = await getCurrentStateWithOutId();
  if (state.currentDirectoryId === id) return;
  saveState({ ...state, currentDirectoryId: id });
}

export async function setCurrentRootDirectoryId(id = "null") {
  if (id.length < 3) id = "null";
  const state = await getCurrentStateWithOutId();
  if (state.currentRootDirectoryId === id) return;
  saveState({ ...state, currentRootDirectoryId: id });
}
export async function setCurrentFileId(id = "null") {
  if (id.length < 3) id = "null";
  const state = await getCurrentStateWithOutId();
  if (state.currentFileId === id) return;
  saveState({ ...state, currentFileId: id });
}
export async function setCurrentCollectionId(id = "null") {
  if (id.length < 3) id = "null";
  const state = await getCurrentStateWithOutId();
  if (state.currentCollectionId === id) return;
  saveState({ ...state, currentCollectionId: id });
}
