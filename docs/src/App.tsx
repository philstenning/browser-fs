import { FsaDbContextProvider } from '@philstenning/react-fsa-database'
import './styles/index.css'
import RootDirectories from './components/rootDirectories'
import DirectoriesForRoot from './components/directoriesForRoot'
import FilesForDirectory from './components/filesForDirectory'
import Collections from './components/collections'
import State from './components/state'
function App() {
  return (
    <FsaDbContextProvider
      fileExtensionsForApp={['jpeg', 'png', 'gif', 'jpg', 'svg', 'webP']}
    >
      {/* <FsaDbContextProvider fileExtensionsForApp={['3mf', 'stl', 'gcode']}> */}
      <div className="app">
        <div className="sidebar">
          <RootDirectories />
          <DirectoriesForRoot />
          <Collections />
          <State />
        </div>
        <FilesForDirectory />{' '}
      </div>
    </FsaDbContextProvider>
  )
}

export default App
