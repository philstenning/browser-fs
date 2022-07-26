import changeFileTypeHidden from './changeFileTypeHidden'

/**
 * @category Files Types
 */
export default async function showFileType(id: number) {
  await changeFileTypeHidden(id, false)
}
