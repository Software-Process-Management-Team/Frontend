import * as React from 'react';
import { Box } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import FuncHeader from '../FuncHeader';
import CommonInput from './CommonInput';

import axios from 'axios';

export default function DelBook() {
  const [msg, setMsg] = React.useState({
    open: false,
    message: ''
  });
  const handleClose = () => {
    setMsg({ ...msg, open: false })
  }

  //得到子组件传来的需要删除的bookid，得到之后发送/deletebook请求
  const getBookid = (id) => {

    axios.defaults.withCredentials = true
    axios.get("http://localhost:8080/deletebook", {
      params: {
        book_id: id
      }
    })
      .then(res => {
        setMsg({
          open: true,
          message: res.data
        });
      })
  }

  return (
    <React.Fragment >
      <Box sx={{ width: "100%" }}>
        <FuncHeader func="Delete Books" />
        <CommonInput func="DELETE" getBookid={getBookid} />
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
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