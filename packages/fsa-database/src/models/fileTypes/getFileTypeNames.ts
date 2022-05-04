import {db} from '../../'
export async function getFileTypeNames() {
  return await db.fileTypes
    .toArray()
    .then((_fileType) => _fileType.map((_fileType) => _fileType.name));
}
