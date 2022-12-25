import React, { useEffect, useState } from 'react';
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { Link } from "react-router-dom";
import { Box } from '@material-ui/core';
import { CSVLink } from "react-csv";

export default function DataTable() {
    const [listaNaloga, setListaNaloga] = useState([]);

    const columns = [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'tid', headerName: 'TID', width: 100 },
      { field: 'sn', headerName: 'Serijski broj', width: 130 },
      { field: 'mjesto', headerName: 'Mjesto', width: 130 },
      { field: 'adresa', headerName: 'Adresa', width: 280 },
      { field: 'mikrolokacija', headerName: 'Mikrolokacija', width: 280 },
      
      { field: 'client', headerName: 'Klijent', width: 100,
        valueGetter: (listaNaloga) => listaNaloga.row.clients[0].NAZIV_KLIJENTA
      },
      { field: 'izvodjacis', headerName: 'Izvođač', width: 80,
        valueGetter: (listaNaloga) => listaNaloga.row.izvodjacis[0].naziv
      },
      { field: 'model_atms', headerName: 'Model', width: 60,
      valueGetter: (listaNaloga) => listaNaloga.row.model_atms[0].model
      },
      { field: 'tipakcijes', headerName: 'Akcija', width: 260,
      valueGetter: (listaNaloga) => listaNaloga.row.tipakcijes[0].tipakcije
      },
      { field: 'datumZahtjeva', headerName: 'Datum zahtjeva', width: 150 },
      {
        field: "akcija",
        headerName: "Akcija",
        width: 280,
        renderCell: (params) => (
          <Box sx={{ '& button': { m: 1 } }}>
              <Link to={`/api/tests/view/${params.row.id}?populate=*`}>
                <Button variant="contained" size='small'>View</Button>
              </Link>
              <Link to={`/api/tests/${params.row.id}/`}>
                <Button variant="contained" size='small' color="secondary">Edit</Button>
              </Link>
              <Link>
                <Button color="error" variant="contained" size='small' onClick={() => deleteUser(params.row.id)}>Delete</Button>
              </Link>
          </Box>
        )
      },
    ];

    useEffect(() => {
        loadNalog();
      }, []);

  const loadNalog = async () => {
    const result = await axios.get("http://localhost:1337/api/tests?populate=*");
    setListaNaloga(result.data.data);
  };

  const deleteUser = async id => {
    await axios.delete(`http://localhost:1337/api/tests/${id}?populate=*`);
    loadNalog();
  };


  const csvData = listaNaloga.map(item => ({
    id: item.id,
    tid: item.tid,
    sn: item.sn,
    mjesto: item.mjesto,
    adresa: item.adresa,
    mikrolokacija: item.mikrolokacija,
    opisRadova: item.opisRadova,
    klijent: item.clients.map(cl => cl.NAZIV_KLIJENTA),
    izvođač: item.izvodjacis.map(izv => izv.naziv),
    model: item.model_atms.map(model => model.model),
    akcija: item.tipakcijes.map(akc => akc.tipakcije),
    datumZahtjeva: item.datumZahtjeva
  }))


/*   console.log('csvdata', csvData)
  console.log(listaNaloga) */

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={listaNaloga}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        sx={{
          fontSize: '15px'
          
        }}
      />
      <CSVLink data={csvData}>
        <Button sx={{ marginLeft: '10px', marginTop: '10px', marginBottom: '10px'}} variant="contained">Export CSV</Button>
      </CSVLink>
  </div>
  );
}