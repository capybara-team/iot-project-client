import React, { Component } from 'react';
import { Line as LineChart } from 'react-chartjs'

const defaultOptions = {
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

class SensorGraph extends Component {
    getData(data, format) {
        // const time = new Date;
        return {
            labels: data.map(({ time }) => format ? format(time) : time.toLocaleString()),
            datasets: [
                {
                    label: "Humidade",
                    fillColor: "rgba(34, 119, 228, 0.1)",
                    strokeColor: "rgba(34, 119, 228, 1)",
                    pointColor: "rgba(34, 119, 228, 1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(34, 119, 228, 1)",
                    data: data.map(({ humidity }) => humidity),
                    yAxisID: 'h-axis',
                },
                {
                    label: "Temperatura",
                    fillColor: "rgba(250, 203, 47, 0.2)",
                    strokeColor: "rgba(250, 203, 47, 1)",
                    pointColor: "rgba(250, 203, 47, 1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(250, 203, 47, 1)",
                    data: data.map(({ temperature }) => temperature),
                    yAxisID: 't-axis',
                },

            ]
        }
    }
    render() {
        const { data = [], options = {}, labelsFormat, ...chartProps } = this.props
        return (
            <LineChart
                data={this.getData(data, labelsFormat)}
                options={{ ...defaultOptions, ...options }}
                {...chartProps}
            />
        );
    }
}

export default SensorGraph;