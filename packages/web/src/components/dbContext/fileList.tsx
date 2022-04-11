import {
  useFileList,
  useCollections,
  useFsaDbContext,
} from "react-fsa-database";
import {fsaFile} from 'fsa-database'
//@ts-ignore
import styles from "./fileList.module.css";
import {checkPermissionsOfHandle} from 'fsa-browser'


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

   const checkPerm = (
     e: React.MouseEvent<HTMLLIElement, MouseEvent>,
     file: fsaFile
   ) => {
     e.stopPropagation()
     checkPermissionsOfHandle(file.handle).then(res=>{
       console.log(`file ${file.path} has permission`)
      //  checkPerm2(e,file)
     }).catch(err=> console.error('first ' ,err))
   };

const checkPerm2 = (
     e: React.MouseEvent<HTMLLIElement, MouseEvent>,
     file: fsaFile
   )=>{

    file.handle.getFile().then(f=>{
      console.log(` \n\n ${f.name} /  ${f.size.toString()} / ${f.type.toLowerCase()} , ${f.lastModified}, `)
    })
   }





   return (
    <div className={styles.container}>
      <h3>File List ({list.length})</h3>
      <ul>
          {list && list.map((file,index)=>(
              <li 
              className={dbState.currentFile===file.id?styles.active:''}
              onClick={(e)=>handleClick(e,file) } 
              key={index} >{file.name} <button onClick={e=>checkPerm(e,file)}>check</button></li>
          ))}
      </ul>
    </div>
  );
}

export default FileList


