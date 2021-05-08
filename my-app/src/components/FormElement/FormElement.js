import { Grid, TextField, Typography } from "@material-ui/core";
import { ContactlessOutlined } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useStyles } from '../../styles/formElementStyle';

export default function FormElement( props ) {
  const [ input, setInput ] = useState( { name: '', value: '' } );
  
  const handleChange = e => {
    e.persist();
    setInput(prevInput => (
        { ...prevInput, name: e.target.name, value: e.target.value 
    }));
  }
  
  const onTrigger = () => {
    const data = {
      'name': input.name, 
      'value': input.value
    }
    props.parentCallback(data);
  }

  const classes = useStyles();

  useEffect(()=>{ onTrigger() }, [input]);

  if (props.type == "date" || props.type == "time")
    return(
      <>
        <Grid container>
          <Grid item>
            <Typography
              className={classes.datetext} 
              component="h1" 
              variant="h5"
            >
              {props.title}
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              className={classes.dateinput}
              required
              id={props.id}
              name={props.id}
              type={props.type}
              defaultValue={() => {
                if(props.type == "date")
                {
                    let newDate = new Date();
                    return newDate.getDate();
                }
                if(props.type == "time")
                    return "01:00";
              }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </>
    )
  else
    return(
      <>
        <Grid container>
          <Grid item>
            <Typography 
              className={classes.text}
              component="h1" 
              variant="h5"
            >
              {props.title}
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              className={classes.input}
              required
              id={props.id}
              label={props.label}
              name={props.id}
              autoComplete={props.label}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </>
    )
}