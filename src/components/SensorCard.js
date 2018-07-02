import React, { Component } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

import SensorGraph from './SensorGraph'

class SensorCard extends Component {
    render() {
        return (
            <Card style={{ margin: 20 }}>
                <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">Resumo dos últimos segundos</Typography>
                    <SensorGraph
                        data={this.props.data}
                        labelsFormat={time => time.toLocaleTimeString()}
                    />
                </CardContent>
            </Card>
        );
    }
}

export default SensorCard;