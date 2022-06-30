import React from "react";

type Props = {
  title: string,
  subtitle: string,
  icon:string
}

export function CardToProgress({title , subtitle, icon}: Props): JSX.Element {

  return (
    <div className="d-flex align-items-center center p-3 bg-white rounded-3 text-black w-100 mt-3 mb-3">
      <img src={icon} alt=""/>
      <div className="d-flex flex-column align-items-start justify-content-between ms-3 ">
        <span className="text-black-50">{title}</span>
        <span className="text-black fs-6">{subtitle}</span>
      </div>
    </div>
  );
}
