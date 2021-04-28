import React from 'react';
import { 
  BrowserRouter as Router, 
  Switch,
  Route,
} from 'react-router-dom';

import './App.css';

import Homepage from './components/Homepage/Homepage';
import Page from './components/Page/Page';
import Navbar from './components/Navbar/Navbar';
import Logout from './components/Logout/Logout';
import useToken from './components/UseToken/useToken';


function App() {
  const { token, setToken } = useToken();

  console.log('Token: ', token);

  if(!token) {
    return (
      <Homepage 
        token = { token }
        setToken={ setToken }/>
    )
  }

  return(
    <div className="App">
      <Router>
        <Switch>
          <Route path="/page">
            <Navbar />
            <Page 
              token = { token }
              setToken = { setToken } />
          </Route>
          <Route path="/logout">
            <Logout
              token = { token }
              setToken={ setToken }/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
