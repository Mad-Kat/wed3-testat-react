// @flow

import React from 'react'
import TransactionTable from "./TransactionTable"
import {getAccountDetails, getAccount, transfer} from "../api"
import {Form, Segment, Divider, Grid, Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'


export type Props = {
    token: string,
}

const options = [
    {key: 'm', text: 'Male', value: 'male'},
    {key: 'f', text: 'Female', value: 'female'},
]


class Dashboard extends React.Component {

    props: Props;

    constructor() {
        super();
        this.state = {accNumber: undefined, targetNr: undefined, amount: undefined, money: undefined};
    }

    render() {
        return (
            <div>
                <Segment>
                    <h1>Kontoübersicht {this.state.accNumber}{"   " + this.state.money}</h1>
                    <Divider/>
                    <Grid columns={2}>
                        <Grid.Row>
                            <Grid.Column>
                                <h3>Neue Zahlung</h3>
                                <Form onSubmit={this.handleSubmit.bind(this)}>
                                    <Form.Field>
                                        <label>Von</label>
                                        <Form.Select
                                            options={[{text: this.state.accNumber, value: this.state.accNumber}]}>
                                        </Form.Select>
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Nach</label>
                                        {this.state.validTarget ?
                                            <Form.Input placeholder="Zielkontonummer"
                                                        onChange={this.verifyAccountNr.bind(this)}/>
                                            :
                                            <Form.Input error placeholder="Zielkontonummer"
                                                        onChange={this.verifyAccountNr.bind(this)}/>
                                        }
                                    </Form.Field>

                                    <Form.Field>
                                        <label>Betrag</label>
                                        <Form.Input type="number" placeholder="Betrag" onChange={(event) => this.setState({amount:event.target.value})}/>
                                    </Form.Field>
                                    <Form.Button fluid primary type="submit">Betrag überweisen</Form.Button>
                                </Form>
                            </Grid.Column>
                            <Grid.Column>
                                <TransactionTable token={this.props.token}/>
                                <Link to={"/transactions"}><Button>Alle Transaktionen anzeigen</Button></Link>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </div>
        )
    }

    componentDidMount() {
        this.getDetails();
    }

    verifyAccountNr(event) {
        getAccount(event.target.value, this.props.token).then(({accountNr: details}) =>
            this.setState({targetNr: details, validTarget: true})).catch((e) => {
            this.setState({validTarget: false})
        });
    }

    handleSubmit(event){
        event.preventDefault();
        transfer(this.state.targetNr,this.state.amount,this.props.token).then(()=>this.getDetails());
    }

    getDetails(){
        getAccountDetails(this.props.token).then(({accountNr: details, amount: money}) =>
            this.setState({accNumber: details, money: money})
        );
    }
}

export default Dashboard
