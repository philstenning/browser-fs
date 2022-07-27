import changeFileTypeHidden from './changeFileTypeHidden'

/**
 * 
 * @category Files Types
 */
export default async function hideFileType(id: number) {
  await changeFileTypeHidden(id, true)
}





