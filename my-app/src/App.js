import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';

import Homepage from './components/Homepage/Homepage';
import Header from './components/Header/Header';
import User from './components/User/User';
import Login from './components/Login/Login';
import useToken from './components/UseToken/useToken';

const url = 'http://localhost:8080';

function App() {
  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  console.log(token);

  return(
    <div className="App">
      <Header />
      <BrowserRouter>
        <Switch>
          <Route path="/homepage">
            <Homepage />
          </Route>
          <Route path="/users">
            <User />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
