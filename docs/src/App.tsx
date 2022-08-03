import { FsaDbContextProvider } from '@philstenning/react-fsa-database'
import './styles/index.css'
import RootDirectories from './components/rootDirectories'
import DirectoriesForRoot from './components/directoriesForRoot'
import FilesForDirectory from './components/filesForDirectory'

function App() {
  return (
    <FsaDbContextProvider fileExtensionsForApp={['stl', 'png', 'gcode', '3mf']}>
      <div className="app">
        <div className="sidebar">
          <RootDirectories />
          <DirectoriesForRoot />
        </div>
        <FilesForDirectory />{' '}
      </div>
    </FsaDbContextProvider>
  )
}

export default App
