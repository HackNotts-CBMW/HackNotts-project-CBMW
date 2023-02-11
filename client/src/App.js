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
import DoughNotts from "./components/dashboard/DoughNotts";
import GridDoughNotts from "./components/dashboard/GridDoughNotts";

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

      <Route path="/dashboard" exact element={
        <div className="App">
          <div className="dashboard-grid">
            <Balance />
            <CreditScore />
            <GridDoughNotts />
          </div>
        {/* <Grid container spacing={1}>
          <Grid item xs={2} >
            <Balance />
          </Grid>
          <Grid item xs={5}>
            <CreditScore />
          </Grid>
          <Grid item xs={5}>
            <GridDoughNotts />
          </Grid>
        </Grid> */}
      </div>
      }/>

      <Route path="/" exact element={<Navigate replace to="/login" />} />
    </Routes>
    </>
  );
}

export default App;
