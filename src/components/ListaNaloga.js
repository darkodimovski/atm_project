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
    <table className='table-auto border-b'>
      <thead>
        <tr>
          <th className='w-32'>TID</th>
          <th className='w-32'>Serijski broj</th>
          <th className='w-32'>Klijent</th>
          <th className='w-32'>Izvođač</th>
          <th className='w-32'>Model ATM</th>
          <th className='w-32'>Tip akcije</th>
        </tr>
      </thead>
      <tbody>
          {listaNaloga?.map(list => {
            return (
              <tr key={list.id}>           
                  <td className='flex'>{list.attributes.tid}</td>
                  <td className='flex'>{list.attributes.sn}</td>
                <td>
                  {list.attributes.clients.data.map(client => {
                      return (
                        <ul key={client.id}>
                          <li className='flex justify-center'>{client.attributes.NAZIV_KLIJENTA}</li>
                        </ul>
                        )
                    })}
                </td>
                <td>
                  {list.attributes.izvodjacis.data.map(tp => {
                      return (
                        <ul key={tp.id}>
                          <li className='flex justify-center'>{tp.attributes.naziv}</li>
                        </ul>
                        )
                    })}
                </td>
                <td>
                  {list.attributes.model_atms.data.map(model => {
                      return (
                        <ul key={model.id}>
                          <li className='flex justify-center'>{model.attributes.model}</li>
                        </ul>
                        )
                    })}
                </td>
                <td>
                  {list.attributes.tipakcijes.data.map(akcija => {
                      return (
                        <ul key={akcija.id}>
                          <li>{akcija.attributes.tipakcije}</li>
                        </ul>
                        )
                    })}
                </td>
              </tr>
            )
          })}
        

      </tbody>
     {/*  {listaNaloga?.map(list => {
        return(
          <ul key={list.id}>
            <li>Tid: {list.attributes.tid}</li>
            <li>Serijski broj: {list.attributes.sn}</li>
            {list.attributes.clients.data.map(client => {
              return (
                <ul key={client.id}>
                  <li>Klijent: {client.attributes.NAZIV_KLIJENTA}</li>
                </ul>
              )
            })}
            {list.attributes.izvodjacis.data.map(tp => {
              return (
                <ul key={tp.id}>
                  <li>Izvođač: {tp.attributes.naziv}</li>
                </ul>
              )
            })}
            {list.attributes.model_atms.data.map(model => {
              return (
                <ul key={model.id}>
                  <li>ModelATM: {model.attributes.model}</li>
                </ul>
              )
            })}
            {list.attributes.tipakcijes.data.map(model => {
              return (
                <ul key={model.id}>
                  <li>Tip akcije: {model.attributes.tipakcije}</li>
                </ul>
              )
            })}
            <li>Mjesto: {list.attributes.mjesto}</li>
            <li>Adresa: {list.attributes.adresa}</li>
            <li>Mikrolokacija: {list.attributes.mikrolokacija}</li>
            <li>Opis radova: {list.attributes.opisRadova}</li>
            <li>Kontakt: {list.attributes.kontakt}</li>
            <li>PR: {list.attributes.pr}</li>
            <li>PO: {list.attributes.po}</li>
            <li>Datum zahtjeva: {list.attributes.datumZahtjeva}</li>
          </ul>
        )
      })} */}
    </table>
  )
}
