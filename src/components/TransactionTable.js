/**
 * Created by Luca on 06.04.2017.
 */
import React from "react"
import {getTransactions} from '../api'
import {Table, Menu, Button} from 'semantic-ui-react'

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
            this.setState({month: nextProps.month, year: nextProps.year}, function () {
                //this.transact.bind(this);
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
                        <TransactionList transactions={this.state.transactions}/>
                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan="5">
                                    <Menu floated="right">
                                        <Menu.Item onClick={this.previous.bind(this)}>&lt;</Menu.Item>
                                        <Menu.Item>{this.state.page}</Menu.Item>
                                        <Menu.Item onClick={this.next.bind(this)}>&gt;</Menu.Item>
                                    </Menu>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
                }
            </div>
        )
    }

    transact() {
        var count = 3;
        if (this.props.size === "big") {
            count = 10;
        }
        if (typeof(this.state.month) !== "undefined" && typeof(this.state.year) !== "undefined") {
            getTransactions(this.props.token, new Date(this.state.year, this.state.month - 1, 0, 0, 0, 0, 0).toISOString(),
                new Date(this.state.year, this.state.month, 0, 0, 0, 0, 0).toISOString(), count, this.state.page * count)
                .then(({result: transactions}) =>
                    this.setState({transactions: transactions})
                )
        } else {
            getTransactions(this.props.token, "", "", count, this.state.page * count)
                .then(({result: transactions}) =>
                    this.setState({transactions: transactions})
                )
        }


    }

    componentDidMount() {
        this.transact();
    }

    next(event) {
        this.setState(state => ({page: this.state.page + 1}), function () {
            this.transact();
        });
    }

    previous(event) {
        if (this.state.page !== 0) {
            this.setState(state => ({page: this.state.page - 1}), function () {
                this.transact();
            });
        }
    }
}

function TransactionList({transactions}) {
    const renderTransaction = ({date, amount, from, target, total}) =>
        <Table.Row className="transaction" key={date}>
            <Table.Cell>{date}</Table.Cell>
            <Table.Cell>{from}</Table.Cell>
            <Table.Cell>{target}</Table.Cell>
            <Table.Cell>{amount}</Table.Cell>
            <Table.Cell>{total}</Table.Cell>
        </Table.Row>;
    return <Table.Body>{transactions.map(renderTransaction)}</Table.Body>
}

export default TransactionTable