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

import axios from 'axios';

export default function AddBook(){
    //可能还要加一个输入框输入加入的数量
    const [bookInfo, setBookInfo] = React.useState(null);
    const [Diaopen, setDiaOpen] = React.useState(false);
    const getBookInfo = (info)=>{
        setBookInfo(info);
        setDiaOpen(true); //打开对话框
    }

    //提示对话框的收起
    const handleDiaClose = () => {
        setDiaOpen(false);
    };

    //添加图书
    const addBook=()=>{
        console.log(bookInfo);
        // axios.post('', bookInfo) 

        setDiaOpen(false);
    }
    
    return (
      <React.Fragment>
        <Box sx={{width:"100%"}}>
            <FuncHeader func="Add Books" />
            <AddInput getBookInfo={getBookInfo}/>
        </Box>
        {/* 确认对话框 */}
        <Dialog open={Diaopen} onClose={handleDiaClose}>
        <Box sx={{width:"500px"}}>
        <DialogTitle>Check Book Info</DialogTitle>
        <DialogContent>
          <InfoList bookInfo={bookInfo}/>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" 
                  onClick={addBook}
                  disabled={bookInfo === "error"? true: false}
          >ADD</Button>
        </DialogActions>
        </Box>
      </Dialog>
      </React.Fragment>
    )
}

//确认对话框中的图书信息列表
function InfoList(props){
    const {ISBN, Name, Author} = props.bookInfo;
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
                    primary={ISBN}
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
                    primary={Name}
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
                    primary={Author}
                />
            </ListItem>
        </List>
    )
}