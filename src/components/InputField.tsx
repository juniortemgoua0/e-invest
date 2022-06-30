import React from "react";
import {TextField} from "@material-ui/core";

type Props = {
  children: React.ReactNode,
  value: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  placeholder: string,
  name: string
}

export function InputField({children, value, onChange, placeholder, name}: Props): JSX.Element {
  return (
    <div className="w-100 d-flex flex-column mb-3">
      <label htmlFor={name} className="mb-3">{children}</label>
        {/*<TextField id={name} variant="outlined" onChange={onChange} name={name} placeholder={placeholder} />*/}
      <input className="input-field"
             style={{
               border: "1px solid var(--border-color)",
               borderRadius: "5px",
               height: "46px",
               width: "100%",
               paddingLeft: "10px",
               outline: "none"
             }}
             type="text"
             value={value}
             name={name}
             onChange={onChange}
             placeholder={placeholder}/>
    </div>
  );
}
