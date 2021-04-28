import React from 'react';
import PropTypes from 'prop-types';
import { 
    BrowserRouter as Router, 
    Switch,
    Route,
  } from 'react-router-dom';
import Login from '../Login/Login';
import Registration from '../Registration/Registration';
import Logout from '../Logout/Logout';
import Navbar from '../Navbar/Navbar';

export default function Homepage( props ){
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path="/login">
                    <Login setToken={ props.setToken }/>
                </Route>
                <Route path="/signup">
                    <Registration />
                </Route>
                <Route path="/logout">
                    <Logout 
                        token = { props.token }
                        setToken={ props.setToken }/>
                </Route>
            </Switch>
        </Router>
    );
}

Homepage.propTypes = {
    setToken: PropTypes.func.isRequired
}