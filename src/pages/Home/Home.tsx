import React, {useEffect, useLayoutEffect, useState} from "react";
import "./Home.css";
import {SemiCircularProgressbar} from "../../components/SemiCircularProgressbar/SemiCircularProgressbar";
import {Header} from "../../components/Header/Header";
import {AppName} from "../../components/AppName";
import {useStyles} from "../SignIn/SignIn";
import {Button} from "@material-ui/core";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import {SkeletonTheme} from "react-loading-skeleton";
import axios from "axios";
import {User} from "../../models/user.model";
import {CardToProgress} from "../../components/CardToProgress";
import {CardAmount} from "../../components/CardAmount/CardAmount";
import {RoundedIconCard} from "../../components/RoundedIconCard";
import {CircularProgressbar} from "react-circular-progressbar";
import {LocalStorage} from "../../helpers/enums/localStorage.enum";

export function Home(): JSX.Element {

  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState<User>()
  const [bet, setBet] = useState<any>(undefined)

  const [actif, setActif] = useState<number>(0)

  const handleSetActif = (newActif: number) => {
    // console.log(newActif)
    setActif(newActif)
  }

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if (!token) {
      navigate('/sign-in')
    }
    console.log(actif)
    // @ts-ignore
    const userId = location.state?.data.id as string

    (async () => {
      let currentUser = localStorage.getItem(LocalStorage.CURRENT_USER)
      if (!currentUser) {
        await axios.get<User>(`${process.env.REACT_APP_API_URI}user/${userId}`)
          .then(res => res.data)
          .then((data: User) => {
            console.log(data)
            localStorage.setItem(LocalStorage.CURRENT_USER, JSON.stringify(data))
            setUser(data)
          })
          .catch(err => console.log(err))
      }
    })()

    //@ts-ignore
    if (location.state?.data) {
      toast.success('Connexion reussite avec succès !', {
        position: "top-right",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
    }
  }, [])


  useLayoutEffect(() => {

    (async () => {

      let currentUser = JSON.parse(localStorage.getItem(LocalStorage.CURRENT_USER) as string)
      await axios.get<any>(`${process.env.REACT_APP_API_URI}bet/current-bet/${currentUser._id}`)
        .then(res => res.data)
        .then(data => {
          console.log(data)
          if (data) {
            localStorage.setItem(LocalStorage.CURRENT_BET, JSON.stringify(data))
            setBet(data)
            setActif(data?.bet_amount)
          }
        })
        .catch(err => {
          console.log(err)
          if(err && err.response?.data?.statusCode === 401){
            toast.info("Vous n'avez pas de mise en cours, veuillez cliquer sur le boutton nouvelle mise pour souscrire !", {
              position: "top-right",
              autoClose: 15000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored"
            });
          }else{
            toast.error("Une erreur est survenu !", {
              position: "top-right",
              autoClose: 15000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored"
            });
          }
        })
    })()
  }, [user])

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
          <SkeletonTheme/>
        </p>
        <Link to="/payment/bet" style={{textDecoration: "none"}}>
          <Button
            className={classes.primary}
            variant="contained"
            color="primary"
            startIcon={<img src="/img/icon_plus.svg" alt=""/>}>
            Nouvelle mise
          </Button>
        </Link>
      </div>
      <div className="semi-progress-circle-contain  pt-5 position-relative">
        <div className="text-white d-flex flex-column align-items-cente ">
          <div className="d-flex flex-column align-items-center mb-2 ">
            {
              bet ?
                <>
                  <span className="opacity-50 fs-3">Debit de progression</span>
                  <span className="fs-4"> {bet ? "70%" : "---"}</span>
                </> :
                <p>Vous n'avez pas de mise en cours</p>
            }
          </div>
          {
            bet
              ?
              <SemiCircularProgressbar
                progression={50}
                status={0}
                debit={0.016}
                actif={actif}
                onSetActif={handleSetActif}
              />
              :
              <div className="semi-progress-circle">
                <CircularProgressbar
                  value={0}
                  circleRatio={0.6}
                  styles={{
                    trail: {
                      transform: 'rotate(-108deg)',
                      transformOrigin: 'center center'
                    },
                    path: {
                      transform: 'rotate(-108deg)',
                      transformOrigin: 'center center'
                    }
                  }}
                />
                <div className="d-flex flex-column align-items-center text-black position-absolute actif-group">
                  <img src="/img/icon_graph_up.svg" alt=""/>
                </div>
                <div className="percent-text text-0 fs-4">0%</div>
                <div className="percent-text text-100 fs-4">100%</div>
              </div>
          }
          <div className="mt-5 pb-5" style={{width: "100%"}}>
            <CardToProgress
              title="Actif" subtitle={ actif ? actif : bet ? bet?.bet_amount : "---"}
              icon="/img/icon_check_with_card_yellow.svg"
            />
            <CardToProgress
              title="Mise" subtitle={bet ? bet?.bet_amount : "---"}
              icon="/img/icon_check_with_card_blue.svg"
            />
            <CardToProgress
              title="Solde" subtitle={bet ? bet?.balance_amount : "---"}
              icon="/img/icon_check_with_card_green.svg"
            />
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
        <div className="position-absolute  card-amount-container px-3">
          <CardAmount
            firstIcon={<RoundedIconCard color="#E76508" size={70}>
              <img src="/img/icon_assign.svg" height={40} width={40} alt=""/>
            </RoundedIconCard>}
            secondIcon={<RoundedIconCard color="#000000" size={70}>
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
