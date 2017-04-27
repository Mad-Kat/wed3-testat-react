// @flow

import React from "react";
import TransactionTable from "./TransactionTable";
import {getAccount, getAccountDetails, transfer} from "../api";
import {Button, Divider, Form, Grid, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";


export type Props = {
    token: string,
}


class Dashboard extends React.Component {

    props: Props;

    constructor() {
        super();
        this.state = {
            accNumber: undefined, targetNr: undefined, amount: undefined, money: undefined, valid: undefined,
            success: false
        };
    }

    render() {
        return (
            <div>
                <Segment>
                    <h1>Kontoübersicht {this.state.accNumber}</h1>
                    <Divider/>
                    <Grid columns={2}>
                        <Grid.Row>
                            <Grid.Column>
                                <h3>Neue Zahlung</h3>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Field>
                                        <label>Von</label>
                                        <Form.Select
                                            options={[{
                                                text: this.state.accNumber + this.moneyString(this.state.money),
                                                value: this.state.accNumbers
                                            }]}>
                                        </Form.Select>
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Nach</label>
                                        {this.state.validTarget ?
                                            <Form.Input placeholder="Zielkontonummer"
                                                        onChange={this.verifyAccountNr}/>
                                            :
                                            <Form.Input error placeholder="Zielkontonummer"
                                                        onChange={this.verifyAccountNr}/>
                                        }
                                    </Form.Field>

                                    <Form.Field>
                                        <label>Betrag</label>
                                        {this.state.valid ?
                                            <Form.Input type="number" step="0.01" placeholder="Betrag"
                                                        onChange={this.verifyMoney}/>
                                            :
                                            <Form.Input error type="number" step="0.01" placeholder="Betrag"
                                                        onChange={this.verifyMoney}/>
                                        }

                                    </Form.Field>
                                    <Form.Button fluid primary type="submit">Betrag überweisen</Form.Button>
                                </Form>
                                {this.state.success ? <Segment inverted color='green'>Transaction successfull</Segment>
                                    : <div></div>}
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

    verifyAccountNr = (event) => {
        this.setState({success: false});
        getAccount(event.target.value, this.props.token).then(({accountNr: details}) =>
            this.setState({targetNr: details, validTarget: true})).catch((e) => {
            this.setState({validTarget: false});
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.valid && this.state.validTarget) {
            transfer(this.state.targetNr, this.state.amount, this.props.token).then(() => {
                this.getDetails();
                this.setState({success: true})
            });
        }
    };

    getDetails = () => {
        getAccountDetails(this.props.token).then(({accountNr: details, amount: money}) =>
            this.setState({accNumber: details, money: money})
        );
    };

    verifyMoney = (event) => {
        this.setState({success: false});
        if (event.target.value > 0.05) {
            this.setState({amount: event.target.value, valid: true});
        } else {
            this.setState({valid: false});
        }

    };

    moneyString = (amount) => {
        return typeof(amount) === "undefined" ? "(0CHF)" : "(" + amount.toFixed(2) + "CHF)";
    };
}

export default Dashboard
