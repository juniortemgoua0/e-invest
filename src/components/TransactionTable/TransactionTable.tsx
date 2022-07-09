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
import {Bet} from "../../helpers/enums/bet.enum";


interface Column {
  id: Bet.NUMBER | Bet.DATE_OF_BET | Bet.BET | Bet.BALANCE | Bet.AVAILABLE | Bet.RETAINED | Bet.ACTIVE_DURATION | Bet.END_OF_BET | Bet.STATUS,
  label: string;
  minWidth?: number;
  align?: 'right' | 'center';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  {id: Bet.NUMBER, label: 'Numero', minWidth: 50, align: 'center'},
  {id: Bet.DATE_OF_BET, label: 'Date de mise', minWidth: 120},
  {
    id: Bet.BET,
    label: 'Mise',
    minWidth: 50,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: Bet.BALANCE,
    label: 'Solde',
    minWidth: 50,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: Bet.AVAILABLE,
    label: 'Disponible',
    minWidth: 50,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
  {
    id: Bet.RETAINED,
    label: 'Retenu',
    minWidth: 50,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
  {
    id: Bet.ACTIVE_DURATION,
    label: 'Temps d\'actifs',
    minWidth: 50,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
  {
    id: Bet.END_OF_BET,
    label: 'Fin de mise',
    minWidth: 120,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },

  {
    id: Bet.STATUS,
    label: 'Statut',
    minWidth: 120,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
];

interface Data {
  number: number,
  dateOfBet: string,
  bet: number,
  balance: number,
  available: number,
  retained: number,
  active_duration: number,
  endOfBet: string,
  status: string,
}

function createData(
  number: number,
  dateOfBet: string,
  bet: number,
  balance: number,
  available: number,
  retained: number,
  active_duration: number,
  endOfBet: string,
  status: string,
): Data {
  return {number, dateOfBet, bet, balance, available, retained, active_duration, endOfBet, status};
}

const rows: Data[] = [
  {
    number: 1,
    dateOfBet: "12-01-2001",
    bet: 10000,
    balance: 40000,
    available: 30000,
    retained: 10000,
    active_duration: 10,
    endOfBet: "13-01-2001",
    status: "En cours"
  },
  {
    number: 2,
    dateOfBet: "12-01-2001",
    bet: 10000,
    balance: 40000,
    available: 30000,
    retained: 10000,
    active_duration: 10,
    endOfBet: "13-01-2001",
    status: "En cours"
  },
  {
    number: 3,
    dateOfBet: "12-01-2001",
    bet: 10000,
    balance: 40000,
    available: 30000,
    retained: 10000,
    active_duration: 10,
    endOfBet: "13-01-2001",
    status: "En cours"
  },
  {
    number: 4,
    dateOfBet: "12-01-2001",
    bet: 10000,
    balance: 40000,
    available: 30000,
    retained: 10000,
    active_duration: 10,
    endOfBet: "13-01-2001",
    status: "En cours"
  },
  {
    number: 5,
    dateOfBet: "12-01-2001",
    bet: 10000,
    balance: 40000,
    available: 30000,
    retained: 10000,
    active_duration: 10,
    endOfBet: "13-01-2001",
    status: "En cours"
  },
  {
    number: 6,
    dateOfBet: "12-01-2001",
    bet: 10000,
    balance: 40000,
    available: 30000,
    retained: 10000,
    active_duration: 10,
    endOfBet: "13-01-2001",
    status: "En cours"
  },
  {
    number: 7,
    dateOfBet: "12-01-2001",
    bet: 10000,
    balance: 40000,
    available: 30000,
    retained: 10000,
    active_duration: 10,
    endOfBet: "13-01-2001",
    status: "En cours"
  },
  {
    number: 8,
    dateOfBet: "12-01-2001",
    bet: 10000,
    balance: 40000,
    available: 30000,
    retained: 10000,
    active_duration: 10,
    endOfBet: "13-01-2001",
    status: "En cours"
  },
  {
    number: 9,
    dateOfBet: "12-01-2001",
    bet: 10000,
    balance: 40000,
    available: 30000,
    retained: 10000,
    active_duration: 10,
    endOfBet: "13-01-2001",
    status: "En cours"
  },
  {
    number: 10,
    dateOfBet: "12-01-2001",
    bet: 10000,
    balance: 40000,
    available: 30000,
    retained: 10000,
    active_duration: 10,
    endOfBet: "13-01-2001",
    status: "En cours"
  },
  {
    number: 11,
    dateOfBet: "12-01-2001",
    bet: 10000,
    balance: 40000,
    available: 30000,
    retained: 10000,
    active_duration: 10,
    endOfBet: "13-01-2001",
    status: "En cours"
  },
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

export function TransactionTable(): JSX.Element {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  type Color = {
    background: string,
    color: string
  }

  const getCellBackgroundColor = (id: string): Color => {
    if (id === Bet.RETAINED)
      return {
        background: '#dc3545',
        color: 'white'
      }
    else if (id === Bet.AVAILABLE)
      return {
        background: '#28a745',
        color: 'white'
      }
    else if ( id === Bet.BET)
      return {
        background: '#17a2b8',
        color: 'white'
      }

    return {
      background: '',
      color: ''
    }
  }
  // const [rows1 , setRows] = useState<Data>(rows1)

  return (
    <Paper style={{width: '100%', overflow: 'hidden', fontSize: "17px"}}>
      <TableContainer style={{maxHeight: 440}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{minWidth: column.minWidth}}
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.number}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id}
                                   align={column.align}
                                   style={{backgroundColor: getCellBackgroundColor(column.id).background , color: getCellBackgroundColor(column.id).color}}>
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
