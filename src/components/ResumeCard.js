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
                            <AnimatedNumber
                                value={temperature}
                                duration={2500}
                                stepPrecision={1}
                            />°
                        </Typography>
                        <Typography color="textSecondary">{time.toLocaleTimeString()}</Typography>
                        {temperature < 22 &&
                            <Typography component="p" style={{ color: '#ffb500' }}>
                                A temperatura está baixa, o ar condicionado irá diminuir a potência
                            </Typography>
                        }
                        {temperature > 24 &&
                            <Typography component="p" style={{ color: 'red' }}>
                                A temperatura está alta, o ar condicionado irá aumentar a potência
                            </Typography>
                        }
                        {temperature >= 22 && temperature <= 24 &&
                            <Typography component="p">
                                A temperatura está no nível ideal
                            </Typography>
                        }
                    </CardContent>
                </Card>
                <Card style={{ float: 'right', width: 'calc(50% - 10px)' }}>
                    <CardContent>
                        <Typography color="textSecondary">Umidade</Typography>
                        <Typography variant="headline" component="h2">
                            <AnimatedNumber
                                value={humidity}
                                duration={2500}
                                stepPrecision={1}
                            />%
                        </Typography>
                        <Typography color="textSecondary">{time.toLocaleTimeString()}</Typography>
                        {humidity > 60 &&
                            <Typography component="p" style={{ color: 'red' }}>
                                A umidade está muito alta.
                            </Typography>
                        }
                        {humidity <= 60 &&
                            <Typography component="p">
                                A umidade está no nível ideal
                            </Typography>
                        }
                    </CardContent>
                </Card>
            </aside>
        );
    }
}

export default ResumeCard;