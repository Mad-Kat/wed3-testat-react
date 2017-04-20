/**
 * Created by Luca on 06.04.2017.
 */
import React from "react"
import {getTransactions} from '../api'
import {Table, Menu} from 'semantic-ui-react'

export type Props = {
    token: string,
    year: number,
    month: number,
    size: "small",
}

class TransactionTable extends React.Component {

    props: Props;

    constructor() {
        super();
        this.state = {transactions: [], page: 0};
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.year !== nextProps.year || this.props.month !== nextProps.month) {
            this.setState(state => ({month: nextProps.month, year: nextProps.year}), function () {
                this.transact();
            });
        }
    }

    render() {
        return (
            <div>
                {this.state.transactions.length === 0
                    ?
                    <p>In diesem Zeitraum wurden keine Transaktionen getätigt.</p>
                    :
                    <Table>
                        <Table.Header>
                            <Table.HeaderCell/>
                            <Table.HeaderCell>Von</Table.HeaderCell>
                            <Table.HeaderCell>Nach</Table.HeaderCell>
                            <Table.HeaderCell>Betrag</Table.HeaderCell>
                            <Table.HeaderCell>Saldo</Table.HeaderCell>
                        </Table.Header>
                        <Table.Body>
                            {this.TransactionList(this.state.transactions)}
                        </Table.Body>
                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan="5">
                                    <Menu floated="right">
                                        <Menu.Item onClick={this.previous}>&lt;</Menu.Item>
                                        <Menu.Item>{this.state.page}</Menu.Item>
                                        <Menu.Item onClick={this.next}>&gt;</Menu.Item>
                                    </Menu>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
                }
            </div>
        )
    }

    transact = () => {
        let count = 3;
        if (this.props.size === "big") {
            count = 10;
        }
        if (typeof(this.state.month) !== "undefined" && typeof(this.state.year) !== "undefined") {
            getTransactions(this.props.token, new Date(this.state.year, this.state.month - 1, 0, 0, 0, 0, 0).toISOString(),
                new Date(this.state.year, this.state.month, 0, 0, 0, 0, 0).toISOString(), count, this.state.page * count)
                .then(({result: transactions}) =>
                    this.setState(state => ({transactions: transactions}))
                )
        } else {
            getTransactions(this.props.token, "", "", count, this.state.page * count)
                .then(({result: transactions}) =>
                    this.setState(state => ({transactions: transactions}))
                )
        }
    };

    componentDidMount() {
        this.transact();
    }

    next = () => {
        this.setState(state => ({page: this.state.page + 1}), function () {
            this.transact();
        });
    };

    previous = () => {
        if (this.state.page !== 0) {
            this.setState(state => ({page: this.state.page - 1}), function () {
                this.transact();
            });
        }
    };

    TransactionList = (transactions) => {
        const renderTransaction = ({date, amount, from, target, total}) =>
            <Table.Row className="transaction" key={date}>
                <Table.Cell>{this.renderDate(date)}</Table.Cell>
                <Table.Cell>{from}</Table.Cell>
                <Table.Cell>{target}</Table.Cell>
                <Table.Cell>{this.moneyString(amount)}</Table.Cell>
                <Table.Cell>{this.moneyString(total)}</Table.Cell>
            </Table.Row>;
        return transactions.map(renderTransaction)
    };

    renderDate = (date) => {
        let d = new Date(date);
        return d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();

    };

    moneyString = (amount) => {
        return typeof(amount) === "undefined" ? "0CHF" : amount.toFixed(2) + "CHF";
    };
}

export default TransactionTable