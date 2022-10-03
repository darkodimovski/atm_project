import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDownloadExcel } from 'react-export-table-to-excel';


const Home = () => {
  const [listaNaloga, setListaNaloga] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:1337/api/tests?populate=*");
    setListaNaloga(result.data.data);
  };

  const deleteUser = async id => {
    await axios.delete(`http://localhost:1337/api/tests/${id}?populate=*`);
    loadUsers();
  };

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'Nalozi',
    sheet: 'Nalozi'
  })




console.log(listaNaloga)

  return (
    <div className="container-xxl px-2">
      <div className="py-4">
        <h1 className="h3">Lista zahtjeva</h1>
        <table className="table table-dark table-striped shadow" ref={tableRef}>
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Tid</th>
              <th scope="col">Serijski broj</th>
              <th scope="col">Mjesto</th>
              <th scope="col">Adresa</th>
              <th scope="col">Mikrolokacija</th>
              <th scope="col">Model bankomata</th>
              <th scope="col">Klijent</th>
              <th scope="col">Izvođač</th>
              <th scope="col">Opis radova</th>
              <th scope="col">Tip akcije</th>
              <th scope="col">Zahtjev kreiran</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {listaNaloga?.map((nalog, index) => (
              <tr key={nalog.id}>
                <th scope="row">{index + 1}</th>
                <td className="allign-middle">{nalog.attributes.tid}</td>
                <td>{nalog.attributes.sn}</td>
                <td>{nalog.attributes.mjesto}</td>
                <td>{nalog.attributes.adresa}</td>
                <td>{nalog.attributes.mikrolokacija}</td>
                { nalog.attributes.model_atms.data.map(model => {
                      return (
                        <td key={model.id}>
                          {model.attributes.model}
                        </td>
                        )
                      }) 
                }
                {
                  nalog.attributes.clients.data.map(client => {
                    return (
                      <td key={client.id}>
                        {client.attributes.NAZIV_KLIJENTA}
                      </td>
                    )
                  }) 
                }
                {
                  nalog.attributes.izvodjacis.data.map(tp => {
                    return (
                      <td key={tp.id}>
                        {tp.attributes.naziv}
                      </td>
                    )
                  }) 
                }
                <td>{nalog.attributes.opisRadova}</td>
                {
                  nalog.attributes.tipakcijes.data.map(akcija => {
                    return (
                      <td key={akcija.id}>
                        {akcija.attributes.tipakcije}
                      </td>
                    )
                  }) 
                  }
                  <td>{nalog.attributes.datumZahtjeva}</td>
                  {/* { nalog.attributes.datumZahtjeva === false ? <td>Closed</td> : <td>Open</td> } */}

                <td>
                  <Link className="btn btn-primary mr-2" to={`/api/tests/view/${nalog.id}?populate=*`}>
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mr-2"
                    to={`/api/tests/${nalog.id}?populate=*`}
                  >
                    Edit
                  </Link>
                  <Link to='#'
                    className="btn btn-danger"
                    onClick={() => deleteUser(nalog.id)}
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button type="button" className="btn btn-outline-primary mr-2" onClick={onDownload}>Export data</button>         
    </div>
  );
};

export default Home;
