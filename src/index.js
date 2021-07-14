import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Provider as UrqlProvider } from 'urql';
import { ToastContainer } from 'react-toastify';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';

import createStore from './store';
import AppContainer from './components/AppContainer';
import Header from './components/Header';
import MetricsHome from './Features/Metrics';
import graphqlClient from './gl-client';

const store = createStore();

const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(39,49,66)',
    },
    secondary: {
      main: 'rgb(197,208,222)',
    }
  },
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <UrqlProvider value={graphqlClient}>
      <Provider store={store}>
        <Header />
        <AppContainer>
          <MetricsHome />
          <ToastContainer />
        </AppContainer>
      </Provider>
    </UrqlProvider>
  </MuiThemeProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
