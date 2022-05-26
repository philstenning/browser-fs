import { FsaDbContextProvider } from 'react-fsa-database'
import RootDirectories from './components/rootDirectories'
import Directories from './components/directories'
import DirectoryFiles from './components/directoryFiles'
import Collections from './components/collections'
import './app.css'

function App() {
  return (
    <div className="app">
      <FsaDbContextProvider
        fileExtensionsForApp={['gcode', '.3mf', 'jpg', 'stl']}
      >
        <div 
        className='left-column'>
        <RootDirectories />
        <Directories />
        <Collections/>

        </div>
        <div className="right-column">

        <DirectoryFiles />
        </div>
      </FsaDbContextProvider>
    </div>
  )
}

export default App
