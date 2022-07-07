import React, {useState} from "react";
import "./Withdraw.css"
import {Header} from "../../components/Header/Header";
import {AutoField, AutoForm, ErrorField, SubmitField} from "uniforms-semantic";
import {Button} from "@material-ui/core";
import {ScaleLoader} from "react-spinners";
import {useStyles} from "../SignIn/SignIn";
import {bridge as schema} from "../../UniformShema/WithdrawSchema";
import {useNavigate} from "react-router-dom";

export function Withdraw(): JSX.Element {

  const [loading, setLoading] = useState<boolean>(false)
  const classes = useStyles()
  const navigate = useNavigate()

  const handleSubmit = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/transaction')
    }, 2000)
  }

  return (
    <>
      <Header>
        <span className="text-black fs-2">Nouveau retrait</span>
      </Header>
      <div className="card-description-withdraw mx-4 d-flex flex-column py-3 px-3 mb-4 ">
        <h4 className="fw-bold text-black-50 mb-4">Traitement du retrait</h4>
        <p className="text-black-50">
            <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Adipisci blanditiis deserunt doloremque eius facilis inventore ipsa itaque pariatur qui
            quisquam,
            </span>
        </p>
      </div>

      <div className="w-100 px-3">
        <AutoForm schema={schema} onSubmit={handleSubmit}>
          <AutoField name="amount" type="number"/>
          <ErrorField name="amount">
            <span>Le montant de retrait est requis </span>
          </ErrorField>
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
                             value="Valider retrait"
                             style={{color: "white", backgroundColor: "var(--primary-color)"}}
                />
            }
          </div>
        </AutoForm>
      </div>
    </>
  );
}
