import React from "react";
import { fsaFileType } from "fsa-database";
import { useFileTypes } from "react-fsa-browser";
import styles from "./file-types.module.css";

const FileTypes = () => {
const { fileTypes,toggleSelectedFileType , deleteFileType, addFileType} = useFileTypes();
  
  const handleToggle = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    fileType: fsaFileType
  ) => {

    e.stopPropagation()
    toggleSelectedFileType(fileType)
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.header}>File Types</h3>
      <button onClick={()=>addFileType('stl')}>Add Stl</button>
      <button onClick={()=>addFileType('3mf')}>Add 3mf</button>
      <button onClick={()=>addFileType('gcode')}>Add gcode</button>
      <button onClick={()=>addFileType('png')}>Add png</button>
      <ul className={styles.list}>
        {fileTypes.map((ft, index) => (
          <li className={styles.listItem} key={index}>
          <span>{ft.name}</span>  
          <span onClick={(e)=>handleToggle(e,ft)}>{ft.selected.toString()}</span>  
          <span>{ft.id}</span>  
          <button onClick={()=>deleteFileType(ft,true)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileTypes;
