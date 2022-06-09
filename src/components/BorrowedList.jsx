import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import axios from 'axios';
import {loginUser} from "../utils/cookie"
const URL = 'http://124.70.53.71:8080';

function getRowColor(remainingDays){
  if(remainingDays < 0){
    return "#FDEDED"
  }
  else if(remainingDays <=3){
    return "#FEF7E3"
  }
  return '#FFF'
}
function getRemainingDays(date){
  const returnDate = new Date(date);
  const now = new Date();
  // return 10-Math.floor((now-borrowDate)/1000/60/60/24);
  return Math.ceil((returnDate-now)/1000/60/60/24)
}

export default function BorrowedList(props){
  const [msg, setMsg] = React.useState({
    open:false,
    message:''
  });
  const handleMsgClose = ()=>{
    setMsg({...msg, open:false})
  }

  const borrowed = props.borrowed.sort((a, b)=>{
    const da = new Date(a.returnDate);
    const db = new Date(b.returnDate);
    return  da- db;
  });

  let map = new Map();
  for(let x of borrowed){
    map.set(x.bookID.toString(), x.transactionID.toString())
  }

  const renew = (e)=>{
    const bid = e.currentTarget.getAttribute("data-id").toString().padStart(8, '0');
    const tid = e.currentTarget.getAttribute("data-id").toString();
    const data={
      book_id: bid,
      transaction_id: map.get(tid),
      user_id: loginUser()
    }
    axios.post(URL+"/renew", data)
    .then(res=>{
      setMsg({
          open: true,
          message: res.data.errorMsg || res.data.result
        })
    })
  }

    return (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{ vertical:'top', horizontal:'center' }}
        open={msg.open}
        onClose={handleMsgClose}
        message={msg.message}
      />
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, maxHeight: 600 }} >
        <TableHead>
          <TableRow>
            <TableCell>BookID</TableCell>
            <TableCell align="left">BookName</TableCell>
            <TableCell align="left">Remaining days</TableCell>
            <TableCell align="center">Renew</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            borrowed.map((row) => (
            <TableRow
              key={row.bookID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 },backgroundColor: getRowColor(getRemainingDays(row.returnDate)) }}
            >
              <TableCell>{row.bookID.toString().padStart(8, '0')}</TableCell>
              <TableCell align="left">{row.bookName}</TableCell>
              <TableCell align="left">{getRemainingDays(row.returnDate)}</TableCell>
              <TableCell align="center" >
                <IconButton color="success" 
                            data-id={row.bookID} 
                            onClick={renew}
                            disabled={getRemainingDays(row.returnDate)<0}>
                  <AutorenewIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </React.Fragment>
    )
}