
import RootDirs from './rootDirectories'
import { FsaDbContextProvider } from 'react-fsa-database'
describe('<RootDirs>', () => {
  it('mount', () => {
    cy.mount(
      <FsaDbContextProvider>

        <div>fff</div>
     </FsaDbContextProvider>
    )
  })
})
