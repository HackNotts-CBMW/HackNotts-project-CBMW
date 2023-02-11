import { Avatar, Grid, useStyles, ThemeProvider, Typography, Container } from '@mui/material';
import theme from '../../styles/theme';
import '../../styles/components/balance.scss'
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';


const Transaction = () => {
  
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container sx={{
          padding: '1%'
        }}>
        <Grid container alignItems="center" justifyContent="center" direction="row">
          <Grid item xs={2}>
          <Avatar sx={{
      backgroundColor: theme.palette.grey[50],
      border: `1px solid ${theme.palette.info.main}`,
      color: theme.palette.info.main
    }}>
            <EmojiFoodBeverageIcon />
          </Avatar>
          </Grid>
          <Grid item xs={8} alignItems="start" direction="column">
            <Typography variant='h5' color={'text.main'}>Transaction name</Typography>
            <Typography variant='h6' color={'text.main'}>Transaction message</Typography>
          </Grid>
          <Grid item xs={2} alignItems="start" direction="column">
            <Typography variant='h6' color={'action.error'}>-$24</Typography>
          </Grid>
        </Grid>
        </Container>
      </ThemeProvider>
    </>
  )
}

export default Transaction