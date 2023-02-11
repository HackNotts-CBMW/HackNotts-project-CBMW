import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom"
import { useNavigate } from 'react-router-dom'

import { Grid } from '@mui/material';

import './App.css';
import './styles/styles.scss'

import Login from "./components/Login";
import Balance from './components/dashboard/Balance';
import Nav from "./components/Nav";
import CreditScore from "./components/dashboard/CreditScore"

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(true)
  // const navigate = useNavigate()
  
  return (
    <>  
    <Nav 
      userLoggedIn={userLoggedIn}
    /> 
    <Routes>
      <Route path="/login" exact element={
        <Login />
      }/>

      <Route path="/transaction-list" exact element={
        <div className="App">
        <Grid container spacing={4}>
          <Grid item xs={4} >
            <Balance />
          </Grid>
          <Grid item xs={4}>
            <CreditScore />
          </Grid>
          <Grid item xs={4}>
            <Balance />
          </Grid>
        </Grid>
      </div>
      }/>

      <Route path="/" exact element={<Navigate replace to="/login" />} />
    </Routes>
    </>
  );
}

export default App;
