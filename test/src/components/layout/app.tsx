import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Start from '../../routes/start'
import TestPage from '../../routes/testPage'
import Settings from '../../routes/settings'
import Layout from './Layout'
import DragNDrop from '../../routes/DragNDrop'
import { FsaDbContextProvider } from '@philstenning/react-fsa-database'

function App() {
  return (
    <FsaDbContextProvider>
      <BrowserRouter basename={import.meta.env.VITE_DEPLOY_HOST?.toString()}>
        <Routes>
          {/*  pages are wrapped in the  Layout component. */}
          <Route path="/" element={<Layout />}>
            <Route path="/settings" element={<Settings />} />
            <Route path="/provider" element={<TestPage />} />
            <Route path="/dnd" element={<DragNDrop />} />
            <Route index element={<Start />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FsaDbContextProvider>
  )
}

export default App
//  <RootDirectoryProvider  InitialRootDirectoryOrder="asc">
{
  /* </RootDirectoryProvider>  */
}
