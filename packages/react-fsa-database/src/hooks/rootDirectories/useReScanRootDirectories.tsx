import { useState } from "react";
import { reScanRootDirectories as reScan } from "fsa-database";

export function useReScanRootDirectories() {
  const [isReScanning, setIsReScanning] = useState(false);

  const reScanRootDirectories = async () => {
    setIsReScanning(true);
    await reScan();
    setIsReScanning(false);
  };
  return { isReScanning, reScanRootDirectories };
}
