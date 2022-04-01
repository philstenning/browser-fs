import { BrowserRouter, Route, Routes } from "react-router-dom";
import {About,Contact,Home} from "../routes";
import Layout from "./Layout";
import { RootDirectoryProvider } from "../utils/context/root-directory-context";

function App() {
  return (
    <RootDirectoryProvider>

    <BrowserRouter>
      <Routes>
        {/*  pages are wrapped in the  Layout component. */}
        <Route path="/" element={<Layout />}>
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route index element={<Home/>} />
        </Route>
      </Routes>
    </BrowserRouter>
    </RootDirectoryProvider>
  );
}

export default App;
