import { useFileList, useCollections , useFsaDbContext,} from "react-fsa-browser";
import {fsaFile} from 'fsa-database'
import styles from "./fileList.module.css";



function FileList() {
  const {dbState, setCurrentFile} = useFsaDbContext()
    const list = useFileList(true, true)
    const {addFileToCollection} = useCollections()
  
    const handleClick = (
      e: React.MouseEvent<HTMLLIElement, MouseEvent>,
      file: fsaFile
    ) => {
      e.stopPropagation()
      addFileToCollection(file);
      setCurrentFile(file)
    };

   return (
    <div className={styles.container}>
      <h3>File List ({list.length})</h3>
      <ul>
          {list && list.map((file,index)=>(
              <li 
              className={dbState.currentFile===file.id?styles.active:''}
              onClick={(e)=>handleClick(e,file) } 
              key={index} >{file.name}</li>
          ))}
      </ul>
    </div>
  );
}

export default FileList


