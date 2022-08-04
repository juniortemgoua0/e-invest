import React, {useEffect, useLayoutEffect, useState} from "react";
import "./QrCreate.css"
import {AppName} from "../../components/AppName";
import {Button} from "@material-ui/core";
import {useStyles} from "../SignIn/SignIn";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {MoonLoader, ScaleLoader} from "react-spinners";
import QRCodeCanvas from "qrcode.react";
import {toast, ToastContainer} from "react-toastify";

export function QrCreate(): JSX.Element {

  const [loading, setLoading] = useState<boolean>(false);
  const [qrLoading, setQrLoading] = useState<boolean>(false);
  const [qrCodeValue, setQrCodeValue] = useState<string>('')
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true)
    window.setTimeout(() => {
      setLoading(false)
      navigate('/sign-in')
    }, 2000)
  }

  useEffect(() => {
    setQrLoading(true)
    console.log(location)
    // @ts-ignore
    if (location.state?.qr_code) {
      toast.success('🦄 Inscription effectué avec succès !', {
        position: "bottom-left",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
    } else {
      navigate("/sign-up")
    }
    window.setTimeout(() => {
      // @ts-ignore
      setQrCodeValue(value => location.state?.qr_code as string);
      setQrLoading(false);
    }, 4000)
  }, [])


  return (
    <div className="row">
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
        <div className="h-100 w-100 d-flex flex-column text-center align-items-center">
          <h1 className="fw-bold fs-1">Qr Code </h1>
          <div className="text-center mt-3 qr-description text-black-50 mb-5">Suite a votre inscription, nous vous avons
            generer un qr code pour identifier vos differentes transactions
          </div>

          {!qrLoading
            ?
            <QRCodeCanvas
              className="my-5"
              value={qrCodeValue}
              size={150}
              renderAs="canvas"/>
            :
            <MoonLoader size={100}/>
          }

          <div className="col-sm-12 col-md-5 btn-ok mt-5">
            <div className="w-100">
              <Button
                className={classes.primary} color="primary"
                variant={"contained"}
                onClick={handleClick}>
                {loading ?
                  <ScaleLoader color="#ffffff"/> :
                  <span>Ok c'est compris</span>
                }
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
