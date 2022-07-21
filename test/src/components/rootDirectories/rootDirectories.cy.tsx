import { FsaDbContextProvider } from '@philstenning/react-fsa-database'
describe('<RootDirs>', () => {
  it('mount', () => {
    cy.mount(
      // this won't work atm the provider needs dexie
      // in the indexDB  and this doesn't load atm??
      <FsaDbContextProvider>
        <div>fff</div>
      </FsaDbContextProvider>
    )
  })
})
