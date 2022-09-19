import React from 'react'
import {useState, useEffect} from 'react';


export const ListaNaloga = () => {
  const [project, setProject] = useState();

  function update() {
    fetch('http://localhost:1337/api/tests?populate=*')
      .then(res => res.json())
      .then(atm => {
        setProject(atm.data);
      })
  }
  
  useEffect(() => {
    update();
  }, [])

  console.log(project)

  return (
    <div>
      <h2>Lista naloga</h2>
      {project?.map(pro => {
        return(
          <ul key={pro.id}>
            <li>tid: {pro.attributes.tid}</li>
            <li>Serijski broj: {pro.attributes.sn}</li>
            <li>Mjesto: {pro.attributes.mjesto}</li>
            <li>Adresa: {pro.attributes.adresa}</li>
            <li>Mikrolokacija: {pro.attributes.mikrolokacija}</li>
            <li>Kontakt: {pro.attributes.kontakt}</li>
            <li>PR: {pro.attributes.pr}</li>
            <li>PO: {pro.attributes.po}</li>
            <li>Datum zahtjeva: {pro.attributes.datumZahtjeva}</li>
          </ul>
        )
      })}
    </div>
  )
}
