import React from "react";
import "./Transaction.css";
import {Header} from "../../components/Header/Header";
import {Button} from "@material-ui/core";
import {useStyles} from "../SignIn/SignIn";
import {CardTransaction} from "../../components/CardTransaction";
import {CardAmount} from "../../components/CardAmount/CardAmount";
import {RoundedIconCard} from "../../components/RoundedIconCard";
import {NavBar} from "../../components/NavBar/NavBar";
import {Link} from "react-router-dom";


export function Transaction(): JSX.Element {

  const classes = useStyles()

  return (
    <>
      <Header>
        <span className="text-black fs-2">Transactions</span>
      </Header>

      <div className="mx-3 mb-4">
        <p className="text-black-50 mtb-3">Disponible</p>
        <div className="d-flex mb-4 align-items-center">
          <h1 className="fw-bold">20 000</h1>
          <div className="bg-warning text-white rounded-2 p-1 small ms-5" style={{objectFit: "fill"}}>
            <span>FCFA</span>
          </div>
        </div>
        <div className="w-100 d-flex justify-content-between align-items-center">
          <div className="">
            <Link to="/withdraw" style={{textDecoration: "none"}}>
              <Button className={classes.outlined}
                      variant="outlined"
                      color="primary"
                      startIcon={<img src="/img/icon_retrait.svg" alt=""/>}>
                Retrait
              </Button>
            </Link>
          </div>

          <div className="">
            <Link to="/payment/bet" style={{textDecoration: "none"}}>
              <Button className={classes.primary}
                      variant="contained"
                      startIcon={<img src="/img/icon_plus.svg" alt=""/>}
                      color="primary">
                Nouvelle mise
              </Button>
            </Link>
          </div>

        </div>
      </div>
      <div className="w-100 px-3 pt-3 d-flex flex-column position-relative"
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
            firstText={{title: "Total mise", amount: 20000}}
            secondText={{title: "Retenu", amount: 4000}}
          />
        </div>
      </div>
    </>
  );
}
