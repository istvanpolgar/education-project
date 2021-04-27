import React from 'react';
import PropTypes from 'prop-types';
import { 
    BrowserRouter as Router, 
    Switch,
    Route,
  } from 'react-router-dom';
import Login from '../Login/Login';
import Registration from '../Registration/Registration';
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';

export default function Homepage( { setToken } ){
    function logOut() {
        setToken('');
        window.location.href='/';
    }

    return (
        <Router>
            <Navbar />
            <Switch>
                <Route exact path="/">
                    <Header />
                </Route>
                <Route path="/login">
                    <Login setToken={ setToken }/>
                </Route>
                <Route path="/signup">
                    <Registration />
                </Route>
                <Route path="/page">
                    <Header />
                </Route>
                <Route path="/logout">
                    {logOut}
                </Route>
            </Switch>
        </Router>
    );
}

Homepage.propTypes = {
    setToken: PropTypes.func.isRequired
}