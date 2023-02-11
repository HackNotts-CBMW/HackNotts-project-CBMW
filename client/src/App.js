import { Route, Routes, Navigate } from "react-router-dom"
import { useNavigate } from 'react-router-dom'

import './App.css';
import './styles/styles.scss'

import Login from "./components/Login";
import Balance from './components/dashboard/Balance';
import { Grid } from '@mui/material';
import TransactionList from './components/dashboard/TransactionList';

function App() {
  const navigate = useNavigate()
  
  return (
    <>   
    <Routes>
      <Route path="/login" exact element={
        <Login />
      }/>

      <Route path="/transaction-list" exact element={
        <div className="App">
        <Grid container>
          <Grid item xs={4}>
            <Balance />
            <TransactionList />
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
