import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AutorenewIcon from '@mui/icons-material/Autorenew';
const URL = 'http://localhost:8080';

export default function BorrowedList(props){
  const {borrowed} = props;
    // console.log(props.borrowed);
    return (
        <React.Fragment>
<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, maxHeight: 600 }} >
        <TableHead>
          <TableRow>
            <TableCell>BookID</TableCell>
            <TableCell align="left">ISBN</TableCell>
            <TableCell align="left">BookName</TableCell>
            <TableCell align="left">Borrowed Date</TableCell>
            <TableCell align="center">Option</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {
            borrowed.map((row) => (
            <TableRow
              key={row.bookID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{row.bookID}</TableCell>
              <TableCell component="th" scope="row" align="left">
                {row.isbnNumber}
              </TableCell>
              <TableCell align="left">{row.bookName}</TableCell>
              剩几天还
              <TableCell align="left">{row.borrowdate}</TableCell>
              <TableCell align="center">
                <IconButton color="success" id={row.bookID} onClick={seeDetails}>
                  <PreviewIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
    </TableContainer>
        </React.Fragment>
    )
}