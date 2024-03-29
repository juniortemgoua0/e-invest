import React, {useState} from "react";
import "./SignUp.css";
import {AppName} from "../../components/AppName";
import {Button} from "@material-ui/core";
import {useStyles} from "../SignIn/SignIn";
import {Link, useNavigate} from "react-router-dom";
import {ScaleLoader} from "react-spinners";
import {AutoField, AutoForm, BoolField, ErrorField, SelectField, SubmitField} from "uniforms-semantic";
import {bridge as schema} from "../../UniformShema/SignUpSchema";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";

const addresses = [
  'Bepepnda',
  'Bonamoussadi',
  'Makepe',
  'Pk14',
  'Logbessou',
  'Ndokotti',
];

export function SignUp(): JSX.Element {

  const classes = useStyles();
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);

  const URI = process.env.REACT_APP_API_URI

  const handleSubmit = async (form: any) => {
    console.log(form)
    setLoading(true)
    await axios.post(`${URI}auth/signUp`,
      {
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        phone_number: form.phone_number.toString(),
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
        if (err && err.response?.data?.statusCode === 401) {
          toast.error('Numero de telephone deja utiliser', {
            position: "top-right",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
          });
        } else {
          toast.error('Une erreur est survenue, veuillez reessayer plutard !', {
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
            <div className="w-100 text-center">
              <p className="lite-gray-text mb-3">
                Bienvenu sur <AppName color={"var(--subtitle-text-color)"}/>
                veuillez entrer vos informations personnelles afin d'acceder a notre communaute
              </p>
            </div>
          </div>

          <AutoForm schema={schema} onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-sm-12 col-md-6 mb-3">
                <AutoField name="first_name" style={{height: "69px"}}/>
                <ErrorField name="first_name" typeof="span"/>
              </div>
              <div className="col-sm-12 col-md-6 mb-3">
                <AutoField name="last_name"/>
                <ErrorField name="last_name"/>
              </div>
            </div>

            <AutoField name="email"/>

            <SelectField name="adresse" allowedValues={addresses}/>
            <ErrorField name="adresse"/>

            <AutoField name="phone_number" type="number"  />
            <ErrorField name="phone_number"/>

            <div className="row">
              <div className="col-sm-12 col-md-6 mb-3">
                <AutoField name="password" type="password"/>
                <ErrorField name="password"/>
              </div>
              <div className="col-sm-12 col-md-6 mb-3">
                <AutoField name="confirm_password" type="password"/>
                <ErrorField name="confirm_password"/>
              </div>
            </div>

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
            <ErrorField name="accept_terms_of_use"/>

            <div className="w-100 text-center mt-4"><Button className="text-danger fw-bold fs-6" color="primary">Mot de
              pass
              oublie?</Button></div>

            <div className="w-100 d-flex justify-content-center align-items-center mt-4 row">
              <div className="col-sm-12 col-md-5 ps-4">
                {
                  loading ?
                    <div className="w-100 ps-3">
                      <Button
                        className={classes.primary}
                        color="primary"
                        variant={"contained"}>
                        <ScaleLoader color="#ffffff"/>
                      </Button>
                    </div> :
                    <SubmitField
                      className={classes.primary}
                      value="S'inscrire"
                      style={{color: "white", backgroundColor: "var(--primary-color)"}}
                    />
                }
              </div>
            </div>

          </AutoForm>

          <div className="w-100 d-flex justify-content-center align-items-center mt-4">
            <div className="col-sm-12 col-md-5">

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
                  startIcon={<img src="/img/icon_google.png" alt="icon"/>}>
                  Se connecter avec google
                </Button>
              </div>
              <div className="w-100 mt-4">
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.outlined}
                  startIcon={<img src="/img/icon_facebook.png" alt="icon"/>}>
                  Se connecter avec facebook
                </Button>
              </div>

              <div className="w-100 mt-3 text-center mb-5">
                <span>
                  <span className="text-black-50">Vous avez deja un compte?</span>
                  <Link to="/sign-in" style={{textDecoration: "none"}}>
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
    </div>
  );
}
