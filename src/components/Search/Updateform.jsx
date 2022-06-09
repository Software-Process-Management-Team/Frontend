import * as React from 'react';
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
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InfoIcon from '@mui/icons-material/Info';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AttributionIcon from '@mui/icons-material/Attribution';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CategoryIcon from '@mui/icons-material/Category';

export default function Updateform(props){
    const {open, book, getUpdateInfo, handleUpdateClose} = props;
    const [value, setValue] = React.useState(book.category)
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    if(book ===null) return;
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const cate = fd.get('cate')
        const loca = fd.get('loca')
        getUpdateInfo(cate, loca, book.isbnNumber)
    }
    return (
        <Dialog open={open} 
            onClose={handleUpdateClose} 
            fullWidth>
        <Box 
            sx={{width:"100%"}}
            component="form" 
            onSubmit={handleSubmit}
        >
        <DialogTitle>Update Book Infomation</DialogTitle>
          <DialogContent >
          <List dense>
            <ListItem>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
                <ListItemText
                    primary="ISBN: "
                />
                <ListItemText
                    primary={book.isbnNumber}
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
                    primary={book.bookName}
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
                    primary={book.bookAuthor}
                />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
                <ListItemText
                    primary="Category: "
                />
                <TextField
                name='cate'
                size="small"
                select
                label="category"
                value={value}
                sx={{width:'250px'}}
                onChange={handleChange}
                >
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
                <LocationOnIcon />
              </ListItemIcon>
                <ListItemText
                    primary="Location: "
                />
                <TextField 
                size="small"
                sx={{width:'250px'}}
                name="loca"
                value={book.location}
                label="Capital letter - digits" variant="standard" />
            </ListItem>
          </List>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={handleUpdateClose}
              variant="outlined"
            >Cancel</Button>
            <Button 
            //   onClick={handleUpdateClose}
              type='submit'
              variant="contained"
            >OK</Button>
          </DialogActions>
        </Box>
        </Dialog>
    )
}