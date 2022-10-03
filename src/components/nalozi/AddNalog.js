import React, { useState, useEffect } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";



const url = `http://localhost:1337/api/tipakcijes`;
const modelUrl = 'http://localhost:1337/api/model-atms';
const clientsUrl = 'http://localhost:1337/api/clients';
const izvodjaciUrl = 'http://localhost:1337/api/izvodjacis';


const AddNalog = () => {
  const history = useNavigate();
  const [nalog, setNalog] = useState({
    tid: '',
    sn: '',
    clients: '',
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

  const { tid, sn, clients, adresa, izvodjacis, mikrolokacija, opisRadova, mjesto, kontakt, model_atms, tipakcijes, datumZahtjeva } = nalog;


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
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Kreiraj zahtjev</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Unesi tid"
              name="tid"
              value={tid}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Unesi serijski broj"
              name="sn"
              value={sn}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
          <select
                name='clients'
                value={clients}
                onChange={e => onInputChange(e)}
                className="form-control form-control-lg">
                <option>Odaberi klijenta</option>
              { client?.map((cli) => (
                        <option key={cli.id} value={cli.id}>{cli.attributes.NAZIV_KLIJENTA}</option>
                        ))}
          </select>
          </div>
          <div className="form-group">
              <select
                name='izvodjacis'
                value={izvodjacis}
                onChange={e => onInputChange(e)} 
                className="form-control form-control-lg">
                <option>Odaberi izvođača</option>
              { tplista?.map((tp) => (
                        <option key={tp.id} value={tp.id}>{tp.attributes.naziv}</option>
                        ))}
              </select>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Mjesto"
              name="mjesto"
              value={mjesto}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Adresa"
              name="adresa"
              value={adresa}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Mikrolokacija"
              name="mikrolokacija"
              value={mikrolokacija}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Kontakt"
              name="kontakt"
              value={kontakt}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="date"
              className="form-control form-control-lg"
              placeholder="Datum zahtjeva"
              name="datumZahtjeva"
              value={datumZahtjeva}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <textarea 
                name="opisRadova" 
                placeholder="Opis radova" 
                value={opisRadova}
                onChange={e => onInputChange(e)} 
                className="form-control form-control-lg"
              />
          </div>
          <div className="form-group">
            <select
              name='model_atms' 
              value={model_atms}
              className="form-control form-control-lg"
              onChange={e => onInputChange(e)} 
          >
              <option>Izaberi model</option>
            { model?.map((name) => (
                      <option key={name.id} value={name.id}>{name.attributes.model}</option>
                      ))}
            </select>
          </div>
          <div className="form-group">
          <select
              name='tipakcijes' 
              className="form-control form-control-lg"
              value={tipakcijes}
              onChange={e => onInputChange(e)}
          >
            <option>Odaberi akciju</option>
            { akcija?.map((akc) => (
                      <option key={akc.id} value={akc.id}>{akc.attributes.tipakcije}</option>
                      ))}
            </select> 
          </div>
          <button className="btn btn-primary btn-block" disabled={!tid}>Kreiraj zahtjev</button>
        </form>
      </div>
    </div>
  );
};

export default AddNalog;
