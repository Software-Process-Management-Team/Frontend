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
import Snackbar from '@mui/material/Snackbar';

import {Consumer} from "../../utils/pvContext"
import DetailList from './DetailList';
import UpdateList from './UpdateList';
import Updateform from './Updateform';

import axios from 'axios';

function dataFilter(booklist){
  const book = {
    isbnNumber: booklist[0].isbnNumber,
    bookName: booklist[0].bookName,
    bookAuthor: booklist[0].bookAuthor,
    location: booklist[0].location,
    category: booklist[0].category
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
const URL = 'http://124.70.53.71:8080';
export default function SearchList(props) {
  const {preInfo} = props;
  const [detailOpen, setDetailOpen] = React.useState(false);
  const [detailBook, setDetailBook] = React.useState(null);
  const [detailBookList, setDetailBookList] = React.useState([]);
  const [msg, setMsg] = React.useState({
    open:false,
    message:''
  });
  const [updateOpen, setUpdateOpen] = React.useState(false)
  const toUpdate = ()=>{
    setDetailOpen(false);
    setUpdateOpen(true);
  }

  const getUpdateInfo = (cate, loca, isbn) =>{
    axios.get(`${URL}/changeLocationAndCategory?isbnNum=${isbn}&location=${loca}&category=${cate}`)
    .then(res=>{
      setMsg({
        open: true,
        message: res.data.result
      })
    })
    setUpdateOpen(false)
  }

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
  const handleUpdateClose = () =>{
    setUpdateOpen(false)
  }

  const getReserveData = (reserData)=>{
    const {user_id, book_id} = reserData;
    axios.post(`${URL}/reservebook?user_id=${user_id}&book_id=${book_id}`)
    .then(res=>{
      
      if(res.data.result === 'success'){
        setMsg({
          open: true,
          message: "You have reserved books successfully! You can only reserve it for 4 hours."
        })
        setDetailOpen(false);
      }
      else{
        setMsg({
          open: true,
          message: res.data.errorMsg
        })
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
            <TableCell align="center">Available/Amount</TableCell>
            <TableCell align="center">Location</TableCell>
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
              <TableCell align="center">{row.available}/{row.amount}</TableCell>
              <TableCell align="center">{row.location}</TableCell>
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
            <DialogContent sx={{height: "400px"}}>
              <Consumer>
                {context=>{
                  if(context==='member') return <DetailList book={detailBook} list={detailBookList} getReserveData={getReserveData}/>
                  else return <UpdateList book={detailBook} list={detailBookList}/>
                }}
              </Consumer>
            </DialogContent>
            <DialogActions>
                <Consumer>
                {context=>{
                  if(context !== 'member') return <Button onClick={toUpdate}>Update Info</Button>
                }}
                </Consumer>
                <Button 
                  onClick={handleDetailClose}
                  variant="contained"
                >BACK</Button>
            </DialogActions>
          </Box>
        </Dialog>
        <Updateform open={updateOpen} book={detailBook} getUpdateInfo={getUpdateInfo} handleUpdateClose={handleUpdateClose}/>
        <Snackbar
            anchorOrigin={{ vertical:'top', horizontal:'center' }}
            open={msg.open}
            onClose={handleMsgClose}
            message={msg.message}
        />
    </React.Fragment>
  );
}
