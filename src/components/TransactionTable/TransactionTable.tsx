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
import {ScaleLoader} from "react-spinners";


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


type Props = {
  onSetTotalOfAccount: (total: string[]) => void
}

export function TransactionTable({onSetTotalOfAccount}: Props): JSX.Element {

  const [rows, setRows] = useState<Data[]>([])
  const [betData, setBetData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
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
          setIsLoading(true)
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
    }, [betData]
  )

  // Pour calculer le total disponible et le total retenu
  useEffect(() => {
    let totalAvailable = 0;
    let totalRetained = 0;
    columns.forEach((column) => {
      rows.forEach(row => {
        if (column.id === Bet.AVAILABLE && typeof row[column.id] === 'number')
          totalAvailable += +row[column.id]
        else if (column.id === Bet.RETAINED && typeof row[column.id] === 'number') {
          totalRetained += +row[column.id]
        }
      })
    })
    onSetTotalOfAccount([totalAvailable.toString(), totalRetained.toString()])
  }, [rows])


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
            {!isLoading ?
              <TableRow tabIndex={-1} className="w-100 ps-3 d-flex justify-content-center align-items-center">
                <TableCell colSpan={9} align={'center'}>
                  <ScaleLoader color="#000000"/>
                </TableCell>
              </TableRow>
              : rows
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
                                value === 'Terminer' ?
                                  <BsCheck2All size={32} color="green"/> : value === 'En cours' ? value + '...' : ""
                                :
                                row.number === rows.length && row.status ==='En cours' && (column.id === Bet.RETAINED  || column.id === Bet.AVAILABLE || column.id === Bet.END_OF_BET || column.id === Bet.BALANCE || column.id === Bet.ACTIVE_DURATION ) ? '-' :
                                column.format &&
                                  typeof value === 'number' ? column.format(value) : String(value) === 'Invalid Date' ? '-' :
                                    value
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
