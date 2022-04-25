import * as React from 'react';
import FuncHeader from '../FuncHeader';
import { Box } from '@mui/material';
import AddInput from './AddInput';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InfoIcon from '@mui/icons-material/Info';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AttributionIcon from '@mui/icons-material/Attribution';

import BarCode from './BarCode';

import axios from 'axios';
const URL = 'http://124.70.53.71:8080';

export default function AddBook() {
  //bookInfo是子组件AddInput传上来的需要添加的书的信息
  const [bookInfo, setBookInfo] = React.useState(null);
  const [Diaopen, setDiaOpen] = React.useState(false);
  const [barcodeOpen, setBarcodeOpen] = React.useState(false);
  //请求addbook后，会返回一个bookid数组
  const [bookid, setBookid] = React.useState([]);

  const getBookInfo = (info) => {
    setBookInfo(info);
    setDiaOpen(true); //打开对话框
  }

  //提示对话框的收起
  const handleDiaClose = () => {
    setDiaOpen(false);
  };
  const handleBarcodeClose = () => {
    setBarcodeOpen(false);
  }

  //添加图书
  const addBook = () => {
    axios.defaults.withCredentials = true
    console.log(bookInfo);
    // const url = `http://localhost:8080/addbook?book_name=${bookInfo.book_name}&book_author=${bookInfo.book_author}&isbn_code=0&isbn_number=${bookInfo.isbn_number}&num=${bookInfo.num}`;
    // axios.post(url).then(res=>{
    //   console.log(res);
    // })

    axios.post(URL+'/addbook', bookInfo)
      .then((res) => {
        console.log(res);
        //这些是写在post.then里的，setBookid参数是post返回的数据
        setBookid(res.data.list);
        setDiaOpen(false);
        setBarcodeOpen(true);
      })

    

  }

  return (
    <React.Fragment>
      <Box sx={{ width: "100%" }}>
        <FuncHeader func="Add Books" />
        <AddInput getBookInfo={getBookInfo} />
      </Box>
      {/* 确认对话框 */}
      <Dialog open={Diaopen} onClose={handleDiaClose}>
        <Box sx={{ width: "500px" }}>
          <DialogTitle>Check Book Info</DialogTitle>
          <DialogContent>
            <InfoList bookInfo={bookInfo} />
          </DialogContent>
          <DialogActions>
            <Button variant="contained"
              onClick={addBook}
              disabled={bookInfo === "error" ? true : false}
            >OK</Button>
          </DialogActions>
        </Box>
      </Dialog>
      {/* 条形码对话框 */}
      <Dialog open={barcodeOpen} onClose={handleBarcodeClose}>
        <Box sx={{ width: "100%" }}>
          <DialogTitle>Barcodes of New Books</DialogTitle>
          <DialogContent>
            <BarCode bookid={bookid} />
          </DialogContent>
          <DialogActions>
            <Button variant="contained"
              onClick={handleBarcodeClose}
            >OK</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </React.Fragment>
  )
}

//确认对话框中的图书信息列表
function InfoList(props) {
  const { isbn_number, book_name, book_author } = props.bookInfo;
  return (
    <List dense>
      <ListItem>
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText
          primary="ISBN: "
        />
        <ListItemText
          primary={isbn_number}
        />
      </ListItem>

      <ListItem>
        <ListItemIcon>
          <MenuBookIcon />
        </ListItemIcon>
        <ListItemText
          primary="Name: "
        />
        <ListItemText
          primary={book_name}
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <AttributionIcon />
        </ListItemIcon>
        <ListItemText
          primary="Author: "
        />
        <ListItemText
          primary={book_author}
        />
      </ListItem>
    </List>
  )
}