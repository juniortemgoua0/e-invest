import React from "react";

type Props = {
  fontSize?: number,
  color: string
}

export function AppName({fontSize = 16, color}: Props): JSX.Element {
  return (
    <>
      <span style={{fontSize: fontSize + "px", fontWeight: "bold", color: color}}> E-invest </span>
    </>
  );
}
