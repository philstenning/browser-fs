import { BrowserRouter, Route, Routes } from "react-router-dom";
// import About from "../../routes/About";
// import Contact from "../../routes/Contact";
// import Home from "../../routes/Home";
// import Db from "../../routes/db";
import DbProvider from "../../routes/dbProvider";

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
            <Route path="/provider" element={<DbProvider />} />
            <Route index element={<DbProvider />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FsaDbContextProvider>
  );
}

export default App;  
//  <RootDirectoryProvider  InitialRootDirectoryOrder="asc">
{/* </RootDirectoryProvider>  */}