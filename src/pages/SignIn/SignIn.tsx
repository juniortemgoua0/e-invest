import React, {useCallback, useState} from "react";
import "./SignIn.css";
import {AppName} from "../../components/AppName";
import {InputField} from "../../components/InputField";
import {Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {Link, useNavigate} from "react-router-dom";
import {ScaleLoader} from "react-spinners";

export type SignInValue = {
  phoneNumber: string,
  password: string
}

export const useStyles = makeStyles({
  primary: {
    backgroundColor: "var(--primary-color)",
    width: "100%",
    color: "white",
    hover: "var(--primary-color-hover)",
    height: "46px"
  },
  outlined: {
    border: "1px solid var(--primary-color)",
    width: "100%",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    height: "46px"
  },
  text: {
    color: "var(--primary-color)"
  }
})

export function SignIn(): JSX.Element {

  const [signInValues, setSignInValues] = useState<SignInValue>({} as SignInValue);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false)
  const classes = useStyles();
  let navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    // setSignInValues(v => ({...v, [event.target.name]: event.target.value}))
    setPhoneNumber(state => event.target.value)
    console.log(phoneNumber)
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // console.log('hello world!')
    setLoading(true)
    window.setTimeout(() => {
      setLoading(false)
      navigate('/home')
    }, 2000)
  }

  return (
    <div className="sign-in-container vh-100 row">
      <div className="col-3 vh-100 left-banner">
        <div className="app-name">
          <AppName fontSize={30} color="white"/>
        </div>
        <div className="left-banner-cover"></div>
        <p className="left-banner-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus
          magna fringilla urna, porttitor rhoncus dolor purus non enim praesent
          elementum facilisis leo, vel fringilla est ullamcorper eget nulla facilisi etiam
          dignissim diam quis enim lobortis scelerisque fermentum dui faucibus in ornare
        </p>
      </div>

      <div className="col-9 vh-100  px-4 pt-5 pb-3 right-side">
        <div className="w-100 h-100 ">
          <div className="w-100 d-flex flex-column">
            <span className="fs-2 fw-bold">Se connecter</span>
            <span className="lite-gray-text">
              Bienvenu sur <AppName color={"var(--subtitle-text-color)"}/>
               entrer vos identifiants de connexion
            </span>
          </div>
          <div className="mt-4">
            <InputField value={phoneNumber} name="phoneNumber"
                        onChange={handleChange}
                        placeholder="Entrer votre numero de telephone">
              Numero de telephone
            </InputField>

            <InputField value={password} name="password"
                        onChange={handleChange}
                        placeholder="Entrer votre mot de passe">
              Mot de passe
            </InputField>
          </div>
          <div className="w-100 text-center mt-4"><Button className="text-danger fw-bold" color="primary">Mot de pass
            oublie?</Button></div>
          <div className="w-100 d-flex justify-content-center align-items-center mt-4">
            <div className="col col-sm-12 col-md-5">
              <div className="w-100">
                <Button className={classes.primary} color="primary" variant={"contained"} onClick={handleClick}>
                  {loading ?
                    <ScaleLoader color="#ffffff"/> :
                    <span>Se connecter</span>
                  }
                </Button>
              </div>
              <div className="divider d-flex align-items-center justify-content-between mt-4">
                <div className="divider-elt"></div>
                <span className="mx-3 fs-5 text-black-50"> ou </span>
                <div className="divider-elt"></div>
              </div>
              <div className="w-100 mt-4">
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.outlined}
                  startIcon={<img src="/img/icon_google.png"/>}>
                  Se connecter avec google
                </Button>
              </div>
              <div className="w-100 mt-4">
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.outlined}
                  startIcon={<img src="/img/icon_facebook.png"/>}>
                  Se connecter avec facebook
                </Button>
              </div>

              <div className="w-100 mt-3 text-center">
                <span>
                  <span className="text-black-50">Vous n'avez pas de compte?</span>
                  <Link to="/sign-up">
                    <Button className={classes.text} color="primary">S'inscrire</Button>
                  </Link>
                </span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
