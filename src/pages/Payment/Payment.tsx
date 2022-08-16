import React, {useEffect, useState} from "react";
import "./Payment.css";
import {AutoField, AutoForm, ErrorField, SubmitField} from "uniforms-semantic";
import {bridge as schema} from "../../UniformShema/PaymentSchema";
import {Button} from "@material-ui/core";
import {ScaleLoader} from "react-spinners";
import {useStyles} from "../SignIn/SignIn";
import {useNavigate} from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import {ProgressBar} from "react-bootstrap";
import axios from "axios";
import {LocalStorage} from "../../helpers/enums/localStorage.enum";
import {toast, ToastContainer} from "react-toastify";

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
    payment_mode: paymentMode[0],
    payment_number: ''
  } as paymentInfo)

  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [paymentStatus, setPaymentStatus] = useState<string>('pending')

  const navigate = useNavigate();
  const classes = useStyles();
  let currentUser = JSON.parse(localStorage.getItem(LocalStorage.CURRENT_USER) as string);

  const handleAmountSelectedClick = (index: number) => {
    setPaymentInfo(state => ({...state, amount: amountsOfBet[index]}))
  };

  const handleSelectPaymentMode = (item: string) => {
    setPaymentInfo(state => ({...state, payment_mode: item}))
  };

  const handleSelectPhonePayment = async (form: any) => {
    setPaymentInfo(state => ({...state, payment_number: form.phone_number}))
    setLoading(true)
    await axios.get(`${process.env.REACT_APP_API_URI}bet/check-bet/${currentUser?._id}`)
      .then(res => res.data)
      .then(data => {
        localStorage.setItem('progression', "50")
        console.log(data)
        setIsOpen(true)
        window.setTimeout(() => {
          setPaymentStatus("slow")
        }, 6000)
        setLoading(true)

      })
      .catch(err => {
        console.log(err)
        if (err && err.response?.data?.statusCode === 401) {
          toast.error('Vous avez deja une mise en cours, veuillez patientez que celle-ci se termine', {
            position: "top-right",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
          });
          setLoading(false)
        } else {
          toast.error('Une erreur est survenu veuillez reessayer plus tard', {
            position: "top-right",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
          });
          setLoading(false)
        }
      })

  };

  const [progressValidate, setProgressValidate] = useState<number>(0)
  useEffect(() => {
    let timer: number | undefined = undefined

    if (paymentStatus === 'slow') {
      (async () => {
        axios.post(`${process.env.REACT_APP_API_URI}payment/${currentUser?._id}`, {
          amount: paymentInfo.amount,
          phone_number: paymentInfo.payment_number.toString(),
          payment_mode: paymentInfo.payment_mode
        })
          .then(res => res.data)
          .then(data => {
            // setIsOpen(false)
            setLoading(false)
            setPaymentStatus("validate")
            let i = 0;
            timer = window.setInterval(() => {
              if (i < 100) {
                i++
                setProgressValidate(i)
                console.log('render')
              } else {
                timer = undefined
              }
            }, 30)

            console.log(data)

            axios.post(`${process.env.REACT_APP_API_URI}bet/${currentUser._id}`, {
              bet_amount: data?.amount,
              balance_amount: data?.amount * 3,
              available_amount: data?.amount * 3 * 0.75,
              retained_amount: data?.amount * 3 * 0.25,
              active_duration: 24,
              payment_reference: data?.reference
            })
              .then(res => res.data)
              .then(data => {
                console.log(data)
                localStorage.setItem(LocalStorage.CURRENT_BET, JSON.stringify(data))
                setTimeout(() => {
                  setLoading(false)
                  navigate(
                    '/payment/validate',
                    {state: paymentInfo}
                  )
                }, 12000)
              })
              .catch(err => {
                console.log(err)
                if (err && err.response?.data?.statusCode === 401) {
                  toast.error('Vous avez deja une mise en cours, veuillez patientez que celle-ci se termine', {
                    position: "top-right",
                    autoClose: 10000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                  });
                  setIsOpen(false)
                  setLoading(false)
                } else {
                  toast.error('Une erreur est survenu veuillez reessayer plus tard', {
                    position: "top-right",
                    autoClose: 10000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                  });
                }
                setIsOpen(false)
                setLoading(false)
              })
          })
          .catch(err => {
            console.log(err)
            toast.error("Une erreur s'est produite, veuillez reessayer plus tard !", {
              position: "top-right",
              autoClose: 6000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored"
            });
            setIsOpen(false)
            setLoading(false)
          })
      })();

      return () => {

      }
    }
  }, [paymentStatus])

  return (
    <>
      {
        isOpen
        &&
        <div className="cover">
            <span
              className="fs-2 fw-bold cover_closer d-flex justify-content-center align-items-center"
              onClick={() => {
                setIsOpen(false)
              }}>
              <span>x</span>
            </span>
          {
            paymentStatus === "pending"
              ?
              <div className="w-100 px-5 text-center" style={{paddingTop: "100px"}}>
                <h3 className="fw-bold mb-5">Traitement en cours...</h3>
                <p className="text-black-50">
                  Nous essayeons de joindre l'operateur veuillez patienter
                </p>
                <p className="100%">
                  <Skeleton baseColor="#63ddfa" height={7}/>
                </p>
              </div>
              :
              paymentStatus === "slow"
                ?
                <div className="w-100 px-5 text-center" style={{paddingTop: "100px"}}>
                  <h3 className="fw-bold mb-5">En attente de traitement...</h3>
                  <p className="text-black-50">La demande de payment de
                    <span className="fs-4"
                          style={{color: "var(--primary-color)"}}> {paymentInfo.amount} fcfa </span>
                    a bien été envoyé a
                    <span className="fs-4"
                          style={{color: "var(--primary-color)"}}> {paymentInfo.payment_number} </span>
                    via l'operateur
                    {paymentInfo.payment_mode === 'om'
                      ?
                      <span className="fs-4" style={{color: "var(--primary-color)"}}> Orange </span>
                      :
                      <span className="fs-4" style={{color: "var(--primary-color)"}}> MTN </span>
                    }
                  </p>
                  <p className="text-black-50">Patientez quelques instant , un message flash s'affichera, dans le cas
                    contraire,
                    veuillez le saisir le </p>
                  <p className="code_pay fw-bold"
                     style={{color: paymentInfo.payment_mode === 'om' ? "orange" : '#FFFF43'}}>
                    {paymentInfo.payment_mode === 'om' ? "#150*50#" : "*126#"}
                  </p>
                </div>
                :
                paymentStatus === "validate"
                  ?
                  <div className="w-100 px-5 text-center" style={{paddingTop: "100px"}}>
                    <h3 className="fw-bold mb-5">Paiement effectuer avec succes</h3>
                    {/*<h3 className=" ">Payment effectuer avec succes</h3>*/}
                    <h5 className="fw-old text-black-50">Placement de la mise en cours....</h5>
                    <ProgressBar striped variant="info" now={progressValidate}/>
                  </div>
                  :
                  <span></span>
          }
        </div>
      }
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
                    <span
                      onClick={() => {
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
                    <div
                      key={index}
                      className={paymentInfo.payment_mode === item ? "bg-white shadow-sm p-2 active-payment mx-2" : "bg-white shadow-sm p-2 mx-2"}
                      onClick={() => handleSelectPaymentMode(item)}>
                      <img src={"/img/" + item + ".png"} alt=""/>
                    </div>
                  )}
                </div>
                <div className="w-100 mt-5">
                  {
                    loading
                      ?
                      <div className="w-100 ps-3">
                        <Button
                          className={classes.primary}
                          color="primary"
                          variant={"contained"}>
                          <ScaleLoader color="#ffffff"/>
                        </Button>
                      </div>
                      :
                      <SubmitField
                        className={classes.primary}
                        value="Valider la mise"
                        style={{color: "white", backgroundColor: "var(--primary-color)"}}
                      />
                  }
                </div>
              </AutoForm>
            </div>
          </div>
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
