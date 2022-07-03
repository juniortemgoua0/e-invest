import React from "react";
import {NavBar} from "../../components/NavBar/NavBar";
import {useStyles} from "../SignIn/SignIn";
import {Outlet} from "react-router-dom";

export function Layout(): JSX.Element {

  const classes = useStyles()

  return (
    <div className="vh-100  home-contain">
      <div className="w-100 overflow-scroll vh-100 home-scroll" style={{paddingBottom: "200px"}}>
        <Outlet/>
      </div>
      <div className="w-100 nav-bar-contain">
        <NavBar activeItem={"home"}/>
      </div>
    </div>
  );
}
