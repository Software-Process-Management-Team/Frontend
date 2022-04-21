import * as React from 'react';
import { Box, TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

export default function AddInput(props){
    const apikey ="12483.0b892ea1a54c7a1cec0fb90429c74f1e.481eb401e543ce7b26b176633f7b8be9"
    const handleSubmit =(e)=>{
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const isbn= fd.get("isbn");

        axios.defaults.withCredentials=false;
        axios.get(`https://api.jike.xyz/situ/book/isbn/${isbn}?apikey=${apikey}`)
        .then(res=>{
            const book = {
                ISBN:isbn,
                Name: res.data.data.name,
                Author: res.data.data.author
            }
            props.getBookInfo(book);
        }).catch(err=>{
            props.getBookInfo("error")
        })
    }

    return (
        <Box sx={{'& .MuiTextField-root': { m: 1, width: '50%' },
             width:"100%", 
             display:"flex", 
             alignItems:"baseline",
             justifyContent:"center"}}
             component="form" 
             onSubmit={handleSubmit}
        >
            <TextField name='isbn' label="Plz type in ISBN" variant='standard' />
            <Button 
                variant='contained' 
                type='submit'
                startIcon={<AddIcon />}>
                Add Book
            </Button>
        </Box>
    )
}