import { Box, Container, ThemeProvider, Typography } from '@mui/material';
import theme from '../../styles/theme';


const Balance = () => {

  return (
    <>
      <div class="dashboard-balance">
        <ThemeProvider theme={theme}>
          <Container>
            <Box sx={{
              backgroundColor: 'secondary.main',
              borderRadius: 4
            }}>
              <Typography variant='h1' color='text.main'>$1,234</Typography>
            <Typography variant='subtitle1' color='action.main'>Spent $34 today</Typography>
            </Box>
          </Container>
        </ThemeProvider>
      </div>
    </>
  )
}

export default Balance