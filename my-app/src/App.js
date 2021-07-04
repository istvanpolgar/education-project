import { React, useState } from 'react';
import { 
  BrowserRouter as Router, 
  Switch,
  Route,
} from 'react-router-dom';

import './App.css';

import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import Page from './components/Page/Page';
import Firstpage from './components/Firstpage/Firstpage';
import Menu from './components/Menu/Menu';
import Logout from './components/Logout/Logout';
import Admin from './components/Admin/Admin';
import Downloading from './components/Downloading/Downloading';
import Forgotten from './components/Forgotten/Forgotten';
import useToken from './components/UseToken/useToken';

function App() {
    const { token, setToken } = useToken();
    const [showMenu, setShowMenu] = useState(true);

    console.log('Token: ', token);

    if(!token)
        return(
            <div className="App">
                <Router>
                    <Menu 
                        token = { token }
                        showMenu = { showMenu }/>
                    <Switch>
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
                        <Route path="/forgotten_pass">
                            <Forgotten />
                        </Route>
                        <Route path="/home">
                            <Firstpage setShowMenu = { setShowMenu }/>
                        </Route>
                        <Route path="/">
                            <Firstpage setShowMenu = { setShowMenu }/>
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
        else
            if(token == "administration")
                return(
                    <div className="App">
                        <Router>
                            <Menu 
                                token = { token }
                                showMenu = { showMenu }/>
                            <Route path="/admin">
                                <Admin />
                            </Route>
                            <Route path="/logout">
                                <Logout 
                                    token = { token }
                                    setToken={ setToken }/>
                            </Route>
                            <Route path="/page">
                                <Admin />
                            </Route>
                        </Router>
                    </div>
                );
            else
                return(
                    <div className="App">
                        <Router>
                            <Menu 
                                token = { token }
                                showMenu = { showMenu }/>
                            <Switch>
                                <Route path="/page">
                                    <Page 
                                        token = { token }
                                        setToken = { setToken }/>
                                </Route>
                                <Route path="/logout">
                                    <Logout 
                                        token = { token }
                                        setToken={ setToken }/>
                                </Route>
                                <Route path="/download">
                                    <Downloading
                                        token = { token }
                                        setToken={ setToken }/>
                                </Route>
                            </Switch>
                        </Router>
                    </div>
                );
    }

export default App;
