import { Box, List, ThemeProvider } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import theme from '../../styles/theme';
import Transaction from './Transaction';


const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    fetch('/api/transactions/'+"87267767")
      .then(async (response) => await response.json())
      .then((data) => {
        // console.log(data);
        setTransactions(data.Transactions);
      })
      .catch((err) => {
        console.log(err.message);
      })
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
      <Box className="dashboard-shadow"  sx={{
              backgroundColor: 'secondary.main',
              borderRadius: 4
            }}>
        <List  dense={false}>
            {
              transactions.map(
                (object, i) => <Transaction transaction={object}/>
                )
            }
        </List>
      </Box>
      </ThemeProvider>
    </>
  )
}

export default TransactionList