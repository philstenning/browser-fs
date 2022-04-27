function getFileNameWithoutExtension(name: string) {
  return name.substring(0, name.lastIndexOf("."));
}
function getFileExtension(name: string) {
  return name.substring(name.lastIndexOf("."), name.length);
}


export { getFileExtension,getFileNameWithoutExtension}