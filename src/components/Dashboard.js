// @flow

import React from 'react'
import TransactionTable from "./TransactionTable"
import {getAccountDetails,getAccount} from "../api"
import { Input,Form,Select,Button } from 'semantic-ui-react'



export type Props = {
  token: string,
}

const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
]


class Dashboard extends React.Component {

  props: Props;

    constructor(){
        super();
        this.state = { accNumber: undefined, targetNr: undefined};
    }
  
  render() {
          return (
              <div>
                  <label>{this.state.accNumber}</label>
                  Dashboard
                  <div>
                      <h3>Neue Zahlung</h3>
                      <Form>
                          <div>
                              <label>Von</label>
                              <Form.Select options={[{text: this.state.accNumber, value: this.state.accNumber}]}>
                              </Form.Select>
                          </div>
                          <div>
                              <label>Nach</label>
                              {this.state.validTarget?
                                  <Form.Input placeholder="Zielkontonummer" onChange={this.verifyAccountNr.bind(this)}/>
                                  :
                                  <Form.Input error placeholder="Zielkontonummer" onChange={this.verifyAccountNr.bind(this)}/>
                              }

                          </div>
                          <div>
                              <label>Betrag</label>
                              <Form.Input type="number" placeholder="Betrag" value="0"/>
                          </div>
                          <Form.Button type="submit">Betrag überweisen</Form.Button>
                      </Form>
                  </div>
                  <TransactionTable token={this.props.token}/>
              </div>
          )
  }
    componentDidMount(){
        getAccountDetails(this.props.token).then(({accountNr:details})=>
            this.setState({accNumber:details})
        );
    }

    verifyAccountNr(event){
        getAccount(event.target.value,this.props.token).then(({accountNr:details})=>
            this.setState({targetNr:details,validTarget:true})).catch((e)=>{
            this.setState({validTarget:false})
        });
    }
}

export default Dashboard
