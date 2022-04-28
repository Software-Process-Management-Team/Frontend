import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';
import '../../utils/cookie'
import { onLogin } from '../../utils/cookie';

const URL = 'http://localhost:8080';
export default function Signin() {
    const [msg, setMsg] = React.useState({
        open:false,
        message:''
    });
    //路由跳转对象
    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const data = {
            id: fd.get('act'),
            password: fd.get('psw'),
        }
        const phone_reg = /^1[0-9]{10}$/;
        if(!phone_reg.test(data.id)){
            setMsg({
                open:true,
                message:'Incorrect id!'
            });
        }
        else{
            axios.defaults.withCredentials = true;
            axios.post(URL+'/login', data)
            .then((res)=>{
                if(res.data === 'success'){
                    onLogin(data.id);
                    navigate("/userhome");
                }
                else{
                    setMsg({
                        open:true,
                        message:'Login Failed!'
                    })
                }
            }).catch(err=>{
                console.log(err);
            })
        }
    }
    const handleClose = ()=>{
        setMsg({...msg, open:false})
    }
  return (
    <Box component="form" 
         noValidate 
         onSubmit={handleSubmit} 
         sx={{ mt: 1 , width:"50%"}}
        >
        <Snackbar
            anchorOrigin={{ vertical:'top', horizontal:'right' }}
            open={msg.open}
            onClose={handleClose}
            message={msg.message}
        />
        <Stack spacing={2}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="account"
                label="User Account"
                name="act"
                autoComplete="account"
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="psw"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Sign in
            </Button>
        </Stack>
    </Box>
    );
}

