import { db, fsaFileType, useLiveQuery } from "fsa-database";

function useFileTypes() {
  const fileTypes = useLiveQuery(() => db.fileTypes.toArray()) ?? [];

  const addFileType = (name: string) => {
    const _name = name.replace(".", "").trim().toLowerCase();
    const _fileType: fsaFileType = {
      name: _name,
      hidden: false,
      selected: true,
    };
    db.fileTypes.add(_fileType);
  };

  const deleteFileType = (fileType:fsaFileType, andAllFilesWithExtension:boolean=false) => {
    if(!fileType.id) return
    db.fileTypes.delete(fileType.id);
    if(andAllFilesWithExtension){
      db.files.where('type').equals(fileType.name).delete()
    }
  };

  const toggleSelectedFileType = (fileType: fsaFileType) => {
    if (fileType.id) {
      db.fileTypes.update(fileType.id, { selected: !fileType.selected });
    }
  };
  const toggleHiddenFileType = (fileType: fsaFileType) => {
    if (fileType.id) {
      db.fileTypes.update(fileType.id, { hidden: !fileType.hidden });
    }
  };

  return {
    fileTypes,
    addFileType,
    toggleSelectedFileType,
    toggleHiddenFileType,
    deleteFileType
  };
}


export { useFileTypes };
