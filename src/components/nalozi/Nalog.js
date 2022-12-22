import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";



import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';




const Nalog = () => {
  const { id } = useParams();
  const [nalog, setNalog] = useState();

  useEffect(() => {
    const getModelData = async () => {
      await axios.get(`http://localhost:1337/api/tests/${id}?populate=deep`).then((res) => {
        let nalogView = res.data.data;
        setNalog(nalogView)
      });
    };
      getModelData();
  }, [id]);

  return (
      <>
        <Link className="btn btn-primary" to="/">
          Back to Lista naloga
        </Link>
        <Card sx={{ maxWidth: 500, margin: 'auto' }}>
          <CardContent>
            <Typography color="text.primary" borderBottom={1} sx={{ borderColor: 'grey.500' }}>
              TID: {nalog?.tid}
            </Typography>
            <Typography color="text.primary" borderBottom={1} sx={{ borderColor: 'grey.500' }}>
              SN: {nalog?.sn}
            </Typography>
            <Typography color="text.primary" borderBottom={1} sx={{ borderColor: 'grey.500' }}>
              Mjesto: {nalog?.mjesto}
            </Typography>
            <Typography color="text.primary" borderBottom={1} sx={{ borderColor: 'grey.500' }}>
              Adresa: {nalog?.adresa}
            </Typography>
            <Typography color="text.primary" borderBottom={1} sx={{ borderColor: 'grey.500' }}>
              Mikrolokacija: {nalog?.mikrolokacija}
            </Typography>
            <Typography color="text.primary" borderBottom={1} sx={{ borderColor: 'grey.500' }}>
              Opis radova: {nalog?.opisRadova}
            </Typography>
            <Typography color="text.primary" borderBottom={1} sx={{ borderColor: 'grey.500' }}>
              Kontakt: {nalog?.kontakt}
            </Typography>
              { nalog?.izvodjacis.map(izv => {
                return (
                  <Typography color="text.primary" borderBottom={1} sx={{ borderColor: 'grey.500' }} key={izv.id}>Izvođač: {izv.naziv}</Typography>
                )
              })}
              { nalog?.tipakcijes.map(akc => {
                return (
                  <Typography color="text.primary" borderBottom={1} sx={{ borderColor: 'grey.500' }} key={akc.id}>Akcija: {akc.tipakcije}</Typography>
                )
              })}
              { nalog?.clients.map(client => {
                return (
                  <Typography color="text.primary" borderBottom={1} sx={{ borderColor: 'grey.500' }} key={client.id}>Klijent: {client.NAZIV_KLIJENTA}</Typography>
                )
              })}
               { nalog?.model_atms.map(model => {
                return (
                  <Typography color="text.primary" borderBottom={1} sx={{ borderColor: 'grey.500' }} key={model.id}>Model: {model.model}</Typography>
                )
              })}
             <ImageList sx={{ maxWidth: 500, height: 450, margin: 'auto', marginTop: 2  }} cols={2} gap={3}>
                  <Box>
              
                  { nalog?.photos < 1 ? (
                    <div>Slike za ovu akciju nisu potrebne</div>
                      ) : ( nalog?.photos[0].Image.map((item) => (
                      <ImageListItem key={item.id}>
                        <img
                          src={`http://localhost:1337${item.formats.small.url}`}
                          srcSet={`http://localhost:1337${item.formats.small.url} 2x`}
                          alt=""
                          loading="lazy"
                        />
                      </ImageListItem>
                  ))) }
                  </Box>
              </ImageList>
          </CardContent>
        </Card>
        <Box textAlign='center' marginTop={4} marginBottom={4}>
          <Button color="primary" sx={{ margin: 'auto' }} variant="contained">Export</Button>
        </Box>
    </>
  );
};

export default Nalog;



