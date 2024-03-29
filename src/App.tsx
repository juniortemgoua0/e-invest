import React from 'react';
import './App.css';
import {Home} from "./pages/Home/Home";
import {SignUp} from "./pages/SignUp/SignUp";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {SignIn} from "./pages/SignIn/SignIn";
import {Transaction} from "./pages/Transaction/Transaction";
import {QrCreate} from "./pages/QrCreate/QrCreate";
import {Payment} from "./pages/Payment/Payment";
import {ModalWrap} from "./components/ModalWrap/ModalWrap";
import {Layout} from "./pages/Layout/Layout";
import {Withdraw} from "./pages/Withdraw/Withdraw";
import {Setting} from "./pages/Setting/Setting";
import {Enter} from "./Enter/Enter";

function App(): JSX.Element {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="enter" element={<Enter/>}/>
          <Route path="home" element={<Home/>}/>
          <Route path="transaction" element={<Transaction/>}/>
          <Route path="withdraw" element={<Withdraw/>}/>
          <Route path="setting" element={<Setting/>}/>
        </Route>
        <Route path="sign-in" element={<SignIn/>}/>
        <Route path="sign-up" element={<SignUp/>}/>
        <Route path="qr">
          <Route path="create" element={<QrCreate/>}/>
        </Route>
        <Route path="payment">
          <Route path="bet" element={<Payment/>}/>
          <Route path="validate" element={<ModalWrap/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
