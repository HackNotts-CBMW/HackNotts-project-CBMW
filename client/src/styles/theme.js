import { createTheme, responsiveFontSizes } from '@mui/material';

var theme = createTheme({
        typography: {
          fontFamily: [ "'Poppins', sans-serif" ],
          
        },
        palette: {
          type: 'light',
          primary: {
            main: '#3f51b5',
          },
          secondary: {
            main: '#4738c7',
          },
          action: {
            main: '#85cc9b',
            error: '#AD2234',
          },
          text: {
            main: '#fff'
          }
      
        },
      })

theme = responsiveFontSizes(theme);

export default theme; 