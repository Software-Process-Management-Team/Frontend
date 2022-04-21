import * as React from 'react';
import { Box, TextField, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function CommonInput(props){
    const {func, getBookid} = props;
    const BtnIcon = ()=>{
        if(func ==="DELETE")  return <DeleteIcon />
        else if(func === "RETURN")    return <ArrowBackIcon />
        else    return <ArrowForwardIcon />
    }
    const handleSubmit =(e)=>{
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const id = fd.get("ID");
        getBookid(id);
    }
    return (
        <Box sx={{'& .MuiTextField-root': { m: 1, width: '400px' },
             width:"100%", 
             display:"flex", 
             alignItems:"baseline",
             justifyContent:"center"}}
             component="form" 
             onSubmit={handleSubmit}
        >
            <TextField name='ID' label="Plz type in BookID" variant='standard' />
            <Button 
                variant='contained' 
                type='submit'
                startIcon={<BtnIcon />}
                sx={{width:"130px"}}>
                {func}
            </Button>
        </Box>
    )
}