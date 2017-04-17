// @flow

import React from 'react'
import {Link} from 'react-router-dom'
import {Grid, Form, Segment,Button} from 'semantic-ui-react'


export type Props = {
    isAuthenticated: boolean,
}

const Home = ({isAuthenticated}: Props) => (
    <div>
        { isAuthenticated
            ? <div>
                <p>Willkommen zurück!</p>
                <Link to={'/dashboard'}>Zum Dashboard</Link>
            </div>
            : <div>
                <Grid centered>
                    <Grid.Column>
                        <h2>Bank of Rapperswil</h2>
                        <Segment stacked>
                            <Form>
                                <h3>E-Banking Portal</h3>
                                <Link to={"/login"}><Button primary fluid>Login</Button></Link>
                                <p>Falls Sie noch keinen Account besitzen können Sie sich hier registrieren:</p>
                                <Link to={"/signup"}><Button fluid>Registrierung</Button></Link>
                            </Form>
                        </Segment>
                    </Grid.Column>
                </Grid>

            </div>
        }
    </div>
);

export default Home
