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

import useToken from './components/UseToken/useToken';

function App() {
  const { token, setToken } = useToken();

  console.log(token);

  function logOut() {
    setToken('');
    window.location.href='/';
  }

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
            {logOut}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
