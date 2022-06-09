import * as React from 'react';
import FuncHeader from '../FuncHeader';
import Alert from '@mui/material/Alert';
import { Box } from '@mui/material';
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
import CategoryIcon from '@mui/icons-material/Category';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';

import BarCode from './BarCode';
import AddInput from './AddInput';

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
  // const [category, setCategory] = React.useState('');
  // const handleChange = (e)=>{
  //   setCategory(e.target.value)
  // }

  //提示对话框的收起
  const handleDiaClose = () => {
    setDiaOpen(false);
  };
  const handleBarcodeClose = () => {
    setBarcodeOpen(false);
  }

  const [msg, setMsg] = React.useState({
    open:false,
    message:''
  });
  const handleMsgClose = ()=>{
    setMsg({...msg, open:false})
  }

  //添加图书
  const addBook = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const cate = fd.get('cate')
    const loca = fd.get('loca')
    if(!cate){
      return setMsg({
        open: true,
        message: 'Please Select a Category!'
      })
    }
    if(!loca){
      return setMsg({
        open: true,
        message: 'Please type in Location!'
      })
    }
    const loca_reg = /^[A-Z]-[1-9][0-9]*$/
    if(!loca_reg.test(loca)){
      return setMsg({
        open: true,
        message: 'Incorrect Location!'
      })
    }
    axios.defaults.withCredentials = true
    const url = `${URL}/addbook?book_name=${encodeURIComponent(bookInfo.book_name)}&book_author=${encodeURIComponent(bookInfo.book_author)}&isbn_number=${bookInfo.isbn_number}&num=${bookInfo.num}&category=${cate}&location=${loca}`;
    axios.post(url).then(res=>{
      if(res.data.result === 'success'){
        setBookid(res.data.list);
        setDiaOpen(false);
        setBarcodeOpen(true);
      }
      else{
        return setMsg({
          open: true,
          message: 'Add book failed!'
        })
      }
    })
  }

  return (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{ vertical:'top', horizontal:'center' }}
        open={msg.open}
        onClose={handleMsgClose}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
        {msg.message}
  </Alert>
      </Snackbar>
      <Box sx={{ width: "100%" }}>
        <FuncHeader func="Add Books" />
        <AddInput getBookInfo={getBookInfo} />
      </Box>
      {/* 确认对话框 */}
      <Dialog open={Diaopen} onClose={handleDiaClose}>
        <Box sx={{ width: "500px" }} component='form' onSubmit={addBook}>
          <DialogTitle>Check Book Info</DialogTitle>
          <DialogContent>
            <InfoList bookInfo={bookInfo} />
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Select a Category: "
                />
                <TextField
                name='cate'
                fullWidth 
                size="small"
                select
                label="category"
                // value={category}
                // onChange={handleChange}
                >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value={"art"}>art</MenuItem>
                <MenuItem value={"economy"}>economy</MenuItem>
                <MenuItem value={"cultural"}>cultural</MenuItem>
                <MenuItem value={'literature'}>literature</MenuItem>
                <MenuItem value={"philosophy"}>philosophy</MenuItem>
                <MenuItem value={"reference book"}>reference book</MenuItem>
                <MenuItem value={"science"}>science</MenuItem>
                </TextField>
              </ListItem>
              <ListItem>
              <ListItemIcon>
                <AddLocationAltIcon />
              </ListItemIcon>
              <ListItemText
                primary="Location: "
              />
              <TextField 
              size="small"
              name="loca"
              label="Capital letter - digits" variant="standard" />
              </ListItem>
            </List>
          </DialogContent>
          <DialogActions>
            <Button variant="contained"
              type='submit'
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
    <React.Fragment >
      {/* <img src={cover_url} loading="eager"/> */}
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
    </React.Fragment>
  )
}