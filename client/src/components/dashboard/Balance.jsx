import axios from 'axios';
import { useState, useEffect } from 'react';
import { Box, Container, ThemeProvider, Typography } from '@mui/material';
import theme from '../../styles/theme';

import TransactionList from './TransactionList';

import { ReactComponent as Warning }  from '../../img/warning.svg'

import { checkUserInfo, getLoggedInUser } from '../../helpers'

const Balance = () => {
  const [creditLimit, setCreditLimit] = useState(0)
  const [currBalance, setCurrBalance] = useState(0)
  const [dailySpendingForMon, setDailySpendingForMon] = useState(0)
  const [totalSpending, setTotalSpending] = useState(0)
  
  const isToday = (someDate) => {
    const today = new Date()
    return someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
  }

  useEffect(() => {
    const userData = checkUserInfo();

    setCreditLimit(userData.creditLimit)
    setCurrBalance(userData.balance)

    const uid = getLoggedInUser();


    fetch("/api/transactions/" + uid)
      .then(async (response) => await response.json())
      .then((data) => {
        const allTransactions = data.Transactions;
        var total = 0;
        allTransactions.filter(element => isToday(Date.parse(element.timestamp))).forEach(val => {
          total += val;
        });
        setTotalSpending(total);
      })
      .catch((err) => {
        console.log(err.message);
      });
    // Returns user info
    // console.log(checkUserInfo())
  }, [])

  useEffect(() => {
    let today = new Date();
    const remainingDays = today.getDate() - daysInMonth(today.getMonth() + 1, today.getFullYear())
    setDailySpendingForMon(Math.round(findBalance() / Math.abs(remainingDays)))
  }, [creditLimit, currBalance])

  const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  }

  const findBalance = () => {
    return Math.min(currBalance, creditLimit)
  }

  return (
    <>
      <div className='dashboard'>
        <div className="dashboard-balance">
          <ThemeProvider theme={theme}>
            <div className='dashboard-container'>
              <div>
                <p className="dashboard-balance-heading">Your Balance:</p>
                <Box className="dashboard-shadow" sx={{
                  backgroundColor: 'secondary.main',
                  borderRadius: 4,
                  p: 2
                }}>
                  <Typography variant='h4' color='text.main'>£{currBalance}</Typography>
                </Box>
              </div>

              <div>
                <p className="dashboard-balance-heading">Your Credit Limit:</p>
                <Box className="dashboard-shadow" sx={{
                  backgroundColor: 'secondary.main',
                  borderRadius: 4,
                  p: 2
                }}>
                  <Typography variant='h4' color='text.main'>£{creditLimit}</Typography>
                </Box>
              </div>
            </div>
          </ThemeProvider>
        </div>


          
        <div className="dashboard-balance">
          <p className="dashboard-balance-heading">Recommended Spending limit of the day:</p>
          <ThemeProvider theme={theme}>
            <Container>
              <Box className="dashboard-shadow" sx={{
                backgroundColor: 'secondary.main',
                borderRadius: 4,
                p: 2
              }}>
                <Typography variant='h4' color='text.main'>£{dailySpendingForMon}</Typography>
                <Typography variant='p' color='action.main'>Spent £{totalSpending} today</Typography>
              </Box>
            </Container>
          </ThemeProvider>
        </div>

        {totalSpending >= dailySpendingForMon ?
          <div className='dashboard-warning'>
            <div className='dashboard-warning-img-container'>
              <Warning />
            </div>

            <div className='dashboard-warning-text'>
              <h3>Be careful!</h3>
              <p>You are overspending! Due the cost of living crisis, we highly suggest to stop spending for the day</p>
            </div>
          </div> : 
            null
        }

        <p className="dashboard-balance-heading">Your latest Transcations:</p>
        <TransactionList />
      </div>
    </>

  )
}

export default Balance