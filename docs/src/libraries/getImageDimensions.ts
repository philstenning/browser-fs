function getImageDimensions(
  url: string
): Promise<{ width: number; height: number; imageBitMap: ImageBitmap }> {
  return new Promise((resolve, reject) => {
    if ('OffscreenCanvas' in window) {
      const canvas = new OffscreenCanvas(100, 100)
      const context = canvas.getContext('2d')
      const request = new Request(url)

      fetch(request).then((response) => {
        response.blob().then((blob) => {
          if (context) {
            const dataUrl = URL.createObjectURL(blob)
            const image = new Image()
            image.onload = () => {
              context.drawImage(image, 0, 0)
              console.log('Offscreen width:', image.width)
              URL.revokeObjectURL(url)
              const height = image.naturalHeight
              const width = image.naturalWidth
              const imageBitMap = canvas.transferToImageBitmap()
              resolve({ width, height, imageBitMap })
            }
            image.src = dataUrl
          } else {
            reject('no context')
          }
        })
      })
    } else {
      reject('not supported')
    }
  })
}

export {getImageDimensions}
