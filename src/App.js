import React from "react";
import ListView from "./components/pages/ListView";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import { Route, Routes } from "react-router-dom";
import NotFound from "./components/pages/NotFound";
import AddNalog from "./components/nalozi/AddNalog";
import Nalog from "./components/nalozi/Nalog";
import EditNalog from "./components/nalozi/EditNalog";
import DrawerAppBar from "./components/layout/AppBar";



function App() {
  return (
      <>
        <DrawerAppBar />
        <Routes>
          <Route path="/" exact element={<ListView />} />
          <Route path="/about" exact element={<About />} />
          <Route path="/contact" exact element={<Contact />} />
          <Route path="/nalozi/add" exact element={<AddNalog />} />
          <Route path="/api/tests/:id" exact element={<EditNalog />} />
          <Route path="/api/tests/view/:id" exact element={<Nalog />} />
          <Route element={<NotFound />} />
        </Routes>
      </>

  );
}

export default App;
