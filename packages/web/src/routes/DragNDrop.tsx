import React from 'react'

import RootDir from '../components/rootDirectories/rootDirectories'

import saveDragItems from '../1_tempoary/saveDragItems'

// import { useDropzone } from 'react-dropzone'
// @ts-ignore
import style from './DragNDrop.module.css'
export default function DragNDrop() {
  const dragDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    // const filesList = e.dataTransfer.files
    const dataTransferItemList = e.dataTransfer.items

    // console.log(dataTransferItemList.length)
    await saveDragItems(dataTransferItemList)
    // #################
    // if (item.webkitGetAsEntry().isDirectory) {
    //   // @ts-ignore // createReader is no longer in ts
   
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

