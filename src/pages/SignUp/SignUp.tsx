import React, {useState} from "react";
import "./SignUp.css";
import {AppName} from "../../components/AppName";
import {Button} from "@material-ui/core";
import {useStyles} from "../SignIn/SignIn";
import {Link, useNavigate} from "react-router-dom";
import { ScaleLoader} from "react-spinners";
import {AutoField, AutoForm, BoolField, ErrorField, SubmitField} from "uniforms-semantic";
import {bridge as schema} from "../../UniformShema/SignUpSchema";
import axios from "axios";

export function SignUp(): JSX.Element {

  const classes = useStyles();
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);


  const URI = "https://e-invest-backend.herokuapp.com/"

  const handleSubmit = async (form: any) => {
    console.log(form)
    setLoading(true)
    await axios.post(`${URI}auth/signUp`,
      {
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        phone_number: form.phone_number,
        password: form.password,
        confirm_password: form.confirm_password,
      })
      .then(res => {
        setLoading(false)
        console.log(res)
        return res.data
      })
      .then(data => {
        window.setTimeout(() => {
          navigate(`/qr/create`, {state: {qr_code: data.qr_code}})
        }, 1000)
      })
      .catch(err => {
        setLoading(false)
        console.log(err)
      })
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

      <div className="col-9 vh-100  px-4 pt-5 pb-3 right-side overflow-scroll">
        <div className="w-100 h-100 ">
          <div className="w-100 d-flex flex-column">
            <div className="w-100 text-center mb-4">
              <h1 className="fw-bold ">Inscription</h1>
            </div>
            <p className="lite-gray-text mb-3">
              Bienvenu sur <AppName color={"var(--subtitle-text-color)"}/>
               veuillez entrer vos informations personnelles afin d'acceder a notre communaute
            </p>
          </div>
          <AutoForm schema={schema} onSubmit={handleSubmit}>
            <AutoField name="first_name" style={{height: "69px"}}/>
            <ErrorField name="first_name">
              <span> Veuillez renseignez votre prenom</span>
            </ErrorField>
            <AutoField name="last_name"/>
            <ErrorField name="last_name">
              <span> Veuillez renseignez votre nom</span>
            </ErrorField>
            <AutoField name="email"/>
            <AutoField name="phone_number"/>
            <ErrorField name="phone_number">
              <span> Veuillez renseignez votre numero de telephone</span>
            </ErrorField>
            <AutoField name="password" />
            <ErrorField name="password">
              <span> Veuillez renseignez votre mot de passe</span>
            </ErrorField>

            <AutoField name="confirm_password"/>
            <ErrorField name="confirm_password">
              <span> Veuillez renseignez de nouveau votre mot de passe</span>
            </ErrorField>

            <BoolField
              name="accept_terms_of_use"
              label={
                <>J'ai lu et j'accepte la <span
                  style={{
                    textDecoration: "underline",
                    color: "var(--primary-color)"
                  }}>politique de confidentialite</span>
                </>
              }
            />
            <ErrorField name="accept_terms_of_use">
              <span> Vous devez accepter les la politique de confidentialite </span>
            </ErrorField>

            <div className="w-100 text-center mt-4"><Button className="text-danger fw-bold" color="primary">Mot de pass
              oublie?</Button></div>

            <div className="w-100 d-flex justify-content-center align-items-center mt-4 row">
              <div className="col-sm-12 col-md-5 ps-4">
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
                                 value="S'inscrire"
                                 style={{color: "white", backgroundColor: "var(--primary-color)"}}
                    />
                }
              </div>
            </div>

          </AutoForm>

          <div className="w-100 d-flex justify-content-center align-items-center mt-4">
            <div className="col-sm-12 col-md-5">
              {/*<div className="w-100">*/}
              {/*  <Button className={classes.primary} color="primary" variant={"contained"}>*/}
              {/*    {loading ?*/}
              {/*      <ScaleLoader color="#ffffff"/> :*/}
              {/*      <span>S'incrire</span>*/}
              {/*    }*/}
              {/*  </Button>*/}
              {/*</div>*/}
              <div className=" d-flex align-items-center justify-content-between mt-4">
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
