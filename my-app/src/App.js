import React from 'react';
import { 
  BrowserRouter as Router, 
  Switch,
  Route,
} from 'react-router-dom';

import './App.css';

import Homepage from './components/Homepage/Homepage';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Logout from './components/Logout/Logout'

import useToken from './components/UseToken/useToken';

function App() {
  const { token, setToken } = useToken();

  console.log(token);

  if(!token) {
    return (
      <Homepage setToken={ setToken }/>
    )
  }

  return(
    <div className="App">
      <Router>
        <Switch>
          <Route path="/page">
            <Navbar />
            <Header />
          </Route>
          <Route path="/logout">
            <Logout setToken = {setToken} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
