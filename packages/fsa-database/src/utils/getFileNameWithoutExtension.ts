/**
 * @category Utils
 */
export default function getFileNameWithoutExtension(name: string) {
  return name.substring(0, name.lastIndexOf('.'))
}
