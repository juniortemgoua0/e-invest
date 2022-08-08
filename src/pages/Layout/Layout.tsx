import React from "react";
import {NavBar} from "../../components/NavBar/NavBar";
import {Outlet, useNavigate} from "react-router-dom";

export function Layout(): JSX.Element {
  const navigate = useNavigate()

  return (
    <div className="vh-100  home-contain">
      <div className="w-100 overflow-scroll vh-100 home-scroll" style={{paddingBottom: "150px"}}>
        <Outlet/>
      </div>
      <div className="w-100 nav-bar-contain">
        <NavBar activeItem={"home"}/>
      </div>
    </div>
  );
}
