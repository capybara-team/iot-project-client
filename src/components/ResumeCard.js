import React, { Component } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import AnimatedNumber from 'react-animated-number';


class ResumeCard extends Component {
    render() {
        const { temperature, humidity, time } = this.props.data
        return (
            <aside style={{ padding: 20, marginBottom: -20, overflow: 'hidden' }}>
                <Card style={{ float: 'left', width: 'calc(50% - 10px)' }}>
                    <CardContent>
                        <Typography color="textSecondary">Temperatura</Typography>
                        <Typography variant="headline" component="h2">
                            <AnimatedNumber value={Number.parseInt(temperature)} component="text" duration={2000} />°
                        </Typography>
                        <Typography color="textSecondary">{time.toLocaleTimeString()}</Typography>
                    </CardContent>
                </Card>
                <Card style={{ float: 'right', width: 'calc(50% - 10px)' }}>
                    <CardContent>
                        <Typography color="textSecondary">Umidade</Typography>
                        <Typography variant="headline" component="h2">
                            <AnimatedNumber value={Number.parseInt(humidity)} component="text" duration={2000} />%
                        </Typography>
                        <Typography color="textSecondary">{time.toLocaleTimeString()}</Typography>
                    </CardContent>
                </Card>
            </aside>
        );
    }
}

export default ResumeCard;