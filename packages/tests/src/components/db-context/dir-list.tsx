import {useFileList } from "react-fsa-browser";
import styles from "./dir-list.module.css";
import { useCollections } from "react-fsa-browser";

function FileList() {
    const list = useFileList(true)
    const {collections,addFileToCollection} = useCollections()
    console.log( {list})
    // const list =useLiveQuery(()=>db.files.where('type').equals('stl'))?.toArray()
  return (
    <div className={styles.container}>
      <h3>File List</h3>
      <ul>
          {list && list.map((item,index)=>(
              <li onClick={()=> addFileToCollection(collections[1],item)} key={index} >{item.name}</li>
          ))}
      </ul>
    </div>
  );
}

export default FileList


