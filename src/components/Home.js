// @flow

import React from 'react'
import { Link } from 'react-router-dom'


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
            <p>Bank of Rapperswil</p>
            <p>E-Banking Portal</p>
            <Link to={"/login"}>Login</Link>
          <p>Falls Sie noch keinen Account besitzen können Sie sich hier registrieren:</p>
            <Link to={"/signup"}>Registrierung</Link>
        </div>
    }
  </div>
);

export default Home
