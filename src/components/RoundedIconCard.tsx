import React from "react";
import {makeStyles} from "@material-ui/styles";

const useStyle = makeStyles({
  counter: {
    height: "15px",
    width: "15px",
    top: "calc(50% - 18px)",
    left: "calc(50% )",
    position: "absolute",
  },
  contain: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
})

type Props = {
  children: React.ReactNode,
  color: string,
  size: number,
  isNotification?: boolean,
}

export function RoundedIconCard({size, color, isNotification, children}: Props): JSX.Element {
  const classes = useStyle()
  return (
    <div className={classes.contain + " rounded-circle  position-relative"}
         style={{height: `${size}px`, width: `${size}px`, background: color}}>
      {children}
      {isNotification ? <span className={classes.counter + " rounded-circle bg-danger"}></span> : ""}
    </div>
  );
}
