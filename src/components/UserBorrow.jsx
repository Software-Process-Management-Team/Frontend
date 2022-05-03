import * as React from 'react';
import { Box } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CommonInput from './Admin/CommonInput';
import FuncHeader from './FuncHeader';
import {loginUser} from "../utils/cookie"
import axios from 'axios';

const URL = 'http://124.70.53.71:8080';
export default function(props){
    const [msg, setMsg] = React.useState({
        type: "",
        open: false,
        message: ''
      });
      const handleClose = () => {
        setMsg({ ...msg, open: false })
      }

    const getBookid = (id) => {
        axios.defaults.withCredentials = true
        axios.post(`${URL}/lendout?user_id=${loginUser()}&book_id=${id}`)
          .then(res => {
            if(res.data.result === "success"){
              setMsg({
                type:"success",
                open: true,
                message: res.data.result
              })
            }
            else{
              setMsg({
                type: "error",
                open: true,
                message: res.data.errorMsg 
              })
            }
            
          }).catch(err=>{
              console.log(err)
          })
      }
    return (
    <React.Fragment >
      <Box sx={{ width: "100%" }}>
        <FuncHeader func="Borrow Books" />
        <CommonInput func="Borrow" getBookid={getBookid} />
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={msg.open}
        onClose={handleClose}
      >
        <Alert severity={msg.type} sx={{ width: '100%' }}>
          {msg.message}
        </Alert>
      </Snackbar>
    </React.Fragment>
    )
}

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });