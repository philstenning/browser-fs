export default async function saveLegacyInputFiles(fileList: FileList | null) {
    if(!fileList ) return

     
     for (const file of fileList) {
       console.log(`${file.name} ${file.webkitRelativePath}`)
     }
}
