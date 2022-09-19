import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';


const url = `http://localhost:1337/api/tipakcijes`;
const modelUrl = 'http://localhost:1337/api/model-atms';
const clientsUrl = 'http://localhost:1337/api/clients';

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
    onKontaktChange
  } = props;



  /* const [options, setOptions] = useState([""]); */
  const [data, setData] = useState([]);
  const [model, setModel] = useState([])
  const [client, setClient] = useState([])
  


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
      /* const arr = []; */
      await axios.get(modelUrl).then((res) => {
        let atmModeli = res.data.data;
       /*    result.map((attr) => {
          return arr.push({ value: attr.attributes.tipakcije, label: attr.attributes.tipakcije });
        }); 
        setOptions(arr) */
        setModel(atmModeli)
      });
    };
    getModelData();
  }, []);


  
  useEffect(() => {
    const getClientData = async () => {
      /* const arr = []; */
      await axios.get(clientsUrl).then((res) => {
        let atmKlijenti = res.data.data;
       /*    result.map((attr) => {
          return arr.push({ value: attr.attributes.tipakcije, label: attr.attributes.tipakcije });
        }); 
        setOptions(arr) */
        setClient(atmKlijenti)
      });
    };
    getClientData();
  }, []);
  



  return (
    <div>
      <h1>Unesi nalog</h1>
          <form>
            { error && tid.length <= 0  ? 
            <label htmlFor="tid">TID can't be empty</label> : ''}
            <br />
            <input id="tid" placeholder="Unesi TID" onChange={onTidChange} value={tid} />
            <br />
            { error && sn.length <= 0  ? 
            <label htmlFor="tid">Serial number can't be empty</label> : ''}
            <br />
            <input id="sn" placeholder="Serijski Broj" onChange={onSnChange} value={sn} />
            <br />
            <br />
            <label htmlFor="select">Izaberi klijenta</label>
            <br />
            <select onChange={onClientsChange}>
              <option>Select</option>
            { client?.map((cli) => (
                      <option key={cli.id} value={cli.id}>{cli.attributes.NAZIV_KLIJENTA}</option>
                      ))}
            </select>
            <br />
            <br />
            { error && mjesto.length <= 0  ? 
            <label htmlFor="tid">Mjesto can't be empty</label> : ''}
            <br />
            <input id="mjesto" placeholder="Mjesto" onChange={onMjestoChange} value={mjesto} />
            <br />
            { error && adresa.length <= 0  ? 
            <label htmlFor="tid">Adresa can't be empty</label> : ''}
            <br />
            <input id="adresa" placeholder="Adresa" onChange={onAdresaChange} value={adresa} />
            <br />
            <br />
            <input id="mikrolokacija" placeholder="Mikrolokacija" onChange={onMikrolokacijaChange} value={mikrolokacija} />
            <br />
            <br />
            <input id="kontakt" placeholder="Kontakt" onChange={onKontaktChange} value={kontakt} />
            <br />
            <br />
            <label htmlFor="date">Datum zahtjeva:</label>
            <input type="date" id="datum-realizacije" placeholder="Datum realizacije" onChange={onDatumZahtjevaChange} value={datumZahtjeva} />
            <br />
            <br />
            <textarea id="opis-radova" name="w3review" placeholder="Opis radova" onChange={onOpisRadovaChange} value={opisRadova} rows="5" cols="20" />
            <br />
            <br />
            <label htmlFor="select">Izaberi model</label>
            <br />
            <select onChange={onModelChange}>
              <option>Select</option>
            { model?.map((name) => (
                      <option key={name.id} value={name.id}>{name.attributes.model}</option>
                      ))}
            </select>
            <br />
            <br />
            <label htmlFor="select">Odaberi akciju</label>
            <br />
            <select onChange={onTipAkcijeChange}>
            <option>Select</option>
            { data?.map((akc) => (
                      <option key={akc.id} value={akc.id}>{akc.attributes.tipakcije}</option>
                      ))}
            </select>
            <br />
            <br />
            <button type="button" value="Submit" onClick={onSubmit} disabled={!tid || !sn}>Zadaj Nalog</button>
          </form>
    </div>
  )
}

export default Form