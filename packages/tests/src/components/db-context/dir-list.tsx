import { useFileList, useCollections , useFsaDbContext} from "react-fsa-browser";
import styles from "./dir-list.module.css";



function FileList() {
  // const {currentRootDirectory} = useFsaDbContext()
    const list = useFileList(true, true)
    const {addFileToCollection} = useCollections()
   return (
    <div className={styles.container}>
      <h3>File List ({list.length})</h3>
      <ul>
          {list && list.map((file,index)=>(
              <li onClick={()=> addFileToCollection(file)} key={index} >{file.name}</li>
          ))}
      </ul>
    </div>
  );
}

export default FileList


