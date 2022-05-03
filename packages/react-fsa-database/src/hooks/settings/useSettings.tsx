import { useState, useEffect } from "react";
import {
  useLiveQuery,
  db,
  updateSetting,
  createInitialSetting,
} from "fsa-database";
export function useSettings() {
  const [fsaSettings, setSettings] = useState(createInitialSetting());
  const settings = useLiveQuery(async () => {
    return (await db.settings.toCollection().last());
  });
  // the settings is undefined until it loads
  //data, so use the useState to  give it a temp
  // object to load with.
  useEffect(() => {
    if (settings) {
      setSettings(settings);
    }
  }, [settings]);

  const setFsaSettings = updateSetting;

  return { fsaSettings, setFsaSettings };
}
