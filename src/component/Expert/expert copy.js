import React, { useEffect, useState } from 'react';
import Sidebar from './sidebar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@material-ui/core/Box';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import Link from '@mui/material/Link';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
  const ulStyle = { width:'60%' , marginLeft : '25%'}
  const clients = { marginTop:'10%'}  



export default function Expert (){
    const [value, setValue] = React.useState(new Date());

    return (
  <div>
  <Sidebar/> 
  <h1>Listes des constats</h1>
<TableContainer component={Paper} style={ulStyle}>
      <Table sx={{ minWidth: 650 }}   size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">xxxxx</TableCell>
            <TableCell align="right">proprio</TableCell>
            <TableCell align="right"> etat</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>

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
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">   <LocalizationProvider dateAdapter={AdapterDateFns}>

      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="DateTimePicker"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
      />
    </LocalizationProvider></TableCell>
    <TableCell align="right">   <Link href="#">
 <Button variant="contained">Rediger Rapport</Button></Link>
</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
    
);
}
