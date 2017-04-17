/**
 * Created by Luca on 06.04.2017.
 */
import React from "react"
import {getTransactions } from '../api'

export type Props = {
    token: string,
    year: number,
    month: number,
    size: "small",
}

class TransactionTable extends React.Component{

    props: Props;

    constructor(){
        super();
        this.state = { transactions:[], page:0};
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.year !== nextProps.year || this.props.month !== nextProps.month)
        {
            this.setState({month:nextProps.month, year:nextProps.year},function () {
                //this.transact.bind(this);
                this.transact();
            });
        }
    }

    render() {
        return (
            <div>
            {this.state.transactions.length===0
                ?
                <p>In diesem Zeitraum wurden keine Transaktionen getätigt.</p>
                :
                <table>
                    <thead>
                    <th></th>
                    <th>Von</th>
                    <th>Nach</th>
                    <th>Betrag</th>
                    <th>Saldo</th>
                    </thead>
                    <TransactionList transactions={this.state.transactions}/>
                    <tfoot>
                    <div>
                        <button onClick={this.previous.bind(this)}>back</button>
                        <label>{this.state.page}</label>
                        <button onClick={this.next.bind(this)}>next</button>
                    </div>
                    </tfoot>

                </table>
            }
            </div>
        )
    }

    transact(){
        var count = 3;
        if (this.props.size==="big") {
            count = 10;
        }
        if(typeof(this.state.month)!=="undefined" && typeof(this.state.year)!=="undefined"){
            getTransactions(this.props.token,new Date(this.state.year,this.state.month-1,0,0,0,0,0).toISOString(),
                new Date(this.state.year,this.state.month,0,0,0,0,0).toISOString(),count,this.state.page*count)
                .then(({result: transactions}) =>
                    this.setState({transactions:transactions})
                )
        }else{
            getTransactions(this.props.token,"","",count,this.state.page*count)
                .then(({result: transactions}) =>
                    this.setState({transactions:transactions})
                )
        }



    }
    componentDidMount(){
        this.transact();
    }

    next(event){
        this.setState(state => ({page:this.state.page+1}),function(){
            this.transact();
        });
    }
    previous(event){
        if(this.state.page !== 0){
            this.setState(state => ({page:this.state.page-1}),function () {
                this.transact();
            });
        }
    }
}

function TransactionList({transactions}){
    const renderTransaction = ({date,amount,from,target,total}) =>
    <tr className="transaction" key={date}>
        <td>{date}</td>
        <td>{from}</td>
        <td>{target}</td>
        <td>{amount}</td>
        <td>{total}</td>
    </tr>;
    return <tbody>{transactions.map(renderTransaction)}</tbody>
}

export default TransactionTable