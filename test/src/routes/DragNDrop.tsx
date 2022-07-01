import React from 'react'

import RootDir from '../components/rootDirectories/rootDirectories'

import {saveDragItems} from 'fsa-database'

// import { useDropzone } from 'react-dropzone'
// @ts-ignore
import style from './DragNDrop.module.css'
export default function DragNDrop() {
  const dragDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const dataTransferItemList = e.dataTransfer.items
    await saveDragItems(dataTransferItemList)
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
