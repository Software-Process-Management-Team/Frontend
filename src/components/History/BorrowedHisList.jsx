import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const URL = 'http://124.70.53.71:8080';


export default function BorrowedHisList(props){
  const borrowed = props.borrowed.sort((a, b)=>{
    const da = new Date(a.borrow_Date);
    const db = new Date(b.borrow_Date);
    return  da- db;
  });

    return (
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, maxHeight: 600 }} size="small">
        <TableHead>
          <TableRow>
            <TableCell>BookID</TableCell>
            <TableCell align="left">BookName</TableCell>
            <TableCell align="center">Borrowed Date</TableCell>
            <TableCell align="center">Returned Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            borrowed.map((row) => (
            <TableRow
              key={row.bookID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
            >
              <TableCell>{row.bookID}</TableCell>
              <TableCell align="left">{row.bookName}</TableCell>
              <TableCell align="center">
                  {row.borrow_Date.toDateString()}
                  </TableCell>
              <TableCell align="center">
                  {row.return_Date.toDateString()}
                  </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
}