import { update } from "idb-keyval";
import { VirtualRootDirectoryType } from "./types";

async function updateVirtualRootDirectory(
  virtualRootDir: VirtualRootDirectoryType
) {
  try {
    await update(virtualRootDir.id, () => virtualRootDir);
    return true;
  } catch (e) {
    console.error(`error updating ${virtualRootDir.name}`);
    return false;
  }
}

export { updateVirtualRootDirectory };
