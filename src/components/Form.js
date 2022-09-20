import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';


const url = `http://localhost:1337/api/tipakcijes`;
const modelUrl = 'http://localhost:1337/api/model-atms';
const clientsUrl = 'http://localhost:1337/api/clients';
const izvodjaciUrl = 'http://localhost:1337/api/izvodjacis';

function Form(props) {
  const { 
    onTidChange,
    tid,
    onSubmit, 
    onTipAkcijeChange,
    sn,
    onSnChange,
    onModelChange,
    onAdresaChange,
    adresa,
    mikrolokacija,
    onMikrolokacijaChange,
    opisRadova,
    onOpisRadovaChange,
    error,
    mjesto,
    onMjestoChange,
    datumZahtjeva,
    onDatumZahtjevaChange,
    onClientsChange,
    kontakt,
    onKontaktChange,
    onIzvodjacisChange
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
    <div className='flex items-center justify-center pl-3 pr-3'>
          <form className="dark:bg-gray-600 shadow-md rounded-xl w-full max-w-lg p-20">
            <h1 className='flex justify-center text-white font-mono mb-3 text-xl'>Unesi nalog</h1>
            { error && tid.length <= 0  ? 
            <label htmlFor="tid">TID can't be empty</label> : ''}
              <input 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3 dark:border-gray-600" 
                id="tid" 
                placeholder="Unesi TID" 
                onChange={onTidChange} 
                value={tid} 
              />
            { error && sn.length <= 0  ? 
              <label htmlFor="tid">Serial number can't be empty</label> : ''}
              <input 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3 dark:border-gray-600" 
                id="sn" 
                placeholder="Serijski Broj" 
                onChange={onSnChange} 
                value={sn} 
              />
              <select 
                onChange={onClientsChange} 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-100 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3 dark:border-gray-600">
                <option>Odaberi klijenta</option>
              { client?.map((cli) => (
                        <option key={cli.id} value={cli.id}>{cli.attributes.NAZIV_KLIJENTA}</option>
                        ))}
              </select>
              <select 
                onChange={onIzvodjacisChange} 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-100 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3 dark:border-gray-600">
                <option>Odaberi izvođača</option>
              { tplista?.map((tp) => (
                        <option key={tp.id} value={tp.id}>{tp.attributes.naziv}</option>
                        ))}
              </select>
            { error && mjesto.length <= 0  ? 
            <label htmlFor="tid">Mjesto can't be empty</label> : ''}
            <input 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3 dark:border-gray-600" 
              id="mjesto" 
              placeholder="Mjesto" 
              onChange={onMjestoChange} 
              value={mjesto} 
            />
            { error && adresa.length <= 0  ? 
            <label htmlFor="tid">Adresa can't be empty</label> : ''}
            <input 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-100 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3 dark:border-gray-600" 
              id="adresa" 
              placeholder="Adresa" 
              onChange={onAdresaChange} 
              value={adresa} 
            />
            <input 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-100 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3 dark:border-gray-600" 
              id="mikrolokacija" 
              placeholder="Mikrolokacija" 
              onChange={onMikrolokacijaChange} 
              value={mikrolokacija} 
            />
            <input 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-100 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3 dark:border-gray-600" 
              id="kontakt" 
              placeholder="Kontakt" 
              onChange={onKontaktChange} 
              value={kontakt} 
            />
            <label className='flex justify-center text-white font-mono mb-3' htmlFor="date">Datum zahtjeva:</label>
            <input 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-100 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3 dark:border-gray-600" 
              type="date" id="datum-realizacije" 
              placeholder="Datum realizacije" 
              onChange={onDatumZahtjevaChange} 
              value={datumZahtjeva} 
            />
            <textarea
                id="opis-radova" 
                name="w3review" 
                placeholder="Opis radova" 
                onChange={onOpisRadovaChange} 
                value={opisRadova} 
                className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3 h-40 dark:border-gray-600"
              />
            <select 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-100 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3 dark:border-gray-600" 
              onChange={onModelChange}>
              <option>Izaberi model</option>
            { model?.map((name) => (
                      <option key={name.id} value={name.id}>{name.attributes.model}</option>
                      ))}
            </select>
            <select  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-100 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3 dark:border-gray-600" onChange={onTipAkcijeChange}>
            <option>Odaberi akciju</option>
            { data?.map((akc) => (
                      <option key={akc.id} value={akc.id}>{akc.attributes.tipakcije}</option>
                      ))}
            </select>
            <button 
              className="text-white bg-gradient-to-br from-green-400 to-blue-600 focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-full disabled:opacity-30" 
              type="Button" 
              value="Submit" 
              onClick={onSubmit} 
              disabled={!tid || !sn}
              >
                Zadaj Nalog
            </button>
          </form>
    </div>
  )
}

export default Form