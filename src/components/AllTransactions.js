// @flow

import React from 'react'
import TransactionTable from "./TransactionTable"
import type { User } from '../api'

export type Props = {
  token: string,
  user: User,
}

class AllTransactions extends React.Component {
  
  props: Props;

    constructor(){
        super();
        this.state = { month: undefined, year: undefined};
    }
  
  render() {    
    return (
    <div>
        All Transactions
        <select id="selectYear" onChange={this.changeYear.bind(this)} >
            <option selected disabled hidden>Choose Year</option>
            <option value="2015">2015</option>
            <option value="2016">2016</option>
            <option value="2017">2017</option>
        </select>
        <select id="selectMonth" onChange={this.changeMonth.bind(this)}>
            <option selected disabled hidden>Choose Month</option>
            <option value="1">Januar</option>
            <option value="2">Februar</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
        </select>
        <button onClick={this.reset.bind(this)}>X</button>
        <TransactionTable token={this.props.token} year={this.state.year} month={this.state.month} size="big"/>
    </div>
    )
  }

    changeYear(event){
        this.setState({year: event.target.value});
    }

    changeMonth(event){
        this.setState({month: event.target.value});
    }

    reset(event){
        this.setState({year:undefined,month:undefined});
    }

}

export default AllTransactions
