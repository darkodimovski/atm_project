import React from "react";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Navbar from "./components/layout/Navbar";
import { Route, Routes } from "react-router-dom";
import NotFound from "./components/pages/NotFound";
import AddNalog from "./components/nalozi/AddNalog";
import Nalog from "./components/nalozi/Nalog";
import EditNalog from "./components/nalozi/EditNalog";
import { EditNalogNew } from "./components/nalozi/EditNalogNew";


function App() {
  return (
      <>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
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
