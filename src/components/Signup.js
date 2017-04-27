// @flow

import React from 'react'
import {Redirect,Link} from 'react-router-dom'
import {Grid, Form, Segment, Button, Message} from 'semantic-ui-react'

import {signup} from '../api'

class Signup extends React.Component {

    state: {
        login: string,
        firstname: string,
        lastname: string,
        password: string,
        error: string,
        redirectToReferrer: boolean,
    }

    state = {
        login: "",
        firstname: "",
        lastname: "",
        password: "",
        error: null,
        redirectToReferrer: false,
    }

    handleLoginChanged = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            this.setState({login: event.target.value})
        }
    }

    handleFirstNameChanged = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            this.setState({firstname: event.target.value})
        }
    }

    handleLastNameChanged = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            this.setState({lastname: event.target.value})
        }
    }

    handlePasswordChanged = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            this.setState({password: event.target.value})
        }
    }

    handleSubmit = (event: Event) => {
        event.preventDefault()
        const {login, firstname, lastname, password} = this.state
        signup(login, firstname, lastname, password).then(result => {
            this.setState({redirectToReferrer: true, error: null})
        }).catch(error =>
            this.setState({error})
        )
    }

    render() {
        const {redirectToReferrer, error} = this.state
        if (redirectToReferrer) {
            return (
                <Redirect to='/login'/>
            )
        }

        return (
            <div>
                <Grid centered>
                    <Grid.Column>
                        <h2>Bank of Rapperswil</h2>
                        <Segment stacked>
                            <Form>
                                <Form.Field>
                                <h3>Registrieren</h3>
                                </Form.Field>
                                <Form.Field>
                                <input onChange={this.handleLoginChanged} placeholder='Login' value={this.state.login}/>
                                </Form.Field>
                                <Form.Field>
                                <input onChange={this.handleFirstNameChanged} placeholder='Vorname'
                                       value={this.state.firstname}/>
                                </Form.Field>
                                <Form.Field>
                                <input onChange={this.handleLastNameChanged} placeholder='Nachname'
                                       value={this.state.lastname}/>
                                </Form.Field>
                                <Form.Field>
                                <input onChange={this.handlePasswordChanged} placeholder='Passwort' type="password"
                                       value={this.state.password}/>
                                </Form.Field>
                                <Button fluid primary onClick={this.handleSubmit}>Account eröffnen</Button>
                            </Form>
                        </Segment>
                        { error && <Message error>Es ist ein Fehler aufgetreten!</Message> }
                        <Message>
                            <Link to="/">Zurück zur Startseite</Link>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default Signup
