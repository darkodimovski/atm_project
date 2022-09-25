import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';


const url = `http://localhost:1337/api/tipakcijes`;
const modelUrl = 'http://localhost:1337/api/model-atms';
const clientsUrl = 'http://localhost:1337/api/clients';
const izvodjaciUrl = 'http://localhost:1337/api/izvodjacis';

function Form(props) {
  const { 
    handleInputChange, handleSubmit, addFormData
  } = props;



  const [data, setData] = useState([]);
  const [model, setModel] = useState([])
  const [client, setClient] = useState([])
  const [tplista, setTpLista] = useState([]);


  useEffect(() => {
    const getData = async () => {
      /* const arr = []; */
      await axios.get(url).then((res) => {
        let result = res.data.data;
       /*    result.map((attr) => {
          return arr.push({ value: attr.attributes.tipakcije, label: attr.attributes.tipakcije });
        }); 
        setOptions(arr) */
        setData(result)
      });
    };
    getData();
  }, []);
  

  useEffect(() => {
    const getModelData = async () => {
      await axios.get(modelUrl).then((res) => {
        let atmModeli = res.data.data;
        setModel(atmModeli)
      });
    };
    getModelData();
  }, []);


  
  useEffect(() => {
    const getClientData = async () => {
      await axios.get(clientsUrl).then((res) => {
        let atmKlijenti = res.data.data;
        setClient(atmKlijenti)
      });
    };
    getClientData();
  }, []);


  useEffect(() => {
    const getIzvodjacistData = async () => {
      await axios.get(izvodjaciUrl).then((res) => {
        let atmIzvodjacis = res.data.data;
        setTpLista(atmIzvodjacis)
      });
    };
    getIzvodjacistData();
  }, []);
  


  return (
    <div className='flex items-center justify-center pl-3 pr-3 mb-20 lg:mb-0'>
          <form className="dark:bg-gray-700 shadow-md rounded-xl w-full max-w-lg p-20" onSubmit={handleSubmit}>
            <h1 className='flex justify-center text-white font-mono mb-3 text-xl'>Unesi nalog</h1>
  
              <input
                name='tid'
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3 dark:border-gray-600" 
                id="tid" 
                placeholder="Unesi TID" 
                onChange={handleInputChange}
              />
        
               <input
                name='sn'
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3 dark:border-gray-600" 
                id="sn" 
                placeholder="Serijski Broj" 
                onChange={handleInputChange} 
              />

              <select
                name='clients'
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:placeholder-gray-100 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3 dark:border-gray-600">
                <option>Odaberi klijenta</option>
              { client?.map((cli) => (
                        <option key={cli.id} value={cli.id}>{cli.attributes.NAZIV_KLIJENTA}</option>
                        ))}
              </select>

              <select
                name='izvodjacis'
                onChange={handleInputChange} 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:placeholder-gray-100 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3 dark:border-gray-600">
                <option>Odaberi izvođača</option>
              { tplista?.map((tp) => (
                        <option key={tp.id} value={tp.id}>{tp.attributes.naziv}</option>
                        ))}
              </select>

            <input
              name='mjesto'
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3 dark:border-gray-600" 
              placeholder="Mjesto" 
              onChange={handleInputChange} 

            />

            <input
              name='adresa'
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:placeholder-gray-100 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3 dark:border-gray-600"  
              placeholder="Adresa" 
              onChange={handleInputChange} 
            />
            <input
              name='mikrolokacija'
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:placeholder-gray-100 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3 dark:border-gray-600" 
              placeholder="Mikrolokacija" 
              onChange={handleInputChange} 
 
            />
            <input
              name='kontakt'
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:placeholder-gray-100 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3 dark:border-gray-600" 
              id="kontakt" 
              placeholder="Kontakt" 
              onChange={handleInputChange} 
   
            />
            <label className='flex justify-center text-white font-mono mb-3' htmlFor="date">Datum zahtjeva:</label>
            <input
              name='datumZahtjeva' 
              className="bg-gray-50 border border-gray-300 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:placeholder-gray-100 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3 dark:border-gray-600" 
              type="date" id="datum-realizacije" 
              placeholder="Datum realizacije" 
              onChange={handleInputChange} 

            />
            <textarea 
                name="opisRadova" 
                placeholder="Opis radova" 
                onChange={handleInputChange} 
                className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3 h-40 dark:border-gray-600"
              />
            <select
              name='model_atms' 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:placeholder-gray-100 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3 dark:border-gray-600" 
              onChange={handleInputChange}>
              <option>Izaberi model</option>
            { model?.map((name) => (
                      <option key={name.id} value={name.id}>{name.attributes.model}</option>
                      ))}
            </select>
            <select
              name='tipakcijes' 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:placeholder-gray-100 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3 dark:border-gray-600" 
              onChange={handleInputChange}>
            <option>Odaberi akciju</option>
            { data?.map((akc) => (
                      <option key={akc.id} value={akc.id}>{akc.attributes.tipakcije}</option>
                      ))}
            </select> 
            <button disabled={!addFormData.tid}
              className="text-white bg-gradient-to-br from-green-400 to-blue-600 focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-full disabled:opacity-30" 
              >
                Zadaj Nalog
            </button>
            
          </form>
    </div>
  )
}

export default Form