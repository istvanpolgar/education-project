import React from 'react';
import { 
  BrowserRouter as Router, 
  Switch,
  Route,
} from 'react-router-dom';

import './App.css';

import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import Page from './components/Page/Page';
import Navbar from './components/Navbar/Navbar';
import Logout from './components/Logout/Logout';
import useToken from './components/UseToken/useToken';


function App() {
  const { token, setToken } = useToken();

  console.log('Token: ', token);
  
  return(
    <div className="App">
        <Router>
            <Navbar />
            <Switch>
                <Route exact path="/">
                    <div>First page</div>
                </Route>
                <Route path="/page">
                    <Page 
                        token = { token }
                        setToken = { setToken } />
                </Route>
                <Route path="/login">
                    <Login setToken={ setToken }/>
                </Route>
                <Route path="/signup">
                    <Registration />
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
