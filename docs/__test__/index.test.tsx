import { getSidebarPackageDetails, SidebarModule } from '../lib/sidebar'

describe('it should the fsa-browser SidebarModule', () => {
  const data = getSidebarPackageDetails('fsa-browser') as SidebarModule
  test('module name should be fsa-browser', () => {
    expect(data.name).toBe('fsa-browser')
  })

  test('module should have 4 entities', () => {
    expect(data.entities).toHaveLength(4)
  })

  test('should have function called browserCheck', () => {
    const functionName = data.entities
      .find((f) => f.title === 'Functions')
      ?.categories.find((f) => f.title === 'Other')
      ?.sidebarChildEntity.find((f) => f.name === 'browserCheck')?.name
    expect(functionName).toBe('browserCheck')
  })
})

describe('fsa-database should have functions',()=>{
   const data  = getSidebarPackageDetails('fsa-database')as SidebarModule
    test('should have function called checkHandlePermission', () => {
      const functionName = data.entities
        .find((f) => f.title === 'Functions')
        ?.categories.find((f) => f.title === 'Local File System')
        ?.sidebarChildEntity.find((f) => f.name === 'checkHandlePermission')
        ?.name
      expect(functionName).toBe('checkHandlePermission')
    })
})

export {}
