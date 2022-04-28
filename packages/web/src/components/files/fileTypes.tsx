import React from "react";
import { fsaFileType } from "fsa-database";
import { useFileTypes } from "react-fsa-database";
//@ts-ignore
import styles from "./fileTypes.module.css";

const FileTypes = () => {
  const { fileTypes, toggleSelectedFileType, deleteFileType, addFileType } =
    useFileTypes();

  const handleToggle = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    fileType: fsaFileType
  ) => {
    e.stopPropagation();
    toggleSelectedFileType(fileType);
  };

  return (
    <div className={styles.container} data-testid="fileTypes">
      <h3 className={styles.header}>File Types</h3>
      <div className={styles.fileTypes__button_group}>
        <button
          onClick={() => addFileType("stl")}
          data-testid="fileTypes_addStl"
        >
          Add Stl
        </button>
        <button
          onClick={() => addFileType("3mf")}
          data-testid="fileTypes_add3mf"
        >
          Add 3mf
        </button>
        <button
          onClick={() => addFileType("gcode")}
          data-testid="fileTypes_addGcode"
        >
          Add gcode
        </button>
        <button
          onClick={() => addFileType("png")}
          data-testid="fileTypes_addPng"
        >
          Add png
        </button>
      </div>
      <ul className={styles.list}>
        {fileTypes.map((ft) => (
          <li
            className={styles.listItem}
            key={ft.id}
            data-testid={`fileTypes_remove_${ft.name}`}
          >
            <span>{ft.name}</span>
            <span onClick={(e) => handleToggle(e, ft)}>
              {ft.selected.toString()}
            </span>
            <span>{ft.id}</span>
            <button onClick={() => deleteFileType(ft, true)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileTypes;
