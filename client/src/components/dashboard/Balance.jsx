import axios from 'axios';
import { useState, useEffect } from 'react';
import { Box, Container, ThemeProvider, Typography } from '@mui/material';
import theme from '../../styles/theme';

import TransactionList from './TransactionList';

import { ReactComponent as Warning }  from '../../img/warning.svg'

import { checkUserInfo } from '../../helpers'

const Balance = () => {
  const [creditLimit, setCreditLimit] = useState(0)
  const [currBalance, setCurrBalance] = useState(0)
  const [dailySpendingForMon, setDailySpendingForMon] = useState(0)
  const [totalSpending, setTotalSpending] = useState(0)
  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJuYmYiOjE2Njk2ODAwMDAsImFwaV9zdWIiOiIwOWI3NDhhYWUzYTQ1N2QzZDMyOTA4NTQ1ZTQ4M2QyMzA0MzA2NTA5MGE3OTM4OWY5NWI5NGMxYmU3ZGZiZGU2MTY5NjAzMjAwMDAwMCIsInBsYyI6IjVkY2VjNzRhZTk3NzAxMGUwM2FkNjQ5NSIsImV4cCI6MTY5NjAzMjAwMCwiZGV2ZWxvcGVyX2lkIjoiMDliNzQ4YWFlM2E0NTdkM2QzMjkwODU0NWU0ODNkMjMwNDMwNjUwOTBhNzkzODlmOTViOTRjMWJlN2RmYmRlNiJ9.mVvNMyEU0CoJqDaZCurSzDoauLWvj0m3IPGBJ5a7blCgumKAhcS5VEBgvvjF6y4wOYZfCvP0a--qsZS7ua-D7pVO5ephLtFcZHXKuTKEneJ3S-HZ-4T1dDMp7uxqj1QgD4dSOOHJTFz633KubkA1FoNGOKn0-s2VNNq75l9cQRtV36Xd8FlubsPEnxHPp7wDfuvZOG42HMHZwsBi2pyCGx84VGEqiT_DudoMSE8yp93xdikIwUv1tXxZjJiQh5KmWIpvuREG73cYg8FVSwiijPgKX-V4dMTzfHAGyf4CFQ91QCYhE5OKCv73EBv_T8OouOyR5upCIIGd6twaZ2iu7g"
  
  useEffect(() => {
    setCreditLimit(905)
    setCurrBalance(1300)
    setTotalSpending(59)
    // Returns user info
    console.log(checkUserInfo())
    getAccountDetails()
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
    if (currBalance > creditLimit) return creditLimit
    if (creditLimit > currBalance) return currBalance
  }

  const getAccountDetails = async () => {
    const response = await fetch(
      "https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/accounts/34560461", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Version": "1.0"
        }
      }
    ).then(() =>{ 
      console.log(response)
    })
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

        {totalSpending > dailySpendingForMon ?
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