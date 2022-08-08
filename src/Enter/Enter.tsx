import React, {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {AppName} from "../components/AppName";
import {SkeletonTheme} from "react-loading-skeleton";
import {Button} from "@material-ui/core";
import {useStyles} from "../pages/SignIn/SignIn";
import {LocalStorage} from "../helpers/enums/localStorage.enum";
import axios from "axios";
import {User} from "../models/user.model";
import {toast} from "react-toastify";

export function Enter(): JSX.Element {

  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const onNavigateHome = () => {
    navigate(`/home`)
  }

  useEffect(() => {
    const token: string = localStorage.getItem('jwt') as string
    if (!token) {
      navigate('/sign-in')
    }
    (async () => {
      let currentUser = JSON.parse(localStorage.getItem(LocalStorage.CURRENT_USER) as string);

      if (!currentUser) {
        await axios.get<User>(`${process.env.REACT_APP_API_URI}user/${currentUser._id}`)
          .then(res => res.data)
          .then((data: User) => {
            console.log(data)
            localStorage.setItem(LocalStorage.CURRENT_USER, JSON.stringify(data))
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

  return (
    <div className="vh-100  home-contain">
      <div className="w-100 overflow-scroll vh-100 home-scroll" style={{paddingBottom: "150px"}}>
        <div className="card-description mx-4 d-flex flex-column py-3 px-3 mb-4 ">
          <h1 className="fw-bold text-black-50 mb-4">Bienvenu sur <AppName color="black" fontSize={26}/></h1>
          <p className="text-black-50">
            <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Adipisci blanditiis deserunt doloremque eius facilis inventore ipsa itaque pariatur qui
            quisquam,
            </span>
            <SkeletonTheme/>
          </p>
          <Button
            className={classes.primary}
            variant="contained"
            color="primary"
            onClick={onNavigateHome}
          >
            Ok c'est compris
          </Button>

        </div>
      </div>
    </div>
  )
}
