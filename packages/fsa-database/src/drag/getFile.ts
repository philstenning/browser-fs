const getFile = (fileSystemEntry: FileSystemFileEntry) =>
  new Promise<File>((resolve, reject) => {
    fileSystemEntry.file(
      (f) => {
        resolve(f)
      },
      (e) => reject(e)
    )
  })
export default getFile
