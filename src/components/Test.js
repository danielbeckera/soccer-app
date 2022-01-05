import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, pontos, saldoDeGols) {
  return { name, pontos, saldoDeGols };
}

const rows = [createData("Avai", 1, 2)];


export default function CustomizedTables() {

  return (
    <TableContainer component={Paper}>
      <Table sx={{ maxWidth: 900}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Times Série A</StyledTableCell>
            <StyledTableCell align="right">Pontos</StyledTableCell>
            <StyledTableCell align="right">
              Saldo de Gols&nbsp;(g)
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.pontos}</StyledTableCell>
              <StyledTableCell align="right">{row.saldoDeGols}</StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

