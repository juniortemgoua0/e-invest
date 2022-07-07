import React from "react";
import "./Home.css";
import {SemiCircularProgressbar} from "../../components/SemiCircularProgressbar/SemiCircularProgressbar";
import {CardToProgress} from "../../components/CardToProgress";
import {Header} from "../../components/Header/Header";
import {AppName} from "../../components/AppName";
import {useStyles} from "../SignIn/SignIn";
import {Button} from "@material-ui/core";
import {CardAmount} from "../../components/CardAmount/CardAmount";
import {RoundedIconCard} from "../../components/RoundedIconCard";
import {Link} from "react-router-dom";

export function Home(): JSX.Element {

  const classes = useStyles()

  return (
    <>
      <Header>
        Hey Junior <img className="ms-2" src="/img/icon_hand.svg" alt=""/>
      </Header>
      <div className="card-description mx-4 d-flex flex-column py-3 px-3 mb-4 ">
        <h1 className="fw-bold text-black-50 mb-4">Bienvenu sur <AppName color="black" fontSize={26}/></h1>
        <p className="text-black-50">
            <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Adipisci blanditiis deserunt doloremque eius facilis inventore ipsa itaque pariatur qui
            quisquam,
            </span>
        </p>
        <Link to="/payment/bet" style={{textDecoration: "none"}}>
          <Button className={classes.primary} variant="contained" color="primary"
                  startIcon={<img src="/img/icon_plus.svg" alt=""/>}> Nouvelle mise</Button>
        </Link>
      </div>
      <div className="semi-progress-circle-contain px-4 pt-5 position-relative">
        <div className="text-white">
          <div className="d-flex flex-column align-items-center mb-2 ">
            <span className="opacity-50 fs-3">Debit de progression</span>
            <span className="fs-4">70%</span>
          </div>
          <SemiCircularProgressbar debit={1} actif={1000}/>
          <div className="mt-5 pb-5">
            <CardToProgress title="Actif" subtitle={2321}
                            icon="/img/icon_check_with_card_green.svg"/>
            <CardToProgress title="Mise" subtitle={1000}
                            icon="/img/icon_check_with_card_blue.svg"/>
            <CardToProgress title="Solde" subtitle={4000}
                            icon="/img/icon_check_with_card_green.svg"/>
          </div>
        </div>
        <div className="position-absolute  card-amount-container px-3">
          <CardAmount
            firstIcon={<RoundedIconCard color="#E76508" size={70}>
              <img src="/img/icon_assign.svg" height={40} width={40} alt=""/>
            </RoundedIconCard>}
            secondIcon={<RoundedIconCard color="#E7B400" size={70}>
              <img src="/img/icon_package.svg" height={40} width={40} alt=""/>
            </RoundedIconCard>}
            firstText={{title: "Disponible", amount: 2000}}
            secondText={{title: "Retenu", amount: 4000}}
          />
        </div>
      </div>
    </>
  );
}
