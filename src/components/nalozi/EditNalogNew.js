import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";




export const EditNalogNew = () => {
    const { id } = useParams();
    const [nalog, setNalog] = useState([]);



    useEffect(() => {
        const getModelData = async () => {
          await axios.get(`http://localhost:1337/api/tests/${id}?populate=*`).then((res) => {
            let nalogView = res.data.data;
            setNalog(nalogView)
          });
        };
        getModelData();
      }, [id]);

      console.log(nalog)

  return (
    <div className="container-xl">
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg mx-2">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
            <th scope="col" className="py-3 px-6">Status</th>
            <th scope="col" className="py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {nalog?.map((nalog, index) => (
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

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      
  </div>
  )
}
