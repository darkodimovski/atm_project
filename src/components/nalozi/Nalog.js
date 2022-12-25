import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PDFfile } from "./PDFfile";


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
          <Box sx={{ marginTop: 4, padding: 2, display: 'flex', justifyContent: 'space-around' }}>
            <Box>
            <Typography variant='h4'>
             {nalog?.tid}
            </Typography>
            <Typography variant='h4'>
              {nalog?.sn}
            </Typography>
            <Typography variant='h4'>
              {nalog?.mjesto}
            </Typography>
            <Typography variant='h4'>
              {nalog?.adresa}
            </Typography>
            <Typography variant='h4'>
              {nalog?.mikrolokacija}
            </Typography>
            <Typography variant='h4'>
             {nalog?.opisRadova}
            </Typography>
            <Typography variant='h4'>
             {nalog?.kontakt}
            </Typography>
        
              { nalog?.izvodjacis.map(izv => {
                return (
                  <Typography variant='h4' key={izv.id}>{izv.naziv}</Typography>
                )
              })}
              { nalog?.tipakcijes.map(akc => {
                return (
                  <Typography variant='h4' key={akc.id}>{akc.tipakcije}</Typography>
                )
              })}
              { nalog?.clients.map(client => {
                return (
                  <Typography variant='h4' key={client.id}>{client.NAZIV_KLIJENTA}</Typography>
                )
              })}
               { nalog?.model_atms.map(model => {
                return (
                  <Typography variant='h4' key={model.id}>{model.model}</Typography>
                )
              })}
              </Box>
              <ImageList sx={{ width: 800, height: 450 }} cols={3} gap={8}>
                <div>
             
                </div>
            { nalog?.photos < 1 ? (
              <div sx={{ maxWidth: 600, height: 400, margin: 'auto', marginTop: 2  }}>Slike za ovu akciju nisu potrebne</div>
                ) : ( nalog?.photos[0].Image.map((item) => (
                <ImageListItem key={item.id}>
                  <img
                    src={`http://localhost:1337${item.formats.small.url}`}
                    alt=""
                    loading='lazy'
                  />
                </ImageListItem>
            ))) }
        </ImageList>
            </Box>
       
        <Box textAlign='center' marginTop={30} marginBottom={4}>
          <PDFDownloadLink document={<PDFfile nalog={nalog} />} fileName={`TP nalog ${nalog?.sn} - ${nalog?.tid}`}>
            {({ loading }) => (loading ? <Button color="primary" sx={{ margin: 'auto' }} variant="contained">Loading document...</Button> : <Button color="primary" sx={{ margin: 'auto' }} variant="contained">Kreiraj Nalog</Button>)}
          </PDFDownloadLink>
        </Box>
    </>
  );
};


export default Nalog;



