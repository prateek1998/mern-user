import { createTheme  } from '@material-ui/core/styles';

const theme = createTheme ({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      light: '#fff',
      main: '#264653',
      dark: '#2d2727', //dark blue
      red: '#ee114e',
      green: '#1cde24',
      blue: '#1178ee', //blue
      contrastText: '#fff', //grey
    },
    secondary: {
      light: '#999999', //grey
      main: '#dc004e',
      dark: '#333333', // dark
      contrastText: '#666666',
    },
    openTitle: '#333333', // dark color
    backgroundGradient: 'linear-gradient(-135deg, #fa09ea, #4158d0)',
    protectedTitle: '#2bbd7e',
    type: 'light',
  },
});

export default theme;
