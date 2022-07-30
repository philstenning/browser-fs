import { getSidebarData, SidebarModule } from '../lib/sidebar'

describe('it should the fsa-browser SidebarModule', () => {
  const data = getSidebarData('fsa-browser') as SidebarModule
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

export {}
