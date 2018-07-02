import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { lime } from '@material-ui/core/colors'
// import { HashRouter, Switch, Route } from 'react-router-dom'
import 'typeface-roboto'

import UpdateHandler from './components/UpdateHandler'
import Header from './components/Header';
import SensorChart from './components/SensorChart';

const theme = createMuiTheme({
    palette: {
        primary: lime,
        // type: 'dark'
    },
});

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <UpdateHandler appServiceWorker={this.props.appServiceWorker}>
                    <Header />
                    <SensorChart />
                </UpdateHandler>
            </MuiThemeProvider>
        );
    }
}

export default App;