import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home/Home";
import {SignUp} from "./pages/SignUp/SignUp";
import {SignIn} from "./pages/SignIn/SignIn";
import {Transaction} from "./pages/Transaction/Transaction";
import {QrCreate} from "./pages/QrCreate/QrCreate";
import "semantic-ui-css/semantic.css"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './index.css';
import {Payment} from "./pages/Payment/Payment";
import {ModalWrap} from "./components/ModalWrap/ModalWrap";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="home" element={<Home/>}/>
        <Route path="sign-in" element={<SignIn/>}/>
        <Route path="sign-up" element={<SignUp/>}/>
        <Route path="transaction" element={<Transaction/>}/>
        <Route path="qr">
          <Route path="create" element={<QrCreate/>}/>
        </Route>
        <Route path="payment">
          <Route path="bet" element={<Payment/>}/>
          <Route path="validate" element={<ModalWrap/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement
);

reportWebVitals();
