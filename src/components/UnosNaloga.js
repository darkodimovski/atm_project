import React from 'react'
import Form from "../components/Form";
import { useState } from "react";



export const UnosNaloga = () => {
    const [tid, setTid] = useState('')
    const [tipAkcije, setTipAkcije] = useState();
    const [model, setModel] = useState(); 
    const [sn, setSn] = useState('');
    const [adresa, setAdresa] = useState('');
    const [mikrolokacija, setMikrolokacija] = useState('');
    const [opisRadova, setOpisRadova] = useState('')
    const [error, setError] = useState(false);
    const [mjesto, setMjesto] = useState('');
    const [clients, setClients] = useState();
    const [kontakt, setKontakt] = useState('');


    const date = new Date();
    const newDate = date.toISOString().slice(0, 10);
    const [datumZahtjeva, setDatumZahtjeva] = useState(newDate);
    

    const onTidChange = e => setTid(e.target.value);
    const onTipAkcijeChange = e => setTipAkcije(e.target.value);
    const onModelChange = e => setModel(e.target.value)
    const onSnChange = e => setSn(e.target.value);
    const onAdresaChange = e => setAdresa(e.target.value);
    const onMikrolokacijaChange = e => setMikrolokacija(e.target.value);
    const onOpisRadovaChange = e => setOpisRadova(e.target.value)
    const onMjestoChange = e => setMjesto(e.target.value);
    const onDatumZahtjevaChange = e => setDatumZahtjeva(e.target.value);
    const onClientsChange = e => setClients(e.target.value);
    const onKontaktChange = e => setKontakt(e.target.value)



  const onSubmit = e => {
    if(tid.length === 0 || sn.length === 0 || adresa.length === 0) {
      e.preventDefault();
      setError(true);
    } else {

    setTid('');
    setTipAkcije();
    setModel();
    setSn('');
    setAdresa('');
    setMikrolokacija('')
    setOpisRadova('');
    setMjesto('');
    setDatumZahtjeva(newDate);
    setClients();
    setKontakt('');
  };

  const data = { 
    tid,
    tipakcijes: [{id: tipAkcije}],
    model_atms: [{id: model}],
    sn,
    adresa,
    mikrolokacija,
    opisRadova,
    mjesto,
    datumZahtjeva,
    clients: [{id: clients}],
    kontakt
  };

  

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({data})
  };

  fetch('http://localhost:1337/api/tests?populate=*', requestOptions)
    .then(response => response.json())
    .then(res => console.log('response-post', res));
  };



  return (
    <div className="App">
       <Form 
          tid={tid}
          sn={sn}
          tipAkcije={tipAkcije}
          adresa={adresa}
          mikrolokacija={mikrolokacija}
          opisRadova={opisRadova}
          mjesto={mjesto}
          datumZahtjeva={datumZahtjeva}
          clients={clients}
          kontakt={kontakt}
          onTidChange={onTidChange} 
          onTipAkcijeChange={onTipAkcijeChange}
          onSubmit={onSubmit}
          onModelChange={onModelChange}
          onSnChange={onSnChange}
          onAdresaChange={onAdresaChange}
          onMikrolokacijaChange={onMikrolokacijaChange}
          onOpisRadovaChange={onOpisRadovaChange}
          error={error}
          onMjestoChange={onMjestoChange}
          onDatumZahtjevaChange={onDatumZahtjevaChange}
          onClientsChange={onClientsChange}
          onKontaktChange={onKontaktChange}
        />
    </div>
  )
}
