// @flow

import React from "react";
import TransactionTable from "./TransactionTable";
import type {User} from "../api";
import {Button, Dropdown, Grid} from "semantic-ui-react";

export type Props = {
    token: string,
    user: User,
}

const Years = [{text: "2015", value: "2015"}, {text: "2016", value: "2016"}, {text: "2017", value: "2017"}];

const Months = [
    {text: "Januar", value: 1},
    {text: "Februar", value: 2},
    {text: "März", value: 3},
    {text: "April", value: 4},
    {text: "Mai", value: 5},
    {text: "Juni", value: 6},
    {text: "Juli", value: 7},
    {text: "August", value: 8},
    {text: "Septemper", value: 9},
    {text: "Oktober", value: 10},
    {text: "November", value: 11},
    {text: "Dezember", value: 12}];

class AllTransactions extends React.Component {

    props: Props;

    constructor() {
        super();
        this.state = {month: undefined, year: undefined};
    }

    render() {
        return (
            <div>
                <h1>Alle Transaktionen des Accounts {this.props.user.accountNr}</h1>
                <Grid>
                    <Grid.Row>
                        <Dropdown placeholder="Choose Year" selection options={Years} value={this.state.year}
                                  onChange={this.changeYear}/>
                        <Dropdown placeholder="Choose Month" selection options={Months} value={this.state.month}
                                  onChange={this.changeMonth.bind(this)}/>
                        <Button onClick={this.reset}>X</Button>
                    </Grid.Row>

                </Grid>
                <TransactionTable token={this.props.token} year={this.state.year} month={this.state.month}
                                  size="big"/>
            </div>
        )
    }

    changeYear = (_, data) => {
        this.setState(state => ({year: data.value}));
    };

    changeMonth = (_, data) => {
        this.setState(state => ({month: data.value}));
    };

    reset = () => {
        this.setState(state => ({year: undefined, month: undefined}));
    }

}

export default AllTransactions
