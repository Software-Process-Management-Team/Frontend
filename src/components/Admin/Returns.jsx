import * as React from 'react';
import { Box, TextField, Button, Stack } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import FuncHeader from '../FuncHeader';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';

const URL = "http://124.70.53.71:8080/returnBook";
export default function Returns(){
    const [msg, setMsg] = React.useState({
        open:false,
        message:''
    });

    const handleMsgClose = ()=>{
        setMsg({...msg, open:false})
    }
    const handleSubmit =(e)=>{
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const user_id= fd.get("user_id");
        const book_id= fd.get("book_id")
        axios.get(`${URL}?bookId=${book_id}&userId=${user_id}`)
        .then(res=>{
            setMsg({
                open: true,
                message: res.data.errorMsg || res.data
            })
        }).catch(err=>{
            console.log(err);
        })
    }

    return (
        <React.Fragment>
          <Snackbar
            anchorOrigin={{ vertical:'top', horizontal:'center' }}
            open={msg.open}
            onClose={handleMsgClose}
            message={msg.message}
         />
            <FuncHeader func="Return Books" />
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
                  startIcon={<ArrowBackIcon />}
                  sx={{width:"150px", margin:"auto"}}>
                  Return
                </Button>
            </Stack>
            <Snackbar
            anchorOrigin={{ vertical:'top', horizontal:'center' }}
            open={msg.open}
            onClose={handleMsgClose}
            message={msg.message}
            />
        </Box>
        </React.Fragment>
    )
}