import { set } from "idb-keyval";
import { VirtualRootDirectory } from "../types";
import { rootStore } from "./stores";

async function saveVirtualRootDirectory(
  virtualRootDirectory: VirtualRootDirectory
) {
  set(virtualRootDirectory.name, virtualRootDirectory, rootStore);

  //  TODO: check if name already exists.
  // throw new Error("not implemented Error");
}

export { saveVirtualRootDirectory };
