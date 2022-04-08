import { BrowserRouter, Route, Routes } from "react-router-dom";
import {About,Contact,Home,Db,DbProvider} from "../routes";
import Layout from "./Layout";
import { RootDirectoryProvider,FsaDbContextProvider } from "react-fsa-browser";

function App() {
  return (
    <RootDirectoryProvider  InitialRootDirectoryOrder="asc">
<FsaDbContextProvider>

    <BrowserRouter>
      <Routes>
        {/*  pages are wrapped in the  Layout component. */}
        <Route path="/" element={<Layout />}>
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/db" element={<Db />} />
          <Route path="/provider" element={<DbProvider />} />
          <Route index element={<Home/>} />
        </Route>
      </Routes>
    </BrowserRouter>

</FsaDbContextProvider>
    </RootDirectoryProvider>
  );
}

export default App;
