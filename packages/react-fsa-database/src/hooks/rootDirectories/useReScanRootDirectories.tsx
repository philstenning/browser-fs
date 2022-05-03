import { useState, useEffect } from "react";
import {
  reScanRootDirectories as reScan,
  updateSettingLastScanned,
  db,
  useLiveQuery,
  saveState,
} from "fsa-database";

export function useReScanRootDirectories() {
  const [isReScanning, setIsReScanning] = useState(false);
  const state = useLiveQuery(() => db.state.toCollection().last());

  useEffect(() => {
    if (state) {
      if (isReScanning !== state.isScanning) {
        setIsReScanning(state.isScanning);
      }
    }
  }, [state]);

  const reScanRootDirectories = async () => {
    if (state) {
      await saveState({ ...state, isScanning: true });
      await reScan();
      await updateSettingLastScanned();
      setIsReScanning(false);
      await saveState({ ...state, isScanning: false });
      console.log('scanning finished')
    }
  };
  return { isReScanning, reScanRootDirectories };
}
