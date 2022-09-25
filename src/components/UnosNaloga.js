import React from 'react'
import Form from "../components/Form";
import { useState } from "react";




export const UnosNaloga = () => {
    const [addFormData, setAddFormData] = useState({
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



  const handleInputChange = event => {
    event.preventDefault();
    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;
    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);
  }


  const handleSubmit = e => {
      e.preventDefault();
     

    const data = {
      tid: addFormData.tid,
      sn: addFormData.sn,
      clients: addFormData.clients,
      izvodjacis: addFormData.izvodjacis,
      mjesto: addFormData.mjesto,
      adresa: addFormData.adresa,
      mikrolokacija: addFormData.mikrolokacija,
      kontakt: addFormData.kontakt,
      datumZahtjeva: addFormData.datumZahtjeva,
      opisRadova: addFormData.opisRadova,
      model_atms: addFormData.model_atms,
      tipakcijes: addFormData.tipakcijes

    }

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({data})
  };


  fetch('http://localhost:1337/api/tests?populate=*', requestOptions)
    .then(response => console.log(response))
    .then(res => console.log('response-post', res));
};



  return (
    <div className="App">
       <Form 
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            addFormData={addFormData}
        />

    </div>
  )
}
