import { Avatar, ThemeProvider, Slide, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, IconButton } from '@mui/material';
import theme from '../../styles/theme';
import '../../styles/components/balance.scss'
import MoneyOff from '@mui/icons-material/MoneyOff';
import Delete from '@mui/icons-material/Delete';


const Transaction = (transaction) => {
  

  
  return (
    <>
      <ThemeProvider theme={theme}>
      <Slide
          key={transaction.id}
          direction="down"
          in
          mountOnEnter
          unmountOnExit
        >
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <MoneyOff />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={transaction.category}
              secondary={`${transaction.amount} - ${transaction.date}`}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
              >
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </Slide>
        {/* <Container sx={{
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
            <Typography variant='subtitle1' color={'text.main'}>Transaction name</Typography>
            <Typography variant='caption' color={'text.subtext'}>Transaction message</Typography>
          </Grid>
          <Grid item xs={2} alignItems="start" direction="column">
            <Typography variant='h6' color={'action.error'}>-$24</Typography>
          </Grid>
        </Grid>
        </Container> */}
      </ThemeProvider>
    </>
  )
}

export default Transaction