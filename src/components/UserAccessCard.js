import React, { Component, Fragment } from 'react';
import { Card, CardContent, Typography, CircularProgress, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, List, ListItem, ListItemText, Divider } from '@material-ui/core';
import { fetchUserData } from '../controllers/sensorsApi';

const UserPanel = ({ user }) => {
    const { name, accessLog = [], inside } = user
    return (
        <ExpansionPanel>
            <ExpansionPanelSummary>
                <Typography>{name}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{ padding: 0 }}>
                <List style={{ width: '100%' }}>
                    {accessLog.map(({ entrance, exit }, i) =>
                        <Fragment key={i}>
                            <Divider />
                            <ListItem>
                                <ListItemText primary={(new Date(entrance)).toLocaleString()} secondary="Entrada" />
                            </ListItem>

                            {exit &&
                                <Fragment>
                                    <Divider />
                                    <ListItem>
                                        <ListItemText primary={(new Date(exit)).toLocaleString()} secondary="Saída" />
                                    </ListItem>

                                </Fragment>
                            }
                        </Fragment>
                    )}
                    {inside &&
                        <Fragment>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="AGORA" secondary="Dentro da sala" />
                            </ListItem>
                        </Fragment>
                    }
                </List>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}


class UserAccessCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            loading: true
        }
    }


    fetchUsers() {
        setTimeout(() =>
            fetchUserData()
                .then(users => this.setState({ users, loading: false }))
                .catch(console.error)
                .then(() => this.fetchUsers())
            , 2000)
    }

    componentDidMount() {
        this.fetchUsers()
    }
    render() {
        return (
            <Fragment>
                <Card style={{ margin: 20 }}>
                    <CardContent>
                        <Typography gutterBottom variant="headline" component="h2">Acessos dos usuários</Typography>
                        {this.state.loading && <CircularProgress />}
                    </CardContent>
                </Card>
                <div style={{ margin: 20 }}>
                    {this.state.users.map(user => <UserPanel key={user.id} user={user} />)}
                </div>
            </Fragment>
        );
    }
}

export default UserAccessCard;