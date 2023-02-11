import { Box, ThemeProvider } from '@mui/material';
import theme from '../../styles/theme';
import Transaction from './Transaction';


const TransactionList = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
      <Box sx={{
              backgroundColor: 'secondary.main',
              borderRadius: 4
            }}>
        <Transaction />
      </Box>
      </ThemeProvider>
    </>
  )
}

export default TransactionList