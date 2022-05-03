//@ts-ignore
import styles from "./settings.module.css";
import { useSettings } from "react-fsa-database";
import { fsaSetting } from "fsa-database";

export default function Settings() {
  const { fsaSettings, setFsaSettings } = useSettings();
  const { cleanUpCollections, cleanUpFiles, lastScanned, sessionStarted } =
    fsaSettings;

  const updateSettings = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    settings: fsaSetting
  ) => {
    setFsaSettings(settings);
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
            updateSettings(e, {
              ...fsaSettings,
              cleanUpCollections: !cleanUpCollections,
            })
          }
        >
          cleanUpCollections {cleanUpCollections.toString()}{" "}
        </li>
        <li
          onClick={(e) =>
            updateSettings(e, {
              ...fsaSettings,
              cleanUpFiles: !cleanUpFiles,
            })
          }
        >
          cleanUpFiles {cleanUpFiles.toString()}{" "}
        </li>
        <li>lastScanned {formatDate(lastScanned)}</li>
        <li>sessionStarted {formatDate(sessionStarted)}</li>
      </ul>
    </div>
  );
}
