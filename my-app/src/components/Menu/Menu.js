import { React, useState } from 'react';
import { useHistory } from 'react-router-dom';
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
} from '@material-ui/icons';
import { useStyles } from '../../styles/menuStyle';

export default function Menu( props ) {
  const [value, setValue] = useState(0);
  const classes = useStyles();
  const history = useHistory();

  const handleChange = (evet, newValue) => {
    setValue(newValue);
    switch(newValue){
      case 0: history.push('/page'); break;
      case 1: history.push('/random'); break;
      case 2: history.push('/tutorial'); break;
      case 3: history.push('/info'); break;
      case 4: history.push('/signup'); break;
      case 5: history.push('/login'); break;
      case 6: setValue(0); history.push('/logout'); break;
    }
  };
  
  if(props.token)
  {
    if(value === 5)
      setValue(0);
    return (
      <div className={classes.root}>
        <AppBar position="static" color="inherit">
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
            aria-label="scrollable force tabs example"
          >
            <Tab label="Home" value={0} icon={<Home /> } className={classes.icon}/>
            <Tab label="Random test" value={1} icon={<Grain />} className={classes.icon} />
            <Tab label="Tutorial" value={2} icon={<MenuBook/>} className={classes.icon}/>
            <Tab label="Information" value={3} icon={<Info />} className={classes.icon}/>
            <Tab label="LogOut" value={6} icon={<Lock />} className={classes.icon} />
          </Tabs>
        </AppBar>
      </div>
    );
  } else
    return (
      <div className={classes.root}>
        <AppBar position="static" color="inherit">
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
            aria-label="scrollable force tabs example"
          >
            <Tab label="Home" value={0} icon={<Home /> } className={classes.icon}/>
            <Tab label="SignUp" value={4} icon={<HowToReg />} className={classes.icon} />
            <Tab label="LogIn" value={5} icon={<LockOpen />} className={classes.icon} />
          </Tabs>
        </AppBar>
      </div>
    );
}