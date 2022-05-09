import React, { useCallback } from 'react'
import { dragAddFilesToDirectory } from 'fsa-database'
import RootDir from '../components/rootDirectories/rootDirectories'
// import { useDropzone } from 'react-dropzone'
// @ts-ignore
import style from './DragNDrop.module.css'
export default function DragNDrop() {
  const dragDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const filesList = e.dataTransfer.files
    const fitems = e.dataTransfer.items

    for (const item of fitems) {
      console.log(item.type)
      console.log(item.kind)
      console.log(item.webkitGetAsEntry().isDirectory ? 'dir' : 'file')
      try {
        //@ts-ignore.
        const it = item.getAsFileSystemHandle().then((d) => {
          console.log(d)
        })
      } catch (error) {}

      const wk = item.webkitGetAsEntry()
      console.log(
        `${wk.fullPath} Root: ${wk.filesystem.root.fullPath} ${wk.name}`
      )
      if (item.webkitGetAsEntry().isDirectory) {

        // @ts-ignore // createReader is no longer in ts
        // use getAsFileSystemHandle() instead
        const reader = wk.createReader() as FileSystemDirectoryReader
        reader.readEntries((entries) => {
          for (const entry of entries) {
            console.log(entry.name) 
          }
        })
        console.log(reader)
      }
    }
    // console.table(filesList)

    // dragAddFilesToDirectory(filesList)
  }
  const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }
  const dragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }
  const dragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  return (
    <div>
      <div className={style.container}>
        <div
          className={style.dropZone}
          onDrop={dragDrop}
          onDragOver={dragOver}
          onDragEnter={dragEnter}
          onDragLeave={dragLeave}
        >
          <p>Drag one or more files into this Drop Zone...</p>
        </div>
      </div>
      <RootDir />
    </div>
  )
}
//   const { getInputProps, getRootProps, isDragActive } = useDropzone({ onDrop })

// <div {...getRootProps()} className={style.dropZone}>
//   <input {...getInputProps()} />
//   {isDragActive ? (
//     <p>Drop the files here ...</p>
//   ) : (
//     <p>Drag N drop some files here, or click to select files</p>
//   )}
// </div>

//         const onDrop = useCallback((acceptedFiles) => {
//             acceptedFiles.forEach((file: File) => {
//       const reader = new FileReader()

//       reader.onabort = () => console.log('file reading was aborted')
//       reader.onerror = () => console.log('file reading has failed')
//       reader.onload = () => {
//         // Do whatever you want with the file contents
//         const binaryStr = reader.result
//         console.log(binaryStr)
//       }
//       console.log({ file })
//       reader.readAsArrayBuffer(file)
//     })
//   }, [])
