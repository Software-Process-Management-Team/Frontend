import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import FuncHeader from '../FuncHeader';
import { Box } from '@mui/material';
import CommonInput from './CommonInput';
import axios from 'axios';

const URL = "http://124.70.53.71:8080/returnBook?bookId=";
export default function Returns(){
    const [msg, setMsg] = React.useState({
        open:false,
        message:''
    });

    const getBookid = (bid)=>{
        axios.get(URL+bid)
        .then(res=>{
            setMsg({
                open:true,
                message: res.data
            })
        })
    }
    const handleMsgClose = ()=>{
        setMsg({...msg, open:false})
    }

    return (
        <React.Fragment>
          <Snackbar
            anchorOrigin={{ vertical:'top', horizontal:'center' }}
            open={msg.open}
            onClose={handleMsgClose}
            message={msg.message}
         />
          <Box sx={{width:"100%"}}>
            <FuncHeader func="Return Books" />
            <CommonInput func="RETURN" getBookid={getBookid}/>
          </Box>
        </React.Fragment>
    )
}