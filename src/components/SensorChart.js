import React, { Component } from 'react';
import { Line as LineChart } from 'react-chartjs'
import { CircularProgress, Card, CardContent, Typography, CardActions, TextField, MenuItem, Button } from '@material-ui/core';

const options = {
    responsive: true,
    hoverMode: 'index',
    stacked: false,
    scales: {
        yAxes: [{
            type: 'linear',
            display: true,
            position: 'left',
            id: 't-axis',
        }, {
            type: 'linear',
            display: true,
            position: 'right',
            id: 'h-axis',

            // grid line settings
            gridLines: {
                drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
        }],
    }
}

const searchUnits = [
    { unit: 'seconds', label: 'Segundos' },
    { unit: 'minutes', label: 'Minutos' },
    { unit: 'hours', label: 'Horas' },
    { unit: 'days', label: 'Dias' },
    { unit: 'weeks', label: 'Semanas' },
    { unit: 'months', label: 'Meses' },
    { unit: 'years', label: 'Anos' },
]

const checkResponseError = response =>
    (response.status >= 200 && response.status < 300) ?
        Promise.resolve(response) :
        Promise.reject(new Error(response.statusText || response.status))

class SensorChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchAmmount: 60,
            searchUnit: 'minutes',
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
        fetch(`http://localhost:3000/api/sensor/ambient/last/${this.state.searchAmmount}/${this.state.searchUnit}`)
            .then(checkResponseError)
            .then(response => response.json())
            .then(data => data.forEach(data => data.time = new Date(data.time)) || data)
            .then(data => this.setState({ loading: false, data }))
            .catch(error => console.error(error) || this.setState({ loading: false, error }))
    }

    getData() {
        const time = new Date;
        const data = {
            labels: this.state.data.map(({ time }) => time.toLocaleString()),
            datasets: [
                {
                    label: "Temperatura",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: this.state.data.map(({ temperature }) => temperature),
                    yAxisID: 't-axis',
                },
                {
                    label: "Humidade",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: this.state.data.map(({ humidity }) => humidity),
                    yAxisID: 'h-axis',
                },

            ]
        }
        return data
    }

    render() {
        return (
            <Card component="article" style={{ margin: 20 }}>

                <CardContent>
                    {this.state.loading && <CircularProgress style={{float: 'right'}} />}
                    <Typography gutterBottom variant="headline" component="h2">Gráficos dos sensores</Typography>

                    {this.state.error && <i>Houve um erro ao obter os dados. Verifique o status do servidor...</i>}
                    {this.state.data && (
                        !this.state.data.length ?
                            <Typography component="p">A busca não retornou nenhum resultado.</Typography> :
                            <LineChart
                                data={this.getData()}
                                options={options}
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

export default SensorChart;