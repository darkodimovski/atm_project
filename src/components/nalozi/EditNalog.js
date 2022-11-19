import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


const url = `http://localhost:1337/api/tipakcijes`;
const modelUrl = 'http://localhost:1337/api/model-atms';
const clientsUrl = 'http://localhost:1337/api/clients';
const izvodjaciUrl = 'http://localhost:1337/api/izvodjacis';


const EditNalog = () => {
  let history = useNavigate();
  const { id } = useParams();
  const [akcija, setAkcija] = useState([]);
  const [model, setModel] = useState([])
  const [client, setClient] = useState([])
  const [tplista, setTpLista] = useState([]);
  const [nalog, setNalog] = useState([]);


  const handleEdit = e => {
    setNalog({ ...nalog, [e.target.name]: e.target.value });
  };


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
    }

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data })
    };
 
    fetch(`http://localhost:1337/api/tests/${id}?populate=*`, requestOptions)
    .then(response => response)
    .then(res => res);
      history("/");
  };


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
              placeholder='Unesi Tid'
              name='tid'
              defaultValue={nalog?.attributes?.tid || ''}
              onChange={e => handleEdit(e)}
            />
          </div>
          <div className="mb-1">
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder='Unesi Serijski Broj'
              name="sn"
              defaultValue={nalog?.attributes?.sn || ''}
              onChange={e => handleEdit(e)}
            />
          </div>
          <div className="mb-1">
            <select
                  name='clients'
                  onChange={e => handleEdit(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              
                    {nalog?.attributes?.clients?.data.map(cl => (
                      <option key={cl.id}>
                        {cl.attributes.NAZIV_KLIJENTA}
                      </option>
                    ))}
              
              { client?.map((cli) => (
                      <option key={cli.id} value={cli.id}>{cli.attributes.NAZIV_KLIJENTA}</option>
                    ))}  
                        
            </select>
          </div>
          <div className="mb-1">
          <select
                  name='clients'
                  onChange={e => handleEdit(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              
                 <option>odaberi</option>
                      { tplista?.map((cli) => (
                      <option key={cli.id} value={cli.id}>{cli.attributes.naziv}</option>
                    ))}     
            </select>
          </div>
          <div className="mb-1">
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Mjesto"
              name="mjesto"
              onChange={e => handleEdit(e)}
            />
          </div>
          <div className="mb-1">
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Adresa"
              name="adresa"
              onChange={e => handleEdit(e)}
            />
          </div>
          <div className="mb-1">
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Mikrolokacija"
              name="mikrolokacija"
              onChange={e => handleEdit(e)}
            />
          </div>
          <div className="mb-1">
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Kontakt"
              name="kontakt"
              onChange={e => handleEdit(e)}
            />
          </div>
          <div className="mb-1">
            <input
              type="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Datum zahtjeva"
              name="datumZahtjeva"
              onChange={e => handleEdit(e)}
            />
          </div>
          <div className="mb-1">
            <textarea 
                name="opisRadova" 
                placeholder="Opis radova" 
                onChange={e => handleEdit(e)} 
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
          </div>
          <div className="mb-1">
            <select
              name='model_atms' 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={e => handleEdit(e)} 
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
              onChange={e => handleEdit(e)} 
          >
            <option>Odaberi akciju</option>
            { akcija?.map((akc) => (
                      <option key={akc.id} value={akc.id}>{akc.attributes.tipakcije}</option>
                      ))}
            </select> 
          </div>
          <button className="w-full text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 disabled:opacity-40">Editiraj zahtjev</button>
        </form>
      </div>

    </div>
  );
};

export default EditNalog;
