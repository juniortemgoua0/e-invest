import React, {useEffect, useState} from "react";
import "./TransactionTable.css"
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer, TableFooter,
  TableHead,
  TablePagination,
  TableRow
} from "@material-ui/core";
import {Bet} from "../../helpers/enums/bet.enum";
import {LocalStorage} from "../../helpers/enums/localStorage.enum";
import axios from "axios";
import {toast} from "react-toastify";
import {BsCheck2All} from "react-icons/all";


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

//
// const rows: Data[] = [
//   {
//     number: 1,
//     dateOfBet: "12-01-2001",
//     bet: 10000,
//     balance: 40000,
//     available: 30000,
//     retained: 10000,
//     active_duration: 10,
//     endOfBet: "13-01-2001",
//     status: "En cours"
//   },
//   {
//     number: 2,
//     dateOfBet: "12-01-2001",
//     bet: 10000,
//     balance: 40000,
//     available: 30000,
//     retained: 10000,
//     active_duration: 10,
//     endOfBet: "13-01-2001",
//     status: "En cours"
//   },
//   {
//     number: 3,
//     dateOfBet: "12-01-2001",
//     bet: 10000,
//     balance: 40000,
//     available: 30000,
//     retained: 10000,
//     active_duration: 10,
//     endOfBet: "13-01-2001",
//     status: "En cours"
//   },
//   {
//     number: 4,
//     dateOfBet: "12-01-2001",
//     bet: 10000,
//     balance: 40000,
//     available: 30000,
//     retained: 10000,
//     active_duration: 10,
//     endOfBet: "13-01-2001",
//     status: "En cours"
//   },
//   {
//     number: 5,
//     dateOfBet: "12-01-2001",
//     bet: 10000,
//     balance: 40000,
//     available: 30000,
//     retained: 10000,
//     active_duration: 10,
//     endOfBet: "13-01-2001",
//     status: "En cours"
//   },
//   {
//     number: 6,
//     dateOfBet: "12-01-2001",
//     bet: 10000,
//     balance: 40000,
//     available: 30000,
//     retained: 10000,
//     active_duration: 10,
//     endOfBet: "13-01-2001",
//     status: "En cours"
//   },
//   {
//     number: 7,
//     dateOfBet: "12-01-2001",
//     bet: 10000,
//     balance: 40000,
//     available: 30000,
//     retained: 10000,
//     active_duration: 10,
//     endOfBet: "13-01-2001",
//     status: "En cours"
//   },
//   {
//     number: 8,
//     dateOfBet: "12-01-2001",
//     bet: 10000,
//     balance: 40000,
//     available: 30000,
//     retained: 10000,
//     active_duration: 10,
//     endOfBet: "13-01-2001",
//     status: "En cours"
//   },
//   {
//     number: 9,
//     dateOfBet: "12-01-2001",
//     bet: 10000,
//     balance: 40000,
//     available: 30000,
//     retained: 10000,
//     active_duration: 10,
//     endOfBet: "13-01-2001",
//     status: "En cours"
//   },
//   {
//     number: 10,
//     dateOfBet: "12-01-2001",
//     bet: 10000,
//     balance: 40000,
//     available: 30000,
//     retained: 10000,
//     active_duration: 10,
//     endOfBet: "13-01-2001",
//     status: "En cours"
//   },
//   {
//     number: 11,
//     dateOfBet: "12-01-2001",
//     bet: 10000,
//     balance: 40000,
//     available: 30000,
//     retained: 10000,
//     active_duration: 10,
//     endOfBet: "13-01-2001",
//     status: "En cours"
//   },
// ]

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

type Props = {
  data: any[]
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

export function TransactionTable(): JSX.Element {

  const [rows, setRows] = useState<Data[]>([])
  const [betData, setBetData] = useState<any[]>([])
  // const [total, setTotal] = useState<Data>({} as Data)

  const currentUser = JSON.parse(localStorage.getItem(LocalStorage.CURRENT_USER) as string)

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getColumnTotal = (column: Column) => {
    let total: number = 0;
    rows.forEach(row => {
      return typeof row[column.id] === 'number' ?
        total += Number.parseInt(row[column.id].toString()) :
        ''
    })
    if (column.id === Bet.NUMBER)
      return 'Total'
    if (total === 0 || column.id === Bet.ACTIVE_DURATION)
      return '-'
    return total.toString()
  }

  useEffect(() => {
    (async () => {
      await axios.get(`${process.env.REACT_APP_API_URI}bet/${currentUser._id}`)
        .then(res => res?.data)
        .then(data => {
          console.log(data)
          setBetData(data)
        })
        .catch(err => {
          console.log(err)
          toast.error("Une erreur s'est produite lors de la reccuperation de donnees de mises, " +
            "veuillez reessayer plus tard !", {
            position: "top-right",
            autoClose: 6000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
          });
        })
    })()
  }, [])
  // const [rows1 , setRows] = useState<Data>(rows1)

  useEffect(() => {
    betData.map((bet, index) =>
      setRows(value => ([
          ...value,
          createData(
            index + 1,
            (new Date(bet?.start_of_bet).toLocaleString()),
            bet?.bet_amount,
            bet?.balance_amount,
            bet?.available_amount,
            bet?.retained_amount,
            bet?.active_duration,
            (new Date(bet?.end_of_bet)).toLocaleString(),
            bet?.status)
        ])
      )
    )
  }, [betData])


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
              .reverse()
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.number}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          className="text-center"
                        >
                          {
                            column.id === Bet.STATUS ?
                              value === 'Terminer' ? <BsCheck2All size={32} color="green"/> : value === 'En cours' ? value + '...' : ""
                              :
                              column.format &&
                              typeof value === 'number' ? column.format(value) : value
                          }
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
          <TableFooter>
            <TableRow>
              {columns.map((column) => {
                return (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    className="fw-bold text-center"
                  >
                    {
                      getColumnTotal(column)
                    }
                  </TableCell>
                );
              })}
            </TableRow>
          </TableFooter>
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
