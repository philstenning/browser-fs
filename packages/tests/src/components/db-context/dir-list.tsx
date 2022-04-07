import React from 'react'
// import { useFsaDbContext } from "react-fsa-browser";
import {db,useLiveQuery} from 'fsa-database'
import styles from "./dir-list.module.css";


function FileList() {
    const list =useLiveQuery(()=>db.files.where('type').equals('3mf').or('type').equals('stl').toArray() )
    // const list =useLiveQuery(()=>db.files.where('type').equals('stl'))?.toArray()
  return (
    <div className={styles.container}>
      <h3>File List</h3>
      <ul>
          {list && list.map(item=>(
              <li>{item.name}</li>
          ))}
      </ul>
    </div>
  );
}

export default FileList