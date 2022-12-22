import React, { useState, useEffect } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Form } from "./Form";


const url = `http://localhost:1337/api/tipakcijes`;
const modelUrl = 'http://localhost:1337/api/model-atms';
const clientsUrl = 'http://localhost:1337/api/clients';
const izvodjaciUrl = 'http://localhost:1337/api/izvodjacis';
const photosUrl = 'http://localhost:1337/api/photos'
const slikeUrl = 'http://localhost:1337/api/slikes'


const AddNalog = () => {
  const history = useNavigate();
  const [akcija, setAkcija] = useState([]);
  const [model, setModel] = useState([])
  const [client, setClient] = useState([])
  const [tplista, setTpLista] = useState([]);
  const [photosAtm, setPhotosAtm] = useState([]);
  const [slikeAtm, setSlikeAtm] = useState([]);
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
    photos: '',
    datumZahtjeva: new Date(),
    slike: ''
  });

 
  const onInputChange = (e) => {
    setNalog({ ...nalog, [e.target.name]: e.target.value });
  };


  const onUploadPhoto = (event, val) => {
    setNalog({ ...nalog, photos: val?.id})
  }

  
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
    photos: nalog.photos,
    slike: nalog.slike
  }


  const onSubmit = e => {
    e.preventDefault();

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



  const getAkcija = async () => {
    await axios.get(url).then((res) => {
      let akcije = res.data.data;
      setAkcija(akcije)
    });
  };

  const getModelData = async () => {
    await axios.get(modelUrl).then((res) => {
      let atmModeli = res.data.data;
      setModel(atmModeli)
    });
  };

  const getClientData = async () => {
    await axios.get(clientsUrl).then((res) => {
      let atmKlijenti = res.data.data;
      setClient(atmKlijenti)
    });
  };

  const getIzvodjacistData = async () => {
    await axios.get(izvodjaciUrl).then((res) => {
      let atmIzvodjacis = res.data.data;
      setTpLista(atmIzvodjacis)
    });
  };

  const getPhotos = async () => {
    await axios.get(photosUrl).then((res) => {
      let photosAtm = res.data.data;
      setPhotosAtm(photosAtm)
    });
  };
  
  const getSlike = async () => {
    await axios.get(slikeUrl).then((res) => {
      let slike = res.data.data;
      setSlikeAtm(slike)
    });
  };

  
  useEffect(() => {
    getAkcija();
    getModelData();
    getClientData();
    getIzvodjacistData();
    getPhotos();
    getSlike();
  }, []);

  
  useEffect(() => {
    if (nalog.slike !== 1) {
      delete data.photos
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nalog.slike])



  return (
      <div className="max-w-2xl m-auto mb-4">
          <Form 
            akcija={akcija} 
            model={model} 
            client={client}  
            tplista={tplista}
            photosAtm={photosAtm}
            nalog={nalog}
            slikeAtm={slikeAtm}
            onUploadPhoto={onUploadPhoto}
            onSubmit={onSubmit}
            onInputChange={onInputChange}
            setNalog={setNalog}
          />
    </div>
  );
};

export default AddNalog;
