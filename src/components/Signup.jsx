import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';

export default function Signup() {
    const [msg, setMsg] = React.useState({
        open:false,
        message:''
    });

    const handleSubmit = (e) =>{
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const data = {
            phoneNumber: fd.get('act'),
            password: fd.get('psw'),
            userName: fd.get('uname')
        }
        const phone_reg = /^[0-9]{11}$/;
        if(!phone_reg.test(data.phoneNumber)){
            setMsg({
                open:true,
                message:'Incorrect PhoneNumber!'
            });
        }
        else if(data.password !== fd.get('cfpsw')){
            setMsg({
                open:true,
                message:'The entered passwords do not match!'
            })
        }
        else{
            // axios.defaults.withCredentials = true;
            axios.post('http://localhost:8080/register', data)
            .then((res)=>{
                if(res.data === 'success') {
                    return new Promise.resolve('success');
                }
                else return new Promise.reject("failed");
            })
            .then(
                value=>console.log(value),
                reason => console.log(reason)
            )
        }
    }
    const handleClose = ()=>{
        setMsg({...msg, open:false})
    }
  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 , width:"50%"}}>
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
                label="Account"
                name="act"
                autoComplete="account"
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="uname"
                label="UserNane"
                id="uname"
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
            <TextField
                margin="normal"
                required
                fullWidth
                name="cfpsw"
                label="Confirm Password"
                type="password"
                id="cf_password"
                autoComplete="current-password"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Sign up
            </Button>
        </Stack>
    </Box>
    );
}