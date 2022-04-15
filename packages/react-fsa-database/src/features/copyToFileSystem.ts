import { fsaFile } from "fsa-database";

export async function copyToFileSystem(_file: fsaFile) {
  //    window.resolveLocalFileSystemURL
  const file = await _file.handle.getFile();
  console.log( file.webkitRelativePath)

  



  
//   const buffer =await file.arrayBuffer()

//    console.log(buffer.byteLength.toString())

//    const reader = new FileReader()
//    reader.onload = (e)=> {
//        console.log(e.target?.result)
//        localStorage.setItem(_file.name,e.target?.result?.toString()?? '')
       
//     }
    
//     //    reader.readAsDataURL(file)
//     reader.readAsBinaryString(file)
    
//     console.log(file.size)
    
    // let blob = new Blob(["<html>…</html>"], { type: "text/html" });
    // console.log(blob)

    // blob.slice([byteStart], [byteEnd], [contentType]);
  
//   localStorage.setItem(_file.name, val);
}
