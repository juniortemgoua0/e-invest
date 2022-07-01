import React from "react";
import "./CardAmount.css";
import {RoundedIconCard} from "../RoundedIconCard";

type Props = {
  firstIcon: JSX.Element,
  secondIcon: JSX.Element,
  firstText: {
    title: string,
    amount: number
  },
  secondText: {
    title: string,
    amount: number
  }
}

export function CardAmount({firstIcon , secondIcon, firstText, secondText}: Props): JSX.Element {

  return (
    <div className="p-3 d-flex flex-column align-items-center w-100 bg-white card-container rounded-3">
      <div className="d-flex align-items-center justify-content-between w-100 mb-4">
        <div className="d-flex">
          {firstIcon}
          <div className="d-flex flex-column justify-content-center align-items-start ms-3">
            <span className="text-black-50">{firstText.title}</span>
            <span className="fs-3" style={{lineHeight:"1"}}>{firstText.amount} <span className="fs-6"> FCFA</span></span>
          </div>
        </div>
        <div className="d-flex align-items-center">
          {secondIcon}
          <div className="d-flex flex-column align-items-start justify-content-center ms-3">
            <span className="text-black-50">{secondText.title}</span>
            <span className="fs-3" style={{lineHeight:"1"}}>{secondText.amount} <span className="fs-6"> FCFA</span></span>
          </div>
        </div>
      </div>
      <div className="w-50 divider"></div>
    </div>
  );
}
