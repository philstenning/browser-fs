import { set } from "idb-keyval";
import { VirtualRootDirectory } from "../types";
import { rootStore } from "./stores";

async function saveVirtualRootDirectory(
  virtualRootDirectory: VirtualRootDirectory
) {
  try {
    await set(virtualRootDirectory.id, virtualRootDirectory, rootStore);
    return true;
  } catch (e) {
    return false;
  }
}

export { saveVirtualRootDirectory };
