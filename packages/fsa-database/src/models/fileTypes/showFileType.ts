import changeFileTypeHidden from './changeFileTypeHidden'

export default async function showFileType(id: number) {
  await changeFileTypeHidden(id, false)
}
