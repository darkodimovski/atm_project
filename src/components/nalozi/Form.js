import React from 'react'
import { 
    Grid, 
    Typography, 
    Select, 
    MenuItem, 
    InputLabel, 
    FormControl, 
    Autocomplete, 
    Button,
    TextField
} from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';


export const Form = ({ 
    onSubmit, 
    onInputChange, 
    client, 
    nalog, 
    tplista, 
    akcija, 
    model, 
    onUploadPhoto, 
    photosAtm,
    slikeAtm,
    setNalog
}) => {
   
    const { tid, sn, clients, adresa, izvodjacis, mikrolokacija, opisRadova, mjesto, kontakt, model_atms, tipakcijes, datumZahtjeva, slike } = nalog;
  
    return (
    <div>
        <form onSubmit={e => onSubmit(e)}>
            <Typography variant="h6" gutterBottom>
                Ispuni nalog
            </Typography>
            <Grid container spacing={2} paddingX={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="tid"
                        name="tid"
                        value={tid}
                        onChange={e => onInputChange(e)}
                        label="Upiši Tid"
                        fullWidth
                        autoComplete="tid"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="sn"
                        name="sn"
                        label="Serijski broj"
                        value={sn}
                        onChange={e => onInputChange(e)}
                        fullWidth
                        autoComplete="sn"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="mjesto"
                        name="mjesto"
                        label="Mjesto"
                        value={mjesto}
                        onChange={e => onInputChange(e)}
                        fullWidth
                        autoComplete="mjesto"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="adresa"
                        name="adresa"
                        label="Adresa"
                        value={adresa}
                        onChange={e => onInputChange(e)}
                        fullWidth
                        autoComplete="adresa"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="mikrolokacija"
                        name="mikrolokacija"
                        label="Mikrolokacija"
                        value={mikrolokacija}
                        onChange={e => onInputChange(e)}
                        fullWidth
                        autoComplete="mikrolokacija"
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="kontakt"
                        name="kontakt"
                        label="Kontakt"
                        value={kontakt}
                        onChange={e => onInputChange(e)}
                        fullWidth
                        autoComplete="kontakt"
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <DesktopDatePicker
                            label="Datum zahtjeva"
                            name='datumZahtjeva'
                            inputFormat="MM/DD/YYYY"
                            value={datumZahtjeva}
                            fullWidth
                            onChange={e => setNalog({ ...nalog, datumZahtjeva: e.$d})}
                            renderInput={(params) => <TextField {...params} fullWidth  />}
                            
                     
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel id='Odaberi klijenta'>Odaberi klijenta</InputLabel>
                        <Select
                            required
                            labelId='Odaberi klijenta'
                            id='Odaberi klijenta'
                            label='Odaberi klijenta'
                            variant='outlined'
                            name='clients'
                            value={clients}
                            onChange={e => onInputChange(e)}
                            fullWidth
                            >
                            <MenuItem value="">
                                <em>Odaberi klijenta</em>
                            </MenuItem>
                                { client?.map((cli) => (
                                <MenuItem key={cli.id} value={cli.id}>{cli.NAZIV_KLIJENTA}</MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel id='Odaberi izvođača'>Odaberi izvođača</InputLabel>
                            <Select
                                required
                                labelId='Odaberi izvođača'
                                id='Odaberi izvođača'
                                label='Odaberi izvođača'
                                variant='outlined'
                                name='izvodjacis'
                                value={izvodjacis}
                                onChange={e => onInputChange(e)}
                                >
                                <MenuItem value="">
                                    <em>Odaberi izvođača</em>
                                </MenuItem>
                                { tplista?.map((tp) => (
                                    <MenuItem key={tp.id} value={tp.id}>{tp.naziv}</MenuItem>
                                    ))}
                            </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel id='Odaberi model'>Odaberi model</InputLabel>
                            <Select
                                required
                                labelId='Odaberi model'
                                id='Odaberi model'
                                label='Odaberi model'
                                variant='outlined'
                                name='model_atms'
                                value={model_atms}
                                onChange={e => onInputChange(e)}
                                fullWidth
                                >
                                <MenuItem value="">
                                    <em>Odaberi model</em>
                                </MenuItem>
                                    { model?.map((mod) => (
                                    <MenuItem key={mod.id} value={mod.id}>{mod.model}</MenuItem>
                                    ))}
                            </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel id='Odaberi akciju'>Odaberi akciju</InputLabel>
                            <Select
                                labelId='Odaberi akciju'
                                id='Odaberi akciju'
                                label='Odaberi akciju'
                                variant='outlined'
                                name='tipakcijes'
                                value={tipakcijes}
                                onChange={e => onInputChange(e)}
                                >
                                <MenuItem value="">
                                    <em>Odaberi izvođača</em>
                                </MenuItem>
                                { akcija?.map((akc) => (
                                    <MenuItem key={akc.id} value={akc.id}>{akc.tipakcije}</MenuItem>
                                    ))}
                            </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        InputProps={{ sx: { height: 120 } }}
                        id="opisRadova"
                        name="opisRadova"
                        label="Opis radova"
                        value={opisRadova}
                        onChange={e => onInputChange(e)}
                        fullWidth
                        autoComplete="opisRadova"
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel id='Slike DA/NE'>Slike DA/NE</InputLabel>
                            <Select
                                labelId='Slike DA/NE'
                                id='Slike DA/NE'
                                label='Slike DA/NE'
                                variant='outlined'
                                name='slike'
                                value={slike}
                                onChange={e => onInputChange(e)}
                                required
                                >
                                { slikeAtm?.map((sl) => (
                                    <MenuItem key={sl.id} value={sl.id}>{sl.Slike}</MenuItem>
                                    ))}
                            </Select>
                    </FormControl>
                </Grid>
                
                { slike !== 2 && 
                <Grid item xs={12} sm={6}>    
                    <Autocomplete 
                        getOptionLabel={(photosAtm) => `${photosAtm.Name}`}
                        options={photosAtm}
                        onChange={(event, val) => onUploadPhoto(event, val)}
                        renderInput={(params) => <TextField {...params} label="Pretraži i odaberi slike" />}
                        noOptionsText={'Nema rezultata'}
                    />
                </Grid>
                } 
                <Grid item xs={12} sm={12}>
                    <Button fullWidth type="submit" variant="contained">Kreiraj nalog</Button>
                </Grid>
            </Grid>
            </form>
    </div>
  )
}
