import React from 'react'
import {useState, useEffect} from 'react';


export const ListaNaloga = () => {
  const [listaNaloga, setListaNaloga] = useState();

  function update() {
    fetch('http://localhost:1337/api/tests?populate=*')
      .then(res => res.json())
      .then(atm => {
        setListaNaloga(atm.data);
      })
  }
  
  useEffect(() => {
    update();
  }, [])

  console.log(listaNaloga)

  return (
    <div>
      <h2>Lista naloga</h2>
      {listaNaloga?.map(list => {
        return(
          <ul key={list.id}>
            <li>Tid: {list.attributes.tid}</li>
            <li>Serijski broj: {list.attributes.sn}</li>
            <li>Mjesto: {list.attributes.mjesto}</li>
            <li>Adresa: {list.attributes.adresa}</li>
            
            <li>Mikrolokacija: {list.attributes.mikrolokacija}</li>
            <li>Kontakt: {list.attributes.kontakt}</li>
            <li>PR: {list.attributes.pr}</li>
            <li>PO: {list.attributes.po}</li>
            <li>Datum zahtjeva: {list.attributes.datumZahtjeva}</li>
            {list.attributes.clients.data.map(client => {
              return (
                <ul key={client.id}>
                  <li>{client.attributes.NAZIV_KLIJENTA}</li>
                </ul>
              )
            })}
          </ul>
        )
      })}
    </div>
  )
}
