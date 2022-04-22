import * as React from 'react';
import { Box, TextField, Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { width } from '@mui/system';

export default function AddInput(props){
    const apikey ="12483.0b892ea1a54c7a1cec0fb90429c74f1e.481eb401e543ce7b26b176633f7b8be9"
    const handleSubmit =(e)=>{
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const isbn= fd.get("isbn");
        const num = fd.get("num");

        axios.defaults.withCredentials=false;
        axios.get(`https://api.jike.xyz/situ/book/isbn/${isbn}?apikey=${apikey}`)
        .then(res=>{
            const book = {
                book_name: res.data.data.name,
                book_author: res.data.data.author,
                isbn_code: "0",
                isbn_number:isbn,
                num: num
            }
            props.getBookInfo(book);
        }).catch(err=>{
            props.getBookInfo("error")
        })
    }

    return (
        <Box 
            sx={{
             width:"100%", 
             display:"flex",
             alignItems:"baseline",
             justifyContent:"center"}}
             component="form" 
             onSubmit={handleSubmit}
        >
            <Stack spacing={3}
                sx={{
                    marginTop:"10px",
                    width:"50%"}}>
                <TextField name='isbn' label="Plz type in ISBN" variant='standard' required/>
                <TextField name='num' label="Amount" type="number"  variant="outlined" required/>
                <Button 
                  variant='contained' 
                  type='submit'
                  startIcon={<AddIcon />}
                  sx={{width:"150px", margin:"auto"}}>
                  Add Book
                </Button>
            </Stack>
        </Box>
    )
}