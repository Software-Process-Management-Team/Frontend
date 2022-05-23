import * as React from 'react';
import { Box, TextField, Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

//在这里获取要添加的isbn和数量，调用isbn接口，返回数据传给父组件AddBook，由父组件调用后端addbook接口
export default function AddInput(props){
    const apikey ="12441.4139ad2e885aca5f00d31eaf033dcee1.ede4f4ada9f76e49bab1308079e38bad"
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
                isbn_number:isbn,
                cover_url: res.data.data.photoUrl,
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