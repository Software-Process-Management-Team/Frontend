import * as React from 'react';
import { Box, TextField, Button } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import FuncHeader from '../FuncHeader';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import axios from 'axios';

const URL = "http://124.70.53.71:8080/";
export default function Regis(){
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
        const uid = fd.get("ID");
        const data={
            id: uid,
            password: "123456"
        }
        // console.log(uid);
        axios.post(`${URL}register`, data)
        .then(res=>{
            setMsg({
                open: true,
                message: res.data
            })
        })
    }
    return (
        <Box sx={{width:"100%"}}>
          <Snackbar
            anchorOrigin={{ vertical:'top', horizontal:'center' }}
            open={msg.open}
            onClose={handleMsgClose}
            message={msg.message}
            />
            <FuncHeader func="Add a User" />
            <Box sx={{'& .MuiTextField-root': { m: 1, width: '400px' },
             width:"100%", 
             display:"flex", 
             alignItems:"baseline",
             justifyContent:"center"}}
             component="form" 
             onSubmit={handleSubmit}
            >
            <TextField name='ID' label="Plz type in userID" variant='standard' />
            <Button 
                variant='contained' 
                type='submit'
                startIcon={<AddReactionIcon />}
                sx={{width:"130px"}}>
                Add
            </Button>
            </Box>
        </Box>
    )
}