import React from "react";
import { Page, Text, Document, Image } from '@react-pdf/renderer';



export const PDFfile = ({ nalog }) => {
  return (
    <Document>
        <Page style={{ padding: '20', marginTop: '40'}}>
            <Text style={{ borderBottom: '1', borderColor: '#4C5B61', marginBottom: '2', fontSize: '14'}}>ID naloga: {nalog?.id}</Text>
            <Text style={{ borderBottom: '1', borderColor: '#4C5B61', marginBottom: '2', fontSize: '14'}}>TID: {nalog?.tid}</Text>
            <Text style={{ borderBottom: '1', borderColor: '#4C5B61', marginBottom: '2', fontSize: '14'}}>S/N: {nalog?.sn}</Text>
            <Text style={{ borderBottom: '1', borderColor: '#4C5B61', marginBottom: '2', fontSize: '14'}}>Mjesto: {nalog?.mjesto}</Text>
            <Text style={{ borderBottom: '1', borderColor: '#4C5B61', marginBottom: '2', fontSize: '14'}}>Adresa: {nalog?.adresa}</Text>
            <Text style={{ borderBottom: '1', borderColor: '#4C5B61', marginBottom: '2', fontSize: '14'}}>Mikrolokacija: {nalog?.mikrolokacija}</Text>
            <Text style={{ borderBottom: '1', borderColor: '#4C5B61', marginBottom: '2', fontSize: '14'}}>Kontakt: {nalog?.kontakt}</Text>
            
            { nalog?.izvodjacis.map(izv => {
                return (
                  <Text style={{ borderBottom: '1', borderColor: '#4C5B61', marginBottom: '2', fontSize: '14'}} key={izv.id}>Parnter: {izv.naziv}</Text>
                )
              })}
            
            { nalog?.tipakcijes.map(akc => {
                return (
                  <Text style={{ borderBottom: '1', borderColor: '#4C5B61', marginBottom: '2', fontSize: '14'}} key={akc.id}>Tip akcije: {akc.tipakcije}</Text>
                )
              })}
            
            { nalog?.clients.map(client => {
                return (
                  <Text style={{ borderBottom: '1', borderColor: '#4C5B61', marginBottom: '2', fontSize: '14'}} key={client.id}>Naziv klijenta: {client.NAZIV_KLIJENTA}</Text>
                )
              })}
            
            { nalog?.model_atms.map(model => {
                return (
                  <Text style={{ borderBottom: '1', borderColor: '#4C5B61', marginBottom: '2', fontSize: '14'}} key={model.id}>Model: {model.model}</Text>
                )
              })}

            <Text style={{ borderBottom: '1', borderColor: '#4C5B61', marginBottom: '10', fontSize: '14'}}>Opis radova: {nalog?.opisRadova}</Text>

            { nalog?.photos < 1 ? (
                    <div>Slike za ovu akciju nisu potrebne</div>
                      ) : ( nalog?.photos[0].Image.map((item) => (
                      <Image 
                        key={item.id}
                        src={`http://localhost:1337${item.formats.small.url}`}
                      />
                  ))) }
            <Text render={({pageNumber, totalPages}) => `${pageNumber} / ${totalPages}`} fixed />
        </Page>
    </Document>
  )
}
