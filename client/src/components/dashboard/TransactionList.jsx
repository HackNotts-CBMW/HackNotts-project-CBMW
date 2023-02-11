import { Box, List, ThemeProvider } from '@mui/material';
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
        <List  dense={false}>
            <Transaction />
            <Transaction />
            <Transaction />
            <Transaction />
        </List>
      </Box>
      </ThemeProvider>
    </>
  )
}

export default TransactionList