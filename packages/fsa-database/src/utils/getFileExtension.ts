export default function getFileExtension(name: string) {
  return name.substring(name.lastIndexOf('.') + 1, name.length)
}
