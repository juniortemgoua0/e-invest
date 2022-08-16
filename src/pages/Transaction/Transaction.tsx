import React, {useState} from "react";
import "./Transaction.css";
import {Header} from "../../components/Header/Header";
import {Button, IconButton} from "@material-ui/core";
import {useStyles} from "../SignIn/SignIn";
import {CardTransaction} from "../../components/CardTransaction";
import {CardAmount} from "../../components/CardAmount/CardAmount";
import {RoundedIconCard} from "../../components/RoundedIconCard";
import {Link} from "react-router-dom";
import {TransactionTable} from "../../components/TransactionTable/TransactionTable";
import {BsDownload} from "react-icons/all";
import {ToastContainer} from "react-toastify";


export function Transaction(): JSX.Element {

  const classes = useStyles()
  const [totalAvailable, setTotalAvailable] = useState<string>('---')
  const [totalRetained, setTotalRetained] = useState<string>('---')

  const handleChangeTotalAccount = (totals:string[]) => {
    setTotalAvailable(totals[0])
    setTotalRetained(totals[1])
  }

  return (
    <>
      <Header>
        <span className="text-black fs-2">Transactions</span>
      </Header>

      <div className="mx-3 mb-4">
        <div className="w-100 d-flex justify-content-between">
          <div >
            <p className="text-black-50 mtb-3"> Disponible </p>
            <div className="d-flex mb-4 align-items-end">
              <div className="d-flex justify-content-end align-items-end"><h3 className={"fw-bold"}>{totalAvailable}</h3></div>
              <div className="bg-warning text-white rounded-2 p-1 small ms-3" >
                <small>FCFA</small>
              </div>
            </div>
          </div>
          <div >
            <p className="text-black-50 mtb-3"> Retenu </p>
            <div className="d-flex mb-4 align-items-end">
              <div className="d-flex justify-content-end align-items-end"><h3 className={"fw-bold"}>{totalRetained}</h3></div>
              <div className="bg-warning text-white rounded-2 p-1 small ms-3" style={{objectFit: "fill"}}>
                <small>FCFA</small>
              </div>
            </div>
          </div>
        </div>
        <div className="w-100 d-flex justify-content-between align-items-center">
          <div style={{flex: '1'}} className="me-2">
            <Link to="/withdraw" style={{textDecoration: "none"}}>
              <Button
                className={classes.outlined}
                variant="outlined"
                color="primary"
                startIcon={<img src="/img/icon_retrait.svg" alt=""/>}>
                Retrait
              </Button>
            </Link>
          </div>

          <div style={{flex: '1'}} className="ms-2">
            <Link to="/payment/bet" style={{textDecoration: "none"}}>
              <Button
                className={classes.primary}
                variant="contained"
                startIcon={<img src="/img/icon_plus.svg" alt=""/>}
                color="primary">
                Nouvelle mise
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div
        className="w-100 px-3 pt-3 d-flex flex-column position-relative mb-5"
        style={{backgroundColor: "var(--primary-color)", paddingBottom: "50px"}}>
        <CardTransaction amount={2000} date="Samedi 24 juin 2022" type="bet" totalGain={6000}/>
        <CardTransaction amount={4000} date="Lundi 19 juin 2022" type="withdraw" status="validate"/>
        <CardTransaction amount={2000} date="Jeudi 22 juin 2022" type="withdraw" status="waitting"/>
        <CardTransaction amount={2000} date="Mercredi 21 juin 2022" type="bet" totalGain={3000}/>
        <CardTransaction amount={2000} date="Samedi 24 juin 2022" type="bet" totalGain={6000}/>
        <div className="position-absolute  card-amount-container px-3">
          <CardAmount
            firstIcon={<RoundedIconCard color="#E76508" size={70}>
              <img src="/img/icon_total.svg" height={40} width={40} alt=""/>
            </RoundedIconCard>}
            secondIcon={<RoundedIconCard color="#E7B400" size={70}>
              <img src="/img/icon_retrait_white.svg" height={40} width={40} alt=""/>
            </RoundedIconCard>}
            firstText={{title: "Disponible", amount: +totalAvailable}}
            secondText={{title: "Retenu", amount: +totalRetained}}
          />
        </div>
      </div>

      <div className="mx-3" style={{marginTop: "80px"}}>
        <div className="d-flex justify-content-between align-items-center py-3 px-1 bg-white">
          <span className="text-black fs-2 fw-bold">Mes operations</span>
          <IconButton style={{backgroundColor: "white"}}>
            <BsDownload size={24} color={"black"}/>
          </IconButton>
        </div>

        <div className="mt-4">
          <TransactionTable onSetTotalOfAccount={handleChangeTotalAccount}/>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
