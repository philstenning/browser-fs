import { set } from "idb-keyval";
import { VirtualRootDirectoryType } from "./types";
import { rootStore } from "./stores";

async function saveVirtualRootDirectory(
  virtualRootDirectory: VirtualRootDirectoryType
) {
  try {
    await set(virtualRootDirectory.id, virtualRootDirectory, rootStore);
    return true;
  } catch (e) {
    return false;
  }
}

export { saveVirtualRootDirectory };
