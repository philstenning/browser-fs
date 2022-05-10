import React, { useCallback } from 'react'
import { dragAddFilesToDirectory, addRootDirectory } from 'fsa-database'
import RootDir from '../components/rootDirectories/rootDirectories'

import { createVirtualRootDirectory } from 'fsa-browser'

// import { useDropzone } from 'react-dropzone'
// @ts-ignore
import style from './DragNDrop.module.css'
export default function DragNDrop() {
  const dragDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    // const filesList = e.dataTransfer.files
    const dataTransferItemList = e.dataTransfer.items
    console.log(dataTransferItemList.length)
    await newFunction(dataTransferItemList)
    // #################
    // if (item.webkitGetAsEntry().isDirectory) {
    //   // @ts-ignore // createReader is no longer in ts
    //   // use getAsFileSystemHandle() instead
    //   const reader = wk.createReader() as FileSystemDirectoryReader
    //   reader.readEntries((entries) => {
    //     for (const entry of entries) {
    //       console.log(entry.name)
    //     }
    //   })
    //   console.log(reader)
    // }
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

async function newFunction(
  dataTransferItemList: DataTransferItemList,
  folderName: string = 'user Files'
) {
  const files: File[] = []
  const directories: DataTransferItem[] = []

  for (const item of dataTransferItemList) {
    // files
    if (item.webkitGetAsEntry().isFile) {
      files.push(item.getAsFile())
    }
    // directories
    if (item.webkitGetAsEntry().isDirectory) {
      directories.push(item)
    }
  }
  // add the files to the database
  if (!!files.length) {
    dragAddFilesToDirectory(files, folderName)
  }
  // add directories as rootDirectories
  // using FileSystemDirectoryHandles
  if (directories.length && 'showDirectoryPicker' in window) {
    console.log('dirs', directories.length)

    for (const dir of directories) {
      //@ts-ignore.
      dir.getAsFileSystemHandle().then((handle) => {
        const vRoot = createVirtualRootDirectory(handle, '', true)
        console.log(vRoot)
        addRootDirectory(vRoot)
      })
    }
  } else if (directories.length) {
    console.log(
      '%cYour browser does not have showDirectoryPicker implemented yet!!! 😢',
      'color:red;font-family:system-ui;font-size:1rem;-webkit-text-stroke: 1px black;font-weight:bold'
    )
    //TODO add using files.
  }
}
