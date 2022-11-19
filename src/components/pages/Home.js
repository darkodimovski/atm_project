import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDownloadExcel } from 'react-export-table-to-excel';


const Home = () => {
  const [listaNaloga, setListaNaloga] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    loadNalog();
  }, []);

  const loadNalog = async () => {
    const result = await axios.get("http://localhost:1337/api/tests?populate=*");
    setListaNaloga(result.data.data);
  };

  const deleteUser = async id => {
    await axios.delete(`http://localhost:1337/api/tests/${id}?populate=*`);
    loadNalog();
  };



  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'Nalozi',
    sheet: 'Nalozi'
  })



  return (
    <div className="container-xl">
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg mx-2">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400" ref={tableRef}>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">#</th>
              <th scope="col" className="py-3 px-6">Tid</th>
              <th scope="col" className="py-3 px-6">Serijski broj</th>
              <th scope="col" className="py-3 px-6">Mjesto</th>
              <th scope="col" className="py-3 px-6">Adresa</th>
              <th scope="col" className="py-3 px-6">Mikrolokacija</th>
              <th scope="col" className="py-3 px-6">Model ATM</th>
              <th scope="col" className="py-3 px-6">Klijent</th>
              <th scope="col" className="py-3 px-6">Izvođač</th>
              <th scope="col" className="py-3 px-6">Opis radova</th>
              <th scope="col" className="py-3 px-6">Tip akcije</th>
              <th scope="col" className="py-3 px-6">Zahtjev kreiran</th>
              <th scope="col" className="py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {listaNaloga?.map((nalog, index) => (
              <tr key={nalog.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" className="py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white text-xs">{index + 1}</th>
                <td className="py-2 px-6 text-xs">{nalog.attributes.tid}</td>
                <td className="py-2 px-6 text-xs">{nalog.attributes.sn}</td>
                <td className="py-2 px-6 text-xs">{nalog.attributes.mjesto}</td>
                <td className="py-2 px-6 text-xs">{nalog.attributes.adresa}</td>
                <td className="py-2 px-6 text-xs">{nalog.attributes.mikrolokacija}</td>
                { nalog.attributes.model_atms.data.map(model => {
                      return (
                        <td key={model.id} className="py-2 px-6 text-xs">
                          {model.attributes.model}
                        </td>
                        )
                      }) 
                }
                {
                  nalog.attributes.clients.data.map(client => {
                    return (
                      <td key={client.id} className="py-2 px-6 text-xs">
                        {client.attributes.NAZIV_KLIJENTA}
                      </td>
                    )
                  }) 
                }
                {
                  nalog.attributes.izvodjacis.data.map(tp => {
                    return (
                      <td key={tp.id} className="py-2 px-6 text-xs">
                        {tp.attributes.naziv}
                      </td>
                    )
                  }) 
                }
                <td className="py-2 px-6 text-xs">{nalog.attributes.opisRadova}</td>
                {
                  nalog.attributes.tipakcijes.data.map(akcija => {
                    return (
                      <td key={akcija.id} className="py-2 px-6 text-xs">
                        {akcija.attributes.tipakcije}
                      </td>
                    )
                  }) 
                  }
                  <td className="py-2 px-6 text-xs">{nalog.attributes.datumZahtjeva}</td>

                   {
                    nalog.attributes.statuses.data.map(status => {
                      return (
                        <td key={status.id} className="py-2 px-6 text-xs">
                          {status.attributes.status}
                        </td>
                      )
                    }) 
                  } 

                  
                <td>
                  <Link className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-xs px-2 py-1 text-center mr-2 mb-2" to={`/api/tests/view/${nalog.id}?populate=*`}>
                    View
                  </Link>

                  <Link
                    className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-xs px-2 py-1 text-center mr-2 mb-2"
                    to={`/api/tests/${nalog.id}/`}
                  >
                    Edit
                  </Link>
                  
                  <Link to='#'
                    className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-xs px-2 py-1 text-center mr-2 mb-2"
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

      <button type="button" className="mx-2 mt-2 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-xs px-2 py-1 text-center mr-2 mb-2" onClick={onDownload}>Export data</button>         
    </div>
  );
};

export default Home;
