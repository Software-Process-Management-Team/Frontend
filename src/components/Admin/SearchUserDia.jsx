import * as React from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import Snackbar from '@mui/material/Snackbar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';

import axios from 'axios';
const URL = 'http://124.70.53.71:8080';

function getRemainingDays(date){
    const borrowDate = new Date(date);
    const now = new Date();
    return 10-Math.floor((now-borrowDate)/1000/60/60/24);
  }
export default function SearchUserDia(props){
    const {open, handleDiaClose} = props;
    const [info, setInfo] = React.useState([]);

    const [msg, setMsg] = React.useState({
        open:false,
        message:''
      });
    const handleMsgClose = ()=>{
        setMsg({...msg, open:false})
    }

    const handleClick = ()=>{
        handleDiaClose()
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        const fd = new FormData(e.currentTarget)
        const uid = fd.get('uid');
        const uid_reg = /^\d{11}$/
        if(!uid_reg.test(uid)){
            return setMsg({
                open: true,
                message:'Incorrect member ID!'
            })
        }
        axios.get(`${URL}/mycurrentborrow?user_id=${uid}`).then(res=>{
            setInfo(res.data.borrowList)
        })
    }
    return (
        <Dialog open={open} 
            onClose={handleDiaClose} 
            fullWidth
            maxWidth="md">
          <Box sx={{width:"100%"}}>
            <DialogTitle>Search for a Member</DialogTitle>
            <DialogContent>
            <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '80%' },
          display:"flex",
          justifyContent:"center",
          alignItems:"baseline"
        }}
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="standard-search"
          label="Member ID"
          name='uid'
          type="search"
          variant="standard"
        />
        <Button type="submit" variant="contained" startIcon={<SearchIcon />}>
            Search
        </Button>
    </Box>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, maxHeight: 600 }} >
        <TableHead>
          <TableRow>
            <TableCell>BookID</TableCell>
            <TableCell align="left">BookName</TableCell>
            <TableCell align="left">Remaining days</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            info.map((row) => (
            <TableRow
              key={row.bookID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{row.bookID.toString().padStart(8, '0')}</TableCell>
              <TableCell align="left">{row.bookName}</TableCell>
              <TableCell align="left">{getRemainingDays(row.borrowDate)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
            </DialogContent>
            <DialogActions>
                <Button 
                  onClick={handleClick}
                >BACK</Button>
            </DialogActions>
          </Box>
          <Snackbar
        anchorOrigin={{ vertical:'top', horizontal:'center' }}
        open={msg.open}
        onClose={handleMsgClose}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
        {msg.message}
  </Alert>
      </Snackbar>
        </Dialog>
    )
}