import { update } from "idb-keyval";
import { VirtualRootDirectory } from "./types";

async function updateVirtualRootDirectory(
  virtualRootDir: VirtualRootDirectory
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
