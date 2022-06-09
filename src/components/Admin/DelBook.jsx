import * as React from 'react';
import { Box } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FuncHeader from '../FuncHeader';
import CommonInput from './CommonInput';

import axios from 'axios';

const URL = 'http://124.70.53.71:8080';
export default function DelBook() {
  const [msg, setMsg] = React.useState({
    open: false,
    message: ''
  });
  const handleClose = () => {
    setMsg({ ...msg, open: false })
  }
  const [reason, setReason] = React.useState('lost')
  const handleChange = (event) => {
    setReason(event.target.value);
  };

  //得到子组件传来的需要删除的bookid，得到之后发送/deletebook请求
  const getBookid = (id) => {
    axios.defaults.withCredentials = true
    console.log(reason);
    axios.get(URL+"/deletebook", {
      params: {
        book_id: id,
        reason: reason
      }
    })
      .then(res => {
        setMsg({
          open: true,
          message: res.data.result
        });
      })
  }

  return (
    <React.Fragment >
      <Box sx={{ width: "100%" }}>
        <FuncHeader func="Delete Books" />
        <Box sx={{'& .MuiTextField-root': {  width: '400px' },
             ml:'250px', mt:'20px'}}
        >
        <FormControl>
          <FormLabel>Reason</FormLabel>
          <RadioGroup row
            value={reason}
            onChange={handleChange}
          >
            <FormControlLabel value="lost" control={<Radio />} label="Lost" />
            <FormControlLabel value="damaged" control={<Radio />} label="Damaged" />
          </RadioGroup>
        </FormControl>
        </Box>
        <CommonInput func="DELETE" getBookid={getBookid} />
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={msg.open}
        onClose={handleClose}
      >
        <Alert sx={{ width: '100%' }}>
          {msg.message}
        </Alert>
      </Snackbar>
    </React.Fragment>
  )
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});