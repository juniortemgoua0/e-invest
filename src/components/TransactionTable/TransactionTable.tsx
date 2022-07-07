import React, {useState} from "react";
import "./TransactionTable.css"
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from "@material-ui/core";


interface Column {
  id: 'numero' | 'dateOfBet' | 'bet' | 'solde' | 'available' | 'retenu' | 'actifDuration' | 'endOfBet' | 'status' ,
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'numero', label: 'Numero', minWidth: 50 },
  { id: 'dateOfBet', label: 'Date de mise', minWidth: 120 },
  {
    id: 'bet',
    label: 'Mise',
    minWidth: 50,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'solde',
    label: 'Solde',
    minWidth: 50,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'available',
    label: 'Disponible',
    minWidth: 50,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'retenu',
    label: 'Retenu',
    minWidth: 50,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'actifDuration',
    label: 'Temps d\'actifs',
    minWidth: 50,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'endOfBet',
    label: 'Fin de mise',
    minWidth: 120,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },

  {
    id: 'status',
    label: 'Statut',
    minWidth: 120,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
];

interface Data {
  numero: number,
  dateOfBet: string,
  bet: number,
  solde: number,
  available: number,
  retenu: number,
  actifDuration: number,
  endOfBet: string,
  status: string,
}

function createData(
  numero: number,
  dateOfBet: string,
  bet: number,
  solde: number,
  available: number,
  retenu: number,
  actifDuration: number,
  endOfBet: string,
  status: string,
): Data {
  return { numero, dateOfBet, bet, solde, available, retenu, actifDuration, endOfBet, status };
}

const rows: Data[] = [
  {numero: 1, dateOfBet: "12-01-2001" , bet: 10000, solde: 40000, available: 30000, retenu: 10000, actifDuration: 10,endOfBet: "13-01-2001",status: "En cours"},
  {numero: 2, dateOfBet: "12-01-2001" , bet: 10000, solde: 40000, available: 30000, retenu: 10000, actifDuration: 10,endOfBet: "13-01-2001",status: "En cours"},
  {numero: 3, dateOfBet: "12-01-2001" , bet: 10000, solde: 40000, available: 30000, retenu: 10000, actifDuration: 10,endOfBet: "13-01-2001",status: "En cours"},
  {numero: 4, dateOfBet: "12-01-2001" , bet: 10000, solde: 40000, available: 30000, retenu: 10000, actifDuration: 10,endOfBet: "13-01-2001",status: "En cours"},
  {numero: 5, dateOfBet: "12-01-2001" , bet: 10000, solde: 40000, available: 30000, retenu: 10000, actifDuration: 10,endOfBet: "13-01-2001",status: "En cours"},
  {numero: 6, dateOfBet: "12-01-2001" , bet: 10000, solde: 40000, available: 30000, retenu: 10000, actifDuration: 10,endOfBet: "13-01-2001",status: "En cours"},
  {numero: 7, dateOfBet: "12-01-2001" , bet: 10000, solde: 40000, available: 30000, retenu: 10000, actifDuration: 10,endOfBet: "13-01-2001",status: "En cours"},
  {numero: 8, dateOfBet: "12-01-2001" , bet: 10000, solde: 40000, available: 30000, retenu: 10000, actifDuration: 10,endOfBet: "13-01-2001",status: "En cours"},
  {numero: 9, dateOfBet: "12-01-2001" , bet: 10000, solde: 40000, available: 30000, retenu: 10000, actifDuration: 10,endOfBet: "13-01-2001",status: "En cours"},
  {numero: 10, dateOfBet: "12-01-2001" , bet: 10000, solde: 40000, available: 30000, retenu: 10000, actifDuration: 10,endOfBet: "13-01-2001",status: "En cours"},
  {numero: 11, dateOfBet: "12-01-2001" , bet: 10000, solde: 40000, available: 30000, retenu: 10000, actifDuration: 10,endOfBet: "13-01-2001",status: "En cours"},
]
// const rows = [
//   createData('India', 'IN', 1324171354, 3287263),
//   createData('China', 'CN', 1403500365, 9596961),
//   createData('Italy', 'IT', 60483973, 301340),
//   createData('United States', 'US', 327167434, 9833520),
//   createData('Canada', 'CA', 37602103, 9984670),
//   createData('Australia', 'AU', 25475400, 7692024),
//   createData('Germany', 'DE', 83019200, 357578),
//   createData('Ireland', 'IE', 4857000, 70273),
//   createData('Mexico', 'MX', 126577691, 1972550),
//   createData('Japan', 'JP', 126317000, 377973),
//   createData('France', 'FR', 67022000, 640679),
//   createData('United Kingdom', 'GB', 67545757, 242495),
//   createData('Russia', 'RU', 146793744, 17098246),
//   createData('Nigeria', 'NG', 200962417, 923768),
//   createData('Brazil', 'BR', 210147125, 8515767),
// ];

export function TransactionTable(): JSX.Element{

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // const [rows1 , setRows] = useState<Data>(rows1)

  return (
    <Paper style={{ width: '100%', overflow: 'hidden', fontSize: "17px" }}>
      <TableContainer style={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.numero}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        lang="fr-FR"
      />
    </Paper>
  );
}
