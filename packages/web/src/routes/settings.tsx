//@ts-ignore
import { useState, useEffect } from "react";
//@ts-ignore
import styles from "./settings.module.css";
import { useSettings } from "react-fsa-database";
import { fsaSetting } from "fsa-database";
export default function Settings() {
  const { fsaSettings, setFsaSettings } = useSettings();
  const {
    autoSaveCollections,
    cleanUpFiles,
    lastScanned,
    sessionStarted,
    scanInterval,
  } = fsaSettings;
  const [scanTime, setScanTime] = useState(0);

  useEffect(() => {
    if (scanInterval !== scanTime) {
      setScanTime(scanInterval);
    }
  }, [scanInterval]);

  const changeScanTime = (value: string) => {
    setScanTime(parseInt(value, 10));
  };

  const formatDate = (dateTime: number) => {
    return new Intl.DateTimeFormat(window.navigator.language, {
      timeStyle: "medium",
      dateStyle: "medium",
    }).format(new Date(dateTime));
  };

  return (
    <div>
      <h1>Settings</h1>
      <ul>
        <li
          onClick={(e) =>
            setFsaSettings({
              ...fsaSettings,
              cleanUpFiles: !cleanUpFiles,
            })
          }
        >
          cleanUpFiles: {cleanUpFiles.toString()}{" "}
        </li>
        <li
          onClick={(e) =>
            setFsaSettings({
              ...fsaSettings,
              autoSaveCollections: !autoSaveCollections,
            })
          }
        >
          autoSaveCollections: {autoSaveCollections.toString()}{" "}
        </li>
        <li>lastScanned: {formatDate(lastScanned)}</li>
        <li>sessionStarted: {formatDate(sessionStarted)}</li>
        <li>
          scanInterval:{" "}
          <input
            onChange={(e) => changeScanTime(e.target.value)}
            type="number"
            name=""
            id=""
            value={scanTime}
            onBlur={(e) =>
              setFsaSettings({
                ...fsaSettings,
                scanInterval: parseInt(e.target.value, 10),
              })
            }
          />
        </li>
      </ul>
    </div>
  );
}