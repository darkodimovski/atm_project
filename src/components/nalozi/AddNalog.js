import React, { useState, useEffect } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";



const url = `http://localhost:1337/api/tipakcijes`;
const modelUrl = 'http://localhost:1337/api/model-atms';
const clientsUrl = 'http://localhost:1337/api/clients';
const izvodjaciUrl = 'http://localhost:1337/api/izvodjacis';
const statusUrl = 'http://localhost:1337/api/statuses';



const AddNalog = () => {
  const history = useNavigate();
  const [nalog, setNalog] = useState({
    tid: '',
    sn: '',
    clients: '',
    statuses: '',
    adresa: '',
    izvodjacis: '',
    mikrolokacija: '',
    opisRadova: '',
    mjesto: '',
    kontakt: '',
    model_atms: '',
    tipakcijes: '',
    datumZahtjeva: new Date().toISOString().slice(0, 10),
  });

  const { tid, sn, clients, adresa, izvodjacis, mikrolokacija, opisRadova, mjesto, kontakt, model_atms, tipakcijes, datumZahtjeva, statuses } = nalog;


  const onInputChange = e => {
    setNalog({ ...nalog, [e.target.name]: e.target.value });
  };


  const onSubmit = e => {
    e.preventDefault();

    const data = {
      tid: nalog.tid,
      sn: nalog.sn,
      clients: nalog.clients,
      izvodjacis: nalog.izvodjacis,
      mjesto: nalog.mjesto,
      adresa: nalog.adresa,
      mikrolokacija: nalog.mikrolokacija,
      kontakt: nalog.kontakt,
      datumZahtjeva: nalog.datumZahtjeva,
      opisRadova: nalog.opisRadova,
      model_atms: nalog.model_atms,
      tipakcijes: nalog.tipakcijes,
      statuses: nalog.statuses
    }


    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data })
    };
 
    fetch('http://localhost:1337/api/tests?populate=*', requestOptions)
    .then(response => response)
    .then(res => res);
      history("/");
  };


  const [akcija, setAkcija] = useState([]);
  const [model, setModel] = useState([])
  const [client, setClient] = useState([])
  const [tplista, setTpLista] = useState([]);
  const [statusZahtjeva, setStatusZahtjeva] = useState([]);

   

  useEffect(() => {
    const getData = async () => {
      await axios.get(url).then((res) => {
        let akcije = res.data.data;
        setAkcija(akcije)
      });
    };
    getData();
  }, []);

  useEffect(() => {
    const getStatusData = async () => {
      await axios.get(statusUrl).then((res) => {
        let statusNaloga = res.data.data;
        setStatusZahtjeva(statusNaloga)
        console.log(statusNaloga)
      });
    };
    getStatusData();
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
      <div className="flex justify-center">
      <div className="bg-slate-900 p-8 rounded-xl">
        <form onSubmit={e => onSubmit(e)}>
          <div className="mb-1 grow ">
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Unesi tid"
              name="tid"
              value={tid}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="mb-1">
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Unesi serijski broj"
              name="sn"
              value={sn}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="mb-1">
          <select
                name='clients'
                value={clients}
                onChange={e => onInputChange(e)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option>Odaberi klijenta</option>
              { client?.map((cli) => (
                        <option key={cli.id} value={cli.id}>{cli.attributes.NAZIV_KLIJENTA}</option>
                        ))}
          </select>
          </div>
          <div className="mb-1">
              <select
                name='izvodjacis'
                value={izvodjacis}
                onChange={e => onInputChange(e)} 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option>Odaberi izvođača</option>
              { tplista?.map((tp) => (
                        <option key={tp.id} value={tp.id}>{tp.attributes.naziv}</option>
                        ))}
              </select>
          </div>
          <div className="mb-1">
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Mjesto"
              name="mjesto"
              value={mjesto}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="mb-1">
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Adresa"
              name="adresa"
              value={adresa}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="mb-1">
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Mikrolokacija"
              name="mikrolokacija"
              value={mikrolokacija}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="mb-1">
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Kontakt"
              name="kontakt"
              value={kontakt}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="mb-1">
            <input
              type="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Datum zahtjeva"
              name="datumZahtjeva"
              value={datumZahtjeva}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="mb-1">
            <textarea 
                name="opisRadova" 
                placeholder="Opis radova" 
                value={opisRadova}
                onChange={e => onInputChange(e)} 
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
          </div>
          <div className="mb-1">
            <select
              name='model_atms' 
              value={model_atms}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={e => onInputChange(e)} 
          >
              <option>Izaberi model</option>
            { model?.map((name) => (
                      <option key={name.id} value={name.id}>{name.attributes.model}</option>
                      ))}
            </select>
          </div>
          <div className="mb-1">
          <select
              name='tipakcijes' 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={tipakcijes}
              onChange={e => onInputChange(e)}
          >
            <option>Odaberi akciju</option>
            { akcija?.map((akc) => (
                      <option key={akc.id} value={akc.id}>{akc.attributes.tipakcije}</option>
                      ))}
            </select> 
            <select
              name='statuses'
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={statuses}
              onChange={e => onInputChange(e)}

          >
            <option>Odaberi status</option>
            { statusZahtjeva?.map((stat) => (
                      <option key={stat.id} value={stat.id}>{stat.attributes.status}</option>
                      ))}
            </select> 
          </div>
          
          <button className="mt-1 w-full text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 disabled:opacity-40" disabled={!tid}>Kreiraj zahtjev</button>
        </form>
      </div>
    </div>
  );
};

export default AddNalog;
