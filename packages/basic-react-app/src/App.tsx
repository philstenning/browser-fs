import { FsaDbContextProvider } from 'react-fsa-database'
// import RootDirectories from './components/rootDirectories'
// import Directories from './components/directories'

// import Collections from './components/collections'
import LeftSidebar from './components/layout/leftSidebar'
import RightSidebar from './components/layout/rightSidebar'
import Display from './components/display'

import DragBar from './components/layout/dragBar'
import './app.css'
import Grid from './components/layout/grid'
import Layout from './components/layout/layout'
function App() {
  return (
    <div className="app">
      <FsaDbContextProvider
        fileExtensionsForApp={['gcode', '.3mf', 'jpg', 'stl']}>
       {/* <Layout>
         <LeftSidebar/>
         <DragBar/>
         <Display/>
         <RightSidebar/>
       </Layout> */}
       <Grid/>

  
        
       
      </FsaDbContextProvider>
    </div>
  )
}

export default App
