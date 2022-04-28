import * as React from 'react';
import { Box } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PreviewIcon from '@mui/icons-material/Preview';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DetailList from './DetailList';
import Snackbar from '@mui/material/Snackbar';

import axios from 'axios';

function dataFilter(booklist){
  const book = {
    isbnNumber: booklist[0].isbnNumber,
    bookName: booklist[0].bookName,
    bookAuthor: booklist[0].bookAuthor,
    location: booklist[0].location
  };
  let list = new Array();
  booklist.map((item)=>{
    list.push({
      bookID: item.bookID.toString().padStart(8, '0'),
      available: (item.available && isReservable(item.reserveTime))
    })
  })
  return [book, list];
}
function isReservable(time){
  const cur_time = new Date().getTime();
  const timeM12 = new Date(cur_time-12*60*60*1000);
  const reserTime = new Date(time.substring(0, 19).replace("T", " "));
  if(reserTime<timeM12){
    return true;
  }
  return false;
}
const URL = 'http://localhost:8080';
export default function SearchList(props) {
  const {preInfo} = props;
  const [detailOpen, setDetailOpen] = React.useState(false);
  const [detailBook, setDetailBook] = React.useState(null);
  const [detailBookList, setDetailBookList] = React.useState([]);
  const [msg, setMsg] = React.useState({
    open:false,
    message:''
  });

  const handleMsgClose = ()=>{
    setMsg({...msg, open:false})
  }
  const seeDetails =(e)=>{
    const bid = e.currentTarget.id;
    axios.get(URL+"/getbook", {params:{isbn_number:bid}})
    .then(res =>{
      const details = dataFilter(res.data);
      setDetailBook(details[0]);
      setDetailBookList(details[1]);
      setDetailOpen(true);
    })
  }
  const handleDetailClose = () => {
    setDetailOpen(false);
  };

  const getReserveData = (reserData)=>{
    const {user_id, book_id} = reserData;
    axios.post(`http://localhost:8080/reservebook?user_id=${user_id}&book_id=${book_id}`)
    .then(res=>{
      
      if(res.data.result === 'success'){
        setMsg({
          open: true,
          message: res.data.result
        })
        setDetailOpen(false);
      }
    })
  }


  return (
    <React.Fragment>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, maxHeight: 600 }} >
        <TableHead>
          <TableRow>
            <TableCell>ISBN</TableCell>
            <TableCell align="left">BookName</TableCell>
            <TableCell align="left">Author</TableCell>
            <TableCell align="left">Amount</TableCell>
            <TableCell align="left">Location</TableCell>
            <TableCell align="center">Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            preInfo.map((row) => (
            <TableRow
              key={row.isbnNumber}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.isbnNumber}
              </TableCell>
              <TableCell align="left">{row.bookName}</TableCell>
              <TableCell align="left">{row.bookAuthor}</TableCell>
              <TableCell align="left">{row.amount}</TableCell>
              <TableCell align="left">{row.location}</TableCell>
              <TableCell align="center">
                <IconButton color="success" id={row.isbnNumber} onClick={seeDetails}>
                  <PreviewIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Dialog open={detailOpen} 
            onClose={handleDetailClose} 
            fullWidth
            maxWidth="md">
          <Box sx={{width:"100%"}}>
            <DialogTitle>Details</DialogTitle>
            <DialogContent>
              <DetailList book={detailBook} list={detailBookList} getReserveData={getReserveData}/>
            </DialogContent>
            <DialogActions>
                <Button 
                  onClick={handleDetailClose}
                >CANCEL</Button>
            </DialogActions>
          </Box>
        </Dialog>
        <Snackbar
            anchorOrigin={{ vertical:'top', horizontal:'center' }}
            open={msg.open}
            onClose={handleMsgClose}
            message={msg.message}
        />
    </React.Fragment>
  );
}
