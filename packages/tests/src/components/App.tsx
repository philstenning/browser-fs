import { BrowserRouter, Route, Routes } from "react-router-dom";
import {About,Contact,Home,Db} from "../routes";
import Layout from "./Layout";
import { RootDirectoryProvider } from "react-fsa-browser";
// import {createDatabase} from 'fsa-database'


// createDatabase() // initialize the database

function App() {
  return (
    <RootDirectoryProvider  InitialRootDirectoryOrder="asc">

    <BrowserRouter>
      <Routes>
        {/*  pages are wrapped in the  Layout component. */}
        <Route path="/" element={<Layout />}>
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/db" element={<Db />} />
          <Route index element={<Home/>} />
        </Route>
      </Routes>
    </BrowserRouter>
    </RootDirectoryProvider>
  );
}

export default App;
