import { set } from "idb-keyval";

import {VirtualRootDirectory} from "../types";


async function saveVirtualRootDirectory(
  virtualRootDirectory: VirtualRootDirectory
) {

   set(virtualRootDirectory.name,virtualRootDirectory)

  //  TODO: check if name already exitst.
  // throw new Error("not implemented Error");
}

export { saveVirtualRootDirectory };
