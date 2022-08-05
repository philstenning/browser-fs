import { FsaDbContextProvider } from '@philstenning/react-fsa-database'
import './styles/index.css'
import RootDirectories from './components/rootDirectories'
import DirectoriesForRoot from './components/directoriesForRoot'
import FilesForDirectory from './components/filesForDirectory'
import Collections from './components/collections'
import State from './components/state'
function App() {
  return (
    <FsaDbContextProvider fileExtensionsForApp={['jpeg', 'png', 'gif', 'jpg', 'svg','webP']}>
      <div className="app">
        <div className="sidebar">
           <RootDirectories />
           {/* <div>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem, animi illo quibusdam ea ipsam doloribus voluptatibus praesentium quaerat, incidunt, voluptatum quos pariatur rerum saepe at aperiam repudiandae neque architecto quo.</div> */}
          <DirectoriesForRoot />
          <Collections/>
          <State/> 
        </div>
        <FilesForDirectory />{' '}
      </div>
    </FsaDbContextProvider>
  )
}

export default App
