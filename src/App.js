import React, { Component, Fragment } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { lime } from '@material-ui/core/colors'
// import { HashRouter, Switch, Route } from 'react-router-dom'
import 'typeface-roboto'

import { fetchData } from './controllers/sensorsApi'

import UpdateHandler from './components/UpdateHandler'
import Header from './components/Header';
import SearchCard from './components/SearchCard';
import ResumeCard from './components/ResumeCard';
import SensorCard from './components/SensorCard';
import UserAccessCard from './components/UserAccessCard';

const theme = createMuiTheme({
    palette: {
        primary: lime,
        // type: 'dark'
    },
});

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }

    componentDidMount() {
        fetchData(60, 'seconds')
            .then(data => this.setState({ data }))
            .then(this.updateData)
            .catch(console.error)
    }

    updateData = (timeout = 2000) => setTimeout(() => {
        const data = [...this.state.data]
        data.shift()
        fetchData(2, 'seconds')
            .then(([newData]) => newData ? newData : Promise.reject(new Error("Server didn't send any data")))
            .then((newData) => console.log(newData) || data.push(newData))
            .then(() => this.setState({ data }))
            .catch(error => console.error(error) && this.updateData(0))
            .then(() => this.updateData())
    }, timeout)

    render() {
        const { data } = this.state
        return (
            <MuiThemeProvider theme={theme}>
                <UpdateHandler appServiceWorker={this.props.appServiceWorker}>
                    <Header />
                    {Boolean(data.length) &&
                        <Fragment>
                            <ResumeCard
                                data={data[data.length - 1]}
                            />
                            <SensorCard data={this.state.data} />
                        </Fragment>
                    }
                    <SearchCard />
                    <UserAccessCard />
                </UpdateHandler>
            </MuiThemeProvider>
        );
    }
}

export default App;