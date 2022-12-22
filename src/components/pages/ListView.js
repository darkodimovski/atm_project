import React, { useEffect, useState } from 'react';
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { Link } from "react-router-dom";
import { Box } from '@material-ui/core';


export default function DataTable() {
    const [listaNaloga, setListaNaloga] = useState([]);

    const columns = [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'tid', headerName: 'TID', width: 100 },
      { field: 'sn', headerName: 'Serijski broj', width: 130 },
      { field: 'mjesto', headerName: 'Mjesto', width: 130 },
      { field: 'adresa', headerName: 'Adresa', width: 130 },
      { field: 'mikrolokacija', headerName: 'Mikrolokacija', width: 130 },
      
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

  console.log(listaNaloga)

  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid
        rows={listaNaloga}
        columns={columns}
        pageSize={3}
        rowsPerPageOptions={[3]}
        checkboxSelection
        sx={{
          fontSize: '15px'
        }}
      />
  </div>
  );
}