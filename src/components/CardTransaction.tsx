import React from "react";

type Props = {
  type : string,
  amount: number,
  date: string,
  totalGain?: number,
  status?:string,
}

export function CardTransaction({type, amount, date , totalGain , status}: Props) : JSX.Element{

  const TYPE = "bet"

  return (
    <div className="bg-white w-100 p-3 rounded-2 mb-3">
      <div className="d-flex justify-content-between">
        <div className="d-flex align-items-center">
          <div className="rounded-circle d-flex justify-content-center align-items-center" style={{width: "70px", height: "70px", backgroundColor: "var(--bg-primary-color)"}}>
            <img src={type === TYPE ? "/img/icon_up.svg" : "/img/icon_down.svg"} alt=""/>
          </div>
          <div className="d-flex flex-column justify-content-evenly ms-3"  style={{width: "120px"}}>
            <span className="fs-4">{type === TYPE ? "Mise" : "Retrait"}</span>
            <span className="text-black-50">{date}</span>
          </div>
        </div>

        <div className="d-flex flex-column justify-content-between" style={{width: "120px"}}>
              <span className="text-end" >
                <span style={{fontSize: "26px"}} className="me-2 ">{amount}</span>
                <span className="small">FCFA</span>
              </span>
          {type === TYPE ?
            <span className="text-black-50 text-end">Gains estimer a <span>{totalGain} FCFA</span></span>  :
            <span className=" text-end">
              { type !== TYPE && status=== "validate" ?
                <span className="text-success">Valider</span> :
                <span className="text-danger">En attente de validation</span>
              }
            </span>

          }
        </div>
      </div>
    </div>
  );
}
