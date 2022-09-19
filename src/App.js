import { UnosNaloga } from "./components/UnosNaloga";
import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import { Home } from "./components/Home";
import { ListaNaloga } from "./components/ListaNaloga";

function App() {
  return (
    <>
      <div>
      <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/unos-naloga'>Unos Naloga</Link>
        </li>
        <li>
          <Link to='/lista-naloga'>Lista Naloga</Link>
        </li>
      </div>
      <Routes>
        <Route path ="/" element={<Home />} />
        <Route path="/unos-naloga" element={<UnosNaloga />} />
        <Route path="/lista-naloga" element={<ListaNaloga />} />
      </Routes>
    </>
  );
}



export default App;
