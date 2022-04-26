import { useState } from "react";
import {
  reScanRootDirectories as reScan,
  updateSettingLastScanned,
} from "fsa-database";

export function useReScanRootDirectories() {
  const [isReScanning, setIsReScanning] = useState(false);

  const reScanRootDirectories = async () => {
    setIsReScanning(true);
    await reScan();
    await updateSettingLastScanned();
    setIsReScanning(false);
  };
  return { isReScanning, reScanRootDirectories };
}
