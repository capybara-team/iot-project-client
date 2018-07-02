import React, { Component } from 'react';
import { CircularProgress, Card, CardContent, Typography, CardActions, TextField, MenuItem, Button } from '@material-ui/core';
import { fetchData } from '../controllers/sensorsApi';
import SensorGraph from './SensorGraph';



const searchUnits = [
    { unit: 'seconds', label: 'Segundos' },
    { unit: 'minutes', label: 'Minutos' },
    { unit: 'hours', label: 'Horas' },
    { unit: 'days', label: 'Dias' },
    { unit: 'weeks', label: 'Semanas' },
    { unit: 'months', label: 'Meses' },
    { unit: 'years', label: 'Anos' },
]


class SearchCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchAmmount: 60,
            searchUnit: 'seconds',
            loading: true,
            error: null,
            data: null
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData = () => {
        this.setState({ loading: true })

        fetchData(this.state.searchAmmount, this.state.searchUnit)
            .then(data => this.setState({ loading: false, data }))
            .catch(error => console.error(error) || this.setState({ loading: false, error }))
    }


    render() {
        return (
            <Card component="article" style={{ margin: 20 }}>

                <CardContent>
                    {this.state.loading && <CircularProgress style={{ float: 'right' }} />}
                    <Typography gutterBottom variant="headline" component="h2">
                        Busca: Últimos {this.state.searchAmmount} {searchUnits.find(({ unit }) => unit === this.state.searchUnit).label}
                    </Typography>

                    {this.state.error && <i>Houve um erro ao obter os dados. Verifique o status do servidor...</i>}
                    {this.state.data && (
                        !this.state.data.length ?
                            <Typography component="p">A busca não retornou nenhum resultado.</Typography> :
                            <SensorGraph
                                data={this.state.data}
                                height="100"
                            />
                    )}
                </CardContent>
                <CardActions>
                    <TextField
                        label="Pesquisar nos últimos"
                        type="number"
                        min="0"
                        fullWidth
                        value={this.state.searchAmmount}
                        onChange={e => this.setState({ searchAmmount: e.target.value })}
                        style={{ marginRight: 10 }}
                        disabled={this.state.loading}
                    />
                    <TextField
                        label="Unidade"
                        select
                        fullWidth
                        value={this.state.searchUnit}
                        onChange={e => this.setState({ searchUnit: e.target.value })}
                        style={{ marginRight: 10 }}
                        disabled={this.state.loading}
                    >
                        {searchUnits.map(
                            ({ unit, label }) =>
                                <MenuItem key={unit} value={unit}>{label}</MenuItem>
                        )}
                    </TextField>
                    <Button fullWidth
                        variant="contained"
                        color="primary"
                        disabled={this.state.loading}
                        onClick={this.fetchData}
                    >Pesquisar</Button>
                </CardActions>
            </Card>
        );
    }
}

export default SearchCard;