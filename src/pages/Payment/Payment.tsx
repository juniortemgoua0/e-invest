import React, {useState} from "react";
import "./Payment.css";
import {AutoField, AutoForm, ErrorField, SubmitField} from "uniforms-semantic";
import {bridge as schema} from "../../UniformShema/PaymentSchema";
import {Button} from "@material-ui/core";
import {ScaleLoader} from "react-spinners";
import {useStyles} from "../SignIn/SignIn";
import {useNavigate} from "react-router-dom";

type paymentInfo = {
  amount: number,
  payment_mode: string,
  payment_number: string,
}

export function Payment(): JSX.Element {

  const amountsOfBet: number[] = [500, 1000, 2000, 5000, 10000, 15000, 20000, 30000, 45000, 50000];
  const paymentMode: string[] = ["om", "momo"];

  const [paymentInfo, setPaymentInfo] = useState<paymentInfo>({
    amount: amountsOfBet[0],
    payment_mode: paymentMode[0]
  } as paymentInfo);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate()
  const classes = useStyles();

  const handleAmountSelectedClick = (index: number) => {
    setPaymentInfo(state => ({...state, amount: amountsOfBet[index]}))
  };

  const handleSelectPaymentMode = (item: string) => {
    setPaymentInfo(state => ({...state, payment_mode: item}))
  };

  const handleSelectPhonePayment = (form: any) => {
    setPaymentInfo(state => ({...state, payment_number: form.phone_number}))
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/payment/validate')
    }, 2000)
  };

  return (
    <div className="mt-4 pb-5 px-4">
      <div className="w-100 text-center mb-4">
        <h1 className="fw-bold">Nouvelle mise</h1>
      </div>

      <div className="d-flex flex-column">
        <div className="montant w-100  mb-4">
          <div className="text-center w-100">
            <h3 className="text-black-50"> Montant de la mise </h3>
          </div>
          <div className="mt-1">
            <div className="d-flex justify-content-around align-items-center text-black-50">
              <div style={{flex: ".5"}}></div>
              <span className="select-amount me-5">{paymentInfo.amount}</span>
              <span className="mt-2 fs-2 me-5"> FCFA </span>
            </div>
            <div className="divider-elt my-2"></div>
            <div className="w-100 d-flex content-amounts mt-3">
              {amountsOfBet.map((item: number, i: number) =>
                  <span onClick={() => {
                    handleAmountSelectedClick(i)
                  }}
                        key={i}
                        className={item === paymentInfo.amount ? "px-2 py-1 rounded-3 mx-3 text-white" : "px-2 py-1 rounded-3 mx-3 text-black-50"}
                        style={{
                          border: "1px solid var(--border-color)",
                          backgroundColor: item === paymentInfo.amount ? "var(--primary-color)" : "",
                        }}>
                {item}
              </span>
              )}
            </div>
          </div>
        </div>

        <div className="w-100 mt-4">
          <div className="text-center w-100">
            <h3 className="text-black-50 mb-4"> Informations complementaires </h3>
          </div>
          <div className="mt-4">
            <AutoForm schema={schema} onSubmit={handleSelectPhonePayment}>
              <AutoField name="phone_number" type="number"/>
              <ErrorField name="phone_number">
                <span>Le numero de payement est requis </span>
              </ErrorField>
              <p className="fw-bold">Mode de paiement <span className="text-danger">*</span></p>
              <div className="w-100 d-flex px-4 justify-content-between border py-3 rounded-2">
                {paymentMode.map((item: string, index: number) =>
                  <div key={index}
                       className={paymentInfo.payment_mode === item ? "bg-white shadow-sm p-2 active-payment mx-2" : "bg-white shadow-sm p-2 mx-2"}
                       onClick={() => handleSelectPaymentMode(item)}>
                    <img src={"/img/" + item + ".png"} alt=""/>
                  </div>
                )}
              </div>
              <div className="w-100 mt-5">
                {
                  loading ?
                    <div className="w-100 ps-3">
                      <Button className={classes.primary}
                              color="primary"
                              variant={"contained"}>
                        <ScaleLoader color="#ffffff"/>
                      </Button>
                    </div> :
                    <SubmitField className={classes.primary}
                                 value="Valider paiement"
                                 style={{color: "white", backgroundColor: "var(--primary-color)"}}
                    />
                }
              </div>

            </AutoForm>
          </div>

        </div>



      </div>
    </div>
  );
}
