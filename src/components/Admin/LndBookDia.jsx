import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function LndBookDia(props){
    const {open, handleDiaClose, lnd, bookInfo} = props;
    const handleClick = ()=>{
        handleDiaClose('lnd')
    }
    return (
        <Dialog open={open} 
            onClose={handleDiaClose} 
            fullWidth
            maxWidth="md">
          <Box sx={{width:"100%"}}>
            <DialogTitle>{(lnd==='lost'?'Lost':'Damaged')+' Books'}</DialogTitle>
            <DialogContent>
    <TableContainer component={Paper}>
      <Table size="small" sx={{ minWidth: 650, maxHeight: 600 }} >
        <TableHead>
          <TableRow>
            <TableCell>BookID</TableCell>
            <TableCell align="left">ISBN</TableCell>
            <TableCell align="left">BookName</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            bookInfo.map((row) => (
            <TableRow
              key={row.bookID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{row.bookID.toString().padStart(8, '0')}</TableCell>
              <TableCell align="left">{row.isbnnumber}</TableCell>
              <TableCell align="left">{row.bookName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
            </DialogContent>
            <DialogActions>
                <Button 
                  onClick={handleClick}
                >BACK</Button>
            </DialogActions>
          </Box>
        </Dialog>
    )
}