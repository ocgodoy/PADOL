import React from 'react';
import logo from './itachi.jpg';
import './App.css';
import { Signup } from "./pages/Signup.js";
import { Welcome } from "./pages/Welcome.js";
import { Home } from "./pages/Home.js";
import { Login } from "./pages/Login.js";
import { BrowserRouter,Route, Switch } from "react-router-dom";
import { createMuiTheme, ThemeProvider  } from '@material-ui/core/styles';

//import 'utils/API.js'

class App extends React.Component{

render() {
  const theme = createMuiTheme({
      palette: {
        primary: {
          light: '#e69f4a',
          main: '#e0881d',
          dark: '#9c5f14',
          contrastText: '#fff',
        },
        secondary: {
          light: '#db828b',
          main: '#d3636e',
          dark: '#93454d',
          contrastText: '#fff',
        },
      },
      typography: {
        htmlFontSize: 16,
        fontFamily: "Manrope VF",
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
      }
    });

  return (
    <div className="App">
        <div className="">
            <ThemeProvider theme={theme}>
            <BrowserRouter>
              <Switch>
                <Route exact path="/" component={Welcome} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/home" component={Home} />
              </Switch>
              </BrowserRouter>
            </ThemeProvider>
          </div>
    </div>
  );
}
}

export default App;
