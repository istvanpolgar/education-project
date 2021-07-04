import { 
    React, 
  } from 'react';
  import {
    Button,
    Typography,
    Fab,
  } from '@material-ui/core';

  import {
    NewCard,
    NewCardActionArea,
    NewCardActions,
    NewCardContent,
    NewCardMedia
  } from "./CardElement";
  import {
    FiberManualRecord
} from '@material-ui/icons';
  import { useStyles } from '../../styles/firstStyle';

  export default function Card( props ) {
    const classes = useStyles();
    let dots = [];

    for(let i = 0; i < 5; i++)
        if( i === props.activeDot)
            dots[i] = true;
        else
            dots[i] = false;

    return (
      <div>
          <NewCard className={classes.card}>
            <NewCardActionArea>
              <NewCardMedia
                component='img'
                alt={props.title}
                image={props.image}
                title={props.title}
                className={classes.media}
              />
              <NewCardContent className={classes.newCardContent}>
                <Typography 
                  gutterBottom 
                  variant="h2" 
                  component="h1">
                  {props.title}
                </Typography>
                <Typography
                  variant="h5"
                  className={classes.newCardContentTextSecondary}
                  component="p"
                >
                  {props.description}
                </Typography>
              </NewCardContent>
              
            </NewCardActionArea>
            <div className={classes.box}>
                { 
                dots.map((dot,i) => {
                    if( props.activeDot === i)
                        return (
                            <Fab
                                key={i}
                                component="button"
                                disabled={dot}
                                className={classes.fab}
                                size="small"
                            >
                                <FiberManualRecord className={classes.inactivedot} key={i}/>
                            </Fab>
                        )
                    else
                    return (
                        <Fab
                            key={i}
                            component="button"
                            disabled={dot}
                            onClick={ () => { 
                                props.setActiveDot(i);
                                props.setManualChange(true);
                            } }
                            className={classes.fab}
                            size="small"
                        >
                            <FiberManualRecord 
                                className={classes.activedot} 
                                key={i}/>
                        </Fab>
                    )})
                }
            </div>
            <NewCardActions className={classes.action}>
              <Button 
                className={classes.button}
                size="large" 
                variant="outlined" 
                onClick={() => { props.handleRoot(props.activeDot); }}
              >
                {props.buttontitle}
              </Button>
            </NewCardActions> 
          </NewCard>
      </div>
)}