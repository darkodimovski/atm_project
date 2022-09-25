import React from 'react'
import {useState, useEffect} from 'react';

export const ListaNaloga = () => {
  const [listaNaloga, setListaNaloga] = useState();



  function update() {
    fetch('http://localhost:1337/api/tests?populate=*')
      .then(res => res.json())
      .then(atm => {
        setListaNaloga(atm.data);
      })
  }
  
  useEffect(() => {
    update();
  }, [])


  return (
      <div className="flex flex-col px-2">
            <div className="overflow-x-auto relative">

              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                      TID
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                      Serijski broj
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                      Mjesto
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                      Adresa
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                      Mikrolokacija
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                      Model ATM
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                      Klijent
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                      Izvođač
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                      opis radova
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                      tip akcije
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                      zahtjev kreiran
                    </th>
                   </tr>
                  </thead>

               <tbody>
                {
                  listaNaloga?.map(nalog => {
                    return(
                      <tr key={nalog.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="py-4 px-6">
                          {nalog.attributes.tid}
                        </td>
                        <td className="py-4 px-6">
                          {nalog.attributes.sn}
                        </td>
                        <td className="py-4 px-6">
                          {nalog.attributes.mjesto}
                        </td>
                        <td className="py-4 px-6">
                          {nalog.attributes.adresa}
                        </td>
                        <td className="py-4 px-6">
                          {nalog.attributes.mikrolokacija}
                        </td>
                        {
                          nalog.attributes.model_atms.data.map(model => {
                            return (
                              <td className="py-4 px-6" key={model.id}>
                                {model.attributes.model}
                              </td>
                            )
                          }) 
                        }
                        
                        {
                          nalog.attributes.clients.data.map(client => {
                            return (
                              <td className="py-4 px-6" key={client.id}>
                                {client.attributes.NAZIV_KLIJENTA}
                              </td>
                            )
                          }) 
                        }

                        {
                          nalog.attributes.izvodjacis.data.map(tp => {
                            return (
                              <td className="py-4 px-6" key={tp.id}>
                                {tp.attributes.naziv}
                              </td>
                            )
                          }) 
                        }
                         <td className="py-4 px-6">
                          {nalog.attributes.opisRadova}
                        </td>
                        {
                          nalog.attributes.tipakcijes.data.map(akcija => {
                            return (
                              <td className="py-4 px-6" key={akcija.id}>
                                {akcija.attributes.tipakcije}
                              </td>
                            )
                          }) 
                        }
                        
                        <td className="py-4 px-6">
                          {nalog.attributes.datumZahtjeva}
                        </td>
                      </tr>
                    )
                  })
                }
                
              </tbody>
              
          </table>
    
        </div>
      
      </div>
  )
};
