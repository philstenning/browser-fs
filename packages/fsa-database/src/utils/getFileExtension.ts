export default function getFileExtension(name: string) {
  return name.substring(name.lastIndexOf('.'), name.length)
}
