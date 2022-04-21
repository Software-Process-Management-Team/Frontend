import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import PreviewIcon from '@mui/icons-material/Preview';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24),
  createData('Ice cream sandwich', 237, 9.0, 37),
  createData('Eclair', 262, 16.0, 24),
  createData('Cupcake', 305, 3.7, 67),
  createData('Gingerbread', 356, 16.0, 49),
  createData('aaaaaaa', 237, 9.0, 37),
  createData('bbbbbbb', 262, 16.0, 24),
  createData('cccccc', 305, 3.7, 67),
  createData('ddddddd', 356, 16.0, 49)
];

export default function SearchList() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, maxHeight: 600 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ISBN</TableCell>
            <TableCell align="left">BookName</TableCell>
            <TableCell align="left">Author</TableCell>
            <TableCell align="center">Option</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.calories}</TableCell>
              <TableCell align="left">{row.fat}</TableCell>
              <TableCell align="center">
                <IconButton color="success" >
                  <PreviewIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
