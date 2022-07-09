import React from "react";
import "./ModalWrap.css";
import {Button} from "@material-ui/core";
import {useStyles} from "../../pages/SignIn/SignIn";
import {Link, useLocation} from "react-router-dom";

export function ModalWrap(): JSX.Element {
  const classes = useStyles();
  const location = useLocation();

  const paymentInfo = {
    // @ts-ignore
    paymentNumber: location.state?.payment_number,
    // @ts-ignore
    amount: location.state?.amount,
    // @ts-ignore
    paymentMode: location.state?.payment_mode
  }

  return (
    <div className="d-flex justify-content-center align-items-center  card-page vh-100 w-100 px-3 py-5"
         style={{backgroundColor: "var(--primary-color)"}}>

      <div className="card-wrapper mt-5 w-100" style={{maxWidth: "700px"}}>
        <div className="card-status d-flex justify-content-center align-items-center">
          <img src="/img/icon_check.svg" alt=""/>
        </div>

        <div className="w-100 px-5 d-flex flex-column align-items-center text-center"
             style={{marginTop: "70px"}}>
          <p className="fw-bold mb-5 w-100">Mise effectuer avec success</p>
          <div className="d-flex flex-column align-items-center px-3 py-3 text-black-50 amount-detail">
            <div className="d-flex align-items-center">
              <span className="amount"> {paymentInfo.amount} </span>
              <span className="mt-3 ms-5 fw-light">FCFA</span>
            </div>
            <span className=""> Votre paiement a ete effectue avec succes </span>
          </div>
        </div>

        <div className="mt-3 px-3 w-100">
          <div className="d-flex justify-content-between mb-2 fw-bold w-100">
            <span>De</span>
            <span>Junior Temgoua</span>
          </div>
          <div className="d-flex justify-content-between mb-4 text-black-50 fw-bold w-100">
            <span>{paymentInfo.paymentMode === 'om' ? "Orange Money" : "Mtn Mobile Money"}</span>
            <span>+237 {paymentInfo.paymentNumber}</span>
          </div>

          <div className="w-100 divider-elt mb-5"></div>

          <div className="d-flex justify-content-between mb-2 fw-bold w-100">
            <span>Date</span>
            <div className="d-flex flex-column align-items-end">
              <span>{new Date().toLocaleDateString()}</span>
              <span className="text-black-50">{new Date().toLocaleTimeString()}</span>
            </div>
          </div>

          <div className="w-100 d-flex justify-content-center align-items-center mb-4 back-btn-container">
            <Link to="/home" style={{textDecoration: "none"}}>
              <Button className={classes.outlined} variant="outlined" style={{color: "var(--primary-color)"}}>
                Revenir a l'accueil
              </Button>
            </Link>

          </div>
        </div>
      </div>

    </div>
  );
}
