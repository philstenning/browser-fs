import { useFileList, useCollections , useFsaDbContext} from "react-fsa-browser";
import styles from "./dir-list.module.css";



function FileList() {
  // const {currentRootDirectory} = useFsaDbContext()
    const list = useFileList(true)
    const {collections,addFileToCollection} = useCollections()
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


