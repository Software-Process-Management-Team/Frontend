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

function createData(isbn, name, author, amount, location) {
  return { isbn, name, author, amount, location};
}

const rows = [
  createData('9787111599715', '计算机网络（原书第7版）', 'James F. Kurose / Keith W. Ross', 10, '4F'),
  createData('9787115275790', "JavaScript高级程序设计（第3版）", '[美] Nicholas C. Zakas', 20, '4F'),
  createData('9787302287568', 'Java从入门到精通', '明日科技', 15, '4F'),
  createData('9787111076452', '数据结构、算法与应用', '（美）Sartaj Sahni', 5, '4F'),
];

const books = [
  {
    bookID: "00000001",
    bookName: "aaaaaa",
    bookAuthor: "wjy",
    location: "4F",
    isbnNumber: "01234567891023",
    available: true,
  },
  {
    bookID: "00000002",
    bookName: "aaaaaa",
    bookAuthor: "wjy",
    location: "4F",
    isbnNumber: "01234567891023",
    available: true,
  },
  {
    bookID: "00000003",
    bookName: "aaaaaa",
    bookAuthor: "wjy",
    location: "4F",
    isbnNumber: "01234567891023",
    available: false,
  },
  {
    bookID: "00000004",
    bookName: "aaaaaa",
    bookAuthor: "wjy",
    location: "4F",
    isbnNumber: "01234567891023",
    available: false,
  },
];

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
      bookID: item.bookID,
      available: item.available
    })
  })
  return [book, list];
}

export default function SearchList() {
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
    // axios.get("http://localhost:8080/getbook", {param:{isbn_code:bid}})
    // .then(res =>{
      // setDetailOpen(true);
    //   console.log(res);
    // })
    const details = dataFilter(books);
    setDetailBook(details[0]);
    setDetailBookList(details[1]);
    setDetailOpen(true);
  }
  const handleDetailClose = () => {
    setDetailOpen(false);
  };

  const getReserveData = (reserData)=>{
    console.log(reserData);
    // axios.post("http://loacalhost:8080/reservebook", reserData)
    // .then(res=>{
    //   setMsg({
    //     open: true,
    //     message: res.data
    //   })
    //   setDetailOpen(false);
    // })
    setMsg({
      open: true,
      message: "res.data"
    });
    setDetailOpen(false);
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
          {rows.map((row) => (
            <TableRow
              key={row.isbn}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.isbn}
              </TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.author}</TableCell>
              <TableCell align="left">{row.amount}</TableCell>
              <TableCell align="left">{row.location}</TableCell>
              <TableCell align="center">
                <IconButton color="success" id={row.isbn} onClick={seeDetails}>
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
