import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";




const Nalog = () => {
  const { id } = useParams();
  const [nalog, setNalog] = useState();
  const [picture, setPicture] = useState([]);


  useEffect(() => {
    const getModelData = async () => {
      await axios.get(`http://localhost:1337/api/tests/${id}?populate=*`).then((res) => {
        let nalogView = res.data.data;
        setNalog(nalogView)
      });
    };
    getModelData();
  }, [id]);


  useEffect(() => {
    const getPicture = async () => {
      await axios.get(`http://localhost:1337/api/pictures?populate=*`).then((res) => {
        let nalogPicture = res.data.data;
        setPicture(nalogPicture)
      });
    };
    getPicture();
  }, []);

  console.log(picture)


  return (
  
    <div className="max-w-lg mx-auto">
        <Link className="btn btn-primary" to="/">
          Back to Lista naloga
        </Link>
    <div className="flex justify-center mt-10 bg">
      <ul className="list-group w-50">
        <li className="list-group-item mt-2 border-b"><span className="font-bold">TID:</span> {nalog?.attributes.tid}</li>
        <li className="list-group-item mt-2 border-b"><span className="font-bold">Serijski broj:</span> {nalog?.attributes.sn}</li>
        <li className="list-group-item mt-2 border-b"><span className="font-bold">Mjesto:</span> {nalog?.attributes.mjesto}</li>
        <li className="list-group-item mt-2 border-b"><span className="font-bold">Adresa:</span> {nalog?.attributes.adresa}</li>
        <li className="list-group-item mt-2 border-b"><span className="font-bold">Mikrolokacija:</span> {nalog?.attributes.mikrolokacija}</li>
     {
          nalog?.attributes.model_atms.data.map(model => {
            return (
              <li className="list-group-item mt-2 border-b" key={model.id}>
                <span className="font-bold">Model bankomata:</span> {model.attributes.model}
              </li>
            )
          }) 
        }
        {
          nalog?.attributes.clients.data.map(client => {
            return (
              <li className="list-group-item mt-2 border-b" key={client.id}>
                <span className="font-bold">Klijent:</span> {client.attributes.NAZIV_KLIJENTA}
              </li>
            )
          }) 
        }
        {
            nalog?.attributes.izvodjacis.data.map(tp => {
              return (
                <li className="list-group-item mt-2 border-b" key={tp.id}>
                  <span className="font-bold">Izvođač:</span> {tp.attributes.naziv}
                </li>
              )
            }) 
          }
        <li className="list-group-item mt-2 border-b"><span className="font-bold">Opis radova:</span> {nalog?.attributes.opisRadova}</li>
        {
            nalog?.attributes.tipakcijes.data.map(akcija => {
              return (
                <li className="list-group-item mt-2 border-b" key={akcija.id}>
                  <span className="font-bold">Tip akcije:</span> {akcija.attributes.tipakcije}
                </li>
              )
            }) 
          }
        <li className="list-group-item mt-2 border-b"><span className="font-bold">Zahtjev kreiran:</span> {nalog?.attributes.datumZahtjeva}</li>
      </ul>
      </div>
      <select
              name='slike'
              onChange={e => setPicture(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              
          >
              <option>Izaberi sliku</option>
                { picture?.map((pic) => (
                    <option key={pic.id} value={pic.id}>{pic.attributes.Naziv}</option>
                    

                ))}
      </select>
    </div>
  );
};

export default Nalog;
