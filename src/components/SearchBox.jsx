import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';


export default function SearchBox(){
    const handleSubmit = (e)=>{
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const searchkey = fd.get('key');
        console.log(searchkey);

    }
    return (
        <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '80%' },
        display:"flex",
        justifyContent:"center",
        alignItems:"baseline"
      }}
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
    >
        <TextField
          id="standard-search"
          label="Search Field"
          name='key'
          type="search"
          variant="standard"
        />
        <Button type="submit" variant="contained" startIcon={<SearchIcon />}>
            Search
        </Button>
    </Box>
    )
}