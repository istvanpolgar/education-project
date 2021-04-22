import React from 'react';
import { 
    BrowserRouter as Router, 
    Switch,
    Route,
  } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

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
                <Route exact path="/">
                    <AppBar position="static">
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
                <Route path="/login">
                    <AppBar position="static">
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
                    <AppBar position="static">
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
                    <AppBar position="static">
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
            </Switch>
        </Router>
      </div>
    );
}