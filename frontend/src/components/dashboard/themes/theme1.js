import { createTheme } from '@mui/material/styles';
export const theme = createTheme({
  palette: {
    primary: {
      light: '#49674c',
      main: '#1c4220',
      dark: '#132e16',
      contrastText: '#fefefe',
    },
    secondary: {
      light: '#805673',
      main: '#612c51',
      dark: '#431e38',
      contrastText: '#fefefe',
    },
    light: {
      light: '#49674c',
      main: '#fefefe',
      dark: '#805673',
      contrastText: '#000',
    },
  },
});