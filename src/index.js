import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'styles/index.scss';
import { AppProvider } from "AppContext";
import { CookiesProvider } from 'react-cookie';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import axios from 'axios';
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00acc1',
    },
    secondary: {
      main: '#FF717C',
    },
    tertiary: {
      main: '#7338D2',
    }
  }
});

if (process.env.REACT_APP_API_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
}

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <MuiThemeProvider theme={theme}>
        <AppProvider>
          <App />
        </AppProvider>
      </MuiThemeProvider>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


