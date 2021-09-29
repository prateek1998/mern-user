import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import Dashboard from "./components/dashboard";
import Header  from "./components/header";
import Footer from "./components/footer";
import theme from './theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header/>
      <Dashboard/>
      <Footer/>
    </ThemeProvider>

  );
};

export default App;
