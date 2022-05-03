import { BrowserRouter, Route, Routes } from "react-router-dom";
// import About from "../../routes/About";
// import Contact from "../../routes/Contact";
// import Home from "../../routes/Home";
// import Db from "../../routes/db";
import Start from '../../routes/start'
import TestPage from "../../routes/testPage";
import Settings from '../../routes/settings'
import Layout from "./Layout";
import {
  // RootDirectoryProvider,
  FsaDbContextProvider,
} from "react-fsa-database";
// import {RootDirectoryProvider} from 'react-fsa-browser'

function App() {
  return (
    <FsaDbContextProvider>
      <BrowserRouter>
        <Routes>
          {/*  pages are wrapped in the  Layout component. */}
          <Route path="/" element={<Layout />}>
            {/* <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/db" element={<Db />} /> */}
            <Route path="/settings" element={<Settings />} />
            <Route path="/provider" element={<TestPage />} />
            <Route index element={<Start />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FsaDbContextProvider>
  );
}

export default App;  
//  <RootDirectoryProvider  InitialRootDirectoryOrder="asc">
{/* </RootDirectoryProvider>  */}