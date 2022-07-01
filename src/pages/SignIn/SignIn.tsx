import React, {useCallback, useState} from "react";
import "./SignIn.css";
import {AppName} from "../../components/AppName";
import {Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {Link, useNavigate} from "react-router-dom";
import {ScaleLoader} from "react-spinners";
import {AutoField, AutoForm, ErrorField, SubmitField} from "uniforms-semantic";
import {bridge as schema} from "../../UniformShema/SignInSchema";
import axios from "axios";

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

  const [loading, setLoading] = useState<boolean>(false)
  const classes = useStyles();
  let navigate = useNavigate();

  const URI = "https://e-invest-backend.herokuapp.com/";

  const handleSubmit = async (form: any) => {
    console.log(form)
    setLoading(true)
    await axios.post(`${URI}auth/signIn`,
      {
        ...form
      })
      .then(res => {
        setLoading(false)
        console.log(res)
        return res.data
      })
      .then(data => {
        localStorage.setItem('jwt', data.access_token)
        window.setTimeout(() => {
          navigate(`/home`, {state: {data: data}})
        }, 1000)
      })
      .catch(err => {
        setLoading(false)
        console.log(err)
      })
  };

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
            <span className="fs-2 fw-bold mb-3">Se connecter</span>
            <span className="lite-gray-text">
              Bienvenu sur <AppName color={"var(--subtitle-text-color)"}/>
               entrer vos identifiants de connexion
            </span>
          </div>
          <div className="mt-4">
            <AutoForm schema={schema} onSubmit={handleSubmit}>
              <AutoField name="username" />
              <ErrorField name="username">
                <span>Le numero de telephone est requis</span>
              </ErrorField>
              <AutoField name="password"/>
              <ErrorField name="password">
                <span>Le mot de passe est requis</span>
              </ErrorField>
              <div className="w-100 text-center mt-4"><Button className="text-danger fw-bold" color="primary">Mot de pass
                oublie?</Button></div>
              <div className="w-100 d-flex justify-content-center align-items-center mt-4">
                <div className="col-sm-12 col-md-5 ">
                  {
                    loading ?
                      <div className="w-100">
                        <Button className={classes.primary}
                                color="primary"
                                variant={"contained"}>
                          <ScaleLoader color="#ffffff"/>
                        </Button>
                      </div> :
                      <SubmitField className={classes.primary}
                                   value="Se connecter"
                                   style={{color: "white", backgroundColor: "var(--primary-color)", width:"100%"}}
                      />
                  }
                </div>
              </div>
            </AutoForm>
          </div>
          <div className="w-100 d-flex justify-content-center align-items-center mt-4">
            <div className="col col-sm-12 col-md-5">
              <div className=" d-flex align-items-center justify-content-between mt-4 mb-4">
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

