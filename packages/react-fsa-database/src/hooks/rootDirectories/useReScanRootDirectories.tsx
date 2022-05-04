import { useState, useEffect } from "react";
import {
  reScanRootDirectories as reScan,
  updateSettingLastScanned,
  db,
  useLiveQuery,
  saveState,
} from "fsa-database";

export function useReScanRootDirectories() {
  const [isScanning, setIsReScanning] = useState(false);
  const state = useLiveQuery(() => db.state.toCollection().last());

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (state) {
        if (isScanning !== state.isScanning) {
          setIsReScanning(state.isScanning);
        }
      }
    }
    return () => {
      isMounted = false;
    };
  }, [state]);

  const reScanRootDirectories = async () => {
    if (state) {
      await saveState({ ...state, isScanning: true });
      await reScan();
      await updateSettingLastScanned();
      await saveState({ ...state, isScanning: false });
      // console.log("scanning finished");
    }
  };
  return { isScanning, reScanRootDirectories };
}
