import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom"
import {AuthContextProvider} from "./context/AuthContext" 
import PartnerContext from './context/PartnerContext';
import PartnerState from './context/PartnerState';
ReactDOM.render(
  // <React.StrictMode>
    <AuthContextProvider>
    <PartnerState>
    <BrowserRouter>
    <App />
  </BrowserRouter>
  </PartnerState>
  </AuthContextProvider>
  // </React.StrictMode>
  ,document.getElementById("root")
);
