import { createVirtualFileSystemHandleFromFile } from './scanLocalDrive'

const fileTypes = ['svg', 'png', '.jpg']
describe('', () => {
 
    test('file.name should be file.svg', () => {
      const handle = { name: 'file.svg', kind: 'file' } as FileSystemFileHandle
      expect(
        createVirtualFileSystemHandleFromFile(handle, '/foo', 10, fileTypes)?.name
        ).toBe('file.svg')
      })

      test('file.name should be file.JPG', () => {
        const handle = { name: 'file.JPG', kind: 'file' } as FileSystemFileHandle
        expect(
      createVirtualFileSystemHandleFromFile(handle, '/foo', 10, fileTypes)?.name
    ).toBe('file.JPG')
  })
})
export {}
