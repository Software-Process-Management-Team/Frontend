import * as React from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {loginUser} from '../utils/cookie'
const URL = 'http://124.70.53.71:8080';


export default function PayAlert(props) {
    const {payAlert} = props
    const pay = (e)=>{
        window.location.href=URL+"/pay?userId="+loginUser()
    }
    if(payAlert.open===true)
  return (
    <Stack sx={{ width: '100%', mb:'15px' }} spacing={2}>
      <Alert severity="error"
        action={
          <Button color="inherit" size="small" onClick={pay}>
            pay for it
          </Button>
        }
      >
        You have to pay {payAlert.payment} 
      </Alert>
    </Stack>
  );
  else return null
}