import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";


const Nalog = () => {
  const { id } = useParams();
  const [nalog, setNalog] = useState();



  useEffect(() => {
    const getModelData = async () => {
      await axios.get(`http://localhost:1337/api/tests/${id}?populate=*`).then((res) => {
        let nalogView = res.data.data;
        setNalog(nalogView)
      });
    };
    getModelData();
  }, [id]);


  return (
  
    <div className="container py-4">
      <Link className="btn btn-primary" to="/">
        back to Lista naloga
      </Link>
      <h1 className="display-4">Nalog Id: {id}</h1>
      <hr />
      <h1 className="display-4">View</h1>

      <ul className="list-group w-50">
        <li className="list-group-item">TID: {nalog?.attributes.tid}</li>
        <li className="list-group-item">SERIJSKI BROJ: {nalog?.attributes.sn}</li>
        <li className="list-group-item">MJESTO: {nalog?.attributes.mjesto}</li>
        <li className="list-group-item">ADRESA: {nalog?.attributes.adresa}</li>
        <li className="list-group-item">MIKROLOKACIJA: {nalog?.attributes.mikrolokacija}</li>
     {
          nalog?.attributes.model_atms.data.map(model => {
            return (
              <li className="list-group-item" key={model.id}>
                MODEL ATM: {model.attributes.model}
              </li>
            )
          }) 
        }
        {
          nalog?.attributes.clients.data.map(client => {
            return (
              <li className="list-group-item" key={client.id}>
                KLIJENT: {client.attributes.NAZIV_KLIJENTA}
              </li>
            )
          }) 
        }
        {
            nalog?.attributes.izvodjacis.data.map(tp => {
              return (
                <li className="list-group-item" key={tp.id}>
                  IZVOĐAČ: {tp.attributes.naziv}
                </li>
              )
            }) 
          }
        <li className="list-group-item">OPIS RADOVA: {nalog?.attributes.opisRadova}</li>
        {
            nalog?.attributes.tipakcijes.data.map(akcija => {
              return (
                <li className="list-group-item" key={akcija.id}>
                  TIP AKCIJE: {akcija.attributes.tipakcije}
                </li>
              )
            }) 
          }
        <li className="list-group-item">ZAHTJEV KREIRAN: {nalog?.attributes.datumZahtjeva}</li>
      </ul>
    </div>
  );
};

export default Nalog;
