import { React, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { 
  AppBar,
  Tabs,
  Tab,
} from '@material-ui/core';
import {
  LockOpen,
  Lock,
  HowToReg,
  Info,
  Home,
  MenuBook,
  Grain,
  Functions,
  Settings
} from '@material-ui/icons';
import { useStyles } from '../../styles/menuStyle';

export default function Menu( props ) {
  const [value, setValue] = useState(0);
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  useEffect(()=>{
    if(location.pathname == '/')
      setValue(0);
    if(location.pathname == '/home')
      setValue(0);
    if(location.pathname == '/page')
      setValue(1);
    if(location.pathname == '/random')
      setValue(2);
    if(location.pathname == '/tutorial')
      setValue(3);
    if(location.pathname == '/info')
      setValue(4);
    if(location.pathname == '/signup')
      setValue(5);
    if(location.pathname == '/login')
      setValue(6);
    if(location.pathname == '/logout')
      setValue(7);
    if(location.pathname == '/admin')
      setValue(8);
  },[location.pathname])
  
  const handleChange = (evet, newValue) => {
    setValue(newValue);
    switch(newValue){
      case 0: history.push('/home'); break;
      case 1: history.push('/page'); break;
      case 2: history.push('/random'); break;
      case 3: history.push('/tutorial'); break;
      case 4: history.push('/info'); break;
      case 5: history.push('/signup'); break;
      case 6: history.push('/login'); break;
      case 7: history.push('/logout'); break;
      case 8: history.push('/admin'); break;
    }
  };

  if( !props.showMenu )
    return (<></>)
  else
    if(props.token)
      if(props.token == "administration") {
        if(value === 0 || value === 6)
          setValue(8);
        return (
          <div className={classes.root}>
            <AppBar color="inherit">
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                aria-label="menu items"
                centered
              >
                <Tab label="Admin" value={8} icon={<Settings /> } className={classes.icon}/>
                <Tab label="LogOut" value={7} icon={<Lock />} className={classes.icon} />
              </Tabs>
            </AppBar>
          </div>
        );
      } else {
          if(value === 6)
            setValue(1);
          return (
            <div className={classes.root}>
              <AppBar color="inherit">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  aria-label="menu items"
                  centered
                >
                  <Tab label="Generate" value={1} icon={<Home /> } className={classes.icon}/>
                  <Tab label="Random test" value={2} icon={<Grain />} className={classes.icon} />
                  <Tab label="Tutorial" value={3} icon={<MenuBook/>} className={classes.icon}/>
                  <Tab label="Information" value={4} icon={<Info />} className={classes.icon}/>
                  <Tab label="LogOut" value={7} icon={<Lock />} className={classes.icon} />
                </Tabs>
              </AppBar>
            </div>
          );
      }
    else {
      if(value === 7)
        setValue(0);
      return (
        <div className={classes.root}>
          <AppBar color="inherit">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              aria-label="menu items"
              centered
            >
              <Tab aria-label="Home" value={0} icon={<Functions fontSize='large'/> }/>
              <Tab label="Information" value={4} icon={<Info />} className={classes.icon}/>
              <Tab label="SignUp" value={5} icon={<HowToReg />} className={classes.icon} />
              <Tab label="LogIn" value={6} icon={<LockOpen />} className={classes.icon} />
            </Tabs>
          </AppBar>
        </div>
      )  
    }
}