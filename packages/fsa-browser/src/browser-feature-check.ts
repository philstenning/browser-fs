/**
 * check if features are available in browser.
 */
function browserCheck() {
    const result = {
      showDirectoryPicker: false,
    };
  if ("showDirectoryPicker" in window) {
    result.showDirectoryPicker=true
  }
  return result
}

export { browserCheck };
