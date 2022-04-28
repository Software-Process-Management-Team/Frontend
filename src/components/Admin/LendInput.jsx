import * as React from 'react';
import { Box, TextField, Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from 'axios';

const URL = 'http://localhost:8080';
export default function LendInput(){
    const handleSubmit =(e)=>{
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const data = {
            user_id: fd.get("user_id"),
            book_id: fd.get("book_id")
        }
        // console.log(data);
        axios.post(URL+'/lendout', data)
        .then(res=>{
            console.log(res);
        }).catch(err=>{
            console.log(err);
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
                <TextField name='user_id' label="UserID" variant='standard' required/>
                <TextField name='book_id' label="BookID" variant='standard' required/>
                <Button 
                  variant='contained' 
                  type='submit'
                  startIcon={<ArrowForwardIcon />}
                  sx={{width:"150px", margin:"auto"}}>
                  Check Out
                </Button>
            </Stack>
        </Box>
    )
}