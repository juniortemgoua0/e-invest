import React from "react";
import "./Home.css";
import {SemiCircularProgressbar} from "../../components/SemiCircularProgressbar/SemiCircularProgressbar";
import {CardToProgress} from "../../components/CardToProgress";
import {NavBar} from "../../components/NavBar";
import {Header} from "../../components/Header/Header";
import {AppName} from "../../components/AppName";
import {useStyles} from "../SignIn/SignIn";
import {Button} from "@material-ui/core";
import {CardAmount} from "../../components/CardAmount/CardAmount";
import {RoundedIconCard} from "../../components/RoundedIconCard";

export function Home(): JSX.Element {

  const classes = useStyles()

  return (
    <div className="vh-100  home-contain">
      <div className="w-100 overflow-scroll vh-100" style={{paddingBottom: "200px"}}>
        <Header/>
        <div className="card-description mx-4 d-flex flex-column py-3 px-3 mb-4 " >
          <h1 className="fw-bold text-black-50 mb-4">Bienvenu sur <AppName color="black" fontSize={26}/></h1>
          <p className="text-black-50">
            <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Adipisci blanditiis deserunt doloremque eius facilis inventore ipsa itaque pariatur qui
            quisquam,
            </span>
          </p>
          <Button className={classes.primary} variant="contained" color="primary"
                  startIcon={<img src="/img/icon_plus.svg" alt=""/>}> Nouvelle mise</Button>
        </div>
        <div className="semi-progress-circle-contain px-5 pt-5 position-relative" >
          <div className="text-white">
            <div className="d-flex flex-column align-items-center mb-2 fs-5">
              <span className="opacity-50">Mise en cours</span>
              <span>1000 Fcfa</span>
            </div>
            <SemiCircularProgressbar debit={1} actif={1000}/>
            <div className="mt-5 pb-5">
              <CardToProgress title="Debit de progression" subtitle={70 + "%"}
                              icon="/img/icon_check_with_card_blue.svg"/>
              <CardToProgress title="Solde" subtitle={4000 + " Fcfa"} icon="/img/icon_check_with_card_green.svg"/>
            </div>
          </div>
          <div className="position-absolute  card-amount-container px-4">
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
      </div>
      <div className="w-100 nav-bar-contain">
        <NavBar activeItem={"home"}/>
      </div>
    </div>
  );
}
