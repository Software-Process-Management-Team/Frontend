import * as React from 'react';
import { Box } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import FuncHeader from '../FuncHeader';
import CommonInput from './CommonInput';

import axios from 'axios';

export default function DelBook(){
    const [msg, setMsg] = React.useState({
        open:false,
        message:''
    });
    const handleClose = ()=>{
        setMsg({...msg, open:false})
    }

    const getBookid = (id)=>{
        // axios.get()

        setMsg({
            open: true,
            message: "success"
        });
        
        
    }

    return (
        <React.Fragment >
          <Box sx={{width:"100%"}}>
            <FuncHeader func="Delete Books" />
            <CommonInput func="DELETE" getBookid={getBookid}/>
          </Box>
          <Snackbar
            anchorOrigin={{ vertical:'top', horizontal:'center' }}
            open={msg.open}
            onClose={handleClose}
          >
            <Alert severity="success" sx={{ width: '100%' }}>
              {msg.message}
            </Alert>
          </Snackbar>
        </React.Fragment>
    )
}

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});