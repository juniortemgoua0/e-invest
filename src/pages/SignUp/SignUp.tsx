import React, {useEffect, useState} from "react";
import "./SignUp.css";
import {AppName} from "../../components/AppName";
import {InputField} from "../../components/InputField";
import {Button} from "@material-ui/core";
import {useStyles} from "../SignIn/SignIn";
import {Link, useNavigate} from "react-router-dom";
import {MoonLoader, ScaleLoader} from "react-spinners";

export function SignUp(): JSX.Element {

  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const classes = useStyles();
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  let timer: number | undefined = undefined

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    // setSignInValues(v => ({...v, [event.target.name]: event.target.value}))
    setPhoneNumber(state => event.target.value)
    console.log(phoneNumber)
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true)
    window.setTimeout(() => {
      setLoading(false)
      navigate('/Qrcreate')
    }, 3000)
  }

  useEffect(() => {
    return () => {
      window.clearInterval(timer)
    }
  })

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

      <div className="col-9 vh-100  px-4 pt-5 pb-3 right-side overflow-scroll">
        <div className="w-100 h-100 ">
          <div className="w-100 d-flex flex-column">
            <span className="fs-2 fw-bold">S'inscrire</span>
            <span className="lite-gray-text">
              Bienvenu sur <AppName color={"var(--subtitle-text-color)"}/>
               veuillez entrer vos informations personnelles afin d'acceder a notre communaute
            </span>
          </div>
          <div className="mt-4">
            <div className="row">
              <div className=" col-sm-12 col-md-6">
                <InputField value={phoneNumber} name="phoneNumber"
                            onChange={handleChange}
                            placeholder="Entrer votre numero de telephone">
                  Nom
                </InputField>
              </div>

              <div className=" col-sm-12 col-md-6">
                <InputField value={password} name="password"
                            onChange={handleChange}
                            placeholder="Entrer votre mot de passe">
                  Prenom
                </InputField>
              </div>
            </div>


            <InputField value={password} name="password"
                        onChange={handleChange}
                        placeholder="Entrer votre mot de passe">
              Email
            </InputField>

            <InputField value={password} name="password"
                        onChange={handleChange}
                        placeholder="Entrer votre mot de passe">
              Telephone
            </InputField>

            <div className="row">
              <div className=" col-sm-12 col-md-6">
                <InputField value={phoneNumber} name="phoneNumber"
                            onChange={handleChange}
                            placeholder="Entrer votre numero de telephone">
                  Mot de passe
                </InputField>
              </div>

              <div className=" col-sm-12 col-md-6">
                <InputField value={password} name="password"
                            onChange={handleChange}
                            placeholder="Entrer votre mot de passe">
                  Confirmer mot de passe
                </InputField>
              </div>
            </div>

            <div className="my-3 w-100 d-flex align-items-center">
              <input type="checkbox" className="me-3 form-check-input"/>
              <span>J'ai lu et j'accepte la <span className={classes.text} style={{textDecoration: "underline"}}>politique de confidentialite</span>
              </span>
            </div>
          </div>
          <div className="w-100 text-center mt-4"><Button className="text-danger fw-bold" color="primary">Mot de pass
            oublie?</Button></div>
          <div className="w-100 d-flex justify-content-center align-items-center mt-4">
            <div className="col col-sm-12 col-md-5">
              <div className="w-100">
                <Button className={classes.primary} color="primary" variant={"contained"}
                        onClick={handleClick}>
                  {loading ?
                    <ScaleLoader color="#ffffff"/> :
                    <span>S'incrire</span>
                  }
                </Button>
              </div>
              <div className="divider d-flex align-items-center justify-content-between mt-4">
                <div className="divider-item"></div>
                <span className="mx-3 fs-5 text-black-50"> ou </span>
                <div className="divider-item"></div>
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

              <div className="w-100 mt-3 text-center mb-5">
                <span>
                  <span className="text-black-50">Vous avez deja un compte?</span>
                  <Link to="/sign-in">
                  <Button className={classes.text}
                          color="primary">Se connecter
                  </Button>
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
