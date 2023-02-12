import { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom"
import { useNavigate } from 'react-router-dom'

import { Grid } from '@mui/material';

import './App.css';
import './styles/styles.scss'

import Login from "./components/Login";
import Balance from './components/dashboard/Balance';
import Nav from "./components/Nav";
import CreditScore from "./components/dashboard/CreditScore"
import DoughNotts from "./components/dashboard/DoughNotts";
import GridDoughNotts from "./components/dashboard/GridDoughNotts";
import SignUp from "./components/SignUp";
import AllTransactions from "./components/dashboard/AllTransactions";

import { checkUserInfo } from "../src/helpers"

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  // const navigate = useNavigate()

  useEffect(() => {
    // Returns user info
    // console.log(checkUserInfo())
  }, []);
  
  return (
    <>  
    <Nav 
      userLoggedIn={userLoggedIn}
      setUserLoggedIn={setUserLoggedIn}
    /> 
    <Routes>
      <Route path="/login" exact element={
        <Login 
        setUserLoggedIn={setUserLoggedIn}
        />
      }/>

      <Route path="/sign-up" exact element={
        <SignUp 
        setUserLoggedIn={setUserLoggedIn}
        />
      }/>

      <Route path="/transactions" exact element={
        <AllTransactions />
      }/>

      <Route path="/dashboard" exact element={
        userLoggedIn ? (
          <div className="App">
            <div className="dashboard-grid">
              <Balance />
              <CreditScore />
              <GridDoughNotts />
            </div>
        </div> ) : <Navigate replace to="/login" />
      }/>

      <Route path="/" exact element={<Navigate replace to="/login" />} />
    </Routes>
    </>
  );
}

export default App;
