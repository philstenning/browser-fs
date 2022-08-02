import { NextPage } from 'next'
import {FsaDbContextProvider} from '@philstenning/react-fsa-database/dist/esm'
const Home: NextPage = () => {
  return (
  <FsaDbContextProvider fileExtensionsForApp={['.stl','.3mf','gcode']}>

      <div>home</div>
  </FsaDbContextProvider>
  )
}

export default Home
