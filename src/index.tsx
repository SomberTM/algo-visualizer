import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { InsertionSortVisualizer } from './components/InsertionSortVisualizer';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const theme = createTheme({
  palette: {
    background: {
      default: '#242424',
      paper: '#303030'
    },
    primary: {
      main: '#242424',
      dark: '#242424',
    },
    secondary: {
      main: '#4794ff',
      dark: '#4794ff'
    }
  }
});

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <InsertionSortVisualizer/>
    </ThemeProvider>
  </React.StrictMode>
);