import { VirtualFileSystemEntry } from "fsa-browser";
import style from "./recursive-folder.module.css";
interface Props {
  folder: VirtualFileSystemEntry;
}
export function RecursiveFolder({ folder }: Props) {
  return (
    <li key={folder.id} className={style.list}>
      Folder: {folder.name}
      <ul className={style.none}>
        {folder.entries?.map((entry) => {
          if (entry.kind === "file") {
            return (
              <li key={entry.id} className="bfl__file">
                <span className={style.file}>
                  file: {entry.name} <pre>{entry.path}</pre>{" "}
                </span>
              </li>
            );
          } else {
            return <RecursiveFolder key={entry.id} folder={entry} />;
          }
        })}
      </ul>
    </li>
  );
}
interface Props2 {
  folder: VirtualFileSystemEntry[];
}

type VListProps = {
  virtualEntry: VirtualFileSystemEntry;
};
export function RecursiveUnorderedList({ virtualEntry }: VListProps) {
  return (
    <div>
      <RecursiveFolder folder={virtualEntry} />
    </div>
  );
}

export function RecursiveList({ folder }: Props2) {
  return (
    <ul>
      {folder.map((entry) => (
        <li
          className={entry.kind === "file" ? style.file : style.recursiveFolder}
        >
          {entry.name}
          {" ------ path: "} {entry.path}
          {entry.kind === "directory" && (
            <RecursiveList folder={entry.entries ?? []} />
          )}
        </li>
      ))}
    </ul>
  );
}
