import './App.css';
import './styles/styles.scss'

import Balance from './components/dashboard/Balance';
import { Grid } from '@mui/material';
import TransactionList from './components/dashboard/TransactionList';

function App() {
  return (
    <div className="App">
      <Grid container>
        <Grid item xs={4}>
          <Balance />
          <TransactionList />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
