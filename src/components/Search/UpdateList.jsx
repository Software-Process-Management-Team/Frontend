import * as React from 'react';
import { Box } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AttributionIcon from '@mui/icons-material/Attribution';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CategoryIcon from '@mui/icons-material/Category';
import {loginUser} from "../../utils/cookie"

/*
props.book = {
    bookName :
    bookAuthor :
    isbnNumber :
    location:
}
props.list = [
    {bookID:  , available:  }
]
*/

export default function UpdateList(props){
    const {bookName, bookAuthor, isbnNumber, location, category} = props.book;
    let {list} = props;
    list.sort((a,b)=>{
      return b.available - a.available;
    })

    return (
        <Box sx={{width:"100%"}}>
          <List dense>
            <ListItem>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
                <ListItemText
                    primary="ISBN: "
                />
                <ListItemText
                    primary={isbnNumber}
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
                    primary={bookName}
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
                    primary={bookAuthor}
                />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
                <ListItemText
                    primary="Category: "
                />
                <ListItemText
                    primary={category}
                />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <LocationOnIcon />
              </ListItemIcon>
                <ListItemText
                    primary="Location: "
                />
                <ListItemText
                    primary={location}
                />
            </ListItem>
          </List>
          <TableContainer component={Paper}>
      <Table sx={{ minWidth: "500px", maxHeight: 600 }} size="small">
        <TableHead>
          <TableRow>
            <TableCell>BookID</TableCell>
            <TableCell align="left">Availble</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((item) => (
            <TableRow
              key={item.bookID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.bookID}
              </TableCell>
              <TableCell align="left">
                  {item.available? "Yes":"No"}
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </Box>
    )
}