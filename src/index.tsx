import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home/Home";
import {SignUp} from "./pages/SignUp/SignUp";
import {SignIn} from "./pages/SignIn/SignIn";
import {Transaction} from "./pages/Transaction/Transaction";
import {QrCreate} from "./pages/QrCreate/QrCreate";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/sign-in" element={<SignIn/>} />
        <Route path="/sign-up" element={<SignUp/>} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/Qrcreate" element={<QrCreate/>}/>
        <Route path="/Qrgenerate" element={<QrCreate/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
