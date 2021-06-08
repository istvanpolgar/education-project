import React from 'react';
import { 
    BrowserRouter as Router, 
    Switch,
    Route,
} from 'react-router-dom';

import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';

import { useStyles } from '../../styles/navbarStyle';

export default function Homepage(){
    const classes = useStyles();

    const handleLoginRoute = () => { 
        window.location.href='/login';
    }

    const handleSignUpRoute = () => { 
        window.location.href='/signup';
    }

    const handleLogoutRoute = () => { 
        window.location.href='/logout';
    }

    return (
        <div className={classes.root}>
        <Router>
            <Switch>
                <Route path="/login">
                    <AppBar position="static" color="inherit">
                        <Toolbar>
                            <IconButton 
                                edge="start" 
                                className={classes.menuButton} 
                                color="inherit" 
                                aria-label="menu"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography 
                                variant="h6" 
                                className={classes.title}
                            >
                                News
                            </Typography>
                            <Button 
                                color="inherit"
                                onClick={handleSignUpRoute}
                            >
                                Sign Up
                            </Button>
                        </Toolbar>
                    </AppBar>
                </Route>
                <Route path="/signup">
                    <AppBar position="static" color="inherit">
                        <Toolbar>
                            <IconButton 
                                edge="start" 
                                className={classes.menuButton} 
                                color="inherit" 
                                aria-label="menu"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography 
                                variant="h6" 
                                className={classes.title}
                            >
                                News
                            </Typography>
                            <Button 
                                color="inherit"
                                onClick={handleLoginRoute}
                            >
                                Login
                            </Button>
                        </Toolbar>
                    </AppBar>
                </Route>
                <Route path="/page">
                    <AppBar position="static"  color="inherit">
                        <Toolbar>
                            <IconButton 
                                edge="start" 
                                className={classes.menuButton} 
                                color="inherit" 
                                aria-label="menu"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography 
                                variant="h6" 
                                className={classes.title}
                            >
                                News
                            </Typography>
                            <Button 
                                color="inherit"
                                onClick={handleLogoutRoute}
                            >
                                Logout
                            </Button>
                        </Toolbar>
                    </AppBar>
                </Route>
                <Route exact path="/">
                    <AppBar position="static" color="inherit">
                        <Toolbar>
                            <IconButton 
                                edge="start" 
                                className={classes.menuButton} 
                                color="inherit" 
                                aria-label="menu"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography 
                                variant="h6" 
                                className={classes.title}
                            >
                                News
                            </Typography>
                            <Button 
                                color="inherit"
                                onClick={handleLoginRoute}
                            >
                                Login
                            </Button>
                            <Button 
                                color="inherit"
                                onClick={handleSignUpRoute}
                            >
                                Sign Up
                            </Button>
                        </Toolbar>
                    </AppBar>
                </Route>
            </Switch>
        </Router>
      </div>
    );
}