import changeFileTypeHidden from './changeFileTypeHidden'

export default async function hideFileType(id: number) {
  await changeFileTypeHidden(id, true)
}





